import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ChannelSlider from './src/components/ChannelSlider';
import { Creator } from './src/types';

const MOCK_CREATORS: Creator[] = [
  { _id: '1', name: 'Creator 1', profileImage: 'https://via.placeholder.com/150' },
  { _id: '2', name: 'Creator 2', profileImage: 'https://via.placeholder.com/150' },
  { _id: '3', name: 'Creator 3', profileImage: 'https://via.placeholder.com/150' },
  { _id: '4', name: 'Creator 4', profileImage: 'https://via.placeholder.com/150' },
  { _id: '5', name: 'Creator 5', profileImage: 'https://via.placeholder.com/150' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <ChannelSlider data={MOCK_CREATORS} onChannelPress={(id) => console.log(id)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
