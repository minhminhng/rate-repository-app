import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const APOLLO_URI = Constants.manifest.extra.apollo_uri;
const httpLink = createHttpLink({
  uri: APOLLO_URI,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;