import React from 'react'
import {
  Route,
  RouteComponentProps,
  RouteProps,
  useHistory,
} from 'react-router-dom'
import {Viewer} from '../../types'
import {LoadingSnipper} from '../LoadingSnipper'

interface IPrivateRouterProps extends RouteProps {
  viewer: Viewer
  component:
    | React.ComponentType<RouteComponentProps<any> & {viewer: Viewer}>
    | React.ComponentType<{viewer: Viewer}>
}

export type PrivateRouteComponent<T = {}> = React.ComponentType<
  T & {viewer: Viewer}
>

const PrivateRoute: React.FC<IPrivateRouterProps> = ({
  viewer,
  component: Component,
  ...rest
}) => {
  const {didRequest, id} = viewer
  const histroy = React.useRef(useHistory())
  const [authorized, setAuthorized] = React.useState(false)
  React.useEffect(() => {
    if (didRequest && !id) {
      histroy.current.push('/login')
    }
    if (id) {
      setAuthorized(true)
    }
  }, [id, didRequest])
  return authorized ? (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        Component ? <Component viewer={viewer} {...props} /> : null
      }
    />
  ) : (
    <LoadingSnipper />
  )
}

export {PrivateRoute}
