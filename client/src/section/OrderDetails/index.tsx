import {useMutation, useQuery, useReactiveVar} from '@apollo/client'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {Notification} from 'baseui/notification'
import {H4, H5, H6, Label1, Paragraph1, Paragraph2} from 'baseui/typography'
import React from 'react'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import {LoadingSnipper, PrivateRouteComponent} from '../../lib/Components'
import {OrderProducts} from '../../lib/graphQl/globaltypes'
import {GET_ORDER_BY_ID} from '../../lib/graphQl/queries/getOrderById'
import {
  GetOrderById,
  GetOrderByIdVariables,
} from '../../lib/graphQl/queries/getOrderById/__generated__/GetOrderById'
import {Viewer} from '../../lib/types'
import {displayNotification} from '../../lib/utils/displayNotification'
import {Tag} from 'baseui/tag'
import {
  InYourBag,
  OrderProductCard,
  OrderSummary,
} from '../Checkout/components/InYourBag'
import {url} from 'inspector'
import {ScrollToTop} from '../../lib/hooks'
import {UPDATE_ORDER} from '../../lib/graphQl/mutations/updateMutations'
import {
  UpdateOrder,
  UpdateOrderVariables,
} from '../../lib/graphQl/mutations/updateMutations/__generated__/UpdateOrder'
import {useSnackbar} from 'baseui/snackbar'
import {Button} from 'baseui/button'
import {GetOrdersVariables} from '../../lib/graphQl/queries/getOrders/__generated__/GetOrders'

