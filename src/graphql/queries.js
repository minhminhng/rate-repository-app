import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragment';

export const GET_REPOSITORIES = gql`
  query repositories{
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query repository{
    repository(id: $repositoryId) {
      ...RepositoryDetails
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_USERS = gql`
  query {
    users edges {
      node {
        username
      }
    }
  }
`;