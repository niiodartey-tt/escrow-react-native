import { View, Text, Image, TextInput, Pressable } from 'react-native';

import { X, Lock, Fingerprint } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useRef, useEffect } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { useBiometric } from "./BiometricService";
import { toast } from "sonner@2.0.3";

interface PinConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => void;
  action: string;
  transaction?: any;
}

export function PinConfirmation({ isOpen, onClose, onConfirm, action, transaction }: PinConfirmationProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAvailable: biometricAvailable, isEnrolled: biometricEnrolled, authenticate } = useBiometric();

  const handleConfirm = async () => {
    if (pin.length !== 4) {
      setError("Please enter a 4-digit PIN");
      return;
    }

    setLoading(true);
    setError("");
    
    // Simulate validation
    setTimeout(() => {
      if (pin === "1234") {
        onConfirm(pin);
        setPin("");
        setLoading(false);
      } else {
        setError("Incorrect PIN. Please try again.");
        setPin("");
        setLoading(false);
      }
    }, 800);
  };

  const handlePinChange = (value: string) => {
    setPin(value);
    setError("");
    
    // Auto-submit when 4 digits are entered
    if (value.length === 4) {
      setTimeout(() => {
        handleConfirm();
      }, 200);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      setLoading(true);
      const success = await authenticate();
      if (success) {
        toast.success("Biometric authentication successful!");
        onConfirm("biometric");
      } else {
        setError("Biometric authentication failed");
        setLoading(false);
      }
    } catch (error) {
      setError("Biometric authentication failed");
      setLoading(false);
    }
  };

  const actionText = {
    release: "Release Funds",
    withdraw: "Withdraw Funds",
    transfer: "Transfer Funds",
    "create-escrow": "Create Escrow Transaction",
    default: "Confirm Action"
  }[action] || "Confirm Action";

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
                <X style="w-5 h-5 dark:text-gray-200" />
              </TouchableOpacity>

              {/* Header */}
              <View style="bg-gradient-to-br from-[#043b69] to-[#032d51] text-white p-6 pb-12">
                <View style="flex items-center gap-3 mb-3">
                  <View style="w-12 h-12 bg-white/20 flex items-center justify-center">
                    <Lock style="w-6 h-6" />
                  </View>
                  <View>
                    <Text style={{fontSize:18,fontWeight:"500"}}>Confirm Transaction</Text>
                    <Text style="text-xs opacity-80">Enter your PIN to continue</Text>
                  </View>
                </View>
              </View>

              {/* Content */}
              <View style="p-5 sm:p-6 -mt-6">
                {/* Transaction Summary Card */}
                <Animated.View
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style="bg-white dark:bg-gray-700 shadow-lg p-4 mb-6 border border-gray-100 dark:border-gray-600"
                >
                  <Text style="text-xs text-gray-500 dark:text-gray-400 mb-2">Action</Text>
                  <View style="mb-3 dark:text-gray-100">{actionText}</View>
                  {transaction && (
                    <>
                      <View style="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
                        <Text style="text-xs text-gray-500 dark:text-gray-400 mb-1">Amount</Text>
                        <View style="text-xl sm:text-2xl dark:text-gray-100">${transaction.amount}</View>
                      </View>
                      <View style="mt-3">
                        <Text style="text-xs text-gray-500 dark:text-gray-400 mb-1">Transaction ID</Text>
                        <View style="text-sm text-gray-700 dark:text-gray-300">{transaction.id}</View>
                      </View>
                    </>
                  )}
                </Animated.View>

                {/* PIN Input */}
                <Animated.View
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style="mb-6"
                >
                  <Text style="block text-sm mb-3 text-center dark:text-gray-200">
                    Enter 4-Digit PIN
                  </Text>
                  <View style="flex justify-center">
                    <InputOTP
                      maxLength={4}
                      value={pin}
                      onChange={handlePinChange}
                      disabled={loading}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} style="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl" />
                        <InputOTPSlot index={1} style="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl" />
                        <InputOTPSlot index={2} style="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl" />
                        <InputOTPSlot index={3} style="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl" />
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
                    For demo purposes, use PIN: 1234
                  </Text>
                </Animated.View>

                {/* Actions */}
                <Animated.View
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style="space-y-3"
                >
                  <Button
                    onPress={handleConfirm}
                    disabled={pin.length !== 4 || loading}
                    style="w-full bg-[#043b69] hover:bg-[#032d51] h-11 sm:h-12 disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Confirm"}
                  </Button>

                  {/* Biometric Alternative */}
                  {biometricAvailable && biometricEnrolled && (
                    <Animated.View
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <View style="relative flex items-center justify-center my-2">
                        <View style="border-t border-gray-200 dark:border-gray-700 w-full absolute"></View>
                        <Text style="bg-white dark:bg-gray-800 px-3 text-xs text-gray-500 dark:text-gray-400 relative">
                          OR
                        </Text>
                      </View>
                      <Button
                        type="button"
                        variant="outline"
                        onPress={handleBiometricAuth}
                        disabled={loading}
                        style="w-full h-11 sm:h-12 flex items-center justify-center gap-2"
                      >
                        <Fingerprint style="w-5 h-5" />
                        Use Biometrics
                      </Button>
                    </Animated.View>
                  )}

                  <Button
                    onPress={onClose}
                    variant="outline"
                    style="w-full h-11 sm:h-12"
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
