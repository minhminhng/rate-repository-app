import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragment';

export const GET_REPOSITORIES = gql`
  query repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $after: String, $first: Int) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, after: $after, first: $first) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query repository($repositoryId: ID!, $after: String, $first: Int) {
    repository(id: $repositoryId) {
      ...RepositoryDetails,
      url
      reviews (after: $after, first: $first) {
        totalCount
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
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
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