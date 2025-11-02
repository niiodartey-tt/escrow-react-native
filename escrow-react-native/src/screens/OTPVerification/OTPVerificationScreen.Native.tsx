import { View, Text, Image, TextInput, Pressable } from 'react-native';

import { X, Mail, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { toast } from "sonner@2.0.3";

interface OTPVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  email?: string;
  phone?: string;
}

export function OTPVerification({ isOpen, onClose, onVerify, email, phone }: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (isOpen && resendCountdown > 0) {
      const timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, resendCountdown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate OTP verification
    setTimeout(() => {
      // For demo purposes, accept 123456 as valid OTP
      if (otp === "123456") {
        toast.success("OTP verified successfully!");
        onVerify();
        setOtp("");
        setLoading(false);
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp("");
        setLoading(false);
      }
    }, 800);
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setError("");

    // Auto-submit when 6 digits are entered
    if (value.length === 6) {
      setTimeout(() => {
        handleVerify();
      }, 200);
    }
  };

  const handleResend = () => {
    if (!canResend) return;

    setCanResend(false);
    setResendCountdown(60);
    toast.success("OTP sent successfully!");
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <Animated.View
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPress={onClose}
            style="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <View style="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Animated.View
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style="bg-white dark:bg-gray-800 w-full max-w-md shadow-2xl relative"
              onPress={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <TouchableOpacity
                onPress={onClose}
                style="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
              >
                <X style="w-5 h-5" />
              </TouchableOpacity>

              {/* Header */}
              <View style="bg-gradient-to-br from-[#043b69] to-[#032d51] text-white p-6 pb-12">
                <View style="flex items-center gap-3 mb-3">
                  <View style="w-12 h-12 bg-white/20 flex items-center justify-center">
                    {email ? <Mail style="w-6 h-6" /> : <Smartphone style="w-6 h-6" />}
                  </View>
                  <View>
                    <Text style={{fontSize:18,fontWeight:"500"}}>Verify OTP</Text>
                    <Text style="text-xs opacity-80">Enter the code sent to your {email ? "email" : "phone"}</Text>
                  </View>
                </View>
              </View>

              {/* Content */}
              <View style="p-6 -mt-6">
                {/* Info Card */}
                <Animated.View
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style="bg-white dark:bg-gray-700 shadow-lg p-4 mb-6 border border-gray-100 dark:border-gray-600"
                >
                  <Text style="text-xs text-gray-500 dark:text-gray-400 mb-2">Code sent to</Text>
                  <View style="text-sm break-all">{email || phone}</View>
                  <Text style="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Please check your {email ? "email inbox" : "messages"} for the verification code
                  </Text>
                </Animated.View>

                {/* OTP Input */}
                <Animated.View
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style="mb-6"
                >
                  <Text style="block text-sm mb-3 text-center dark:text-gray-200">
                    Enter 6-Digit Code
                  </Text>
                  <View style="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={handleOtpChange}
                      disabled={loading}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} style="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl" />
                        <InputOTPSlot index={1} style="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl" />
                        <InputOTPSlot index={2} style="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl" />
                        <InputOTPSlot index={3} style="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl" />
                        <InputOTPSlot index={4} style="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl" />
                        <InputOTPSlot index={5} style="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl" />
                      </InputOTPGroup>
                    </InputOTP>
                  </View>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style="text-red-600 text-sm text-center mt-3"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Text style="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
                    For demo purposes, use OTP: 123456
                  </Text>
                </Animated.View>

                {/* Resend */}
                <Animated.View
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style="text-center mb-6"
                >
                  {canResend ? (
                    <TouchableOpacity
                      onPress={handleResend}
                      style="text-sm text-[#043b69] hover:underline"
                    >
                      Resend OTP
                    </TouchableOpacity>
                  ) : (
                    <Text style="text-sm text-gray-500 dark:text-gray-400">
                      Resend OTP in {resendCountdown}s
                    </Text>
                  )}
                </Animated.View>

                {/* Actions */}
                <Animated.View
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style="space-y-3"
                >
                  <Button
                    onPress={handleVerify}
                    disabled={otp.length !== 6 || loading}
                    style="w-full bg-[#043b69] hover:bg-[#032d51] h-12 disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </Button>
                  <Button
                    onPress={onClose}
                    variant="outline"
                    style="w-full h-12"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </Animated.View>
              </View>
            </Animated.View>
          </View>
        </>
      )}
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});
