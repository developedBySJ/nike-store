import { Drawer, ANCHOR } from "baseui/drawer";
import React, { useRef } from "react";
import { Input } from "baseui/input";
import Search from "../../../../lib/assets/icons/Search.svg";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { Delete } from "baseui/icon";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../../lib/graphQl/queries/getProducts";
import {
  GetProducts,
  GetProductsVariables,
} from "../../../../lib/graphQl/queries/__generated__/GetProducts";
import {
  ProductCard,
  ProductCardSkeleton,
  ProductCardSlider,
} from "../../../../lib/Components";
import { sortImgArr } from "../../../../lib/utils/sortImgArr";
import { H5, H6, Label1, Paragraph1, Paragraph2 } from "baseui/typography";
import { useHistory, useLocation } from "react-router-dom";
interface IProductSearchProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ProductSearch = ({ isOpen, setIsOpen }: IProductSearchProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const [_searchProduct, { data, loading, error }] = useLazyQuery<
    GetProducts,
    GetProductsVariables
  >(GET_PRODUCTS);
  const location = useLocation();
  const histroy = useHistory();
  const setIsOpenRef = useRef(setIsOpen);

  const searchProduct = React.useRef(_searchProduct);
  React.useEffect(() => {
    setIsOpenRef.current(false);
  }, [location]);

  React.useEffect(() => {
    if (searchQuery.length > 1) {
      searchProduct.current({ variables: { searchQuery, limit: 5 } });
    }
  }, [searchQuery]);

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

  const popularSearchClickOverride = (query: string) => {
    return {
      Block: {
        props: { onClick: () => setSearchQuery(query) },
        style: { cursor: "pointer" },
      },
    };
  };

  const PopularSearch = (
    <Block maxWidth="600px" margin="0 auto">
      <Paragraph1 marginTop="1rem" $style={{ opacity: 0.5 }}>
        Popular Search Terms
      </Paragraph1>
      <H5 margin="1rem 0" overrides={popularSearchClickOverride("Shoes")}>
        Shoes
      </H5>
      <H5 margin="1rem 0" overrides={popularSearchClickOverride("Jordan")}>
        Jordan
      </H5>
      <H5 margin="1rem 0" overrides={popularSearchClickOverride("Jersy")}>
        Jersy
      </H5>
    </Block>
  );

  return (
    <Drawer
      anchor={ANCHOR.top}
      isOpen={isOpen}
      size="auto"
      onClose={() => setIsOpen(false)}
      overrides={{
        Root: {
          style: { zIndex: 2, transition: "0.5s all ease-in-out" },
        },
        Backdrop: {
          style: { backdropFilter: "blur(16px)" },
        },
        Close: {
          style: { display: "none" },
        },
      }}
    >
      <Block display="flex" maxWidth="600px" margin="0 auto">
        <Input
          type="text"
          clearable
          value={searchQuery}
          onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          startEnhancer={() => <img src={Search} alt="Search" />}
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              histroy.push(`/shop?search=${searchQuery}`);
            }
          }}
          overrides={{
            Root: {
              style: {
                borderRadius: "1000px !important",
                padding: "0 4px",
              },
            },
          }}
        />
        <Button
          shape="circle"
          kind="secondary"
          $style={{ marginLeft: "1rem", padding: "1px 12px" }}
          onClick={() => setIsOpen(false)}
        >
          <Delete size="24px" />
        </Button>
      </Block>
      <Block paddingTop="2rem" maxWidth="1000px" margin="0 auto">
        {searchQuery.length > 1 ? (
          !loading && cards.length === 0 ? (
            PopularSearch
          ) : (
            <ProductCardSlider
              cards={cards}
              error={!!error}
              isLoading={loading}
              skeltonCard={<ProductCardSkeleton />}
              title={`Search result for "${searchQuery}"`}
            />
          )
        ) : (
          PopularSearch
        )}
      </Block>
    </Drawer>
  );
};

export { ProductSearch };
