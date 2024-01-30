import { View, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: theme.colors.barBackground, 
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // gap: 10,
  },
  item: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around'
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
            <AppBarTab tabName="Sign In" />
          </Link>
        </Pressable>
      </ScrollView>
    </View>)
};

export default AppBar;