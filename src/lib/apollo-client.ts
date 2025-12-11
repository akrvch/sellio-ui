import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const httpLink = new HttpLink({
  uri: 'http://sellio.local/graphql',
  credentials: 'include', // Send cookies with requests for session management
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        categoryListing: {
          // Don't cache by default - each call is independent
          keyArgs: ['alias'],
        },
      },
    },
  },
})

const client = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

export default client

