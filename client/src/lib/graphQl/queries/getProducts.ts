import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts(
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
      id
      name
      slug
      price
      images
      description
    }
  }

`

export { GET_PRODUCTS }