import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { Shield } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      style="fixed inset-0 bg-gradient-to-b from-[#043b69] to-[#032d51] flex flex-col items-center justify-center px-4"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        setTimeout(() => onComplete(), 2000);
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style="flex flex-col items-center gap-5 sm:gap-6"
      >
        <div style="bg-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-sm">
          <Shield style="w-16 h-16 sm:w-20 sm:h-20 text-white" />
        </View>
        <div style="text-center">
          <h1 style="text-white mb-2 text-2xl sm:text-3xl">SecureEscrow</Text>
          <p style="text-white/70 text-sm sm:text-base">Secure Escrow for Every Deal</Text>
        </View>
      </motion.div>
    </motion.div>
  );
}
