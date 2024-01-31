import { useMutation, useApolloClient } from '@apollo/client';

import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(AUTHENTICATE, {
    onError: (error) => {
      console.log(error)
    },
  })

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          username,
          password
        }
      });
      const token = data.authenticate.accessToken;
      await authStorage.setAccessToken(token);
      apolloClient.resetStore();
    } catch (error) {
      console.error('Error occurred during sign-in:', error);
    }
  };

  return [signIn, result];
};

export default useSignIn;