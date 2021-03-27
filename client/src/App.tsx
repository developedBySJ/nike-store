import React, {FunctionComponent, lazy, Suspense} from 'react';
import {LightTheme, BaseProvider} from 'baseui';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Header} from './section/Header';
import {Footer} from './section/Footer';
import {useQuery} from '@apollo/client';
import {WHO_AM_I} from './lib/graphQl/queries/whoAmI';
import {whoAmI} from './lib/graphQl/queries/__generated__/whoAmI';
import {Viewer} from './lib/types';

import {Block} from 'baseui/block';
import {LoadingSnipper, PrivateRoute} from './lib/Components';
import {ScrollToTop} from './lib/hooks';
import {Logout} from './section/Logout';
import SwiperCore, {
  Navigation,
  Thumbs,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper';
import {Admin} from './section/admin';
import {Notification} from 'baseui/notification';
import {StyledLink} from 'baseui/link';

SwiperCore.use([Thumbs, Navigation, Pagination, Scrollbar, A11y]);

const Home = lazy(() => import('./section/Home'));
const Shop = lazy(() => import('./section/Shop'));
const Product = lazy(() => import('./section/Product'));
const Orders = lazy(() => import('./section/Orders'));
const Checkout = lazy(() => import('./section/Checkout'));
const Login = lazy(() => import('./section/Login'));
const Register = lazy(() => import('./section/Register'));
const NotFound = lazy(() => import('./section/NotFound'));
const Profile = lazy(() => import('./section/Profile'));
const Favourites = lazy(() => import('./section/Favourites'));
const Cart = lazy(() => import('./section/Cart'));
const Dashboard = lazy(() => import('./section/Dashboard'));
const OrderDetails = lazy(() => import('./section/OrderDetails'));

const intialViewer: Viewer = {
  avatar: null,
  didRequest: false,
  email: null,
  firstName: null,
  id: null,
  isAdmin: null,
  lastName: null,
};

const App: FunctionComponent = () => {
  const {data, loading} = useQuery<whoAmI>(WHO_AM_I);

  const [viewer, setViewer] = React.useState<Viewer>(intialViewer);

  React.useEffect(() => {
    if (data) {
      setViewer(data.whoAmI);
    }
    if (!loading && !data) {
      setViewer({...intialViewer, didRequest: true});
    }
  }, [data, loading]);

  return (
    <BaseProvider theme={LightTheme}>
      <BrowserRouter>
        <Header viewer={viewer} />
        <Block padding={['0 0.5rem', '0 1rem', '0 1.5rem', '0 2rem']} as="main">
          <Suspense fallback={<LoadingSnipper />}>
            <Switch>
              <Route path="/" exact>
                <Notification
                  kind="info"
                  closeable
                  overrides={{
                    Body: {
                      style: {
                        width: 'auto',
                        backgroundColor: '#eeeeee',
                        color: '#717171',
                        marginTop: '1.5rem',
                        textAlign: 'center',
                      },
                    },
                  }}
                >
                  Build With ReactJS | NodeJS | TS By{' '}
                  <StyledLink
                    href="https://github.com/developedBySJ"
                    target="_blank"
                  >
                    Swapnil J
                  </StyledLink>
                </Notification>
                <Home />
                <ScrollToTop />
              </Route>

              <PrivateRoute viewer={viewer} component={Admin} path="/admin" />

              <Route path="/shop" exact>
                <ScrollToTop />
                <Shop />
              </Route>

              <Route path="/shop/:slug" exact>
                <ScrollToTop />
                <Product viewer={viewer} />
              </Route>

              <PrivateRoute
                path="/orders"
                exact
                viewer={viewer}
                component={Orders}
              />

              <PrivateRoute
                viewer={viewer}
                path="/orders/:id"
                exact
                component={OrderDetails}
              />

              <Route path="/checkout" exact>
                <ScrollToTop />
                <Checkout viewer={viewer} />
              </Route>

              <Route path="/cart" exact>
                <ScrollToTop />
                <Cart viewer={viewer} loading={loading} />
              </Route>

              <Route path="/login" exact>
                <ScrollToTop />
                <Login setViewer={setViewer} />
              </Route>

              <Route path="/register" exact>
                <ScrollToTop />
                <Register setViewer={setViewer} />
              </Route>

              <Route path="/404" exact>
                <ScrollToTop />
                <NotFound />
              </Route>

              <Route path="/me" exact>
                <ScrollToTop />
                <Dashboard viewer={viewer} />
              </Route>

              <Route path="/profile" exact>
                <ScrollToTop />
                <Profile viewer={viewer} />
              </Route>

              <Route path="/favourites" exact>
                <ScrollToTop />
                <Favourites viewer={viewer} />
              </Route>

              <Route path="/logout">
                <Logout setViewer={setViewer} />
              </Route>

              <Route path="/*" exact>
                <ScrollToTop />
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </Block>
        <Footer />
      </BrowserRouter>
    </BaseProvider>
  );
};

export default App;
