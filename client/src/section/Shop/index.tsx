import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'

import React, {ReactPropTypes} from 'react'

import {ProductLists} from '../ProductsLists'
import {SortProducts} from './Components'
import Filters from './Components/Filters'

interface IQueryParams {
  sortBy?: string
}

const Shop = () => {
  const [css, theme] = useStyletron()
  return (
    <Block margin="2rem 0">
      <Block
        className={css({
          padding: '1rem 0',
          position: 'sticky',
          backgroundColor: '#fff',
          top: '50px',
          zIndex: 1,
        })}
      >
        <Block
          width={['100%', '100%', '50%', '25%']}
          display="flex"
          marginLeft="auto"
          alignItems="center"
        >
          <Block width="49%" margin="0 1%">
            <Filters />
          </Block>
          <Block width="49%" margin="0 1%">
            <SortProducts />
          </Block>
        </Block>
      </Block>
      <ProductLists />
    </Block>
  )
}

export {Shop as default}
