import {useLazyQuery, useQuery} from '@apollo/client'
import {Block} from 'baseui/block'
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid'
import {Spinner} from 'baseui/spinner'
import {H4, Paragraph1} from 'baseui/typography'
import React from 'react'
import {useHistory} from 'react-router-dom'
import {GetMemberByIdVariables} from '../../lib/graphQl/queries/getMemberById/__generated__/GetMemberById'
import {GET_MY_FAVOURITES} from '../../lib/graphQl/queries/getMyFavourites'
import {GetMyFavourites} from '../../lib/graphQl/queries/getMyFavourites/__generated__/GetMyFavourites'
import {Viewer} from '../../lib/types'
import {FavouriteCard} from './components/FavouriteCard'

interface IFavouritesProps {
  viewer: Viewer
}

const Favourites = ({viewer}: IFavouritesProps) => {
  const {didRequest, id} = viewer
  const [_getMyfavourites, {data}] = useLazyQuery<
    GetMyFavourites,
    GetMemberByIdVariables
  >(GET_MY_FAVOURITES)

  const getMyfavourites = React.useRef(_getMyfavourites)
  const histroy = React.useRef(useHistory())
  React.useEffect(() => {
    if (didRequest && !id) {
      histroy.current.push('/login')
    }
    if (id) {
      getMyfavourites.current()
    }
  }, [id, didRequest])

  const favList = (
    <Block margin="2rem 0">
      <H4>Favourites</H4>
      {data?.getMyFavourites.products.length ? (
        <FlexGrid
          maxWidth="1200px"
          margin="2rem auto"
          flexGridColumnCount={[1, 1, 2, 2]}
          flexGridColumnGap={['0px', '0px', '16px', '24px']}
          flexGridRowGap={['0px', '0px', '16px', '24px']}
        >
          {data.getMyFavourites.products.map((fav) => {
            return (
              <FlexGridItem key={fav.id}>
                <FavouriteCard {...fav} />
              </FlexGridItem>
            )
          })}
        </FlexGrid>
      ) : (
        <Block
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="10rem 0"
        >
          <Paragraph1 padding="1rem" $style={{textAlign: 'center'}}>
            Items added to your Favourites will be saved here.
          </Paragraph1>
        </Block>
      )}
    </Block>
  )

  return (
    <Block minHeight="80vh">
      {data ? (
        favList
      ) : (
        <Block
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="10rem 0"
        >
          <Spinner size="64px" color="#111" />
        </Block>
      )}
    </Block>
  )
}

export {Favourites as default}
