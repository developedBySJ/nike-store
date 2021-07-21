import {useStyletron} from 'baseui'
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box'
import {Block} from 'baseui/block'
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid'
import {Skeleton} from 'baseui/skeleton'
import {Notification} from 'baseui/notification'
import React from 'react'

const ProductSkeleton = ({error}: {error?: string}) => {
  const [css, theme] = useStyletron()
  return (
    <>
      {error && (
        <Notification
          kind="negative"
          overrides={{Body: {style: {width: '100%', marginTop: '2rem'}}}}
        >
          {error}{' '}
        </Notification>
      )}
      <FlexGrid
        flexGridColumnCount={[1, 1, 3, 3]}
        flexGridColumnGap={['0px', '0px', '1rem', '4rem']}
        margin={['1rem', '1.5rem 1.5rem', '2rem 0', '4rem 3rem']}
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
          <Block display={['none', 'none', 'block', 'block']}>
            <FlexGrid
              flexGridColumnCount={2}
              flexGridColumnGap={['8px', '8px', '8px', '12px']}
              flexGridRowGap={['8px', '8px', '8px', '12px']}
            >
              {Array.from({length: 4}).map((_, i) => {
                return (
                  <FlexGridItem key={i} width="100%">
                    <AspectRatioBox aspectRatio={4 / 5} width="100%">
                      <AspectRatioBoxBody
                        backgroundColor={theme.colors.backgroundSecondary}
                      >
                        <Skeleton animation width="100%" height="100%" />
                      </AspectRatioBoxBody>
                    </AspectRatioBox>
                  </FlexGridItem>
                )
              })}
            </FlexGrid>
          </Block>
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
          <Block
            display="flex"
            justifyContent="space-between"
            marginBottom="2rem"
          >
            <Block>
              <Skeleton animation width="64px" height="20px" />
              <Skeleton
                animation
                width="144px"
                height="28px"
                overrides={{Root: {style: {margin: '.5rem 0'}}}}
              />
            </Block>
            <Block>
              <Skeleton
                animation
                width="64px"
                height="16px"
                overrides={{Root: {style: {marginLeft: 'auto'}}}}
              />
              <Skeleton
                animation
                width="128px"
                height="30px"
                rows={2}
                overrides={{Root: {style: {margin: '.5rem 0'}}}}
              />
            </Block>
          </Block>
          <Block display={['block', 'block', 'none', 'none']}>
            <AspectRatioBox aspectRatio={4 / 5} position="relative">
              <AspectRatioBoxBody>
                <Skeleton animation width="100%" height="100%" />
              </AspectRatioBoxBody>
            </AspectRatioBox>
          </Block>
          <Block margin="1rem 0">
            <>
              <Skeleton
                animation
                width="64px"
                height="16px"
                overrides={{Root: {style: {margin: '0.5rem 0'}}}}
              />
              <FlexGrid
                flexGridColumnCount={3}
                flexGridColumnGap={['6px', '6px', '4px', '6px']}
                flexGridRowGap={'6px'}
              >
                {Array.from({length: 9}).map((value, index) => {
                  return (
                    <FlexGridItem
                      className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      })}
                      key={`value-${index}`}
                    >
                      <Skeleton width="100%" height="40px" />
                    </FlexGridItem>
                  )
                })}
              </FlexGrid>
            </>
          </Block>
          <Block>
            <Skeleton
              height="56px"
              width="100%"
              overrides={{
                Root: {
                  style: {
                    borderRadius: '1000px',
                    backgroundColor: '#949494',
                    marginBottom: '1rem',
                  },
                },
              }}
            />
            <Skeleton
              height="56px"
              width="100%"
              overrides={{
                Root: {
                  style: {borderRadius: '1000px'},
                },
              }}
            />
          </Block>
        </FlexGridItem>
      </FlexGrid>
    </>
  )
}

export {ProductSkeleton}
