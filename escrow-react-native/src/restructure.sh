#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Escrow React Native Restructure${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Get the project root directory
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

# Backup current structure
echo -e "${YELLOW}Creating backup...${NC}"
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r escrow-react-native "$BACKUP_DIR/" 2>/dev/null || true
echo -e "${GREEN}✓ Backup created at: $BACKUP_DIR${NC}\n"

# Navigate to the escrow-react-native directory
cd escrow-react-native

echo -e "${YELLOW}Step 1: Creating new directory structure...${NC}"

# Create new directory structure
mkdir -p src/{
contexts,
components/{ui,shared},
navigation,
screens/{
Splash,
Onboarding,
Login,
SignUp,
ForgotPassword,
Dashboard,
CreateTransaction,
TransactionDetails,
TransactionHistory,
Wallet,
FundWallet,
WithdrawFunds,
Messages,
Chat,
Deals,
Profile,
EditProfile,
Settings,
Notifications,
NotificationDetails,
PinConfirmation,
TransactionSuccess,
Dispute,
KYCVerification,
OTPVerification
},
services,
hooks,
utils,
types,
assets/{images,fonts,icons}
}

echo -e "${GREEN}✓ Directory structure created${NC}\n"

echo -e "${YELLOW}Step 2: Moving context files...${NC}"

# Move and rename context files
if [ -f "src/components/shared_components/ThemeContext.tsx" ]; then
    cp "src/components/shared_components/ThemeContext.tsx" "src/contexts/ThemeContext.tsx"
    echo -e "${GREEN}✓ Moved ThemeContext.tsx${NC}"
fi

if [ -f "src/components/shared_components/NotificationService.tsx" ]; then
    cp "src/components/shared_components/NotificationService.tsx" "src/contexts/NotificationContext.tsx"
    echo -e "${GREEN}✓ Moved NotificationService.tsx → NotificationContext.tsx${NC}"
fi

if [ -f "src/components/shared_components/BiometricService.tsx" ]; then
    cp "src/components/shared_components/BiometricService.tsx" "src/contexts/BiometricContext.tsx"
    echo -e "${GREEN}✓ Moved BiometricService.tsx → BiometricContext.tsx${NC}"
fi

echo ""

echo -e "${YELLOW}Step 3: Moving screen files...${NC}"

# Move screen files to proper locations
screens=(
    "Splash/SplashScreen.tsx:Splash"
    "Onboarding/OnboardingScreen.tsx:Onboarding"
    "Login/LoginScreen.tsx:Login"
    "SignUp/SignUpScreen.tsx:SignUp"
    "ForgotPassword/ForgotPasswordScreen.tsx:ForgotPassword"
    "Dashboard/DashboardScreen.tsx:Dashboard"
    "CreateTransaction/CreateTransactionScreen.tsx:CreateTransaction"
    "TransactionDetails/TransactionDetailsScreen.tsx:TransactionDetails"
    "TransactionHistory/TransactionHistoryScreen.tsx:TransactionHistory"
    "Wallet/WalletScreen.tsx:Wallet"
    "FundWallet/FundWalletScreen.tsx:FundWallet"
    "WithdrawFunds/WithdrawFundsScreen.tsx:WithdrawFunds"
    "Chat/ChatScreen.tsx:Chat"
    "Deals/DealsScreen.tsx:Deals"
    "Profile/ProfileScreen.tsx:Profile"
    "EditProfile/EditProfileScreen.tsx:EditProfile"
    "Settings/SettingsScreen.tsx:Settings"
    "Notifications/NotificationsScreen.tsx:Notifications"
    "NotificationDetails/NotificationDetails.tsx:NotificationDetails"
    "PinConfirmation/PinConfirmationScreen.tsx:PinConfirmation"
    "TransactionSuccess/TransactionSuccessScreen.tsx:TransactionSuccess"
    "Dispute/DisputeScreen.tsx:Dispute"
    "KYCVerification/KYCVerificationScreen.tsx:KYCVerification"
    "OTPVerification/OTPVerificationScreen.tsx:OTPVerification"
)

