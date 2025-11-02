import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Escrow React Native</Text>
        <Text style={styles.subtitle}>Restructure Complete!</Text>
        <Text style={styles.instruction}>Next: Run install_dependencies.sh</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#043b69',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  instruction: {
    fontSize: 14,
    color: '#999',
  },
});
