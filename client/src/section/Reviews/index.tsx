import {useQuery} from '@apollo/client'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {ANCHOR, Drawer, SIZE} from 'baseui/drawer'
import {Notification} from 'baseui/notification'
import {StarRating} from 'baseui/rating'
import {H5, H6, Paragraph1} from 'baseui/typography'
import React from 'react'
import {LoadingSnipper} from '../../lib/Components'
import {GET_REVIEWS_BY_PRODUCT_ID} from '../../lib/graphQl/queries/getReviewsByProductId'
import {
  GetReviewsByProductId,
  GetReviewsByProductIdVariables,
} from '../../lib/graphQl/queries/getReviewsByProductId/__generated__/GetReviewsByProductId'
import {displayNotification} from '../../lib/utils/displayNotification'
import {ProductReviews} from '../Product/component'

interface IReviewsProps {
  isOpen: boolean
  setIsOpen: (x: boolean) => void
  productId: string
  totalReviews: number
  avgRating: number
}

const Reviews: React.FC<IReviewsProps> = ({
  isOpen,
  productId,
  setIsOpen,
  avgRating,
  totalReviews,
}) => {
  const [css, theme] = useStyletron()

  const {data, loading, error} = useQuery<
    GetReviewsByProductId,
    GetReviewsByProductIdVariables
  >(GET_REVIEWS_BY_PRODUCT_ID, {
    variables: {productId},
    onError: ({message}) => {
      displayNotification('negative', message)
    },
  })
  const drawerContent =
    loading || error ? (
      <LoadingSnipper />
    ) : !data ? (
      <>
        <Notification
          kind="negative"
          overrides={{Body: {style: {width: 'auto'}}}}
        >
          Something went wrong! : (
        </Notification>
        <LoadingSnipper />
      </>
    ) : (
      <Block className={css({maxWidth: '900px', margin: '2rem auto'})}>
        <Block
          className={css({
            textAlign: 'center',

            padding: '2rem 0',
            paddingBottom: '4rem',

            borderBottom: '1px solid rgb(229,229,229)',
          })}
        >
          <StarRating value={avgRating} readOnly size={16} />
          <H5>{totalReviews} Reviews</H5>
        </Block>
        <Block className={css({borderBottom: '1px solid rgb(229,229,229)'})}>
          <Paragraph1 className={css({margin: '1rem 0'})}>Sort By</Paragraph1>
        </Block>
        <Block>
          {data.getReviews.map((review) => {
            return (
              <ProductReviews
                comment={review.comment}
                fullName={`${review.member.firstName} ${review.member.lastName}`}
                rating={review.rating}
                key={review.id}
                avatar={review.member.avatar}
                createdAt={review.createdAt}
              />
            )
          })}
        </Block>
      </Block>
    )

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      anchor={ANCHOR.bottom}
      size={SIZE.full}
      overrides={{Root: {style: {zIndex: 1}}}}
    >
      {drawerContent}
    </Drawer>
  )
}

export {Reviews}
