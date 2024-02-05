import { useQuery } from '@apollo/client';
import { GET_REPOSITORY} from '../graphql/queries';

const useRepository = (variables) => {
  console.log(variables)
  const {data, loading, fetchMore, ...result} = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
    skip: !variables.repositoryId
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    
    if (!canFetchMore) {
      return;
    }
    console.log('fetching more');

    fetchMore({      
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result };
};

export default useRepository;