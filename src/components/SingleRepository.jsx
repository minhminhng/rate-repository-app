import { FlatList, } from 'react-native';
import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import ReviewItem from './ReviewItem';
import { RepositoryItemContainer } from "./RepositoryItem";
import ItemSeparator from './ItemSeparator';

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItemContainer item={repository} showUrl/>
};

const SingleRepository = () => {
  const repositoryId = useParams().id;
  const { repository, fetchMore } = useRepository({ first: 5, repositoryId });

  const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} user/>}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}    
    />
  )
}

export default SingleRepository;