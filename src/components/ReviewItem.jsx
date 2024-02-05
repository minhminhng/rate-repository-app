import { View, StyleSheet } from "react-native";
import {format} from 'date-fns';

import theme from "../theme";
import Text from "./Text";

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

const ReviewItem = ({ review, user, repository }) => {
  return (
    <View style={styles.item}>
      <View style={styles.reviewContainer}>
        <Text color="primary" fontWeight="bold" fontSize="subheading">{review.rating}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <View>
          {user && <Text fontWeight="bold">{review.user.username}</Text>}
          {repository && <Text fontWeight="bold">{review.repository.fullName}</Text>}
          <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        </View>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
};

export default ReviewItem;