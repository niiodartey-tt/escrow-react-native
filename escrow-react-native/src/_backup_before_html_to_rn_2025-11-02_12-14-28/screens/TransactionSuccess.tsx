import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { CheckCircle, Download, Share2, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useEffect } from "react";

interface TransactionSuccessProps {
  transaction: any;
  action: string;
  onNavigate: (screen: string, data?: any) => void;
}

export function TransactionSuccess({ transaction, action, onNavigate }: TransactionSuccessProps) {
  // Confetti effect
  useEffect(() => {
    // Create simple particle effect
    const particles = 30;
    const container = document.getElementById('confetti-container');
    
    if (container) {
      for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style={/* confetti-particle */};
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 0.5 + 's';
        particle.style.backgroundColor = ['#043b69', '#10B981', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 4)];
        container.appendChild(particle);
      }
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  const successMessage = {
    release: "Funds Released Successfully",
    withdraw: "Withdrawal Successful",
    transfer: "Transfer Completed",
    payment: "Payment Successful",
    "create-escrow": "Escrow Created Successfully",
    default: "Transaction Successful"
  }[action] || "Transaction Successful";

  const successDescription = {
    release: "The funds have been released to the seller. Your transaction is now complete.",
    withdraw: "Your withdrawal request has been processed successfully.",
    transfer: "The funds have been transferred successfully.",
    payment: "Your payment has been processed successfully.",
    "create-escrow": "Your escrow transaction has been created successfully. Funds are now held securely until delivery confirmation.",
    default: "Your transaction has been completed successfully."
  }[action] || "Your transaction has been completed successfully.";

  return (
    <View style="h-screen bg-[#F9FAFB] relative overflow-hidden">
      {/* Confetti Container */}
      <View id="confetti-container" style="fixed inset-0 pointer-events-none z-10" />
      
      <style>{`
        .confetti-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          top: -10px;
          animation: confetti-fall 3s ease-out forwards;
        }
        
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Background gradient circles */}
      <View style="absolute inset-0 overflow-hidden">
        <View
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#043b69] rounded-full blur-3xl"
        />
        <View
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500 rounded-full blur-3xl"
        />
      </View>

      {/* Content */}
      <View style="relative z-20 h-full flex flex-col items-center justify-center p-6">
        {/* Success Icon */}
        <View
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.1 
          }}
          style="mb-8"
        >
          <View style="relative">
            <View
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style="absolute inset-0 bg-green-500/20 rounded-full blur-2xl"
            />
            <View style="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
              <View
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  delay: 0.4 
                }}
              >
                <CheckCircle style="w-16 h-16 text-white" strokeWidth={2.5} />
              </View>
            </View>
          </View>
        </View>

        {/* Success Message */}
        <View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style="text-center mb-8"
        >
          <Text style="mb-2">{successMessage}</Text>
          <Text style="text-gray-500 max-w-sm">
            {successDescription}
          </Text>
        </View>

        {/* Transaction Details Card */}
        <View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style="w-full max-w-md mb-8"
        >
          <Card style="p-6 shadow-lg rounded-[0px]">
            <View style="space-y-4">
              <View style="flex justify-between items-center pb-4 border-b border-gray-200">
                <Text style="text-gray-500">Transaction ID</Text>
                <Text style="font-mono text-sm">{transaction?.id || "ESC-10234"}</Text>
              </View>
              <View style="flex justify-between items-center pb-4 border-b border-gray-200">
                <Text style="text-gray-500">Amount</Text>
                <View style="text-2xl">${transaction?.amount || "450.00"}</View>
              </View>
              <View style="flex justify-between items-center pb-4 border-b border-gray-200">
                <Text style="text-gray-500">Status</Text>
                <Text style={`px-3 py-1 text-sm ${
                  action === "create-escrow" 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-green-100 text-green-700"
                }`}>
                  {action === "create-escrow" ? "In Escrow" : "Completed"}
                </Text>
              </View>
              <View style="flex justify-between items-center">
                <Text style="text-gray-500">Date</Text>
                <Text style="text-sm">{new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Action Buttons */}
        <View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style="w-full max-w-md space-y-3"
        >
          {action === "create-escrow" ? (
            <Button
              onPress={() => onNavigate("transaction-details", transaction)}
              style="w-full bg-[#043b69] hover:bg-[#032d51] h-12"
            >
              View Transaction Details
            </Button>
          ) : (
            <Button
              onPress={() => onNavigate("dashboard")}
              style="w-full bg-[#043b69] hover:bg-[#032d51] h-12 gap-2"
            >
              <Home style="w-4 h-4" />
              Back to Dashboard
            </Button>
          )}
          
          <View style="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              style="h-12 gap-2"
              onPress={() => window.print()}
            >
              <Download style="w-4 h-4" />
              Download
            </Button>
            <Button
              variant="outline"
              style="h-12 gap-2 rounded-[4px]"
              onPress={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Transaction Receipt',
                    text: `Transaction ${transaction?.id} completed successfully!`
                  });
                }
              }}
            >
              <Share2 style="w-4 h-4" />
              Share
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
