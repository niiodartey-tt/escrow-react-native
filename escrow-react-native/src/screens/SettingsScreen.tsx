import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { ArrowLeft, ChevronRight, Globe, Bell, Lock, CreditCard, Moon, Sun, Shield, User, HelpCircle, FileText, LogOut, Smartphone } from "lucide-react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { useTheme } from "./ThemeContext";
import { useNotificationService } from "./NotificationService";
import { useBiometric } from "./BiometricService";

interface SettingsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

export function SettingsScreen({ onBack, onNavigate }: SettingsScreenProps) {
  const { isDark, toggleTheme } = useTheme();
  const { requestNotificationPermission, hasPermission } = useNotificationService();
  const { isAvailable: biometricAvailable, isEnrolled: biometricEnrolled, enroll } = useBiometric();
  
  const [notifications, setNotifications] = useState(hasPermission);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometric, setBiometric] = useState(biometricEnrolled);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleNotificationsToggle = (checked: boolean) => {
    if (checked) {
      requestNotificationPermission();
    }
    setNotifications(checked);
    toast.success(checked ? "Push notifications enabled" : "Push notifications disabled");
  };

  const handleEmailAlertsToggle = (checked: boolean) => {
    setEmailAlerts(checked);
    toast.success(checked ? "Email alerts enabled" : "Email alerts disabled");
  };

  const handle2FAToggle = (checked: boolean) => {
    setTwoFactorAuth(checked);
    toast.success(checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled");
  };

  const handleBiometricToggle = async (checked: boolean) => {
    if (checked && !biometricEnrolled) {
      const success = await enroll();
      if (success) {
        setBiometric(true);
        toast.success("Biometric authentication enabled");
      } else {
        setBiometric(false);
        toast.error("Failed to enable biometric authentication");
      }
    } else {
      setBiometric(checked);
      toast.success(checked ? "Biometric authentication enabled" : "Biometric authentication disabled");
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    setShowLogoutDialog(false);
    if (onNavigate) {
      onNavigate("login");
    }
  };

  const languageNames: { [key: string]: string } = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
  };

  return (
    <View style={`h-screen pb-24 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-[#F9FAFB]'}`}>
      <View
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={`p-6 text-white ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-[#043b69] to-[#032d51]'}`}
      >
        <View style="flex items-center gap-4 max-w-md mx-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onPress={onBack}
            style="p-2 hover:bg-white/10"
          >
            <ArrowLeft style="w-5 h-5" />
          </motion.button>
          <View>
            <Text style={{fontSize:20,fontWeight:"600"}}>Settings</Text>
            <Text style="text-xs opacity-80">Manage your preferences</Text>
          </View>
        </View>
      </View>

      <View style="max-w-md mx-auto p-6 space-y-6">
        {/* Appearance */}
        <View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Text style={`mb-3 ${isDark ? 'text-white' : ''}`}>Appearance</Text>
          <Card style={`p-4 shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
            <View style="flex items-center justify-between">
              <View style="flex items-center gap-3">
                {isDark ? (
                  <Moon style="w-5 h-5 text-blue-500" />
                ) : (
                  <Sun style="w-5 h-5 text-[#043b69]" />
                )}
                <View>
                  <View style={isDark ? 'text-white' : ''}>Dark Mode</View>
                  <Text style={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isDark ? 'Currently using dark theme' : 'Switch to dark theme'}
                  </Text>
                </View>
              </View>
              <Switch
                checked={isDark}
                onCheckedChange={() => {
                  toggleTheme();
                  toast.success(isDark ? "Light mode enabled" : "Dark mode enabled");
                }}
              />
            </View>
          </Card>
        </View>

        {/* Notifications */}
        <View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Text style={`mb-3 ${isDark ? 'text-white' : ''}`}>Notifications</Text>
          <Card style={`p-4 shadow-md space-y-4 ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
            <View style="flex items-center justify-between">
              <View style="flex items-center gap-3">
                <Smartphone style={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-[#043b69]'}`} />
                <View>
                  <View style={isDark ? 'text-white' : ''}>Push Notifications</View>
                  <Text style={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Get real-time push notifications
                  </Text>
                </View>
              </View>
              <Switch
                checked={notifications}
                onCheckedChange={handleNotificationsToggle}
              />
            </View>
            <View style="flex items-center justify-between">
              <View style="flex items-center gap-3">
                <Bell style={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-[#043b69]'}`} />
                <View>
                  <View style={isDark ? 'text-white' : ''}>Email Alerts</View>
                  <Text style={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Receive email updates</Text>
                </View>
              </View>
              <Switch
                checked={emailAlerts}
                onCheckedChange={handleEmailAlertsToggle}
              />
            </View>
          </Card>
        </View>

        {/* Security */}
        <View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Text style={`mb-3 ${isDark ? 'text-white' : ''}`}>Security</Text>
          <Card style={`p-4 shadow-md space-y-4 ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
            <View style="flex items-center justify-between">
              <View style="flex items-center gap-3">
                <Shield style={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-[#043b69]'}`} />
                <View>
                  <View style={isDark ? 'text-white' : ''}>Two-Factor Authentication</View>
                  <Text style={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Add extra security layer</Text>
                </View>
              </View>
              <Switch
                checked={twoFactorAuth}
                onCheckedChange={handle2FAToggle}
              />
            </View>
            <View style="flex items-center justify-between">
              <View style="flex items-center gap-3">
                <Lock style={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-[#043b69]'}`} />
                <View>
                  <View style={isDark ? 'text-white' : ''}>Biometric Login</View>
                  <Text style={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Use fingerprint/face ID</Text>
                </View>
              </View>
              <Switch
                checked={biometric}
                onCheckedChange={handleBiometricToggle}
              />
            </View>
          </Card>
        </View>

        {/* Preferences */}
        <View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Text style={`mb-3 ${isDark ? 'text-white' : ''}`}>Preferences</Text>
          <Card style={`p-4 shadow-md space-y-3 ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              style={`w-full flex items-center justify-between p-3 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
              onPress={() => toast.info("Language settings")}
            >
              <View style="flex items-center gap-3">
                <Globe style={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <View style="text-left">
                  <View style={`text-sm ${isDark ? 'text-white' : ''}`}>Language</View>
                  <Text style={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {languageNames[language]}
                  </Text>
                </View>
              </View>
              <ChevronRight style={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              style={`w-full flex items-center justify-between p-3 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
              onPress={() => toast.info("Currency settings")}
            >
              <View style="flex items-center gap-3">
                <CreditCard style={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <View style="text-left">
                  <View style={`text-sm ${isDark ? 'text-white' : ''}`}>Currency</View>
                  <Text style={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{currency}</Text>
                </View>
              </View>
              <ChevronRight style={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            </motion.button>
          </Card>
        </View>

        {/* Help & Support */}
        <View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Text style={`mb-3 ${isDark ? 'text-white' : ''}`}>Help & Support</Text>
          <Card style={`p-4 shadow-md space-y-3 ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              style={`w-full flex items-center justify-between p-3 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
              onPress={() => toast.info("Help center")}
            >
              <View style="flex items-center gap-3">
                <HelpCircle style={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <Text style={`text-sm ${isDark ? 'text-white' : ''}`}>Help Center</Text>
              </View>
              <ChevronRight style={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              style={`w-full flex items-center justify-between p-3 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
              onPress={() => toast.info("Privacy policy")}
            >
              <View style="flex items-center gap-3">
                <FileText style={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <Text style={`text-sm ${isDark ? 'text-white' : ''}`}>Privacy Policy</Text>
              </View>
              <ChevronRight style={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            </motion.button>
          </Card>
        </View>

        {/* Logout */}
        <View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="outline"
            style={`w-full h-12 gap-2 ${isDark ? 'border-red-600 text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50 border-red-200'}`}
            onPress={() => setShowLogoutDialog(true)}
          >
            <LogOut style="w-4 h-4" />
            Logout
          </Button>
        </View>
      </View>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent style={isDark ? 'bg-gray-800 border-gray-700' : ''}>
          <AlertDialogHeader>
            <AlertDialogTitle style={isDark ? 'text-white' : ''}>
              Logout
            </AlertDialogTitle>
            <AlertDialogDescription style={isDark ? 'text-gray-400' : ''}>
              Are you sure you want to logout? You'll need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={isDark ? 'bg-gray-700 text-white border-gray-600' : ''}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onPress={handleLogout}
              style={`${isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}
