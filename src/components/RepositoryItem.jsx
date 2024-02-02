import { View, Image, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.itemBackground,
    marginBottom: 10
  },
});

const contentStyles = StyleSheet.create({ 
  container: {
    margin: 5,
    flexDirection: 'row',
    flexGrow: 1
  },
  languageContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 4,
  },
  avatarContainer: {
    padding:5,
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    padding:5,
    flexGrow: 1,
  }
});

const Content = ({ name, description, language, avatar }) => {
  return (
    <View style={contentStyles.container}>
      <View style={contentStyles.avatarContainer}>
        <Image style={contentStyles.avatar} source={{uri:`${avatar}`}} />
      </View>
      <View style={contentStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{name}</Text>
        <Text color="textSecondary">{description}</Text>
        <View style={contentStyles.languageContainer}>
          <Text color="pressable" align="center">{language}</Text>
        </View>
      </View>      
    </View>
  );
};

const footerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  }
});

const formatNumber = (num) => {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    if (num % found.threshold >= found.threshold / 10) {
      const formatted = (num / found.threshold).toFixed(1) + found.suffix;
      return formatted;
    }
    else {
      const formatted = (num / found.threshold).toFixed(0) + found.suffix;
      return formatted;
    }
  }

  return num;
}

const FooterElement = ({ info, value }) => {
  return (
    <View>
      <Text>{formatNumber(value)}</Text>
      <Text>{info}</Text>
    </View>
  )
}

const Footer = ({ item }) => {
  return (
    <View style={footerStyles.container}>
      <FooterElement />
      <FooterElement info="Stars" value={item.stargazersCount} />
      <FooterElement info="Forks" value={item.forksCount} />
      <FooterElement info="Reviews" value={item.reviewCount} />
      <FooterElement info="Rating" value={item.ratingAverage} />
    </View>
  );
};

export const RepositoryItemContainer = ({ item, showUrl }) => {
  if (!item) {
    return <Text>Loading</Text>
  }

  const openUrl = () => {
    if (item.url) {
      Linking.openURL(item.url);
    }
  }
  return (
    <View style={styles.container}>
      <Content name={item.fullName} description={item.description} language={item.language} avatar={item.ownerAvatarUrl}/>
      <Footer item={item}/>    
      {showUrl && 
        <Pressable style={{margin: 10}} onPress={openUrl}>
          <Text color="pressable" align="center" fontWeight="bold" fontSize="subHeading">
            Open in GitHub
          </Text>            
        </Pressable>} 
    </View>
  )
}

const RepositoryItem = ({ item }) => {
  const navigate = useNavigate();
  const onPress = () => {
    navigate(`/repositories/${item.id}`)
  }

  return (
    <Pressable testID="repositoryItem" onPress={onPress}>
        <RepositoryItemContainer item={item} />
    </Pressable> 
  );
};

export default RepositoryItem;