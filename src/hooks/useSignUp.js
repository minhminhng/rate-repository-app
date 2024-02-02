import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../graphql/mutations';


const useSignUp = () => {

  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error)
    },
  })

  const signUp = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { user: { username, password } }
      });
      return data ? data.createUser.username : null;
    } catch (error) {
      console.error('Error occurred during sign-up:', error);
    }
  };

  return [signUp, result];
};

export default useSignUp;