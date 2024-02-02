import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import theme from '../theme';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import AppBar from './AppBar';
import SignIn from './SignIn';
import Review from './Review';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/review" element={<Review />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;