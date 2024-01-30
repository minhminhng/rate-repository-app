import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import theme from '../theme';
import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.itemBackground,
    borderWidth: 1,
    margin: 3,
    padding: 10,
    borderRadius: 4,
    borderColor: theme.colors.border,
    fontSize: theme.fontSizes.body
  },
  errorText: {
    marginTop: 5,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;