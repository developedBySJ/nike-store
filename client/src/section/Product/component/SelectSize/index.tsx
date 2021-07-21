import React from 'react'

import {RadioGroup, Radio, ALIGN} from 'baseui/radio'
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid'
import {idText} from 'typescript'
import {Block} from 'baseui/block'
import {useStyletron} from 'baseui'
import {Label1, Paragraph2} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import {Skeleton} from 'baseui/skeleton'

interface ISizeProps {
  size: string[]
  sizeVal: string | null
  setSizeVal: (size: string) => void
}

const SelectSize = ({size, setSizeVal, sizeVal}: ISizeProps) => {
  const [css, theme] = useStyletron()
  return (
    <>
      <Paragraph2
        marginBottom="0.5rem"
        overrides={{Block: {style: {opacity: 0.9}}}}
      >
        Select Size
      </Paragraph2>
      <FlexGrid
        flexGridColumnCount={3}
        flexGridColumnGap={['6px', '6px', '4px', '6px']}
        flexGridRowGap={'6px'}
      >
        {size.map((value, index) => {
          return (
            <FlexGridItem
              overrides={{
                Block: {props: {onClick: () => setSizeVal(value)}},
              }}
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                boxShadow: `${
                  sizeVal === value ? 'rgb(17 17 17)' : 'rgb(229 229 229)'
                } 0px 0px 0px 1px inset`,
                borderRadius: '8px',
                cursor: 'pointer',
                ':hover': {
                  boxShadow: 'rgb(17 17 17) 0px 0px 0px 1px inset',
                },
              })}
              key={`value-${index}`}
            >
              <label
                className={css({cursor: 'pointer', pointerEvents: 'none'})}
              >
                <input
                  type="radio"
                  id="size"
                  name="size"
                  className={css({display: 'none'})}
                />
                <Label1 overrides={{Block: {style: {fontWeight: 'normal'}}}}>
                  {value}
                </Label1>
              </label>
            </FlexGridItem>
          )
        })}
      </FlexGrid>
    </>
  )
}

export {SelectSize}
