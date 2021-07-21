import {useQuery} from '@apollo/client'
import {useStyletron} from 'baseui'
import {Accordion, Panel} from 'baseui/accordion'
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box'
import {Block} from 'baseui/block'
import {StatefulTooltip} from 'baseui/tooltip'
import {
  H6,
  Label1,
  Paragraph1,
  Paragraph2,
  Paragraph3,
  Paragraph4,
} from 'baseui/typography'
import React from 'react'
import {Link} from 'react-router-dom'
import {GET_MY_CART} from '../../../../lib/graphQl/queries/getMyCart'
import {
  GetMyCart,
  GetMyCart_getMyCart,
  GetMyCart_getMyCart_products,
} from '../../../../lib/graphQl/queries/getMyCart/__generated__/GetMyCart'
import {formatPrice} from '../../../../lib/utils/formatPrice'
import {PanelOverrides} from '../../../Product/lib'

const OrderProductCard = ({
  description,
  id,
  image,
  qty,
  name,
  price,
  size,
  slug,
}: GetMyCart_getMyCart_products) => {
  const [css, theme] = useStyletron()
  return (
    <Block
      display="flex"
      padding="2rem 0"
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
            <Paragraph1>{name}</Paragraph1>
          </Link>
          <Paragraph2>{description}</Paragraph2>
          <Block
            display="flex"
            $style={{opacity: 0.8}}
            flexDirection={['column', 'row', 'row', 'row']}
            flexWrap={[true, false, false, false]}
          >
            <Paragraph2 marginRight="1rem">Size {size}</Paragraph2>
            <Block display="flex" alignItems="center">
              <Paragraph2>Qty {qty}</Paragraph2>
              <Paragraph2>@ {formatPrice(price)} </Paragraph2>
            </Block>
          </Block>
        </Block>
        <Block>
          <Paragraph1 marginLeft="1rem">{formatPrice(price * qty)}</Paragraph1>
        </Block>
      </Block>
    </Block>
  )
}

const OrderSummary = ({tax, total}: {total: number; tax: number}) => {
  return (
    <>
      {' '}
      <Block display="flex" justifyContent="space-between" marginTop="1.5rem">
        <Paragraph1>
          SubTotal&nbsp;&nbsp;
          <StatefulTooltip
            content={() => (
              <Paragraph4 padding={'4px'} color="#f7f7f7" maxWidth="15rem">
                The subtotal reflects the total price of your order before any
                applicable discounts.
              </Paragraph4>
            )}
            showArrow
          >
            <Paragraph4
              color="#fff"
              backgroundColor="#333"
              as="span"
              padding="0 5px"
              height="100%"
              $style={{borderRadius: '100px'}}
            >
              ?
            </Paragraph4>
          </StatefulTooltip>
        </Paragraph1>
        <Paragraph1>{formatPrice(total)}</Paragraph1>
      </Block>
      <Block display="flex" justifyContent="space-between" margin="0.5rem 0">
        <Paragraph1>Estimated Shipping & Handling&nbsp;&nbsp;</Paragraph1>
        <Paragraph1>{formatPrice(0)}</Paragraph1>
      </Block>
      <Block display="flex" justifyContent="space-between">
        <Paragraph1>Estimated Tax (incl.)&nbsp;&nbsp;</Paragraph1>
        <Paragraph1>{formatPrice(tax)}</Paragraph1>
      </Block>
      <Block
        display="flex"
        justifyContent="space-between"
        margin="1rem 0"
        padding="1rem 0"
        $style={{
          borderBottom: '1px solid rgb(229,229,229)',
          borderTop: '1px solid rgb(229,229,229)',
        }}
      >
        <Paragraph1>Total</Paragraph1>
        <H6>{formatPrice(total, 2)}</H6>
      </Block>
    </>
  )
}

const InYourBag = ({data}: {data: GetMyCart_getMyCart_products[]}) => {
  const [css, theme] = useStyletron()

  const products = data
  const total = products.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
  const totalQty = products.reduce((acc, cur) => acc + cur.qty, 0)
  const tax = total * 0.12
  return (
    <Accordion
      overrides={{
        ...PanelOverrides,
        Root: {style: {transition: '0.3s all ease-in-out'}},
        Content: {
          style: {
            padding: '1rem 0px',
            backgroundColor: '#fff',
            transition: '0.3s all',
          },
        },
      }}
    >
      <Panel title={`IN YOUR BAG (${totalQty}) @ ${formatPrice(total)}`}>
        <Block maxWidth="500px" margin="0 auto">
          {products.map((product) => {
            return (
              <OrderProductCard
                {...product}
                key={`${product.id}-${product.size}`}
              />
            )
          })}
        </Block>
        <OrderSummary total={total} tax={tax} />
      </Panel>
    </Accordion>
  )
}

export {InYourBag, OrderProductCard, OrderSummary}
