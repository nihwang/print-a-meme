import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MemeImage from './components/memeMaker/memeMaker'
import { getMeme } from './api/memeApi';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Print-A-Meme</Text>
      <MemeImage></MemeImage>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginTop: 60,
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  }
});
