import { useLazyQuery, useMutation } from "@apollo/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Check } from "baseui/icon";
import { useSnackbar } from "baseui/snackbar";
import { H4, Paragraph1 } from "baseui/typography";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { LoadingSnipper } from "../../lib/Components";
import { AddressInput, OrderProducts } from "../../lib/graphQl/globaltypes";
import { CREATE_ORDER } from "../../lib/graphQl/mutations/createOrder";
import {
  CreateOrder,
  CreateOrderVariables,
} from "../../lib/graphQl/mutations/createOrder/__generated__/CreateOrder";
import { GET_MEMBER_BY_ID } from "../../lib/graphQl/queries/getMemberById";
import {
  GetMemberById,
  GetMemberByIdVariables,
} from "../../lib/graphQl/queries/getMemberById/__generated__/GetMemberById";
import { GET_MY_CART } from "../../lib/graphQl/queries/getMyCart";
import { GetMyCart } from "../../lib/graphQl/queries/getMyCart/__generated__/GetMyCart";
import { Viewer } from "../../lib/types";
import { displayNotification } from "../../lib/utils/displayNotification";
import { DeliveryOption, StripeForm } from "./components";
import { InYourBag } from "./components/InYourBag";
const stripeSecret = process.env.REACT_APP_STRIPE_KEY;

let stripePromise: Promise<Stripe | null> | undefined;
if (stripeSecret) {
  stripePromise = loadStripe(stripeSecret);
}

const Checkout = ({ viewer: { id, didRequest } }: { viewer: Viewer }) => {
  const histroy = React.useRef(useHistory());
  const [shippingAddress, setShippingAddress] = React.useState<
    AddressInput | undefined
  >(undefined);
  const { enqueue } = useSnackbar();
  const [css, theme] = useStyletron();
  const [disablePayments, setDisablePayments] = React.useState(true);

  const [_getMyCart, { data }] = useLazyQuery<GetMyCart>(GET_MY_CART, {
    fetchPolicy: "no-cache",
  });
  const [_getMemberById] = useLazyQuery<GetMemberById, GetMemberByIdVariables>(
    GET_MEMBER_BY_ID,
    {
      onCompleted: ({ getMemberById: { address } }) => {
        address
          ? setShippingAddress(address)
          : setShippingAddress({
              addressLine1: "",
              city: "",
              country: "",
              postalCode: 0,
            });
      },
    }
  );

  const [createOrder, { data: orderData, loading: orderLoading }] = useMutation<
    CreateOrder,
    CreateOrderVariables
  >(CREATE_ORDER, {
    onCompleted: ({ createOrder }) => {
      enqueue({
        message: "Order Created Successfully",
        startEnhancer: () => <Check color={theme.colors.positive100} />,
      });
      histroy.current.push(`/orders/${createOrder.id}?thankYou=true`);
    },
    onError: ({ message }) => {
      if (message) {
        displayNotification("negative", message);
      }
    },
  });

  const getMyCart = React.useRef(_getMyCart);
  const displayNotificationRef = useRef(displayNotification);
  const getMemberById = React.useRef(_getMemberById);

  React.useEffect(() => {
    if (didRequest && !id) {
      histroy.current.push("/login");
    }
    if (id) {
      getMyCart.current();
      getMemberById.current({ variables: { id } });
    }
  }, [id, didRequest]);

  React.useEffect(() => {
    if (id && data && data.getMyCart.products.length < 1) {
      displayNotificationRef.current(
        "info",
        "Your cart is empty. Add at least one product to cart!"
      );
      histroy.current.push("/shop");
    }
  }, [id, data]);

  if (!id) {
    return <LoadingSnipper />;
  }
  const products = data?.getMyCart.products || [];
  const total = products.reduce((acc, cur) => acc + cur.price * cur.qty, 0);
  const handleOnSubmit = (token?: string) => {
    const orderProduct: OrderProducts[] = products.map(
      ({ description, id, image, name, price, qty, size, slug }) => ({
        description,
        id,
        image,
        name,
        price,
        qty,
        size,
        slug,
      })
    );

    const address: AddressInput | undefined = shippingAddress && {
      addressLine1: shippingAddress?.addressLine1,
      city: shippingAddress?.city,
      country: shippingAddress?.country,
      postalCode: shippingAddress?.postalCode,
    };

    if (!token) {
      displayNotification("negative", "Unable to process payments!");
    } else if (!address) {
      displayNotification("negative", "Check your shipping address!");
    } else {
      createOrder({
        variables: {
          products: orderProduct,
          shippingAddress: address,
          stripeToken: token,
          tax: total * 0.12,
          totalPrice: total,
        },
      });
    }
  };

  return (
    <Block position="relative">
      {orderLoading && (
        <Block
          className={css({
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0%",
            left: "0%",
            backgroundColor: "rgba(255,255,255,0.8)",
            zIndex: 1,
          })}
        >
          <LoadingSnipper />
        </Block>
      )}

      <Block maxWidth="900px" margin="2rem auto">
        <H4
          className={css({ textAlign: "center" })}
          marginTop="4rem"
          marginBottom="2rem"
        >
          CHECKOUT
        </H4>
        <Block margin="1.5rem 0">
          <InYourBag data={products} />
        </Block>
        <Block margin="1.5rem 0">
          {shippingAddress ? (
            <DeliveryOption
              setDisablePayments={(e) => setDisablePayments(e)}
              address={shippingAddress}
              setAddress={(e) => setShippingAddress(e)}
            />
          ) : (
            <LoadingSnipper />
          )}
        </Block>
        <Block margin="1.5rem 0">
          <Elements stripe={stripePromise || null}>
            <StripeForm
              total={total}
              disablePayments={disablePayments}
              onSubmit={(token) => {
                handleOnSubmit(token);
              }}
            />
          </Elements>
        </Block>
      </Block>
    </Block>
  );
};
export { Checkout as default };
