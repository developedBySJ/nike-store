import {useLazyQuery, useQuery} from '@apollo/client'
import {useStyletron} from 'baseui'
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid'
import React, {useState} from 'react'
import {ProductCard, ProductCardSkeleton} from '../../lib/Components'
import {GET_PRODUCTS} from '../../lib/graphQl/queries/getProducts'
import {
  GetProducts,
  GetProductsVariables,
} from '../../lib/graphQl/queries/__generated__/GetProducts'
import {Waypoint} from 'react-waypoint'
import {displayNotification} from '../../lib/utils/displayNotification'
import {Notification} from 'baseui/notification'
import {Spinner} from 'baseui/spinner'
import {Block} from 'baseui/block'
import {Link, useLocation} from 'react-router-dom'
import {SortProductBy} from '../../lib/graphQl/globaltypes'
import {H3, H4, H5, H6} from 'baseui/typography'
import {StyledLink} from 'baseui/link'

const BASE_URL = '/shop'

const ProductLists = () => {
  const [css, theme] = useStyletron()
  const location = useLocation()
  const [page, setPage] = React.useState(2)

  const [variables, setVariables] = React.useState<
    GetProductsVariables | undefined
  >(undefined)
  const [
    _fetchProducts,
    {data, loading, error, fetchMore, networkStatus},
  ] = useLazyQuery<GetProducts, GetProductsVariables>(GET_PRODUCTS, {
    variables,
    onError: () => {
      displayNotification(
        'negative',
        'Something Went Wrong While Fetching Products ! ',
      )
    },
  })

  const fetchProducts = React.useRef(_fetchProducts)
  React.useEffect(() => {
    const url = new URLSearchParams(location.search)
    const sortBy = (Object.keys(SortProductBy).includes(
      String(url.get('sortBy')),
    )
      ? url.get('sortBy')
      : null) as SortProductBy | null

    const price = url.get('price')
    const category = url.get('category') || undefined
    const ratings = !isNaN(Number(url.get('ratings')))
      ? Number(url.get('ratings'))
      : undefined

    const size = url.get('size') || undefined

    const search = url.get('search')
    const searchQuery = search && search.length > 1 ? search : undefined

    let priceRange: number[] | undefined
    try {
      let temp = price && JSON.parse(price)
      if (
        temp?.length === 2 &&
        !isNaN(Number(temp[0])) &&
        !isNaN(Number(temp[1]))
      ) {
        priceRange = temp
      }
    } catch (error) {}

    setPage(2)
    setVariables({
      sortBy,
      category,
      priceRange,
      ratings,
      size,
      searchQuery,
    })
  }, [location.search])
  React.useEffect(() => {
    fetchProducts.current({variables})
  }, [variables])

  const GRID_GAP = [
    theme.sizing.scale400,
    theme.sizing.scale500,
    theme.sizing.scale550,
    theme.sizing.scale600,
  ]

  const ProductListSkeleton = Array.from({length: 8}).map((_, i) => {
    return (
      <FlexGridItem key={i}>
        <ProductCardSkeleton />
      </FlexGridItem>
    )
  })

  if (page < 3 && data?.getProducts.length === 0) {
    return (
      <Block display="flex" justifyContent="center">
        <Block
          marginTop="5rem"
          marginBottom="10rem"
          $style={{textAlign: 'center'}}
        >
          <H3 marginBottom="2rem">We could not find anything!</H3>
          <Link to="/">
            <H6>
              <StyledLink>Go To Home Page</StyledLink>
            </H6>
          </Link>
        </Block>
      </Block>
    )
  }

  return (
    <section>
      {error && (
        <Notification
          closeable
          kind="negative"
          overrides={{
            Body: {style: {width: 'auto', textAlign: 'center'}},
          }}
        >
          Something Went Wrong While Fetching Products !
        </Notification>
      )}
      <FlexGrid
        flexGridColumnCount={[1, 2, 2, 3]}
        flexGridColumnGap={GRID_GAP}
        flexGridRowGap={GRID_GAP}
      >
        {loading || error
          ? ProductListSkeleton
          : data?.getProducts.map(
              ({images, description, id, name, price, slug}, i) => {
                const img = [...images]
                img.sort((a, b) => {
                  const [aArr, bArr] = [a.split('/'), b.split('/')]
                  return aArr[aArr.length - 1] > bArr[bArr.length - 1] ? 1 : -1
                })
                return (
                  <FlexGridItem key={`${id}`}>
                    <ProductCard
                      description={description}
                      image={img[0]}
                      name={name}
                      price={price}
                      url={`${BASE_URL}/${slug}`}
                      key={`card-${id}`}
                    />
                    {i === data.getProducts.length - 1 && (
                      <Waypoint
                        key={`waypoint-${page}-${id}`}
                        onEnter={() => {
                          if (page > 1 && fetchMore) {
                            fetchMore({
                              variables: {page},
                              updateQuery: (
                                previousResult,
                                {fetchMoreResult},
                              ) => {
                                const newProducts = fetchMoreResult?.getProducts
                                if (newProducts?.length) {
                                  setPage((prev) => prev + 1)
                                  return {
                                    getProducts: [
                                      ...previousResult.getProducts,
                                      ...newProducts,
                                    ],
                                  }
                                } else {
                                  setPage(-1000)
                                  // setShouldFetch(false);
                                  return previousResult
                                }
                              },
                            })
                          }
                        }}
                      />
                    )}
                  </FlexGridItem>
                )
              },
            )}
      </FlexGrid>
      {networkStatus === 7 && page > 1 && (
        <Block display="flex" justifyContent="center" margin="2rem 0">
          <Spinner size="48px" color="#000" title="Loading Products" />
        </Block>
      )}
    </section>
  )
}

export {ProductLists}
