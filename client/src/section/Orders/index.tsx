import {useQuery} from '@apollo/client'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Label1, Paragraph1} from 'baseui/typography'
import React from 'react'
import {LoadingSnipper} from '../../lib/Components'
import {SortOrderBy} from '../../lib/graphQl/globaltypes'
import {GET_MY_ORDER} from '../../lib/graphQl/queries/getMyOrder'
import {
  GetMyOrders,
  GetMyOrdersVariables,
} from '../../lib/graphQl/queries/getMyOrder/__generated__/GetMyOrders'
import {ScrollToTop} from '../../lib/hooks'
import {displayNotification} from '../../lib/utils/displayNotification'
import {OrderCard} from './components'

const Orders = () => {
  const {data, loading, error} = useQuery<GetMyOrders, GetMyOrdersVariables>(
    GET_MY_ORDER,
    {
      variables: {
        sortBy: SortOrderBy.NEWEST_FIRST,
      },
      onError: ({message}) => {
        displayNotification('negative', message)
      },
    },
  )

  if (loading || error) {
    return <LoadingSnipper />
  }

  if (!data) {
    displayNotification('negative', 'Something Went Wrong!')
    return <LoadingSnipper />
  }

  const orders = data.getMyOrders

  return (
    <>
      <ScrollToTop />
      <Block
        minHeight="60vh"
        display="flex"
        justifyContent="center"
        maxWidth="900px"
        margin="4rem auto"
      >
        {orders.length ? (
          <>
            <Block width="100%">
              {orders.map((order) => {
                return <OrderCard data={order} key={order.id} />
              })}
              {/* <Block $style={{ textAlign: "center" }} margin="1rem">
              <Button>Load More</Button>
            </Block> */}
            </Block>
          </>
        ) : (
          <Label1>You don't have any orders yet</Label1>
        )}
      </Block>
    </>
  )
}

export {Orders as default}
