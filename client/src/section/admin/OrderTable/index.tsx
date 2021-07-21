import React from 'react'
import {useStyletron} from 'baseui'
import {
  StatefulDataTable,
  DatetimeColumn,
  NumericalColumn,
  StringColumn,
  CustomColumn,
} from 'baseui/data-table'
import {useQuery} from '@apollo/client'
import {Block} from 'baseui/block'
import {Paragraph4} from 'baseui/typography'
import {Link} from 'react-router-dom'
import {StyledLink} from 'baseui/link'

import {LoadingSnipper} from '../../../lib/Components'
import {displayNotification} from '../../../lib/utils/displayNotification'
import {
  GetOrders,
  GetOrdersVariables,
} from '../../../lib/graphQl/queries/getOrders/__generated__/GetOrders'
import {GET_ORDERS} from '../../../lib/graphQl/queries/getOrders'

type RowDataT = [
  string,
  string,
  Date,
  Date,
  Date,
  {
    id: string
  },
  number,
  number,
  {
    id: string
    name: string
    slug: string
    size: string
    qty: number
  }[],
  {
    addressLine1: string
    city: string
    country: string
    postalCode: number
  },
]

const columns = [
  CustomColumn({
    title: 'ID',
    mapDataToValue: (data: RowDataT) => data[0],
    renderCell: function (props: any) {
      return (
        <Link to={`/orders/${props.value}`}>
          <StyledLink $as="span">{props.value}</StyledLink>
        </Link>
      )
    },
  }),
  StringColumn({
    title: 'Member Id',
    mapDataToValue: (data: RowDataT) => data[1],
  }),
  DatetimeColumn({
    title: 'Payment Date',
    mapDataToValue: (data: RowDataT) => data[2] && new Date(data[2]),
  }),
  DatetimeColumn({
    title: 'Created At',
    mapDataToValue: (data: RowDataT) => new Date(data[3]),
  }),
  StringColumn({
    title: 'Delivery Status',
    mapDataToValue: (data: RowDataT) =>
      data[4] ? new Date(data[4]).toDateString() : 'Not Delivered',
  }),
  StringColumn({
    title: 'Payment Id',
    mapDataToValue: (data: RowDataT) => data[5] && data[5].id,
  }),
  NumericalColumn({
    title: 'Total',

    mapDataToValue: (data: RowDataT) => data[6],
  }),
  NumericalColumn({
    title: 'Tax',
    mapDataToValue: (data: RowDataT) => data[7],
  }),
  CustomColumn({
    title: 'Product',
    mapDataToValue: (data: RowDataT) => data[8],
    renderCell: function (props: any) {
      const products: {
        name: string
        slug: string
        size: string
        qty: number
        id: string
      }[] = props.value

      const Product = ({
        name,
        slug,
        qty,
        size,
      }: {
        name: string
        slug: string
        size: string
        qty: number
      }) => {
        return (
          <li>
            <Link to={`/shop/${slug}`}>
              <StyledLink $as="span">{name}</StyledLink>
              <br />
              <StyledLink $as="span">
                &nbsp;| Size @{size} | qty @{qty}
              </StyledLink>
            </Link>
          </li>
        )
      }

      return (
        <Block marginLeft="1rem">
          <ol>
            {products.map((product) => (
              <Product
                key={`table-${product.id}-${product.size}`}
                name={product.name}
                slug={product.slug}
                qty={product.qty}
                size={product.size}
              />
            ))}
          </ol>
        </Block>
      )
    },
  }),
  CustomColumn({
    title: 'Address',
    mapDataToValue: (data: RowDataT) => data[9],
    renderCell: (props: any) => {
      return (
        <Block>
          <Paragraph4>{props.value.addressLine1}</Paragraph4>
          <Paragraph4>{props.value.city}</Paragraph4>
          <Paragraph4>{props.value.country}</Paragraph4>
          <Paragraph4>{props.value.postalCode}</Paragraph4>
        </Block>
      )
    },
  }),
]

const OrderTable = () => {
  const [css] = useStyletron()

  const {data, loading, error} = useQuery<GetOrders, GetOrdersVariables>(
    GET_ORDERS,
    {
      variables: {
        limit: 24,
      },
      fetchPolicy: 'no-cache',
    },
  )

  if (loading || error || !data) {
    if (error || (!loading && !data)) {
      displayNotification('negative', 'Something went wrong!')
    }
    return <LoadingSnipper />
  }
  console.log(data.getOrders[0])
  const rows = data.getOrders.map((order) => ({
    id: order.id,
    data: [
      order.id,
      order.memberId,
      order.paidAt,
      order.createdAt,
      order.deliveredAt,
      order.payment,
      order.totalPrice,
      order.tax,
      order.products,
      order.shippingAddress,
    ],
  }))
  return (
    <Block className={css({height: '100vh', width: '100%'})}>
      {data && (
        <StatefulDataTable
          columns={columns}
          rows={rows}
          rowHeight={128}
          resizableColumnWidths
        />
      )}
    </Block>
  )
}

export {OrderTable}
