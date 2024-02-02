import { useQuery } from '@apollo/client';
import { GET_REPOSITORY} from '../graphql/queries';

const useRepository = (id) => {
  const result = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId : id },
    skip: !id
  });

  const repository = result.data ? result.data.repository : null;
  return { repository };
};

export default useRepository;