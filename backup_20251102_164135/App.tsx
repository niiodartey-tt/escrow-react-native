import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

// Import screens
import { SplashScreen } from './src/screens/Splash/SplashScreen';
import { OnboardingScreen } from './src/screens/Onboarding/OnboardingScreen';
import { LoginScreen } from './src/screens/Login/LoginScreen';
import { SignUpScreen } from './src/screens/SignUp/SignUpScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPassword/ForgotPasswordScreen';
import { Dashboard } from './src/screens/Dashboard/DashboardScreen';

// Import providers
import { ThemeProvider } from './src/contexts/ThemeContext';
import { NotificationServiceProvider } from './src/contexts/NotificationContext';

type Screen = 
  | "splash"
  | "onboarding"
  | "login"
  | "signup"
  | "forgot-password"
  | "dashboard"
  | "create-transaction"
  | "transaction-details"
  | "transaction-history"
  | "wallet"
  | "fund-wallet"
  | "withdraw"
  | "messages"
  | "chat"
  | "deals"
  | "profile"
  | "edit-profile"
  | "settings"
  | "notifications"
  | "notification-details"
  | "pin-confirmation"
  | "transaction-success"
  | "dispute"
  | "kyc-verification";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [screenData, setScreenData] = useState<any>(null);
  const [screenHistory, setScreenHistory] = useState<Screen[]>([]);
  const [globalState, setGlobalState] = useState<any>({
    notifications: [],
    messages: [],
    transactions: [],
    recentTransaction: null,
    kycStatus: "pending"
  });

  const handleNavigate = (screen: Screen, data?: any) => {
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen(screen);
    setScreenData(data);
  };

  const handleBack = () => {
    if (screenHistory.length > 0) {
      const previousScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory(screenHistory.slice(0, -1));
      setCurrentScreen(previousScreen);
      setScreenData(null);
    } else {
      setCurrentScreen("dashboard");
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onComplete={() => setCurrentScreen("onboarding")} />;
      
      case "onboarding":
        return <OnboardingScreen onComplete={() => setCurrentScreen("login")} />;
      
      case "login":
        return (
          <LoginScreen
            onLogin={() => setCurrentScreen("dashboard")}
            onNavigate={handleNavigate}
          />
        );
      
      case "signup":
        return (
          <SignUpScreen
            onSignUp={() => setCurrentScreen("dashboard")}
            onBack={() => setCurrentScreen("login")}
          />
        );
      
      case "forgot-password":
        return (
          <ForgotPasswordScreen
            onBack={() => setCurrentScreen("login")}
            onNavigate={handleNavigate}
          />
        );
      
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} kycStatus={globalState.kycStatus} />;
      
      default:
        return <Dashboard onNavigate={handleNavigate} kycStatus={globalState.kycStatus} />;
    }
  };

  return (
    <ThemeProvider>
      <NotificationServiceProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.content}>
            {renderScreen()}
          </View>
        </SafeAreaView>
      </NotificationServiceProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
});