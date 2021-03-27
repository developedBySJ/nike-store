import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { JwtPayload } from 'src/auth/types';
import { FavouriteType } from 'src/favourite/favourite.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FavouriteService } from 'src/favourite/favourite.service';
import { CurrentUser } from 'src/lib/decorators/CurrentUser.decorator';

@Resolver()
export class FavouriteResolver {
  constructor(private favouriteService: FavouriteService) { }

  @Query(returns => FavouriteType)
  @UseGuards(JwtAuthGuard)
  async getMyFavourites(@CurrentUser() user: JwtPayload) {

    return this.favouriteService.getMyFavourites(user.id)

  }

  @Mutation(returns => FavouriteType)
  @UseGuards(JwtAuthGuard)
  async addToFavourites(
    @Args({ name: 'productId', type: () => ID }) favProductInputId: string,
    @CurrentUser() user: JwtPayload) {

    return this.favouriteService.addToFavourites(user.id, favProductInputId)

  }


  @Mutation(returns => FavouriteType)
  @UseGuards(JwtAuthGuard)
  async removeFromFavourites(
    @Args({ name: 'productId', type: () => ID }) productsId: string,
    @CurrentUser() user: JwtPayload
  ) {

    return this.favouriteService.removeFromFavourites(user.id, productsId)

  }


  @Mutation(returns => FavouriteType)
  @UseGuards(JwtAuthGuard)
  async clearFavourites(@CurrentUser() user: JwtPayload) {

    return this.favouriteService.clearFavourites(user.id)

  }

}
