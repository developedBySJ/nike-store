import { Button } from "baseui/button";
import Heart from "../../../../lib/assets/icons/Heart.svg";
import { Drawer } from "baseui/drawer";
import React from "react";
import { useMutation } from "@apollo/client";
import {
  AddToCart,
  AddToCartVariables,
} from "../../../../lib/graphQl/mutations/addToCart/__generated__/AddToCart";
import { ADD_TO_CART } from "../../../../lib/graphQl/mutations/addToCart";
import {
  AddToFavourite,
  AddToFavouriteVariables,
} from "../../../../lib/graphQl/mutations/addToFavourite/__generated__/AddToFavourite";
import { ADD_TO_FAVOURITE } from "../../../../lib/graphQl/mutations/addToFavourite";
import { GetProductBySlug_getProductBySlug } from "../../../../lib/graphQl/queries/__generated__/GetProductBySlug";
import { Viewer } from "../../../../lib/types";
import {
  Label1,
  Paragraph1,
  Paragraph2,
  Paragraph3,
  Paragraph4,
} from "baseui/typography";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "baseui/snackbar";
import { displayNotification } from "../../../../lib/utils/displayNotification";
import { toaster } from "baseui/toast";
import { Block } from "baseui/block";
import { formatPrice } from "../../../../lib/utils/formatPrice";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "baseui/modal";
import { Check } from "baseui/icon";

interface IProductCtaProps {
  product: GetProductBySlug_getProductBySlug;
  size: string | null;
  viewer: Viewer;
}

interface initialModal {
  header: string;
  image: string;
  description: string;
  price: number;
  name: string;
  size?: string;
  cta: string;
  ctaLink: string;
}

const ProductCta = ({ product, size, viewer }: IProductCtaProps) => {
  const [error, setError] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState<initialModal | null>(null);
  const abort = new AbortController();
  const histroy = useHistory();
  React.useEffect(() => {
    setError(false);
  }, [size]);
  let timeoutId: NodeJS.Timeout | undefined;
  const [addToCart, addToCartRes] = useMutation<AddToCart, AddToCartVariables>(
    ADD_TO_CART,
    {
      onCompleted: ({ addToCart }) => {
        const reqProduct = addToCart.products.filter(
          ({ id }) => id === product.id
        );
        if (reqProduct.length) {
          const prod = reqProduct[0];
          setModalInfo({
            cta: `View Cart (${addToCart.products.length})`,
            header: `Added To Bag`,
            image: prod.image,
            name: prod.name,
            price: prod.price,
            size: prod.size,
            ctaLink: "/cart",
            description: prod.description,
          });
          setIsOpen(true);
          timeoutId = setTimeout(() => {
            setIsOpen(false);
            setModalInfo(null);
          }, 3000);
        } else {
          displayNotification("negative", "Something Went Wrong!");
        }
      },
      onError: (err) => {
        displayNotification("negative", err.message);
      },
    }
  );

  React.useEffect(() => {
    return () => {
      setModalInfo(null);
      timeoutId && clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const [addToFavourite, addToFavouriteRes] = useMutation<
    AddToFavourite,
    AddToFavouriteVariables
  >(ADD_TO_FAVOURITE, {
    onCompleted: ({ addToFavourites: res }) => {
      const reqProduct = res.products.filter(({ id }) => id === product.id);
      if (reqProduct.length) {
        const prod = reqProduct[0];
        setModalInfo({
          cta: `View Favorite (${res.products.length})`,
          header: `Added To Favorite`,
          image: prod.image,
          name: prod.name,
          price: prod.price,
          ctaLink: "/favourites",
          description: prod.description,
        });
        setIsOpen(true);
        setTimeout(() => {
          setIsOpen(false);
          setModalInfo(null);
        }, 3000);
      } else {
        displayNotification("negative", "Something Went Wrong!");
      }
    },
    onError: () => {
      displayNotification("negative", "Something Went Wrong!");
    },
  });

  return (
    <>
      {modalInfo && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setModalInfo(null);
          }}
          overrides={{
            Dialog: { style: { borderRadius: "1rem" } },
            Root: { style: { zIndex: 2 } },
          }}
        >
          <ModalHeader>
            <Block display="flex" alignItems="center">
              <Check size="32px" />
              {modalInfo.header}
            </Block>
          </ModalHeader>
          <ModalBody>
            <Block display="flex">
              <Block>
                <img src={modalInfo.image} alt="" height="96px" />
              </Block>
              <Block marginLeft="1rem">
                <Label1>{modalInfo.name}</Label1>
                <Paragraph1> {modalInfo.description}</Paragraph1>
                {modalInfo.size && (
                  <Paragraph2>Size {modalInfo.size}</Paragraph2>
                )}
                <Paragraph2> {formatPrice(modalInfo.price)}</Paragraph2>
              </Block>
            </Block>
          </ModalBody>
          <ModalFooter>
            <Block display="flex" alignItems="center" marginBottom="1.5rem">
              <Button
                kind="minimal"
                shape="pill"
                onClick={() => setIsOpen(false)}
                overrides={{
                  Root: {
                    style: {
                      width: "100%",
                      padding: "1.2rem",
                      boxShadow: "rgb(210 210 210) 0 0 0 1px inset",
                      marginRight: "1rem",
                    },
                  },
                }}
              >
                Close
              </Button>
              <Button
                shape="pill"
                onClick={() => histroy.push(modalInfo.ctaLink)}
                overrides={{
                  Root: {
                    style: {
                      width: "100%",
                      padding: "1.2rem",
                    },
                  },
                }}
              >
                {modalInfo.cta}
              </Button>
            </Block>
          </ModalFooter>
        </Modal>
      )}

      {error && (
        <Paragraph3 marginBottom="1rem" color="red">
          Please Select Size
        </Paragraph3>
      )}

      <Button
        isLoading={addToCartRes.loading}
        onClick={() => {
          if (!viewer.id) {
            return histroy.push("/login");
          }
          if (!size) {
            return setError(true);
          }
          addToCart({ variables: { qty: 1, productId: product.id, size } });
        }}
        kind="primary"
        shape="pill"
        size="large"
        overrides={{
          Root: {
            style: {
              width: "100%",
              padding: "1.2rem",
              marginBottom: "1rem",
            },
          },
        }}
      >
        Add To Bag
      </Button>
      <Button
        kind="tertiary"
        shape="pill"
        size="large"
        isLoading={addToFavouriteRes.loading}
        onClick={() => {
          if (!viewer.id) {
            return histroy.push("/login");
          }
          addToFavourite({ variables: { productId: product.id } });
        }}
        overrides={{
          Root: {
            style: {
              width: "100%",
              padding: "1.2rem",
              boxShadow: "rgb(210 210 210) 0 0 0 1px inset",
            },
          },
        }}
        endEnhancer={() => <img src={Heart} alt="favorite" width="16px" />}
      >
        Favorite
      </Button>
    </>
  );
};

export default ProductCta;
