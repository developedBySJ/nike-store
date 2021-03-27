import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../../lib/graphQl/queries/getProducts";
import {
  GetProducts,
  GetProductsVariables,
} from "../../../../lib/graphQl/queries/__generated__/GetProducts";
import { SortProductBy } from "../../../../lib/graphQl/globaltypes";
import {
  ProductCard,
  ProductCardSkeleton,
  ProductCardSlider,
} from "../../../../lib/Components";
import { sortImgArr } from "../../../../lib/utils/sortImgArr";

const HomeLatest = () => {
  const { data, loading, error } = useQuery<GetProducts, GetProductsVariables>(
    GET_PRODUCTS,
    {
      variables: {
        sortBy: SortProductBy.NEWEST,
      },
    }
  );

  const cards = data?.getProducts
    ? data?.getProducts.map(({ description, images, name, price, slug }) => {
        const img = sortImgArr(images);
        return (
          <ProductCard
            description={description}
            name={name}
            image={img[0]}
            price={price}
            url={`/shop/${slug}`}
            key={slug}
          />
        );
      })
    : [];

  const slider = (
    <ProductCardSlider
      key={loading ? "loading" : "render"}
      title="The Latest And Greatest"
      skeltonCard={<ProductCardSkeleton />}
      isLoading={loading}
      cards={cards}
      error={!!error}
    />
  );
  return slider;
};

export { HomeLatest };
