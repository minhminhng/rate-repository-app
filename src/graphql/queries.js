import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragment';

export const GET_REPOSITORIES = gql`
  query repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
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
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails,
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const FILTER_REPOSITORIES = gql`
  query filterRepository($searchKeyword: String) {
    repositories(searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
        }
      }
    }
  }
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
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $includeReviews){
        edges {
          node {
            id
            createdAt
            rating
            repository {
              fullName
              url
            }
            text
          }
        }
      }
    }
  }
`;