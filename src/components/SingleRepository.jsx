import { FlatList, View, StyleSheet} from 'react-native';
import { useParams } from 'react-router-native';
import {format} from 'date-fns';

import useRepository from '../hooks/useRepository';
import theme from '../theme';
import Text from './Text';
import { RepositoryItemContainer } from "./RepositoryItem";
import { ItemSeparator } from './RepositoryList';

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    margin: 5
  },
  reviewContainer: {
    padding:5,
    flexGrow: 0,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 50/2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    marginRight: 5
  },
  item: {
    flexDirection: 'row',
    backgroundColor: theme.colors.itemBackground,
  },
});

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItemContainer item={repository} showUrl/>
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.item}>
      <View style={styles.reviewContainer}>
        <Text color="primary" fontWeight="bold" fontSize="subheading">{review.rating}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <View>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        </View>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
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