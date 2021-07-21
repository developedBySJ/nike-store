import {useMutation} from '@apollo/client'
import {useStyletron} from 'baseui'
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box'
import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {Label1, Paragraph1} from 'baseui/typography'
import React from 'react'
import {Link} from 'react-router-dom'
import {REMOVE_FROM_FAVOURITES} from '../../../../lib/graphQl/mutations/removeFromFavourites'
import {
  RemoveFromFavourites,
  RemoveFromFavouritesVariables,
} from '../../../../lib/graphQl/mutations/removeFromFavourites/__generated__/RemoveFromFavourites'
import {displayNotification} from '../../../../lib/utils/displayNotification'
import {formatPrice} from '../../../../lib/utils/formatPrice'

interface IFavouriteCardProps {
  id: string
  slug: string
  name: string
  description: string
  image: string
  price: number
}

const FavouriteCard = ({
  id,
  slug,
  name,
  description,
  image,
  price,
}: IFavouriteCardProps) => {
  const [css, theme] = useStyletron()
  const [removeFromFavourites, _] = useMutation<
    RemoveFromFavourites,
    RemoveFromFavouritesVariables
  >(REMOVE_FROM_FAVOURITES, {
    variables: {
      id,
    },
    onError: ({message}) => {
      displayNotification('negative', message)
    },
    update: (cache, {data: newData}) => {
      if (newData) {
        cache.writeQuery<RemoveFromFavourites, RemoveFromFavouritesVariables>({
          query: REMOVE_FROM_FAVOURITES,
          data: {
            removeFromFavourites: newData.removeFromFavourites,
          },
        })
      }
    },
  })
  return (
    <Block
      display="flex"
      padding="2rem 1rem"
      width="100%"
      $style={{borderBottom: '1px solid rgb(229,229,229)'}}
      flexDirection={['column', 'row', 'row', 'row']}
    >
      <Block
        minWidth="96px"
        maxWidth="300px"
        width={['100%', '16%', '16%', '16%']}
        marginBottom={['1rem', 0, 0, 0]}
      >
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
        <Block marginRight="1rem">
          <Link to={`/shop/${slug}`} className={css({textDecoration: 'none'})}>
            <Label1>{name}</Label1>
          </Link>
          <Paragraph1 $style={{opacity: 0.8}}>{description}</Paragraph1>
          <Paragraph1 marginLeft="auto">{formatPrice(price)}</Paragraph1>
        </Block>
        <Block>
          <StyledLink
            $style={{opacity: 0.6, cursor: 'pointer'}}
            onClick={() => removeFromFavourites()}
          >
            Remove
          </StyledLink>
        </Block>
      </Block>
    </Block>
  )
}

export {FavouriteCard}
