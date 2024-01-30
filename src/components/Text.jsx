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
  colorPressable: {
    color: theme.colors.buttonText,
    backgroundColor: theme.colors.primary,    
    borderRadius: 4,
    padding: 4,
    marginTop: 5
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  alignCenter: {
    textAlign: 'center',
    padding: 10
  }
});

const Text = ({ color, fontSize, fontWeight, align, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'pressable' && styles.colorPressable,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    align === 'center' && styles.alignCenter,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;