for screen in "${screens[@]}"; do
    IFS=":" read -r source dest <<< "$screen"
    if [ -f "src/screens/$source" ]; then
        cp "src/screens/$source" "src/screens/$dest/$dest.tsx"
        echo -e "${GREEN}✓ Moved $source${NC}"
    else
        echo -e "${YELLOW}⚠ $source not found, creating placeholder${NC}"
        touch "src/screens/$dest/$dest.tsx"
    fi
done

echo ""

echo -e "${YELLOW}Step 4: Moving shared components...${NC}"

# Move shared components
shared_components=(
    "BottomNav.tsx"
    "MessagesList.tsx"
)

for comp in "${shared_components[@]}"; do
    if [ -f "src/components/shared_components/$comp" ]; then
        cp "src/components/shared_components/$comp" "src/components/shared/$comp"
        echo -e "${GREEN}✓ Moved $comp${NC}"
    fi
done

echo ""

echo -e "${YELLOW}Step 5: Creating UI component templates...${NC}"

# Create UI component templates
ui_components=(
    "Button"
    "Input"
    "Card"
    "Badge"
    "Avatar"
    "Text"
    "Pressable"
    "Modal"
    "Select"
    "Checkbox"
    "Switch"
)

for comp in "${ui_components[@]}"; do
    cat > "src/components/ui/${comp}.tsx" << EOF
import React from 'react';
import { StyleSheet } from 'react-native';

// TODO: Implement ${comp} component for React Native

export function ${comp}(props: any) {
  return null;
}

const styles = StyleSheet.create({
  container: {},
});
EOF
    echo -e "${GREEN}✓ Created UI component template: ${comp}.tsx${NC}"
done

echo ""

echo -e "${YELLOW}Step 6: Creating navigation structure...${NC}"

# Create navigation files
cat > "src/navigation/AppNavigator.tsx" << 'EOF'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens here

const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Add screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
EOF

cat > "src/navigation/types.ts" << 'EOF'
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Dashboard: undefined;
  // Add more screen types here
};
EOF

echo -e "${GREEN}✓ Created AppNavigator.tsx${NC}"
echo -e "${GREEN}✓ Created navigation types${NC}\n"

echo -e "${YELLOW}Step 7: Creating utility files...${NC}"

# Create utils
mkdir -p src/utils
cat > "src/utils/colors.ts" << 'EOF'
export const colors = {
  primary: '#043b69',
  secondary: '#032d51',
  background: '#F9FAFB',
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
};
EOF

cat > "src/utils/spacing.ts" << 'EOF'
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
EOF

cat > "src/utils/typography.ts" << 'EOF'
export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};
EOF

echo -e "${GREEN}✓ Created colors.ts${NC}"
echo -e "${GREEN}✓ Created spacing.ts${NC}"
echo -e "${GREEN}✓ Created typography.ts${NC}\n"

echo -e "${YELLOW}Step 8: Creating type definitions...${NC}"

cat > "src/types/index.ts" << 'EOF'
export interface Transaction {
  id: string;
  name: string;
  status: string;
  amount: string;
  date: string;
  role: 'buyer' | 'seller';
  counterparty: string;
  category: string;
  description: string;
}

export interface Notification {
  id: number;
  type: 'success' | 'alert' | 'info' | 'payment';
  title: string;
  message: string;
  time: string;
  read: boolean;
  details?: any;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export type KYCStatus = 'pending' | 'under-review' | 'verified' | 'rejected';
EOF

echo -e "${GREEN}✓ Created type definitions${NC}\n"

echo -e "${YELLOW}Step 9: Creating service files...${NC}"

cat > "src/services/api.ts" << 'EOF'
// TODO: Implement API service
export class ApiService {
  private baseURL = 'https://api.example.com';

  async get(endpoint: string) {
    // Implement GET request
  }

  async post(endpoint: string, data: any) {
    // Implement POST request
  }

  async put(endpoint: string, data: any) {
    // Implement PUT request
  }

