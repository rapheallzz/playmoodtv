import { Platform, Dimensions } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
export const isTV = Platform.isTV || (Platform.OS === 'android' && windowWidth > 900 && (windowWidth / windowHeight) > 1.6);

export const isLandscape = () => {
  const { width, height } = Dimensions.get('window');
  return width > height;
};
