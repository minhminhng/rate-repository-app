import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    buttonText: 'white',
    primary: '#0366d6',
    barBackground: '#24292e',
    barText: 'white',
    mainBackground: '#e1e4e8',
    itemBackground: 'white',
    border: '#586069',
    error: 'red'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  item: {
    padding: 10
  },
  form: {
    flex: 0,
    backgroundColor: 'white',
    padding: 20,
  }
};

export default theme;