import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface WalletScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function WalletScreen({ onBack, onNavigate }: WalletScreenProps) {
  const transactions = [
    { id: 1, type: "credit", amount: 850, description: "Escrow Created - ESC-45823", date: "Oct 28, 2025", txId: "ESC-45823" },
    { id: 2, type: "credit", amount: 1200, description: "Transaction Completed - ESC-45822", date: "Oct 27, 2025", txId: "ESC-45822" },
    { id: 3, type: "debit", amount: 450, description: "Escrow Payment - ESC-45821", date: "Oct 26, 2025", txId: "ESC-45821" },
    { id: 4, type: "credit", amount: 2500, description: "Wallet Top Up", date: "Oct 25, 2025", txId: null },
    { id: 5, type: "debit", amount: 680, description: "Escrow Payment - ESC-45819", date: "Oct 24, 2025", txId: "ESC-45819" },
    { id: 6, type: "credit", amount: 1800, description: "Transaction Completed - ESC-45818", date: "Oct 23, 2025", txId: "ESC-45818" },
    { id: 7, type: "credit", amount: 3200, description: "Transaction Completed - ESC-45817", date: "Oct 22, 2025", txId: "ESC-45817" },
    { id: 8, type: "credit", amount: 1000, description: "Wallet Top Up", date: "Oct 21, 2025", txId: null },
    { id: 9, type: "credit", amount: 750, description: "Transaction Completed - ESC-45814", date: "Oct 19, 2025", txId: "ESC-45814" },
    { id: 10, type: "debit", amount: 500, description: "Withdrawal to Bank", date: "Oct 18, 2025", txId: null },
  ];

  return (
    <View style="h-screen bg-[#F9FAFB] pb-24 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style="sticky top-0 bg-white border-b border-gray-200 p-4 z-10"
      >
        <View style="flex items-center gap-4 max-w-md mx-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onPress={onBack}
            style="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft style="w-5 h-5" />
          </motion.button>
          <Text style={{fontSize:20,fontWeight:"600"}}>Wallet</Text>
        </View>
      </motion.div>

      <View style="max-w-md mx-auto p-6">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Card style="bg-gradient-to-br from-[#043b69] to-[#032d51] text-white p-6 shadow-xl mb-6">
            <View style="flex items-center gap-3 mb-6">
              <Wallet style="w-6 h-6" />
              <Text>My Wallet</Text>
            </View>
            <View style="mb-2 text-sm opacity-80">Available Balance</View>
            <View style="text-4xl mb-4">$4,500</View>
            <View style="flex justify-between items-center pt-4 border-t border-white/20">
              <View>
                <View style="text-sm opacity-80">Escrow Balance</View>
                <View style="text-xl">$200</View>
              </View>
              <View style="text-right">
                <View style="text-sm opacity-80">Total</View>
                <View style="text-xl">$4,700</View>
              </View>
            </View>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <View style="flex gap-3 mb-6">
          <motion.div whileTap={{ scale: 0.95 }} style="flex-1">
            <Button
              onPress={() => onNavigate("fund-wallet")}
              style="w-full bg-[#043b69] hover:bg-[#032d51] shadow-lg"
            >
              Top Up Wallet
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }} style="flex-1">
            <Button
              onPress={() => onNavigate("withdraw")}
              variant="outline"
              style="w-full border-2 shadow-md"
            >
              Withdraw Funds
            </Button>
          </motion.div>
        </View>

        {/* Transaction History */}
        <View style="mb-4">
          <Text style={{fontSize:18,fontWeight:"500"}}>Transaction History</Text>
        </View>

        <View style="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              <Card style="p-4 shadow-sm hover:shadow-md transition-shadow">
                <View style="flex items-center justify-between">
                  <View style="flex items-center gap-3">
                    <View style={`p-2 rounded-full ${
                      transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {transaction.type === "credit" ? (
                        <ArrowDownLeft style="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpRight style="w-5 h-5 text-red-600" />
                      )}
                    </View>
                    <View>
                      <View>{transaction.description}</View>
                      <Text style="text-sm text-gray-500">{transaction.date}</Text>
                    </View>
                  </View>
                  <View style={`${
                    transaction.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.type === "credit" ? "+" : "-"}${transaction.amount}
                  </View>
                </View>
              </Card>
            </motion.div>
          ))}
        </View>
      </View>
    </View>
  );
}
