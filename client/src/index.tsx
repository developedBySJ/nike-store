import React from 'react'
import ReactDOM from 'react-dom'
import 'swiper/swiper-bundle.css'
import {ToasterContainer} from 'baseui/toast'
import {onError} from '@apollo/client/link/error'
import {createUploadLink} from 'apollo-upload-client'
import {DURATION, SnackbarProvider} from 'baseui/snackbar'

import App from './App'
import {Client as Styletron} from 'styletron-engine-atomic'
import {Provider as StyletronProvider} from 'styletron-react'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client'
import {displayNotification} from './lib/utils/displayNotification'
import * as serviceWorker from './registerServiceWorker'

const engine = new Styletron()

const GRAPHQL_URL = '/graphQl'

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach((x) => {
      const {message, locations, path} = x
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
    })

  if (networkError) {
    displayNotification(
      'negative',
      `Network Error : Check Your Network Connection`,
      true,
    )

    console.error(`[Network error]: ${networkError}`)
  }
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem('token')

  operation.setContext({
    headers: {
      'x-csrf-token': token || '',
    },
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authMiddleware,
    createUploadLink({uri: GRAPHQL_URL}),
  ]),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <ApolloProvider client={client}>
        <ToasterContainer
          autoHideDuration={3000}
          overrides={{
            Root: {style: {zIndex: 1000}},
            ToastBody: {style: {zIndex: 1000}},
          }}
        >
          <SnackbarProvider
            defaultDuration={DURATION.short}
            overrides={{PlacementContainer: {style: {zIndex: 100}}}}
          >
            <App />
          </SnackbarProvider>
        </ToasterContainer>
      </ApolloProvider>
    </StyletronProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.register({
  onSuccess: () => console.log('SERVICE WORKER REGISTER '),
})
