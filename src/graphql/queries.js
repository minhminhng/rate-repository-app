import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragment';

export const GET_REPOSITORIES = gql`
  query repositories {
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
  query repository ($repositoryId: ID!) {
    repository (id: $repositoryId) {
      ...RepositoryDetails,
      url
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_USERS = gql`
  query users {
    users {
      edges {
        node {
          username
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query me {
    me {
      username
    }
  }
`;