import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import slugify from 'slugify'
import * as crypto from 'crypto'
import {removeUndefined} from 'src/lib/utils/removeUndefined'
import {Product, ProductDoc} from './product.entity'
import {SortProductBy} from './product.input'
import {ICreateProduct, IProductFilter} from './product.types'
import {Cloudinary} from 'src/lib/api/cloudinary'
import {CLOUDINARY_API} from 'src/config'

const FOLDER = CLOUDINARY_API.folder

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private products: Model<ProductDoc>) {}

  async getProducts(filter: IProductFilter | undefined) {
    const {sortBy, limit, page, priceRange, ratings, searchQuery: q, ...other} =
      filter || {}
    const skip = limit * (page - 1)

    const category =
      other.category === 'clothing'
        ? {category: {$in: ['hoodies', 'tshirt', 'jersys']}}
        : other.category === 'accessories'
        ? {category: {$in: ['cap', 'bags']}}
        : {}

    const searchQuery =
      q?.length > 0
        ? {
            $or: [
              {name: new RegExp(q, 'gi')},
              {description: new RegExp(q, 'gi')},
              {brand: new RegExp(q, 'gi')},
              {category: new RegExp(q, 'gi')},
            ],
          }
        : undefined

    const query = {...removeUndefined({...other, ...category}), ...searchQuery}

    if (priceRange && priceRange.length) {
      query['price'] = {$gte: priceRange[0], $lte: priceRange[1]}
    }

    if (ratings) {
      query['ratings'] = {$gte: ratings}
    }

    let productsQuery = this.products
      .find(query)
      .limit(Math.min(limit || 8, 50))
      .skip(skip || 0)

    if (sortBy && sortBy !== SortProductBy.FEATURED) {
      switch (sortBy) {
        case SortProductBy.NEWEST:
          productsQuery = productsQuery.sort({createdAt: -1, name: 1})
          break
        case SortProductBy.PRICE_HIGH_TO_LOW:
          productsQuery = productsQuery.sort({price: -1})
          break
        case SortProductBy.PRICE_LOW_TO_HIGH:
          productsQuery = productsQuery.sort({price: 1})
          break
        default:
          break
      }
    }

    const products = await productsQuery.exec()

    return products
  }

  async getProductById(id: string) {
    const product = await this.products.findById(id)

    if (!product) {
      throw new NotFoundException(`no product found with id "${id}"`)
    }

    return product
  }

  async getProductBySlug(slug: string) {
    const product = await this.products.findOne({slug})

    if (!product) {
      throw new NotFoundException(`no product found with slug "${slug}"`)
    }

    return product
  }

  async createProduct(createProduct: ICreateProduct) {
    const slug = slugify(
      `${createProduct.name} ${createProduct.description} ${crypto
        .randomBytes(2)
        .toString('hex')}`,
      {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      },
    )

    const productImg = createProduct.images

    const images =
      productImg instanceof Array
        ? await Promise.all(
            productImg.map(async (img) => {
              const fileUpload = await img.promise

              return (await Cloudinary.upload(fileUpload, FOLDER.products))
                .secure_url
            }),
          )
        : [(await Cloudinary.upload(productImg, FOLDER.products)).secure_url]

    const product = await this.products.create({
      ...createProduct,
      images: images,
      slug,
    })

    return product
  }

  async updateProduct() {}

  async deleteProduct(id: string) {
    const product = this.products.findByIdAndDelete(id)

    if (!product) {
      throw new NotFoundException(`no product found with id "${id}"`)
    }

    return product
  }
}
