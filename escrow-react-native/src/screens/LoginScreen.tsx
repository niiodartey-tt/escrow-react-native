import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, Fingerprint } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { OTPVerification } from "./OTPVerification";
import { useBiometric } from "./BiometricService";
import { toast } from "sonner@2.0.3";

interface LoginScreenProps {
  onLogin: () => void;
  onNavigate: (screen: string) => void;
}

export function LoginScreen({ onLogin, onNavigate }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { isAvailable: biometricAvailable, isEnrolled: biometricEnrolled, authenticate } = useBiometric();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // After password validation, show OTP modal
    setShowOTPModal(true);
  };

  const handleOTPVerify = () => {
    setShowOTPModal(false);
    onLogin();
  };

  const handleBiometricLogin = async () => {
    try {
      const success = await authenticate();
      if (success) {
        toast.success("Biometric authentication successful!");
        onLogin();
      } else {
        toast.error("Biometric authentication failed");
      }
    } catch (error) {
      toast.error("Biometric authentication failed");
    }
  };

  return (
    <View style="h-screen bg-[#F9FAFB] dark:bg-gray-900 overflow-y-auto">
      {/* Header */}
      <View style="bg-gradient-to-br from-[#043b69] to-[#032d51] text-white p-6 sm:p-8 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style="max-w-md mx-auto"
        >
          <Text style="text-2xl sm:text-3xl mb-2">Welcome Back</Text>
          <Text style="text-sm opacity-80">Sign in to continue</Text>
        </motion.div>
      </View>

      {/* Form Card */}
      <View style="max-w-md mx-auto px-4 sm:px-6 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style="bg-white dark:bg-gray-800 shadow-lg p-5 sm:p-6"
        >
          <View onSubmit={handleSubmit} style="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="email">Email Address</Label>
              <View style="relative mt-2">
                <Mail style="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style="pl-10"
                  required
                />
              </View>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="password">Password</Label>
              <View style="relative mt-2">
                <Lock style="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style="pl-10 pr-10"
                  required
                />
                <TouchableOpacity
                  type="button"
                  onPress={() => setShowPassword(!showPassword)}
                  style="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff style="w-5 h-5" /> : <Eye style="w-5 h-5" />}
                </TouchableOpacity>
              </View>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              style="flex items-center justify-between"
            >
              <View style="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, rememberMe: checked as boolean })
                  }
                />
                <Text htmlFor="remember" style="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </Text>
              </View>
              <TouchableOpacity
                type="button"
                onPress={() => onNavigate("forgot-password")}
                style="text-sm text-[#043b69] hover:underline"
              >
                Forgot Password?
              </TouchableOpacity>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                style="w-full bg-[#043b69] hover:bg-[#032d51] h-11 sm:h-12"
              >
                Sign In
              </Button>
            </motion.div>

            {/* Biometric Login */}
            {biometricAvailable && biometricEnrolled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                style="relative"
              >
                <View style="relative flex items-center justify-center my-4">
                  <View style="border-t border-gray-200 dark:border-gray-700 w-full absolute"></View>
                  <Text style="bg-white dark:bg-gray-800 px-3 text-xs text-gray-500 dark:text-gray-400 relative">
                    OR
                  </Text>
                </View>
                <Button
                  type="button"
                  variant="outline"
                  onPress={handleBiometricLogin}
                  style="w-full h-11 sm:h-12 flex items-center justify-center gap-2"
                >
                  <Fingerprint style="w-5 h-5" />
                  Sign in with Biometrics
                </Button>
              </motion.div>
            )}
          </View>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style="text-center mt-6 mb-8"
        >
          <Text style="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Don't have an account?{" "}
            <TouchableOpacity
              onPress={() => onNavigate("signup")}
              style="text-[#043b69] dark:text-blue-400 hover:underline"
            >
              Sign Up
            </TouchableOpacity>
          </Text>
        </motion.div>
      </View>

      {/* OTP Verification Modal */}
      <OTPVerification
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleOTPVerify}
        email={formData.email}
      />
    </View>
  );
}
