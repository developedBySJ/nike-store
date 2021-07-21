import {useStyletron} from 'baseui'
import {Avatar} from 'baseui/avatar'
import {Block} from 'baseui/block'
import {StarRating} from 'baseui/rating'
import {Paragraph1, Paragraph2, Paragraph3} from 'baseui/typography'
import React from 'react'

interface IProductReviewsProps {
  fullName: string
  rating: number
  comment: string
  avatar?: string | null
  createdAt?: string
}

const ProductReviews = (props: IProductReviewsProps) => {
  const [css, _] = useStyletron()
  const {fullName, comment, rating, avatar, createdAt} = props
  return (
    <Block margin="2rem 0">
      <Block marginBottom="0.75rem" display="flex" alignItems="center">
        <Avatar
          name={fullName}
          src={avatar || undefined}
          size="40px"
          overrides={{Root: {style: {backgroundColor: '#464646'}}}}
        />
        <Block marginLeft="1rem">
          <Paragraph1>{fullName}</Paragraph1>
          <StarRating size={16} value={rating} readOnly />
        </Block>
      </Block>
      <Paragraph2>{comment}</Paragraph2>
      {createdAt && (
        <Paragraph3 className={css({opacity: 0.6})}>
          {new Date(createdAt).toDateString()}
        </Paragraph3>
      )}
    </Block>
  )
}

export {ProductReviews}
