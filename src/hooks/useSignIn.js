import { useMutation } from '@apollo/client';

import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE, {
    onError: (error) => {
      console.log(error)
    }
  })

  const signIn = async ({ username, password }) => {
    try {
      await mutate({
        variables: {
          username,
          password
        }
      });
    } catch (error) {
      console.error('Error occurred during sign-in:', error);
    }
  };

  return [signIn, result];
};

export default useSignIn;