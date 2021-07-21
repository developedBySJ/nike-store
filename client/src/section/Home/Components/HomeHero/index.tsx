import React from 'react'
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid'
import {useStyletron} from 'baseui'
import {Display2, Paragraph2} from 'baseui/typography'
import {Button} from 'baseui/button'

import HomeDeskImg from '../../../../lib/assets/img/home_desk.jpg'
import HomeMobImg from '../../../../lib/assets/img/home_mob.jpg'
import {useHistory} from 'react-router-dom'

const HomeHero = () => {
  const [css, theme] = useStyletron()
  const histroy = useHistory()
  return (
    <FlexGrid>
      <FlexGridItem>
        <figure
          className={css({
            paddingTop: '2rem',
            height: '90vh',
            minHeight: '400px',
            position: 'relative',
          })}
        >
          <img
            src={HomeDeskImg}
            alt="nike landing page"
            className={css({
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              '@media screen and (max-width: 700px)': {
                width: 0,
                height: 0,
                visibility: 'hidden',
              },
              visibility: 'visible',
            })}
          />
          <img
            src={HomeMobImg}
            alt="nike landing page"
            className={css({
              objectFit: 'cover',
              '@media screen and (max-width: 700px)': {
                visibility: 'visible',
                width: '100%',
                height: '100%',
              },
              width: 0,
              height: 0,
              visibility: 'hidden',
            })}
          />
          <figcaption
            className={css({
              position: 'absolute',
              bottom: '0',
              left: '0',
              padding: '0 2rem 2rem 2rem',
            })}
          >
            <Display2
              $style={{
                fontWeight: 900,
                letterSpacing: '-2px',
                fontSize: 'clamp(42px,8vw,80px)',
                lineHeight: '100%',
              }}
            >
              TURN UP THE <br />
              LIGHTS
            </Display2>
            <Paragraph2 margin="1rem 0">
              Shrug off grey winter days in styles that feel like spring.
            </Paragraph2>
            <Button
              kind="primary"
              shape="pill"
              $style={{padding: '0.75rem 2rem'}}
              onClick={() => histroy.push('/shop?category=hoodies')}
            >
              Shop
            </Button>
          </figcaption>
        </figure>
      </FlexGridItem>
    </FlexGrid>
  )
}

export {HomeHero}
