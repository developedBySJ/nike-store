import {FileUpload} from 'graphql-upload'

export interface IProductFilter {
  page?: number
  limit?: number
  ratings?: number
  category?: string
  material?: string
  priceRange?: [number, number]
  size?: string
  sortBy?: string
  searchQuery?: string
}

export interface ICreateProduct {
  name: string
  brand: string
  category: string
  size: string[]
  fit: string[]
  images: FileUpload | {promise: Promise<FileUpload>}[]
  description: string
  details: string
  price: number
  mrp: number
  availableStock: number
  material?: string
}

export interface IUpdateProduct {
  name?: string
  brand?: string
  category?: string
  size?: string[]
  fit?: string[]
  images?: string[]
  description?: string
  slug?: string
  details?: string
  price?: number
  mrp?: number
  availableStock?: number
  material?: string
}
