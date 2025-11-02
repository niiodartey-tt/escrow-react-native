#!/bin/bash
# Restructure React Native screens into subfolders
# Run this from the root of your project

echo "🔧 Starting screen restructuring process..."

SCREENS_DIR="src/screens"

# Check if directory exists
if [ ! -d "$SCREENS_DIR" ]; then
  echo "❌ Error: Screens directory not found at $SCREENS_DIR"
  exit 1
fi

cd "$SCREENS_DIR" || exit

# Loop through all TSX files in screens directory
for file in *.tsx; do
  # Skip if no TSX files exist
  [ -e "$file" ] || continue

  # Extract screen name without extension
  SCREEN_NAME=$(basename "$file" .tsx)
  FOLDER_NAME="${SCREEN_NAME%Screen}"  # Remove 'Screen' suffix for cleaner folder names
  NEW_DIR="./$FOLDER_NAME"

  # Create folder for screen
  mkdir -p "$NEW_DIR"

  # Move the file inside the new folder
  mv "$file" "$NEW_DIR/${SCREEN_NAME}.tsx"

  # Create styles.ts placeholder if not exists
  if [ ! -f "$NEW_DIR/styles.ts" ]; then
    echo "// Styles for ${SCREEN_NAME}" > "$NEW_DIR/styles.ts"
  fi

  echo "✅ Moved $file → $NEW_DIR/"
done

echo "✨ Screen restructuring complete!"
