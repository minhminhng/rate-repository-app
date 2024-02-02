import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import useSignUp from '../hooks/useSignUp';

import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
};

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).lowercase().required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], `Passwords don't match`).required('Password confirmation is required')

});

const SignUpForm = ({ onSubmit }) => {

  return (
    <View style={theme.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
      <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry/>
     
      <Pressable onPress={onSubmit}>
        <Text color="pressable" align="center" fontWeight="bold">Sign up</Text>
      </Pressable>
    </View>
  )  
}

export const SignUpContainer = ({ onSubmit }) => {
  
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  ); 
}

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password, passwordConfirm} = values;
    if (username && password && passwordConfirm) {
      try {
        const data = await signUp({ username, password });
        if (data === username) {
          try {
            await signIn({ username, password });
            navigate('/');
          }
          catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  ); 
};

export default SignUp;