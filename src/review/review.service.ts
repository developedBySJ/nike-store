import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { JwtPayload } from 'src/auth/types'
import { SortReviewsBy } from './review.input'
import { Review, ReviewDoc } from './review.enitity'
import { Member, MemberDoc } from 'src/member/member.entity'
import { Product, ProductDoc } from 'src/product/product.entity'
import {
  ICreateReview,
  IPreSave,
  IReviewFilter,
  IUpdateReview,
} from './review.type'

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviews: Model<ReviewDoc>,
    @InjectModel(Product.name) private products: Model<ProductDoc>,
    @InjectModel(Member.name) private members: Model<MemberDoc>,
  ) {}

  async getReviews({ productId, limit = 8, page = 0, sortBy }: IReviewFilter) {
    if (!productId) {
      throw new BadRequestException('please provide product id to get reviews')
    }
    const skip = limit * (page - 1)

    const sort = sortBy
      ? {
        ...(sortBy === SortReviewsBy.NEWEST && { createdAt: 1 }),
        ...(sortBy === SortReviewsBy.RATING_HIGH_TO_LOW && { rating: -1 }),
        ...(sortBy === SortReviewsBy.RATING_LOW_TO_HIGH && { rating: 1 }),
      }
      : {}

    return this.reviews
      .find({ productId: productId })
      .limit(limit)
      .skip(skip)
      .sort(sort)
  }

  async getReview(reviewId: string) {
    const review = this.reviews.findById(reviewId)

    if (!review) {
      throw new NotFoundException(`review not found with id "${reviewId}"`)
    }

    return review
  }

  async getReviewByUser(
    user: JwtPayload,
    { limit = 8, productId, page = 1, sortBy }: IReviewFilter,
  ) {
    const skip = limit * (page - 1)

    const sort = sortBy
      ? {
        ...(sortBy === SortReviewsBy.NEWEST && { createdAt: 1 }),
        ...(sortBy === SortReviewsBy.RATING_HIGH_TO_LOW && { rating: -1 }),
        ...(sortBy === SortReviewsBy.RATING_LOW_TO_HIGH && { rating: 1 }),
      }
      : {}

    return await this.reviews
      .find({ 'member.id': user.id, ...(productId && { productId }) })
      .limit(limit)
      .skip(skip)
      .sort(sort)
  }

  async createReview({
    comment,
    member: user,
    productId,
    rating,
  }: ICreateReview) {
    const member = await this.members.findById(user.id)
    if (!member) {
      throw new NotFoundException(
        `no member found with member id "${productId}"`,
      )
    }

    const product = await this.products.findById(productId)

    if (!product) {
      throw new NotFoundException(
        `no product found with product id "${productId}"`,
      )
    }

    const review = await this.reviews.findOne({
      'member.id': member.id,
      productId: product._id,
    })

    if (review) {
      throw new ConflictException(`review already exist`)
    }

    await this._preSave({ isNew: true, prevRating: 0, productId, rating })

    const newReview = await this.reviews.create({
      productId: product._id,
      productSlug: product.slug,
      member: {
        firstName: member.firstName,
        lastName: member.lastName,
        avatar: member.avatar,
        id: member._id,
      },
      rating,
      comment,
    })

    if (product.numOfReviews < 3) {
      const { comment, member, rating, _id } = newReview
      product.reviews.push({ comment, member, rating, id: _id })
      await product.save()
    }

    return newReview
  }

  async updateReview({
    viewer,
    reviewId,
    data: { comment, rating },
  }: IUpdateReview) {
    const review = await this.reviews.findById(reviewId)

    if (!review) {
      throw new NotFoundException(`no review found with id "${reviewId}"`)
    }

    if (String(viewer.id) === String(review.member.id) || viewer.isAdmin) {
      review.comment = comment || review.comment
      review.rating = rating || review.rating

      await this.products.findOneAndUpdate(
        {
          _id: review.productId,
          'reviews.id': review.id,
        },
        {
          $set: {
            'reviews.$.comment': review.comment,
            'reviews.$.rating': review.rating,
          },
        },
      )

      await this._preSave({
        isNew: false,
        prevRating: (review as any)._prevRating || 0,
        productId: review.productId,
        rating,
      })

      await review.save()

      return review
    } else {
      throw new ForbiddenException()
    }
  }

  async deleteReview({
    viewer,
    reviewId,
  }: {
    viewer: JwtPayload
    reviewId: string
  }) {
    const review = await this.reviews.findById(reviewId)

    if (!review) {
      throw new NotFoundException(`no review found with id "${reviewId}"`)
    }

    if (String(viewer.id) === String(review.member.id) || viewer.isAdmin) {
      this._preRemove({
        id: review.id,
        productId: review.productId,
        rating: review.rating,
      })

      return review.remove()
    } else {
      throw new ForbiddenException()
    }
  }

  private async _preRemove({ productId, rating, id }) {
    const product = await this.products.findById(productId)
    const ratingSum = product.ratings * product.numOfReviews

    product.numOfReviews--

    const newRating = Number(
      ((ratingSum - rating) / product.numOfReviews).toFixed(2),
    )

    product.ratings = newRating
    product.reviews = product.reviews.filter(
      (prodReview) => String(prodReview.id) !== String(id),
    )

    await product.save()
  }

  private async _preSave({ productId, isNew, prevRating, rating }: IPreSave) {
    const product = await this.products.findById(productId)

    if (product) {
      const ratingSum = product.ratings * product.numOfReviews

      if (isNew) {
        product.numOfReviews++
      }

      const newRating = Number(
        ((ratingSum + rating - prevRating) / product.numOfReviews).toFixed(2),
      )

      product.ratings = newRating

      await product.save()
    }
  }
}
