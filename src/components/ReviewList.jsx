import { FlatList, Text } from 'react-native';

import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';
import useUser from '../hooks/useUser';

const ReviewListContainer = ({ reviews, refetchQuery }) => {
    return (
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} refetchQuery={refetchQuery} repository/>}
        keyExtractor={item => item.id}
      />
    );
}

const ReviewList = () => {  
  const { user, loading, refetch } = useUser(true);

  if (loading) {
    return <Text>loading...</Text>;
  }

  const refetchQuery = () => {
    refetch();
  }

  // // Get the nodes from the edges array
  const reviewNodes = user.reviews
    ? user.reviews.edges.map(edge => edge.node) : [];

  return <ReviewListContainer reviews={reviewNodes} refetchQuery={refetchQuery}/>;
};

export default ReviewList;