#!/bin/bash

echo "Installing dependencies..."
echo ""

# Clean install
echo "Cleaning old dependencies..."
rm -rf node_modules package-lock.json yarn.lock

echo "Installing base packages..."
npm install

echo ""
echo "Installing React Native packages..."
npm install @react-native-async-storage/async-storage
npm install @react-navigation/native @react-navigation/stack
npm install react-native-safe-area-context react-native-screens
npm install react-native-gesture-handler react-native-reanimated
npm install react-native-vector-icons

echo ""
echo "✓ All dependencies installed!"
echo ""
echo "Run 'npm start' to start the app"
