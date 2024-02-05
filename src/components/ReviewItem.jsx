import { View, Pressable, Alert, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import * as Linking from 'expo-linking';

import useDeleteReview from '../hooks/useDeleteReview';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.itemBackground,
    marginBottom: 10
  },
  infoContainer: {
    flex: 1,
    margin: 5
  },
  ratingContainer: {
    padding:5,
    flexGrow: 0,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 50/2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  item: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5
  },
  button: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 5
  }
});

const ReviewItem = ({ review, user, repository, refetchQuery }) => {
  const [deleteReview] = useDeleteReview();
  const openUrl = () => {
    const url = review.repository.url;
    if (url) {
      Linking.openURL(review.repository.url);
    }
  }

  const openConfirmation = () =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete', 
        onPress: async() => {
          const data = await deleteReview(review.id);
          if (data) {
            refetchQuery();
          }
        }
      }
    ]);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.ratingContainer}>
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
      {repository && 
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={openUrl}>
            <Text style="buttonPrimary">View repository</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style="buttonRed" onPress={openConfirmation}>Delete review</Text>
          </Pressable>
        </View>}
    </View>

  )
};

export default ReviewItem;