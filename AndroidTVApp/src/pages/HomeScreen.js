import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Home Screen - Diagnostic View</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  text: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default HomeScreen;
