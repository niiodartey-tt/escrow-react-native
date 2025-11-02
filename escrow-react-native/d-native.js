// delete-native-tsx.js
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

function deleteNativeFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively check subdirectories
      deleteNativeFiles(fullPath);
    } else if (file.endsWith('.Native.tsx')) {
      // Delete the file
      fs.unlinkSync(fullPath);
      console.log(`Deleted: ${fullPath}`);
    }
  });
}

// Run the deletion
deleteNativeFiles(SRC_DIR);
console.log('All *.Native.tsx files have been removed.');
