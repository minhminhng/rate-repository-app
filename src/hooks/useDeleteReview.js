import { useMutation } from '@apollo/client';

import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log(error)
    },
  })

  const deleteReview = async (id) => {
    try {
      const data = await mutate({
        variables: { deleteReviewId :  id }
      });
      return data;
    } catch (error) {
      console.error('Error occurred during submission:', error);
    }
  };

  return [deleteReview, result];
};

export default useDeleteReview;