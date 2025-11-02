const fs = require('fs');
const path = require('path');

function printTree(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const pointer = isLast ? '└── ' : '├── ';
    console.log(prefix + pointer + entry.name);

    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      printTree(path.join(dir, entry.name), newPrefix);
    }
  });
}

// Change this to your src directory path
const srcDir = path.join(__dirname, 'src');

console.log('src/');
printTree(srcDir, '');
