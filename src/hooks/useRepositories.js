import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  console.log(orderBy)
  console.log(searchKeyword)
  const result = useQuery(GET_REPOSITORIES, {
    variables: { 
      orderBy: orderBy,
      orderDirection: orderDirection,
      searchKeyword: searchKeyword },
    fetchPolicy: 'cache-and-network',
  });
  
  if (result.loading) {
    return <div>loading...</div>
  }
  

  const repositories = result.data.repositories;

  return { repositories, loading: result.loading };
};

export default useRepositories;