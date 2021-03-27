import { isMongoId } from 'class-validator'
import { BadRequestException, UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { JwtPayload } from 'src/auth/types'

import { ReviewType } from './review.model'
import { ReviewService } from './review.service'
import { CurrentUser } from 'src/lib/decorators/CurrentUser.decorator'
import { UpdateReviewDto, CreateReviewDto, GetReviewsDto } from './review.dto'
import { CreateReviewInput, ReviewsFilter, UpdateReviewInput } from './review.input'

@Resolver()
export class ReviewResolver {
  constructor(private reviewService: ReviewService) { }
  @Query(() => [ReviewType])
  async getReviews(@Args({ name: 'GetReviewsInput', type: () => ReviewsFilter }) getReviewInput: GetReviewsDto) {
    if (!isMongoId(getReviewInput.productId)) { throw new BadRequestException("invalid review id") }
    return this.reviewService.getReviews(getReviewInput || {})
  }

  @Query(() => ReviewType)
  async getReview(@Args({ name: 'reviewId', type: () => ID }) reviewId: string) {
    if (!isMongoId(reviewId)) { throw new BadRequestException("invalid review id") }
    return this.reviewService.getReview(reviewId)
  }

  @Query(() => [ReviewType])
  @UseGuards(JwtAuthGuard)
  async getMyReviews(
    @Args({ name: 'ReviewsFilter', type: () => ReviewsFilter, nullable: true }) reviewsFilter: GetReviewsDto,
    @CurrentUser() user: JwtPayload) {

    return this.reviewService.getReviewByUser(user, reviewsFilter || {})
  }

  @Mutation(() => ReviewType)
  @UseGuards(JwtAuthGuard)
  async createReview(
    @Args({ name: 'CreateReviewInput', type: () => CreateReviewInput }) createReviewInput: CreateReviewDto,
    @CurrentUser() user: JwtPayload) {
    return this.reviewService.createReview({ ...createReviewInput, member: user })

  }

  @Mutation(() => ReviewType)
  @UseGuards(JwtAuthGuard)
  async updateReview(
    @Args({ name: 'UpdateReviewInput', type: () => UpdateReviewInput }) { reviewId, ...data }: UpdateReviewDto,
    @CurrentUser() user: JwtPayload
  ) {
    return this.reviewService.updateReview({ viewer: user, reviewId, data })
  }

  @Mutation(() => ReviewType)
  @UseGuards(JwtAuthGuard)
  async deleteReview(
    @Args({ name: 'reviewId', type: () => ID }) reviewId: string,
    @CurrentUser() user: JwtPayload) {
    return this.reviewService.deleteReview({ reviewId, viewer: user })
  }
}