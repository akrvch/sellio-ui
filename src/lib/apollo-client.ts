import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const httpLink = new HttpLink({
  uri: 'http://127.0.0.1:8080/graphql',
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

