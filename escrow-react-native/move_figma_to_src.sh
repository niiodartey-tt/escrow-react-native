#!/bin/bash
# Move Figma design files into src structure for React Native project
# Run this from your project root

set -e  # Stop on error

FIGMA_DIR="figma"
SRC_DIR="src"
BACKUP_DIR="figma_backup"

echo "🎨 Starting migration from Figma folder to src structure..."

# Step 1: Backup figma folder
if [ -d "$FIGMA_DIR" ]; then
  echo "📦 Creating backup at $BACKUP_DIR..."
  cp -r "$FIGMA_DIR" "$BACKUP_DIR"
  echo "✅ Backup complete."
else
  echo "❌ No figma folder found. Exiting."
  exit 1
fi

# Step 2: Ensure target folders exist
mkdir -p "$SRC_DIR/screens"
mkdir -p "$SRC_DIR/components/shared_components"
mkdir -p "$SRC_DIR/components/ui_components"
mkdir -p "$SRC_DIR/styles"

# Step 3: Move screen files
echo "🚚 Moving screen components..."
for screen in Dashboard Deals Dispute EditProfile ForgotPassword FundWallet KYCVerification Login Notifications Onboarding OTPVerification PinConfirmation Profile Settings SignUp Splash TransactionDetails TransactionHistory TransactionSuccess Wallet WithdrawFunds Chat CreateTransaction; do
  src_file="$FIGMA_DIR/components/${screen}.tsx"
  if [ -f "$src_file" ]; then
    target_dir="$SRC_DIR/screens/${screen}"
    mkdir -p "$target_dir"
    mv "$src_file" "$target_dir/${screen}Screen.tsx"
    echo "✅ Moved ${screen}.tsx → ${target_dir}/"
  fi
done

# Step 4: Move shared components/services
echo "🔁 Moving shared and service components..."
for file in BiometricService.tsx BottomNav.tsx MessagesList.tsx NotificationService.tsx ThemeContext.tsx NotificationDetails.tsx TransactionTypeModal.tsx; do
  if [ -f "$FIGMA_DIR/components/$file" ]; then
    mv "$FIGMA_DIR/components/$file" "$SRC_DIR/components/shared_components/"
    echo "✅ Moved $file → shared_components/"
  fi
done

# Step 5: Move UI components
echo "🎨 Moving UI components..."
if [ -d "$FIGMA_DIR/components/ui" ]; then
  mv "$FIGMA_DIR/components/ui/"* "$SRC_DIR/components/ui_components/"
  echo "✅ UI components moved."
fi

# Step 6: Move global styles
if [ -f "$FIGMA_DIR/styles/globals.css" ]; then
  mv "$FIGMA_DIR/styles/globals.css" "$SRC_DIR/styles/global.css"
  echo "✅ Moved globals.css → styles/global.css"
fi

# Step 7: Clean up
echo "🧹 Cleaning up empty folders..."
find "$FIGMA_DIR" -type d -empty -delete

echo "--------------------------------"
echo "✨ Migration complete!"
echo "✅ All Figma files have been organized under src/"
echo "📦 Original figma folder backed up at $BACKUP_DIR/"
