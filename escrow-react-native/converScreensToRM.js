const fs = require('fs');
const path = require('path');

const SCREENS_DIR = path.join(__dirname, 'src/screens');

function convertFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1️⃣ Replace web tags with RN tags
  const tagMap = { div: 'View', span: 'Text', p: 'Text', h1: 'Text', h2: 'Text', h3: 'Text', h4: 'Text', h5: 'Text', h6: 'Text' };
  Object.keys(tagMap).forEach(webTag => {
    const nativeTag = tagMap[webTag];
    content = content.replace(new RegExp(`<${webTag}(\\s[^>]*)?>`, 'gi'), `<${nativeTag}$1>`);
    content = content.replace(new RegExp(`</${webTag}>`, 'gi'), `</${nativeTag}>`);
  });

  // 2️⃣ Replace motion.div with Animated.View
  content = content.replace(/motion\.div/gi, 'Animated.View');

  // 3️⃣ Remove motion/react imports
  content = content.replace(/import\s*{[^}]*motion[^}]*}\s*from\s*['"]motion\/react['"];?/gi, '');

  // 4️⃣ Remove AnimatePresence import
  content = content.replace(/AnimatePresence/gi, '');

  // 5️⃣ Remove className
  content = content.replace(/\sclassName="[^"]*"/gi, '');

  // 6️⃣ Add RN imports if missing
  if (!/from\s+['"]react-native['"]/.test(content)) {
    content = content.replace(/import\s+React.*from\s+['"]react['"];?/, `
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
`);
  }

  // 7️⃣ Add StyleSheet placeholder if missing
  if (!/StyleSheet.create/.test(content)) {
    content += `

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});
`;
  }

  const outputFile = filePath.replace(/\.tsx$/, '.Native.tsx');
  fs.writeFileSync(outputFile, content, 'utf-8');
  console.log('✅ Converted:', path.basename(filePath), '→', path.basename(outputFile));
}

// Recursively scan screens folder
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.tsx')) {
      convertFile(fullPath);
    }
  });
}

walkDir(SCREENS_DIR);
console.log('✅ All .tsx files converted to React Native compatible versions!');
