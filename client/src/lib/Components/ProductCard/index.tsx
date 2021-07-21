import {Block} from 'baseui/block'
import {Label2, Paragraph1} from 'baseui/typography'
import React from 'react'
import {useStyletron} from 'baseui'
import {formatPrice} from '../../utils/formatPrice'
import {Link} from 'react-router-dom'
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box'
import {Skeleton} from 'baseui/skeleton'
import {Notification} from 'baseui/notification'
// const URL =
//   "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/1fccca79-8f2e-4b54-8cc8-04bdb5366a81/air-max-plus-mens-shoe-0RmbKC.jpg";

export interface IProductCardProps {
  image: string
  name: string
  description: string
  price: number
  url: string
}

const ProductCard = ({
  description,
  image,
  name,
  price,
  url = '/',
}: IProductCardProps) => {
  const [css, theme] = useStyletron()
  return (
    <Link to={url} className={css({textDecoration: 'none'})}>
      <AspectRatioBox>
        <AspectRatioBoxBody backgroundColor={theme.colors.backgroundSecondary}>
          <img
            src={image}
            alt={name}
            className={css({
              width: '100%',
              height: '100%',
              objectPosition: 'center',
              objectFit: 'cover',
            })}
          />
        </AspectRatioBoxBody>
      </AspectRatioBox>
      <Block margin="1.5rem 0">
        {/* <Paragraph2 color={theme.colors.backgroundNegative}>Just In</Paragraph2> */}
        <Block display="flex" justifyContent="space-between">
          <Block>
            <Paragraph1>{name}</Paragraph1>
            <Label2 $style={{opacity: 0.5}}>{description}</Label2>
          </Block>
          <Paragraph1>{formatPrice(price)}</Paragraph1>
        </Block>
      </Block>
    </Link>
  )
}

const ProductCardSkeleton = () => {
  const [_, theme] = useStyletron()
  return (
    <div>
      <AspectRatioBox>
        <AspectRatioBoxBody backgroundColor={theme.colors.backgroundSecondary}>
          <Skeleton height="100%" width="100%" animation />
        </AspectRatioBoxBody>
      </AspectRatioBox>
      <Block margin="1.5rem 0">
        <Skeleton
          width="90%"
          height="20px"
          animation
          overrides={{Root: {style: {marginBottom: '0.8rem'}}}}
        />
        <Skeleton width="40%" height="16px" animation />
      </Block>
    </div>
  )
}

export {ProductCard, ProductCardSkeleton}
