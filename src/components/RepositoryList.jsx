import { Component, useState } from 'react';
import { FlatList, View, StyleSheet, StatusBar} from 'react-native';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import SortingMenu from './SortingMenu';
import { Searchbar } from 'react-native-paper';
import useRepositories from '../hooks/useRepositories';


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

export const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => {
  return (
    <RepositoryItem item={item} showUrl/>
  );
};

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
    return (
      <FlatList
        data={this.props.repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => this.renderHeader(this.props)}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('CREATED_AT');
  const [direction, setDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [option, setOption] = useState(1);
  
  const { repositories } = useRepositories(order, direction, searchKeyword);

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return <RepositoryListContainer 
    repositories={repositoryNodes} 
    setOrder={setOrder} setDirection={setDirection} 
    setOption={setOption} option={option}
    setSearchKeyword={setSearchKeyword} searchKeyword={searchKeyword}
    // debounceCallback={debounced}
    />;
};

export default RepositoryList;