import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, DollarSign, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface WithdrawFundsProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  kycStatus?: string;
}

export function WithdrawFunds({ onBack, onNavigate, kycStatus = "pending" }: WithdrawFundsProps) {
  const [formData, setFormData] = useState({
    amount: "",
    method: "",
    accountNumber: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check KYC status first
    if (kycStatus !== "verified") {
      toast.error("KYC Verification Required", {
        description: "Please complete KYC verification to withdraw funds"
      });
      if (onNavigate) {
        onNavigate("kyc-verification");
      }
      return;
    }
    
    if (onNavigate && formData.amount && formData.method) {
      onNavigate("pin-confirmation", {
        action: "withdraw",
        transaction: { 
          amount: formData.amount,
          method: formData.method,
          accountNumber: formData.accountNumber,
          type: "withdrawal"
        }
      });
    }
  };

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
          <Text style={{fontSize:20,fontWeight:"600"}}>Withdraw Funds</Text>
        </View>
      </motion.div>

      <View style="max-w-md mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
        >
          <Text style="text-blue-800 text-sm">
            Available Balance: <Text>$4,500</Text>
          </Text>
        </motion.div>

        <View onSubmit={handleSubmit} style="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label>Withdrawal Amount</Label>
            <View style="relative mt-2">
              <DollarSign style="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                style="pl-10 text-2xl h-14"
              />
            </View>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label>Withdrawal Method</Label>
            <Select value={formData.method} onValueChange={(value) => setFormData({ ...formData, method: value })}>
              <SelectTrigger style="mt-2">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="mobile">Mobile Money</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label>Account Number</Label>
            <Input
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              style="mt-2"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Label>Account Holder Name</Label>
            <Input
              placeholder="John Doe"
              style="mt-2"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="submit"
              style="w-full bg-[#043b69] hover:bg-[#032d51] shadow-lg"
            >
              Confirm Withdrawal
            </Button>
          </motion.div>
        </View>
      </View>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style="bg-white rounded-2xl p-8 text-center max-w-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                style="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle2 style="w-8 h-8 text-green-600" />
              </motion.div>
              <Text style="mb-2">Withdrawal Successful!</Text>
              <Text style="text-gray-500">
                Your withdrawal request has been submitted and will be processed within 24 hours.
              </Text>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </View>
  );
}
