import React from 'react'
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box'
import {useStyletron} from 'baseui'
import {StyledLink} from 'baseui/link'
import {Link} from 'react-router-dom'
import {useMutation} from '@apollo/client'
import {Label1, Paragraph1} from 'baseui/typography'
import {Block} from 'baseui/block'
import {Select, SelectOverrides} from 'baseui/select'

import {GetMyCart_getMyCart_products} from '../../../../lib/graphQl/queries/getMyCart/__generated__/GetMyCart'
import {formatPrice} from '../../../../lib/utils/formatPrice'
import {REMOVE_FROM_CART} from '../../../../lib/graphQl/mutations/removeFromCart'
import {
  RemoveFromCart,
  RemoveFromCartVariables,
} from '../../../../lib/graphQl/mutations/removeFromCart/__generated__/RemoveFromCart'
import {UpdateCartProductQty} from '../../../../lib/graphQl/mutations/updateCartProductQtyInput/__generated__'
import {UpdateCartProductQtyVariables} from '../../../../lib/graphQl/mutations/updateCartProductQtyInput/__generated__/UpdateCartProductQty'
import {UPDATE_CART_PRODUCT_QTY} from '../../../../lib/graphQl/mutations/updateCartProductQtyInput'
import {displayNotification} from '../../../../lib/utils/displayNotification'

interface ICartProductCardProps extends GetMyCart_getMyCart_products {
  refetch?: Function
}

const CartProductCard = ({
  description,
  image,
  name,
  price,
  qty,
  size,
  slug,
  id,
  refetch,
}: ICartProductCardProps) => {
  const [css, theme] = useStyletron()

  const [removeFromCart, {}] = useMutation<
    RemoveFromCart,
    RemoveFromCartVariables
  >(REMOVE_FROM_CART, {
    onCompleted: () => {
      refetch && refetch()
    },
  })

  const [updateCartProduct, {}] = useMutation<
    UpdateCartProductQty,
    UpdateCartProductQtyVariables
  >(UPDATE_CART_PRODUCT_QTY, {
    onCompleted: () => {
      refetch && refetch()
    },
    onError: () => {
      displayNotification('negative', 'Something Went Wrong!')
    },
  })

  const overRides: SelectOverrides = {
    Root: {
      style: ({$theme}) => ({outline: `none`, borderRadius: '16px'}),
    },

    ControlContainer: {
      style: ({$theme}) => ({
        outline: `none`,
        border: 'none !important',
        backgroundColor: 'transperant',
      }),
    },
    Placeholder: {style: {color: '#000'}},
    Dropdown: {
      style: ({$theme}) => ({
        outline: `none`,
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: 'none',
      }),
    },
  }

  const Quntity = () => {
    return (
      <Select
        size="mini"
        clearable={false}
        searchable={false}
        options={[
          {label: '1', id: 1},
          {label: '2', id: 2},
          {label: '3', id: 3},
        ]}
        value={[{label: qty.toString(), id: qty}]}
        placeholder="Qty"
        onChange={(e) => {
          const qty = Number(e.option?.id)
          // console.log(name + qty)
          if (qty) {
            updateCartProduct({variables: {productId: id, size, qty}})
          }
        }}
        overrides={overRides}
      />
    )
  }

  return (
    <Block
      display="flex"
      padding="2rem 1rem"
      width="100%"
      $style={{borderBottom: '1px solid rgb(229,229,229)'}}
    >
      <Block minWidth="96px" maxWidth="300px" width="16%">
        <AspectRatioBox width="100%">
          <AspectRatioBoxBody>
            <Link to={`/shop/${slug}`}>
              <img
                src={image}
                alt={name}
                className={css({
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                })}
              />
            </Link>
          </AspectRatioBoxBody>
        </AspectRatioBox>
      </Block>

      <Block
        display="flex"
        justifyContent="space-between"
        marginLeft="1rem"
        $style={{flexGrow: 2}}
      >
        <Block>
          <Link to={`/shop/${slug}`} className={css({textDecoration: 'none'})}>
            <Label1>{name}</Label1>
          </Link>
          <Paragraph1>{description}</Paragraph1>
          <Block
            display="flex"
            $style={{opacity: 0.8}}
            flexDirection={['column', 'row', 'row', 'row']}
            flexWrap={[true, false, false, false]}
          >
            <Paragraph1 marginRight="1rem">Size {size}</Paragraph1>

            <Block display="flex">
              <Paragraph1>Quantity </Paragraph1>
              <Quntity />
            </Block>
          </Block>

          <StyledLink
            $style={{opacity: 0.6, cursor: 'pointer'}}
            onClick={() =>
              removeFromCart({variables: {productId: id, size: size}})
            }
          >
            Remove
          </StyledLink>
        </Block>

        <Block>
          <Paragraph1 marginLeft="auto">{formatPrice(price)}</Paragraph1>
        </Block>
      </Block>
    </Block>
  )
}

export {CartProductCard}
