import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  
  if (result.loading) {
    return <div>loading...</div>
  }

  const repositories = result.data.repositories;

  return { repositories, loading: result.loading };
};

export default useRepositories;