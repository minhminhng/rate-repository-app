import { View, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Formik } from 'formik';

import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

const initialValues = {
  username: '',
  password: '',
};

const styles = {
  container: {
    flex: 0,
    backgroundColor: 'white',
    padding: 10,
  },
  input: {
    color: theme.colors.textPrimary,
    backgroundColot: theme.colors.itemBackground
  },
  button: {
    // padding: 5
  }
}

const SignInForm = ({ onSubmit }) => {

  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
     
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text color="pressable" align="center" fontWeight="bold">Sign in</Text>
      </Pressable>
    </View>
  )  
}

const SignIn = () => {

  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;
    if (username && password) {
      console.log(values);
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  ); 
};

export default SignIn;