#!/bin/bash

# Base folder
BASE_DIR="src"

# Screens
SCREENS=(
  "Dashboard.tsx"
  "DealsScreen.tsx"
  "WalletScreen.tsx"
  "SettingsScreen.tsx"
  "ProfileScreen.tsx"
  "ChatScreen.tsx"
  "NotificationsScreen.tsx"
  "FundWallet.tsx"
  "WithdrawFunds.tsx"
  "TransactionHistory.tsx"
  "TransactionDetails.tsx"
  "TransactionSuccess.tsx"
  "CreateTransaction.tsx"
  "DisputeScreen.tsx"
  "KYCVerificationScreen.tsx"
  "OnboardingScreen.tsx"
  "SplashScreen.tsx"
  "SignUpScreen.tsx"
  "LoginScreen.tsx"
  "ForgotPasswordScreen.tsx"
  "PinConfirmation.tsx"
  "OTPVerification.tsx"
  "EditProfileScreen.tsx"
)

# Components
COMPONENTS=(
  "BottomNav.tsx"
  "MessagesList.tsx"
  "NotificationService.ts"
  "BiometricService.ts"
  "ThemeContext.tsx"
)

# UI Components
UI_COMPONENTS=(
  "Button.tsx"
  "Card.tsx"
  "Dialog.tsx"
  "Chart.tsx"
  "Input.tsx"
  "Calendar.tsx"
  "Accordion.tsx"
  "Avatar.tsx"
  "Checkbox.tsx"
  "Badge.tsx"
)

# Styles
STYLES=(
  "colors.ts"
  "global.ts"
)

# Navigation
NAVIGATION=(
  "AppNavigator.tsx"
  "AuthNavigator.tsx"
)

# Assets folder
ASSETS="assets"

# Mapping file
MAPPING="mapping.md"

echo "Creating project structure..."

# Create base folders
mkdir -p "$BASE_DIR/screens"
mkdir -p "$BASE_DIR/components/ui"
mkdir -p "$BASE_DIR/styles"
mkdir -p "$BASE_DIR/navigation"
mkdir -p "$BASE_DIR/$ASSETS"

# Create screens
for file in "${SCREENS[@]}"; do
  touch "$BASE_DIR/screens/$file"
done

# Create components
for file in "${COMPONENTS[@]}"; do
  touch "$BASE_DIR/components/$file"
done

# Create UI components
for file in "${UI_COMPONENTS[@]}"; do
  touch "$BASE_DIR/components/ui/$file"
done

# Create styles
for file in "${STYLES[@]}"; do
  touch "$BASE_DIR/styles/$file"
done

# Create navigation files
for file in "${NAVIGATION[@]}"; do
  touch "$BASE_DIR/navigation/$file"
done

# Create mapping.md
touch "$BASE_DIR/$MAPPING"

echo "Project structure created successfully!"
