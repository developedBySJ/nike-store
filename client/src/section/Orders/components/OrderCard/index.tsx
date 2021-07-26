import {useStyletron} from 'baseui'
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box'
import {Block} from 'baseui/block'
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid'
import {StyledLink} from 'baseui/link'
import {Tag} from 'baseui/tag'
import {Paragraph1, Paragraph2, Paragraph3} from 'baseui/typography'
import React from 'react'
import {Link} from 'react-router-dom'
import {GetMyCart_getMyCart_products} from '../../../../lib/graphQl/queries/getMyCart/__generated__/GetMyCart'
import {GetMyOrders_getMyOrders} from '../../../../lib/graphQl/queries/getMyOrder/__generated__/GetMyOrders'
import {formatPrice} from '../../../../lib/utils/formatPrice'
import {OrderProductCard} from '../../../Checkout/components/InYourBag'

interface IOrderCard {
  data: GetMyOrders_getMyOrders
}

const OrderCard: React.FC<IOrderCard> = ({data}) => {
  const [css, theme] = useStyletron()
  const {createdAt, deliveredAt, id, paidAt, products, totalPrice} = data
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 2)
  return (
    <Block width="100%" padding="0.5rem" margin="0.5 0">
      <Block
        display="flex"
        justifyContent="space-between"
        flexWrap={true}
        alignItems="center"
        padding="0.5rem 1rem"
        backgroundColor="#111"
        className={css({borderRadius: '8px 8px 0  0', overflow: 'hidden'})}
      >
        <Block
          display="flex"
          justifyContent="space-between"
          width="100%"
          maxWidth="225px"
          alignItems="center"
        >
          <Block margin="0.5rem">
            <Paragraph3 color="#f7f7f7"> Order Placed</Paragraph3>
            <Paragraph3 color="#d0d0d0">
              {new Date(createdAt).toDateString()}
            </Paragraph3>
          </Block>
          <Block margin="0.5rem">
            <Paragraph3 color="#f7f7f7"> Total</Paragraph3>
            <Paragraph3 color="#d0d0d0"> {formatPrice(totalPrice)}</Paragraph3>
          </Block>
        </Block>
        <Block margin="0.5rem">
          <Paragraph3 color="#f7f7f7">Order Id </Paragraph3>
          <Link to={`/orders/${id}`}>
            <StyledLink $as="span" className={css({color: '#989898'})}>
              #{id}{' '}
            </StyledLink>
          </Link>
        </Block>
      </Block>
      <Block>
        <Block
          className={css({
            boxShadow: '0px 0px 0 1px rgb(229,229,229) inset',
            padding: '1rem',
            borderRadius: '0 0 8px 8px',
          })}
        >
          <Block margin="0.5rem">
            <Paragraph2>
              Payment Status : {paidAt ? 'Paid' : 'Failed'}
            </Paragraph2>
            <Paragraph2>{products.length} Products</Paragraph2>
            {paidAt && (
              <Paragraph1>
                {deliveredAt
                  ? `DELIVERED ON ${new Date(deliveredAt)
                      .toDateString()
                      .toUpperCase()}`
                  : `ARRIVES ON OR BEFORE ${deliveryDate
                      .toDateString()
                      .toUpperCase()}`}
              </Paragraph1>
            )}
          </Block>
          <Block display="flex">
            {products.map((product, i) => {
              return (
                <AspectRatioBox
                  key={`${id}-${product.id}-${i}`}
                  width="128px"
                  height="128px"
                  margin="0.5rem"
                >
                  <AspectRatioBoxBody>
                    <img
                      src={product.image}
                      alt="order product"
                      className={css({
                        width: '128px',
                        height: '128px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      })}
                    />
                  </AspectRatioBoxBody>
                </AspectRatioBox>
              )
            })}
          </Block>
        </Block>
      </Block>
    </Block>
  )
}

export {OrderCard}
