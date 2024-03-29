import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import useSignIn from '../hooks/useSignIn';

import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {

  return (
    <View style={theme.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
     
      <Pressable onPress={onSubmit}>
        <Text style="buttonPrimary">Sign in</Text>
      </Pressable>
    </View>
  )  
}

export const SignInContainer = ({ onSubmit }) => {
  
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  ); 
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    if (username && password) {
      try {
        await signIn({ username, password });
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  ); 
};

export default SignIn;