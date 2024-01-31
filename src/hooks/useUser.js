import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

const useUser = () => {
  const result = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  
  if (result.loading) {
    return <div>loading...</div>
  }
  const user = result.data.me;

  return { user, loading: result.loading };
};

export default useUser;