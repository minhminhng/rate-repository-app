import { View, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: theme.item.padding
  },
  text: {
    color: theme.colors.barText,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold
  }
});

const AppBarTab = ( {tabName} ) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{tabName}</Text>
    </View>
  );
};

export default AppBarTab;