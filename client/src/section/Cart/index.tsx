import {useLazyQuery} from '@apollo/client'
import {Block} from 'baseui/block'
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid'
import {Spinner} from 'baseui/spinner'
import {H5, H6, Paragraph1} from 'baseui/typography'
import React from 'react'
import {useHistory} from 'react-router-dom'

import {GET_MY_CART} from '../../lib/graphQl/queries/getMyCart'
import {GetMyCart} from '../../lib/graphQl/queries/getMyCart/__generated__/GetMyCart'
import {Viewer} from '../../lib/types'
import {CartProductCard, Summary} from './components'

interface ICartProps {
  viewer: Viewer
  loading: boolean
}

const Cart = ({viewer, loading}: ICartProps) => {
  const {id, didRequest} = viewer

  const histroy = React.useRef(useHistory())

  const [
    _fetchMyCart,
    {data, loading: dataLoading, refetch},
  ] = useLazyQuery<GetMyCart>(GET_MY_CART, {fetchPolicy: 'no-cache'})

  const fetchMyCart = React.useRef(_fetchMyCart)

  React.useEffect(() => {
    if (didRequest && !id) {
      histroy.current.push('/login')
    }

    if (id) {
      fetchMyCart.current()
    }
  }, [id, didRequest])

  if (loading || dataLoading) {
    return (
      <Block
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="60vh"
      >
        <Block overrides={{Block: {style: {textAlign: 'center'}}}}>
          <Spinner size="48px" color="#111" />
          <H6 marginTop="1rem">Fetching Your Cart</H6>
        </Block>
      </Block>
    )
  }

  const products = data?.getMyCart.products

  return products ? (
    <>
      <FlexGrid
        margin="2rem auto"
        minHeight="75vh"
        maxWidth={['100%', '100%', '100%', '1200px']}
        flexGridColumnCount={[1, 1, 3, 3]}
        flexGridColumnGap={['0px', '0px', '1rem', '2rem']}
      >
        <FlexGridItem
          overrides={{
            Block: {
              style: ({$theme}) => ({
                width: `calc((200% - ${$theme.sizing.scale800}) / 3)`,
              }),
            },
          }}
        >
          <H5 marginLeft="0.75rem">Bag</H5>
          {!products.length && (
            <Paragraph1 margin="1rem 0.75rem">
              There are no items in your bag.
            </Paragraph1>
          )}
          {products.map((product, i) => {
            return (
              <CartProductCard
                {...product}
                key={`${product.id}-${i}`}
                refetch={refetch}
              />
            )
          })}
        </FlexGridItem>
        <FlexGridItem display="none">
          {/** This invisible one is needed so the margins line up */}
        </FlexGridItem>
        <FlexGridItem
          overrides={{
            Block: {
              style: ({$theme}) => ({
                flexGrow: 0,
              }),
            },
          }}
        >
          <H5>Summary</H5>

          <Summary products={products} />
        </FlexGridItem>
      </FlexGrid>
    </>
  ) : null
}

export {Cart as default}
