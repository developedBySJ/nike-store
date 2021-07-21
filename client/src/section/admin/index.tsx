import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'

import {MemberTable} from './MemberTable'
import {OrderTable} from './OrderTable'
import {ProductTable} from './ProductTable'

const Admin = () => {
  let {path} = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/members`} exact>
        <MemberTable />
      </Route>

      <Route path={`${path}/orders`} exact>
        <OrderTable />
      </Route>

      <Route path={`${path}/products`} exact>
        <ProductTable />
      </Route>
    </Switch>
  )
}

export {Admin}
