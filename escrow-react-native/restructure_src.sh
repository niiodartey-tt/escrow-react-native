#!/bin/bash
# Restructure React Native src folder to match new standards

echo "🔧 Starting restructuring of /src ..."

SRC_DIR="src"

# 1. Rename folders in components/
COMP_DIR="$SRC_DIR/components"

if [ -d "$COMP_DIR/ui" ]; then
  mv "$COMP_DIR/ui" "$COMP_DIR/ui_components"
  echo "✅ Renamed 'ui' → 'ui_components'"
fi

if [ -d "$COMP_DIR/shared" ]; then
  mv "$COMP_DIR/shared" "$COMP_DIR/shared_components"
  echo "✅ Renamed 'shared' → 'shared_components'"
fi

# 2. Create utils folder if missing
UTILS_DIR="$SRC_DIR/utils"
if [ ! -d "$UTILS_DIR" ]; then
  mkdir "$UTILS_DIR"
  echo "✅ Created new folder: utils/"
fi

# 3. Clean up: remove any empty folders
find "$SRC_DIR" -type d -empty -delete

echo "✨ Restructuring complete!"
echo "📁 Updated structure:"
echo "--------------------------------"
ls -R "$SRC_DIR" | sed 's/^/    /'
echo "--------------------------------"
echo "✅ You can now safely update imports to reflect new structure."
