import { JwtPayload } from "src/auth/types";
import { ICartProducts } from "src/cart/cart.type";
import { IPagination } from "src/lib/inputTypes/pagination";
import { IAddress } from "src/member/member.type";
import { OrderStatus, SortOrderBy } from "./order.input";

export interface Ipayment {
  id: string;
  method: string;
  status: string;
  email: string;
  customerName: string;
}

export interface ICreateOrder {
  user: JwtPayload,
  totalPrice: number;
  tax: number;
  shippingAddress: IAddress;
  stripeToken: string;
  products: ICartProducts[];
}

export interface IOrderFilter extends IPagination {
  status: OrderStatus;
  dateRange: [string, string];
  sortBy: SortOrderBy;
  viewer?: JwtPayload;
}