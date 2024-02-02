import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import useReview from '../hooks/useReview';

import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: null,
    text: ''
};

const styles = {
  container: {
    flex: 0,
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.itemBackground
  }
}

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required('Repository name is required').lowercase().trim(),
  ownerName: yup.string().required('Repository owner name is required').lowercase().trim(),
  rating: yup.number().integer('Rating must be an integer')
    .min(0, 'Rating must be higher than or equal to 0')
    .max(100, 'Rating must be less than or equal to 100').required('Rating is required'),
  text: yup.string().max(2000, 'Review can have maximum 2000 characters').trim(),
});

const SignInForm = ({ onSubmit }) => {

  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput multiline name="text" placeholder="Review" />
      <Pressable onPress={onSubmit}>
        <Text color="pressable" align="center" fontWeight="bold">Create a review</Text>
      </Pressable>
    </View>
  )  
}

export const ReviewFormContainer = ({ onSubmit }) => {
  
  return (
    <Formik 
      initialValues={{...initialValues}} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  ); 
}

const ReviewForm = () => {
  const [createReview] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    if ( ownerName !== '' && repositoryName !== '' && isFinite(rating) ) {
      try {
        const {data} = await createReview({ ownerName, repositoryName, rating, text });
        const id = data.createReview.repositoryId;
        navigate(`/repositories/${id}`);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <ReviewFormContainer onSubmit={onSubmit} />
  ); 
};

export default ReviewForm;