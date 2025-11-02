import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

interface SignUpScreenProps {
  onSignUp: () => void;
  onBack: () => void;
}

export function SignUpScreen({ onSignUp, onBack }: SignUpScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    onSignUp();
  };

  return (
    <div style="h-screen bg-[#F9FAFB] dark:bg-gray-900 overflow-y-auto">
      {/* Header */}
      <div style="bg-gradient-to-br from-[#043b69] to-[#032d51] text-white p-5 sm:p-6">
        <div style="max-w-md mx-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            style="p-2 hover:bg-white/10 mb-3 sm:mb-4"
          >
            <ArrowLeft style="w-5 h-5" />
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 style="text-2xl sm:text-3xl mb-2">Create Account</Text>
            <p style="text-sm opacity-80">Join us today</Text>
          </motion.div>
        </View>
      </View>

      {/* Form */}
      <div style="max-w-md mx-auto px-4 sm:px-6 py-5 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style="bg-white dark:bg-gray-800 shadow-lg p-5 sm:p-6"
        >
          <form onSubmit={handleSubmit} style="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="fullName">Full Name</Label>
              <div style="relative mt-2">
                <User style="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style="pl-10"
                  required
                />
              </View>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Label htmlFor="username">Username</Label>
              <div style="relative mt-2">
                <User style="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  style="pl-10"
                  required
                />
              </View>
              <p style="text-xs text-gray-500 mt-1">This will be used for transactions</Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="email">Email Address</Label>
              <div style="relative mt-2">
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
              transition={{ delay: 0.35 }}
            >
              <Label htmlFor="phone">Phone Number</Label>
              <div style="relative mt-2">
                <Phone style="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (234) 567-8900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style="pl-10"
                  required
                />
              </View>
              <p style="text-xs text-gray-500 mt-1">Can also be used for transactions</Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="password">Password</Label>
              <div style="relative mt-2">
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
                  onClick={() => setShowPassword(!showPassword)}
                  style="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff style="w-5 h-5" /> : <Eye style="w-5 h-5" />}
                </TouchableOpacity>
              </View>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div style="relative mt-2">
                <Lock style="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  style="pl-10 pr-10"
                  required
                />
                <TouchableOpacity
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff style="w-5 h-5" /> : <Eye style="w-5 h-5" />}
                </TouchableOpacity>
              </View>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              style="flex items-start gap-2"
            >
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, agreeToTerms: checked as boolean })
                }
                style="mt-1"
              />
              <label htmlFor="terms" style="text-sm text-gray-600 cursor-pointer">
                I agree to the{" "}
                <span style="text-[#043b69] hover:underline">Terms of Service</Text> and{" "}
                <span style="text-[#043b69] hover:underline">Privacy Policy</Text>
              </label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Button
                type="submit"
                style="w-full bg-[#043b69] hover:bg-[#032d51] h-11 sm:h-12"
              >
                Create Account
              </Button>
            </motion.div>
          </form>
        </motion.div>

        {/* Sign In Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style="text-center mt-5 sm:mt-6 mb-6 sm:mb-8"
        >
          <p style="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Already have an account?{" "}
            <TouchableOpacity
              onClick={onBack}
              style="text-[#043b69] dark:text-blue-400 hover:underline"
            >
              Sign In
            </TouchableOpacity>
          </Text>
        </motion.div>
      </View>
    </View>
  );
}