  async delete(endpoint: string) {
    // Implement DELETE request
  }
}

export const api = new ApiService();
EOF

cat > "src/services/storage.ts" << 'EOF'
import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

export const storage = new StorageService();
EOF

echo -e "${GREEN}✓ Created api.ts${NC}"
echo -e "${GREEN}✓ Created storage.ts${NC}\n"

echo -e "${YELLOW}Step 10: Creating custom hooks...${NC}"

cat > "src/hooks/useAuth.ts" << 'EOF'
import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    // Implement login logic
  };

  const logout = async () => {
    // Implement logout logic
  };

  const register = async (userData: any) => {
    // Implement registration logic
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    register,
  };
}
EOF

cat > "src/hooks/useNotifications.ts" << 'EOF'
import { useState, useEffect } from 'react';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification: any) => {
    setNotifications(prev => [...prev, notification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
}
EOF

echo -e "${GREEN}✓ Created useAuth.ts${NC}"
echo -e "${GREEN}✓ Created useNotifications.ts${NC}\n"

echo -e "${YELLOW}Step 11: Updating root files...${NC}"

# Update index.js
cat > "index.js" << 'EOF'
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
EOF
echo -e "${GREEN}✓ Updated index.js${NC}"

# Create new App.tsx
cat > "App.tsx" << 'EOF'
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { NotificationServiceProvider } from './src/contexts/NotificationContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <NotificationServiceProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </SafeAreaView>
      </NotificationServiceProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
EOF
echo -e "${GREEN}✓ Created new App.tsx${NC}\n"

echo -e "${YELLOW}Step 12: Creating package.json...${NC}"

# Update package.json
cat > "package.json" << 'EOF'
{
  "name": "escrow-react-native",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~54.0.20",
    "expo-status-bar": "~3.0.8",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "@react-native-async-storage/async-storage": "^1.23.1",
    "react-native-safe-area-context": "^4.11.0",
    "react-native-screens": "^3.34.0",
    "@react-navigation/native": "^6.1.18",
    "@react-navigation/stack": "^6.4.1",
    "react-native-gesture-handler": "~2.20.2",
    "react-native-reanimated": "~3.16.5",
    "react-native-svg": "^15.8.0",
    "react-native-vector-icons": "^10.0.3"
  },
  "devDependencies": {
    "@types/react": "~19.1.0",
    "@types/react-native": "^0.72.8",
    "typescript": "~5.9.2"
  },
  "private": true
}
EOF
echo -e "${GREEN}✓ Updated package.json${NC}\n"

echo -e "${YELLOW}Step 13: Creating .gitignore...${NC}"

cat > ".gitignore" << 'EOF'
# OSX
.DS_Store

# Xcode
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
project.xcworkspace

# Android/IntelliJ
build/
.idea
.gradle
local.properties
*.iml
*.hprof
.cxx/
*.keystore
!debug.keystore

# Node
node_modules/
npm-debug.log
yarn-error.log

# fastlane
fastlane/report.xml
fastlane/Preview.html
fastlane/screenshots
fastlane/test_output

# Bundle artifacts
*.jsbundle

# Expo
.expo/
dist/
web-build/

# Temporary files
*.swp
*.swo
*~

# Logs
*.log

# Environment
.env
.env.local
EOF
echo -e "${GREEN}✓ Created .gitignore${NC}\n"

echo -e "${YELLOW}Step 14: Creating README for new structure...${NC}"

cat > "STRUCTURE_README.md" << 'EOF'
# Escrow React Native - Project Structure

## Directory Structure

```
escrow-react-native/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   └── shared/          # Shared components
│   ├── contexts/            # React Context providers
│   ├── navigation/          # Navigation configuration
│   ├── screens/             # Screen components
│   ├── services/            # API and service layers
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   └── assets/              # Images, fonts, icons
├── App.tsx                  # Root component
├── index.js                 # Entry point
└── package.json             # Dependencies

```

## Key Changes from Web Version

1. **Contexts** - Moved from components to dedicated contexts folder
2. **UI Components** - Created React Native compatible versions
3. **Navigation** - Using React Navigation instead of manual routing
4. **Styling** - Using StyleSheet instead of CSS/Tailwind
5. **Storage** - Using AsyncStorage instead of localStorage

## Next Steps

1. Run `npm install` or `yarn install`
2. Implement screen components
3. Connect to API
4. Test on iOS/Android/Web

## Important Files

- `src/contexts/ThemeContext.tsx` - Theme management
- `src/contexts/NotificationContext.tsx` - Notifications
- `src/navigation/AppNavigator.tsx` - App navigation
- `src/components/ui/` - UI component library
EOF
echo -e "${GREEN}✓ Created STRUCTURE_README.md${NC}\n"

echo -e "${YELLOW}Step 15: Cleaning up old structure...${NC}"

# Create cleanup directories list
cat > "cleanup_old_structure.sh" << 'EOF'
#!/bin/bash
# Run this after verifying new structure works

echo "Cleaning up old structure..."

# Remove old component directories
rm -rf src/components/shared_components
rm -rf src/components/ui_components

# Remove old style files if they exist
rm -f src/styles/global.ts
rm -f src/styles/spacing.ts
rm -f src/styles/typography.ts
rm -f src/styles/colors.ts

echo "Cleanup complete!"
EOF
chmod +x cleanup_old_structure.sh
echo -e "${GREEN}✓ Created cleanup script (run manually after verification)${NC}\n"

echo -e "${YELLOW}Step 16: Creating installation script...${NC}"

cat > "install_dependencies.sh" << 'EOF'
#!/bin/bash

echo "Installing dependencies..."

# Clean install
rm -rf node_modules package-lock.json yarn.lock

# Install base dependencies
npm install

# Install Expo dependencies
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-safe-area-context react-native-screens
npx expo install @react-navigation/native @react-navigation/stack
npx expo install react-native-gesture-handler react-native-reanimated
npx expo install react-native-vector-icons

echo "Dependencies installed successfully!"
echo "Run 'npm start' or 'yarn start' to start the app"
EOF
chmod +x install_dependencies.sh
echo -e "${GREEN}✓ Created install_dependencies.sh${NC}\n"

# Create a summary file
cat > "RESTRUCTURE_SUMMARY.md" << EOF
# Restructure Summary

## Completed: $(date)

### New Directory Structure Created ✓
- src/contexts/
- src/components/ui/
- src/components/shared/
- src/navigation/
- src/screens/ (all screen folders)
- src/services/
- src/hooks/
- src/utils/
- src/types/
- src/assets/

### Files Created ✓
- Navigation setup
- UI component templates
- Utility files (colors, spacing, typography)
- Type definitions
- Service files (API, Storage)
- Custom hooks
- Updated App.tsx
- Updated index.js
- New package.json
- .gitignore

### Scripts Created ✓
- install_dependencies.sh - Install all required packages
- cleanup_old_structure.sh - Remove old files (run after verification)

## Next Steps

1. Review the new structure
2. Run: \`./install_dependencies.sh\`
3. Implement screen components based on templates
4. Test the app: \`npm start\`
5. Once verified, run: \`./cleanup_old_structure.sh\`

## Backup Location
Your original files are backed up at: $BACKUP_DIR

## Important Notes
- All UI components need to be implemented
- Screen files need React Native conversion
- Replace all web-specific code with React Native equivalents
- Test thoroughly before removing old files
EOF

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Restructure Complete! ✓${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "${BLUE}Summary:${NC}"
echo -e "  • Created new directory structure"
echo -e "  • Moved existing files to new locations"
echo -e "  • Created UI component templates"
echo -e "  • Set up navigation structure"
echo -e "  • Created utility and service files"
echo -e "  • Updated root configuration files"
echo -e ""
echo -e "${YELLOW}Next Steps:${NC}"
echo -e "  1. Review changes: ${GREEN}cat RESTRUCTURE_SUMMARY.md${NC}"
echo -e "  2. Install dependencies: ${GREEN}./install_dependencies.sh${NC}"
echo -e "  3. Start development: ${GREEN}npm start${NC}"
echo -e ""
echo -e "${BLUE}Backup location:${NC} ${YELLOW}$BACKUP_DIR${NC}"
echo -e ""
echo -e "${GREEN}Happy coding! 🚀${NC}\n"
EOF

chmod +x restructure.sh
echo -e "${GREEN}✓ Created restructure.sh script${NC}"
