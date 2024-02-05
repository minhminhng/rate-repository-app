import { FlatList, Text } from 'react-native';

import ReviewItem from './ReviewItem';
import { ItemSeparator } from './ItemSeperator';
import useUser from '../hooks/useUser';

const ReviewListContainer = ({ reviews }) => {
    return (
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} repository/>}
        keyExtractor={item => item.id}
      />
    );
}

const ReviewList = () => {  
  const { user, loading } = useUser(true);

  if (loading) {
    return <Text>loading...</Text>;
  }

  // // Get the nodes from the edges array
  const reviewNodes = user.reviews
    ? user.reviews.edges.map(edge => edge.node) : [];

  return <ReviewListContainer reviews={reviewNodes} />;
};

export default ReviewList;