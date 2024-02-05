import { Component, useState } from 'react';
import { FlatList, View, StyleSheet, StatusBar} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';
import SortingMenu from './SortingMenu';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  separator: {
    height: 10,
  },
  searchBar: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  }
});

export class RepositoryListContainer extends Component {
  renderHeader = () => {
    const { setOrder, setDirection, setOption, option, searchKeyword, setSearchKeyword } = this.props;
    const [inputKeyword, setInputKeyword] = useState(searchKeyword); 
    
    const debounced = useDebouncedCallback(
      (value) => {
        setSearchKeyword(value);
      },
      500
    );

    const onChangeText = (keyword) => {
      setInputKeyword(keyword);
      debounced(keyword);
    }

    return (
      <View>
        <Searchbar style={styles.searchBar}
        placeholder="Search"
        onChangeText={onChangeText}
        value={inputKeyword}
        />
        <SortingMenu setOrder={setOrder} setDirection={setDirection} setOption={setOption} option={option} />
      </View>
    );
  };
  
  render() {
    const repositoryNodes = this.props.repositories
    ? this.props.repositories.edges.map(edge => edge.node)
    : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} showUrl/>}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => this.renderHeader(this.props)}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrder] = useState('CREATED_AT');
  const [orderDirection, setDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [option, setOption] = useState(1);
  
  const { repositories, fetchMore } = useRepositories({ first: 7, orderBy, orderDirection, searchKeyword });

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer 
    repositories={repositories} 
    setOrder={setOrder} setDirection={setDirection} 
    setOption={setOption} option={option}
    setSearchKeyword={setSearchKeyword} searchKeyword={searchKeyword}
    onEndReach={onEndReach}
    />;
};

export default RepositoryList;