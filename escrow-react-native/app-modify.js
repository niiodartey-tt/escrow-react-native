const fs = require('fs');
const path = require('path');

// Paths
const inputFile = path.join(__dirname, 'App.tsx');
const outputFile = path.join(__dirname, 'App.Native.tsx');

// Read App.tsx content
let content = fs.readFileSync(inputFile, 'utf-8');

// 1️⃣ Replace React web tags with React Native tags
const tagMap = { div: 'View', span: 'Text', p: 'Text', h1: 'Text', h2: 'Text', h3: 'Text', h4: 'Text', h5: 'Text', h6: 'Text' };
Object.keys(tagMap).forEach(webTag => {
  const nativeTag = tagMap[webTag];
  content = content.replace(new RegExp(`<${webTag}(\\s[^>]*)?>`, 'gi'), `<${nativeTag}$1>`);
  content = content.replace(new RegExp(`</${webTag}>`, 'gi'), `</${nativeTag}>`);
});

// 2️⃣ Replace motion.div with Animated.View
content = content.replace(/motion\.div/gi, 'Animated.View');

// 3️⃣ Remove AnimatePresence import and motion/react import
content = content.replace(/import\s*{[^}]*motion[^}]*}\s*from\s*['"]motion\/react['"];?/gi, '');

// 4️⃣ Remove all className="..."
content = content.replace(/\sclassName="[^"]*"/gi, '');

// 5️⃣ Replace useState import line with React Native imports
content = content.replace(/import { useState, useEffect } from ["']react["'];?/, `
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
`);

// 6️⃣ Add StyleSheet placeholder at the bottom if not present
if (!/StyleSheet.create/.test(content)) {
  content += `

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  innerContainer: {
    flex: 1,
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
`;
}

// 7️⃣ Save to App.Native.tsx
fs.writeFileSync(outputFile, content, 'utf-8');

console.log('✅ Conversion complete! Output saved to App.Native.tsx');
console.log('➡️ Update your index.ts to import App from "./App.Native"');
