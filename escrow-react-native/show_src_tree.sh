#!/bin/bash
# Display a clean folder structure of /src with indentation
# Run this from the project root

SRC_DIR="src"

echo "📂 Folder structure for $SRC_DIR"
echo "--------------------------------"

# Function to recursively list directories and files
print_tree() {
  local dir="$1"
  local prefix="$2"

  # List all files and directories inside
  for item in "$dir"/*; do
    [ -e "$item" ] || continue
    local name=$(basename "$item")

    if [ -d "$item" ]; then
      echo "${prefix}📁 $name/"
      print_tree "$item" "$prefix    "
    else
      echo "${prefix}📄 $name"
    fi
  done
}

print_tree "$SRC_DIR" ""
echo "--------------------------------"
echo "✅ Structure printed successfully!"
