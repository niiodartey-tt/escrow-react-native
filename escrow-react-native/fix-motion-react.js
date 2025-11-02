// fix-motion-react.js
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove import from motion/react
  content = content.replace(/import\s+\{\s*motion\s*,\s*AnimatePresence\s*\}\s+from\s+['"]motion\/react['"];?/g, '');

  // Replace <motion.div> and <motion.View> with <View>
  content = content.replace(/<motion\.(div|View)/g, '<View');
  content = content.replace(/<\/motion\.(div|View)>/g, '</View>');

  // Replace <AnimatePresence> with fragment
  content = content.replace(/<AnimatePresence>/g, '<>');
  content = content.replace(/<\/AnimatePresence>/g, '</>');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Processed: ${filePath}`);
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  });
}

// Start processing
walkDir(SRC_DIR);
console.log('All files processed.');
