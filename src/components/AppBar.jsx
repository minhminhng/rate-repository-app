import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: theme.colors.barBackground, 
  },
  item: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    fontSize: theme.fontSizes.body
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.item}>
          <Link to="/">
            <AppBarTab tabName="Repositories" />
          </Link>
          <Link to="/signin">
            <AppBarTab tabName="Sign in" />
          </Link>
        </Pressable>
      </ScrollView>
    </View>)
};

export default AppBar;