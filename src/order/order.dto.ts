import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsISO8601, IsNotEmptyObject, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

import { AddressDto } from 'src/member/member.dto'
import { CartProductDto } from 'src/cart/cart.dto';
import { OrderStatus, SortOrderBy } from 'src/order/order.input'


export class CreateOrderDto {

  @IsNumber()
  @Min(1)
  totalPrice: number;

  @IsNumber()
  tax: number;

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => AddressDto)
  shippingAddress: AddressDto;

  @IsString()
  stripeToken: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartProductDto)
  products: CartProductDto[];

}

export class OrderFilterDto {

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;


  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus;

  @IsArray()
  @IsOptional()
  @IsISO8601({ strict: true }, { each: true })
  dateRange: [string, string];

  @IsEnum(SortOrderBy)
  @IsOptional()
  sortBy: SortOrderBy;

}