import React from 'react'

import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box'
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid'

import {sortImgArr} from '../../../../lib/utils/sortImgArr'
import {useStyletron} from 'baseui'
import {Button} from 'baseui/button'
import {ChevronLeft, ChevronRight} from 'baseui/icon'
import {Swiper, SwiperSlide} from 'swiper/react'
interface IProductProps {
  name: string
  images: string[]
}

interface IProductImgMobProps {
  images: string[]
}
const ProductImgMob = ({images}: IProductImgMobProps) => {
  const [css, theme] = useStyletron()
  const navigation = (
    <>
      <Button
        kind="secondary"
        shape="circle"
        overrides={{
          Root: {
            props: {
              id: 'slider-prev',
            },
            style: {
              position: 'absolute',
              top: '50%',
              left: '2%',
              transform: 'translate(0%,-50%)',
            },
          },
        }}
      >
        <ChevronLeft size="24px" />
      </Button>
      <Button
        kind="secondary"
        shape="circle"
        overrides={{
          Root: {
            props: {
              id: 'slider-next',
            },
            style: {
              position: 'absolute',
              right: '2%',
              top: '50%',
              transform: 'translate(0%,-50%)',
            },
          },
        }}
      >
        <ChevronRight size="24px" />
      </Button>
    </>
  )

  return (
    <div className={css({position: 'relative'})}>
      <Swiper
        swipeHandler="#swiper-product-images"
        id={`swiper-product-images`}
        style={{
          width: '100%',
          zIndex: 0,
        }}
        navigation={{nextEl: '#slider-next', prevEl: '#slider-prev'}}
        slidesPerView={1}
      >
        {images.length &&
          sortImgArr(images).map((image, index) => {
            return (
              <SwiperSlide key={`card-${index}`}>
                <img
                  src={image}
                  alt="product"
                  className={css({width: '100%', height: '100%'})}
                />
              </SwiperSlide>
            )
          })}
      </Swiper>
      {navigation}
    </div>
  )
}

const ProductImages = ({images, name}: IProductProps) => {
  const [css, theme] = useStyletron()

  const sortedImg = sortImgArr(images)
  const Img = ({src, alt}: {src: string; alt?: string}) => (
    <AspectRatioBox aspectRatio={4 / 5}>
      <AspectRatioBoxBody backgroundColor={theme.colors.backgroundSecondary}>
        <img
          src={src}
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
  )

  return (
    <FlexGrid
      flexGridColumnCount={2}
      flexGridColumnGap={['8px', '8px', '8px', '12px']}
      flexGridRowGap={['8px', '8px', '8px', '12px']}
    >
      {sortedImg.map((img) => (
        <FlexGridItem key={img}>
          <Img src={img} alt={name} />
        </FlexGridItem>
      ))}
    </FlexGrid>
  )
}

export {ProductImages, ProductImgMob}
