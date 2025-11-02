import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Store, X } from "lucide-react";
import { Card } from "./ui/card";

interface TransactionTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: "buy" | "sell") => void;
}

export function TransactionTypeModal({ isOpen, onClose, onSelect }: TransactionTypeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            style="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-[24px] sm:rounded-t-[32px] z-50 p-5 sm:p-6 pb-8 sm:pb-6"
          >
            <div style="max-w-md mx-auto">
              <div style="flex justify-between items-center mb-5 sm:mb-6">
                <h2 style="dark:text-white">Create Transaction</Text>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  style="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <X style="w-5 h-5 dark:text-gray-200" />
                </motion.button>
              </View>

              <p style="text-gray-500 dark:text-gray-400 mb-5 sm:mb-6 text-sm sm:text-base">Choose whether you want to buy or sell</Text>

              <div style="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(10, 87, 230, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSelect("buy");
                    onClose();
                  }}
                >
                  <Card style="p-5 sm:p-6 cursor-pointer hover:border-[#043b69] dark:hover:border-blue-400 transition-all dark:bg-gray-700">
                    <div style="flex items-center gap-3 sm:gap-4">
                      <div style="p-2.5 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                        <ShoppingCart style="w-6 h-6 sm:w-8 sm:h-8 text-[#043b69] dark:text-blue-400" />
                      </View>
                      <div style="flex-1">
                        <h3 style="dark:text-white">Buy</Text>
                        <p style="text-gray-500 dark:text-gray-400 text-sm">I want to purchase something</Text>
                      </View>
                    </View>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(16, 185, 129, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSelect("sell");
                    onClose();
                  }}
                >
                  <Card style="p-5 sm:p-6 cursor-pointer hover:border-green-600 dark:hover:border-green-400 transition-all dark:bg-gray-700">
                    <div style="flex items-center gap-3 sm:gap-4">
                      <div style="p-2.5 sm:p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                        <Store style="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                      </View>
                      <div style="flex-1">
                        <h3 style="dark:text-white">Sell</Text>
                        <p style="text-gray-500 dark:text-gray-400 text-sm">I want to sell a product or service</Text>
                      </View>
                    </View>
                  </Card>
                </motion.div>
              </View>
            </View>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
