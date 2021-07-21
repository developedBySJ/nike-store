import React from 'react'
import {useStyletron} from 'baseui'
import {Button} from 'baseui/button'
import {ChevronLeft, ChevronRight} from 'baseui/icon'
import {Swiper, SwiperSlide} from 'swiper/react'
import {H5} from 'baseui/typography'

interface IProductCardSliderProps {
  cards: JSX.Element[]
  title: string
  isLoading: boolean
  error: boolean
  skeltonCard: JSX.Element
}

const ProductCardSlider = ({
  title,
  cards,
  isLoading,
  skeltonCard,
  error,
}: IProductCardSliderProps) => {
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
              className: css({
                '@media screen and (max-width: 700px)': {
                  visibility: 'hidden',
                },
                visibility: 'visible',
              }),
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
              className: css({
                '@media screen and (max-width: 700px)': {
                  visibility: 'hidden',
                },
                visibility: 'visible',
              }),
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
      <H5 marginBottom="2rem" $style={{fontWeight: 'normal'}}>
        {title}
      </H5>
      <Swiper
        swipeHandler="#swiper-card-slider"
        id={`swiper-card-slider`}
        style={{
          width: '100%',
          zIndex: 0,
        }}
        scrollbar={{snapOnRelease: true, hide: true}}
        navigation={{nextEl: '#slider-next', prevEl: '#slider-prev'}}
        breakpoints={{
          320: {
            slidesPerView: 1.1,
            spaceBetween: 6,
          },

          600: {
            slidesPerView: 2.2,
            spaceBetween: 14,
          },

          900: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        }}
      >
        {isLoading || error
          ? ['', '', '', '', ''].map((m, index) => {
              return (
                <SwiperSlide key={`loading-${index}`}>
                  {skeltonCard}
                </SwiperSlide>
              )
            })
          : cards.length &&
            cards.map((card, index) => {
              return <SwiperSlide key={`card-${index}`}>{card}</SwiperSlide>
            })}
      </Swiper>
      {navigation}
    </div>
  )
}

export {ProductCardSlider}
