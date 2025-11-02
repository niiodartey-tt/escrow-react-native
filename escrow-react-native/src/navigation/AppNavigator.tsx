import React from 'react';
import { View, Text } from 'react-native';

// TODO: Install @react-navigation/native and @react-navigation/stack
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Navigation Setup Required</Text>
      <Text style={{ marginTop: 10, fontSize: 12, color: '#666' }}>
        Run: npm install @react-navigation/native @react-navigation/stack
      </Text>
    </View>
  );
}
