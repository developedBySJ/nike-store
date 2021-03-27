import { gql } from "@apollo/client";

const GET_PRODUCTS_COMPLETE = gql`
  query GetProductsComplete(
    $category: String
    $limit: Int
    $material: String
    $page: Int
    $priceRange: [Int!]
    $ratings: Float
    $size: String
    $sortBy: SortProductBy
    $searchQuery: String
  ) {
    getProducts(
      GetProductInput: {
        category: $category
        limit: $limit
        material: $material
        page: $page
        priceRange: $priceRange
        ratings: $ratings
        size: $size
        sortBy: $sortBy
        searchQuery: $searchQuery
      }
    ) {
      availableStock
      brand
      category
      createdAt
      description
      details
      fit
      id
      material
      mrp
      name
      numOfReviews
      price
      ratings
      size
      slug
    }
  }

`

export { GET_PRODUCTS_COMPLETE }