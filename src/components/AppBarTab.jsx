import { StyleSheet } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.barText,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold
  }
});

const AppBarTab = ( {tabName} ) => {
  return (
    <Pressable>
      <Text style={styles.text}>{tabName}</Text>
    </Pressable>
  );
};

export default AppBarTab;