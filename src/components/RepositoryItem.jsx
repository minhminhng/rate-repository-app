import { View, Image, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.itemBackground,
  },
});

const contentStyles = StyleSheet.create({ 
  container: {
    margin: 3,
    flexDirection: 'row',
    flexGrow: 1,
    padding: 5
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
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
  },
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
          <Text color="pressable">{language}</Text>
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

  return found ? num : null;
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

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <Content name={item.fullName} description={item.description} language={item.language} avatar={item.ownerAvatarUrl}/>
      <Footer item={item}/>
  </View>
  );
};

export default RepositoryItem;