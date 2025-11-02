const fs = require('fs');
const path = require('path');

// Mapping of HTML tags to React Native components
const tagMap = {
  div: 'View',
  span: 'Text',
  p: 'Text',
  h1: 'Text',
  h2: 'Text',
  h3: 'Text',
  h4: 'Text',
  h5: 'Text',
  h6: 'Text',
  button: 'Pressable',
  img: 'Image',
  ul: 'View',
  li: 'Text',
  a: 'Text',
  section: 'View',
  header: 'View',
  footer: 'View',
  nav: 'View',
  main: 'View',
  article: 'View',
  aside: 'View',
  form: 'View',
  input: 'TextInput',
  textarea: 'TextInput',
  label: 'Text',
  video: 'View',
};

// React Native components to import (we’ll detect which are used)
const reactNativeComponents = new Set();

// Recursively get all .ts and .tsx files
function getFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getFiles(fullPath, files);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Convert web JSX to React Native JSX
function convertFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace className="..." with style={/* ... */}
  content = content.replace(/className\s*=\s*["']([^"']*)["']/g, 'style={/* $1 */}');

  // Replace common HTML props
  content = content.replace(/onClick\s*=/g, 'onPress=');
  content = content.replace(/src\s*=\s*["']([^"']*)["']/g, 'source={{ uri: "$1" }}');
  content = content.replace(/alt\s*=\s*["'][^"']*["']/g, ''); // remove alt

  // Replace all tags
  Object.keys(tagMap).forEach((tag) => {
    const rnTag = tagMap[tag];
    reactNativeComponents.add(rnTag);

    // opening tags <div ...>
    const openTagRegex = new RegExp(`<${tag}(\\s[^>]*)?>`, 'g');
    content = content.replace(openTagRegex, `<${rnTag}$1>`);

    // self-closing <img ... />
    const selfCloseRegex = new RegExp(`<${tag}([^>]*)/>`, 'g');
    content = content.replace(selfCloseRegex, `<${rnTag}$1 />`);

    // closing tags </div>
    const closeTagRegex = new RegExp(`</${tag}>`, 'g');
    content = content.replace(closeTagRegex, `</${rnTag}>`);
  });

  // Add React Native imports at the top
  const importLine = `import { ${Array.from(reactNativeComponents).join(
    ', '
  )} } from 'react-native';\n`;

  if (!content.includes('react-native')) {
    content = importLine + content;
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Converted: ${filePath}`);
}

// Main
const srcDir = path.join(__dirname, 'src');
const files = getFiles(srcDir);
files.forEach(convertFile);

console.log('✅ Conversion to React Native complete!');
