import {useLazyQuery, useQuery} from '@apollo/client'
import React from 'react'
import {
  IProductCardProps,
  ProductCard,
  ProductCardSkeleton,
  ProductCardSlider,
} from '../../../../lib/Components'
import {GET_PRODUCTS} from '../../../../lib/graphQl/queries/getProducts'
import {
  GetProducts,
  GetProductsVariables,
} from '../../../../lib/graphQl/queries/__generated__/GetProducts'
import {sortImgArr} from '../../../../lib/utils/sortImgArr'

interface ISimilarProductProps {
  category: string
  productId: string
}

const SimilarProducts = ({category, productId}: ISimilarProductProps) => {
  const {data, error, loading} = useQuery<GetProducts, GetProductsVariables>(
    GET_PRODUCTS,
    {variables: {category, limit: 6}},
  )
  const cards = data?.getProducts
    ? data?.getProducts
        .filter(({id}) => id !== productId)
        .map(({description, images, name, price, slug}) => {
          const img = sortImgArr(images)
          return (
            <ProductCard
              description={description}
              name={name}
              image={img[0]}
              price={price}
              url={`/shop/${slug}`}
              key={slug}
            />
          )
        })
    : []
  return (
    <ProductCardSlider
      error={!!error}
      cards={cards}
      isLoading={loading}
      skeltonCard={<ProductCardSkeleton />}
      title="YOU MIGHT ALSO LIKE"
    />
  )
}

export {SimilarProducts}
