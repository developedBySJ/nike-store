import {plainToClass} from 'class-transformer'
import {BadRequestException} from '@nestjs/common'
import {isMongoId, validateOrReject} from 'class-validator'
import {Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql'

import {ProductType} from 'src/product/product.model'
import {ProductService} from 'src/product/product.service'
import {CreateProductDto, ProductFilterDto} from 'src/product/product.dto'
import {CreateProductInput, ProductFilter} from 'src/product/product.input'

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query((returns) => [ProductType])
  async getProducts(
    @Args({name: 'GetProductInput', type: () => ProductFilter, nullable: true})
    filter: ProductFilterDto,
  ) {
    return this.productService.getProducts(filter)
  }

  @Query((returns) => ProductType)
  async getProductById(@Args({name: 'id', type: () => ID}) id: string) {
    if (!isMongoId(id)) {
      throw new BadRequestException('invalid product id')
    }

    return this.productService.getProductById(id)
  }

  @Query((returns) => ProductType)
  async getProductBySlug(
    @Args({name: 'slug', type: () => String}) slug: string,
  ) {
    return this.productService.getProductBySlug(slug)
  }

  @Mutation((returns) => ProductType)
  async createProduct(
    @Args({name: 'CreateProductInput', type: () => CreateProductInput})
    createProductInput: any,
  ) {
    const {images, ...other} = createProductInput
    const createProduct = plainToClass(CreateProductDto, other)

    try {
      await validateOrReject(createProduct, {
        validationError: {target: false, value: true},
      })
    } catch (error) {
      throw new BadRequestException(error)
    }

    return this.productService.createProduct({images, ...createProduct})
  }

  @Mutation((returns) => String)
  async updateProduct() {
    return 'Not Implemented Yet'
  }

  @Mutation((returns) => ProductType)
  async deleteProduct(@Args({name: 'id', type: () => ID}) id: string) {
    if (isMongoId(id)) {
      throw new BadRequestException('invalid product id')
    }

    return this.productService.deleteProduct(id)
  }
}