const OrderDetails: PrivateRouteComponent = (props) => {
  const params = useParams<{id: string}>()
  const location = new URLSearchParams(window.location.search)
  const thankYou = location.get('thankYou')
  const [css, theme] = useStyletron()
  const history = useHistory()

  const {enqueue} = useSnackbar()

  const {data, loading, error, refetch} = useQuery<
    GetOrderById,
    GetOrderByIdVariables
  >(GET_ORDER_BY_ID, {
    variables: {
      id: params.id,
    },
    fetchPolicy: 'no-cache',
    onError: ({message}) => {
      displayNotification('negative', message, true, () =>
        history.push('/orders'),
      )
    },
    onCompleted: ({getOrder}) => {
      console.log(getOrder)
    },
  })

  const [updateOrder, {loading: updateLoading}] = useMutation<
    UpdateOrder,
    UpdateOrderVariables
  >(UPDATE_ORDER, {
    variables: {
      orderId: params.id,
    },
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      refetch()
      enqueue({message: 'Order Updated Successfully'})
    },
    onError: () => {
      displayNotification('negative', 'Something Went Wrong')
    },
  })

  if (loading || error) {
    return <LoadingSnipper />
  }
  if (!data) {
    displayNotification('negative', 'Something Went Wrong!')
    return <LoadingSnipper />
  }

  const order = data.getOrder
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDay() + 2)

  return (
    <>
      <ScrollToTop />
      <Block
        className={css({
          maxWidth: '900px',
          margin: '2rem auto',
        })}
      >
        <>
          <H4
            className={css({
              textAlign: 'center',
              margin: '2.5rem 0',
            })}
          >
            {thankYou ? (
              'THANK YOU!'
            ) : (
              <>
                Order
                <br />
                <span
                  className={css({
                    fontSize: 'clamp(20px,5vw,28px)',
                  })}
                >
                  #{order.id}
                </span>
              </>
            )}
          </H4>
          <Block
            className={css({
              margin: '1rem 0',
              display: 'flex',
              flexWrap: 'wrap',
            })}
          >
            <Tag
              closeable={false}
              kind={order.paidAt ? 'green' : 'red'}
              variant={'solid'}
              size={'large'}
            >
              {order.paidAt ? 'Paid' : 'Not Paid'}
            </Tag>

            {order.paidAt && (
              <Tag
                closeable={false}
                kind={order.deliveredAt ? 'green' : 'yellow'}
                variant={'solid'}
                size={'large'}
              >
                {order.deliveredAt ? 'Delivered' : 'Not Delivered'}
              </Tag>
            )}
            {!order.deliveredAt && order.paidAt && props.viewer.isAdmin && (
              <Button
                shape="pill"
                onClick={() => {
                  updateOrder()
                }}
              >
                Mark As Delivered
              </Button>
            )}
          </Block>
          <H6
            className={css({
              backgroundColor: '#111',
              color: '#f7f7f7',
              padding: '1rem 1.5rem',
            })}
          >
            {order.deliveredAt
              ? `Delivered on ${new Date(order.deliveredAt).toDateString()} `
              : 'Your order was placed successfully'}
          </H6>
        </>

        <Block
          className={css({
            border: '1px solid rgb(229,229,229)',
            padding: '2vw',
          })}
        >
          <Block>
            <Paragraph1>
              Your Order :{' '}
              <span className={css({fontWeight: 500})}> {order.id}</span>
            </Paragraph1>
            <Paragraph1>
              Order Date :
              <span className={css({fontWeight: 500})}>
                {' '}
                {new Date(order.createdAt).toUTCString()}
              </span>
            </Paragraph1>
          </Block>
          <Block
            className={css({
              margin: '1rem 0',
              padding: '1rem 0',
            })}
          >
            <H6
              className={css({
                paddingBottom: '1rem',
                borderBottom: '1px solid rgb(229,229,229)',
              })}
            >
              SHIPMENT
            </H6>
            <Paragraph1 className={css({marginTop: '0.5rem'})}>
              Shipping Address
            </Paragraph1>
            <Block
              margin="0.5rem 0"
              className={css({margin: '0.5rem 0', opacity: 0.8})}
            >
              {Object.entries(order.shippingAddress).map(([key, val]) => {
                return (
                  key !== '__typename' && (
                    <Paragraph2 key={key}>{val}</Paragraph2>
                  )
                )
              })}
            </Block>
          </Block>

          <Block
            className={css({
              margin: '1rem 0',
              padding: '1rem 0',
            })}
          >
            <H6
              className={css({
                paddingBottom: '1rem',
                borderBottom: '1px solid rgb(229,229,229)',
              })}
            >
              PAYMENT
            </H6>
            <Paragraph1 className={css({marginTop: '1rem'})}>
              Billing Details
            </Paragraph1>
            <Block className={css({margin: '0.5rem 0', opacity: 0.8})}>
              {order.payment ? (
                <>
                  <Paragraph2>Transaction Id : {order.payment.id}</Paragraph2>
                  <Paragraph2>
                    Member Name : {order.payment.customerName}
                  </Paragraph2>
                  <Paragraph2 className={css({textTransform: 'capitalize'})}>
                    Status :{' '}
                    <Tag
                      closeable={false}
                      variant="solid"
                      kind={
                        order.payment.status.toLowerCase() === 'succeeded'
                          ? 'positive'
                          : undefined
                      }
                    >
                      {order.payment.status}
                    </Tag>
                  </Paragraph2>
                </>
              ) : (
                <Notification kind="negative">Payment Failed!</Notification>
              )}
            </Block>
            <Block
              className={css({
                margin: '1rem 0',
                padding: '1rem 0',
              })}
            >
              <H6
                className={css({
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgb(229,229,229)',
                })}
              >
                {order.deliveredAt
                  ? `DELIVERED ON ${new Date(order.deliveredAt)
                      .toDateString()
                      .toUpperCase()}`
                  : `ARRIVES ON OR BEFORE ${deliveryDate
                      .toDateString()
                      .toUpperCase()}`}
              </H6>
              <Paragraph1 className={css({marginTop: '1rem'})}>
                Products
              </Paragraph1>
              {order.products.map((product) => {
                return (
                  <OrderProductCard
                    key={`${product.id}-${product.size}`}
                    {...product}
                  />
                )
              })}
              <OrderSummary total={order.totalPrice} tax={order.tax} />
            </Block>
          </Block>
        </Block>
      </Block>
    </>
  )
}

export {OrderDetails as default}
