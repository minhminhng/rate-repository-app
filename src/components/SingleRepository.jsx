import { FlatList, } from 'react-native';
import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import ReviewItem from './ReviewItem';
import { RepositoryItemContainer } from "./RepositoryItem";
import ItemSeparator from './ItemSeperator';

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItemContainer item={repository} showUrl/>
};

const SingleRepository = () => {
  const id = useParams().id;
  const { repository } = useRepository(id);
  const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  )
}

export default SingleRepository;