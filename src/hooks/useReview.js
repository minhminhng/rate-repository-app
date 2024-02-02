import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error)
    },
  })

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const data = await mutate({
        variables: {review : {
          ownerName, repositoryName, rating: parseInt(rating), text
        }}
      });
      return data;
    } catch (error) {
      console.error('Error occurred during submission:', error);
    }
  };

  return [createReview, result];
};

export default useReview;