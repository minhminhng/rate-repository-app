import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

const useUser = (includeReviews) => {
  const result = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews }
  });
  
  const user = result.data ? result.data.me : null;

  return { user, loading: result.loading };
};

export default useUser;