import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  button: {
    color: theme.colors.buttonText,
    backgroundColor: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    padding: 10,
    borderRadius: 4,
    marginTop: 5
  },
  buttonRed: {
    backgroundColor: theme.colors.error,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  }
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style === 'buttonPrimary' && styles.button,
    style === 'buttonRed' && [styles.button, styles.buttonRed],
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;