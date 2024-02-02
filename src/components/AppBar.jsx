import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import useAuthStorage from '../hooks/useAuthStorage';
import useUser from '../hooks/useUser';

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
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (loading) {
    return <div>loading...</div>;
  }

  const onSignOut = async () => {
    try {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
      navigate('/');
    } catch (error) {
      console.error('Error occurred during sign-in:', error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.item}>
          <Link to="/">
            <AppBarTab tabName="Repositories" />
          </Link>
          {!user &&
            <Link to="/signin">
              <AppBarTab tabName="Sign in" />
            </Link>}
          {!user &&
            <Link to="/signup">
              <AppBarTab tabName="Sign up" />
            </Link>}
          {user && 
            <Link to="/review">
              <AppBarTab tabName="Create a review" />
            </Link>}
          {user && 
            <Pressable onPress={onSignOut}>
              <AppBarTab tabName="Sign out" />
            </Pressable>}
        </View>        
      </ScrollView>
    </View>)
};

export default AppBar;