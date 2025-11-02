import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { ArrowLeft, CreditCard, Smartphone, Building2, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface FundWalletProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  kycStatus?: string;
}

export function FundWallet({ onBack, onNavigate, kycStatus = "pending" }: FundWalletProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  const paymentMethods = [
    { id: "card", name: "Card Payment", icon: CreditCard, color: "blue" },
    { id: "mobile", name: "Mobile Money", icon: Smartphone, color: "green" },
    { id: "bank", name: "Bank Transfer", icon: Building2, color: "purple" },
  ];

  const handlePayment = () => {
    // Check KYC status first
    if (kycStatus !== "verified") {
      toast.error("KYC Verification Required", {
        description: "Please complete KYC verification to fund your wallet"
      });
      if (onNavigate) {
        onNavigate("kyc-verification");
      }
      return;
    }
    
    if (onNavigate && amount && selectedMethod) {
      onNavigate("pin-confirmation", {
        action: "deposit",
        transaction: { 
          amount: amount,
          method: selectedMethod,
          type: "deposit"
        }
      });
    }
  };

  return (
    <View style="h-screen bg-[#F9FAFB] pb-24 overflow-y-auto">
      <View
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
          <Text style={{fontSize:20,fontWeight:"600"}}>Fund Wallet</Text>
        </View>
      </View>

      <View style="max-w-md mx-auto p-6">
        {/* Amount Input */}
        <View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style="mb-6"
        >
          <Label>Amount to Add</Label>
          <View style="relative mt-2">
            <DollarSign style="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style="pl-10 text-2xl h-14"
            />
          </View>
        </View>

        {/* Payment Methods */}
        <View style="mb-6">
          <Text style="mb-4">Select Payment Method</Text>
          <View style="space-y-3">
            {paymentMethods.map((method, index) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              
              return (
                <View
                  key={method.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onPress={() => setSelectedMethod(method.id)}
                >
                  <Card style={`p-4 cursor-pointer transition-all ${
                    isSelected ? "border-2 border-[#043b69] shadow-lg" : "border shadow-sm"
                  }`}>
                    <View style="flex items-center gap-3">
                      <View style={`p-3 rounded-xl ${
                        method.color === "blue" ? "bg-blue-100" :
                        method.color === "green" ? "bg-green-100" :
                        "bg-purple-100"
                      }`}>
                        <Icon style={`w-6 h-6 ${
                          method.color === "blue" ? "text-blue-600" :
                          method.color === "green" ? "text-green-600" :
                          "text-purple-600"
                        }`} />
                      </View>
                      <View style="flex-1">{method.name}</View>
                      <View style={`w-5 h-5 rounded-full border-2 ${
                        isSelected ? "border-[#043b69] bg-[#043b69]" : "border-gray-300"
                      } flex items-center justify-center`}>
                        {isSelected && (
                          <View
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </View>
                    </View>
                  </Card>
                </View>
              );
            })}
          </View>
        </View>

        {/* Payment Details Form */}
        {selectedMethod && (
          <View
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ type: "spring", stiffness: 200 }}
            style="space-y-4 mb-6"
          >
            {selectedMethod === "card" && (
              <>
                <View>
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" style="mt-2" />
                </View>
                <View style="grid grid-cols-2 gap-4">
                  <View>
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" style="mt-2" />
                  </View>
                  <View>
                    <Label>CVV</Label>
                    <Input placeholder="123" type="password" style="mt-2" />
                  </View>
                </View>
              </>
            )}
            {selectedMethod === "mobile" && (
              <View>
                <Label>Phone Number</Label>
                <Input placeholder="+1 (234) 567-8900" style="mt-2" />
              </View>
            )}
            {selectedMethod === "bank" && (
              <>
                <View>
                  <Label>Account Number</Label>
                  <Input placeholder="1234567890" style="mt-2" />
                </View>
                <View>
                  <Label>Routing Number</Label>
                  <Input placeholder="123456789" style="mt-2" />
                </View>
              </>
            )}
          </View>
        )}

        {/* Confirm Button */}
        <View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onPress={handlePayment}
            disabled={!amount || !selectedMethod}
            style="w-full bg-[#043b69] hover:bg-[#032d51] shadow-lg disabled:opacity-50"
          >
            Confirm Payment
          </Button>
        </View>
      </View>
    </View>
  );
}
