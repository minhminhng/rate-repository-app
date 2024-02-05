import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

const useUser = (includeReviews) => {
  const { loading, data, refetch } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews }
  });
  
  const user = data ? data.me : null;

  return { user, loading: loading, refetch };
};

export default useUser;