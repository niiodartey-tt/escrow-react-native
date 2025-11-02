import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  MessageCircle, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Package, 
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  Download,
  CreditCard,
  Shield,
  Info
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { useTheme } from "./ThemeContext";

interface TransactionDetailsProps {
  transaction: any;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function TransactionDetails({ transaction, onBack, onNavigate }: TransactionDetailsProps) {
  const { isDark } = useTheme();
  // Determine transaction progress based on status
  const getStepsFromStatus = (status: string) => {
    const statusSteps: { [key: string]: number } = {
      "Pending": 0,
      "Initiated": 1,
      "In Escrow": 2,
      "In Progress": 2,
      "Delivered": 3,
      "Completed": 4,
      "Disputed": 2,
    };
    return statusSteps[status] || 1;
  };

  const currentStep = getStepsFromStatus(transaction?.status || "In Escrow");
  
  const steps = [
    { 
      label: "Initiated", 
      completed: currentStep >= 1, 
      date: currentStep >= 1 ? "Oct 24, 2025 10:30 AM" : null 
    },
    { 
      label: "In Escrow", 
      completed: currentStep >= 2, 
      date: currentStep >= 2 ? "Oct 24, 2025 10:35 AM" : null 
    },
    { 
      label: "Delivered", 
      completed: currentStep >= 3, 
      date: currentStep >= 3 ? "Oct 26, 2025 02:15 PM" : null 
    },
    { 
      label: "Completed", 
      completed: currentStep >= 4, 
      date: currentStep >= 4 ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + " " + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : null 
    },
  ];

  const progressValue = (steps.filter(s => s.completed).length / steps.length) * 100;

  // Handle null transaction
  if (!transaction) {
    transaction = {
      id: "ESC-10234",
      name: "iPhone 15 Pro",
      title: "iPhone 15 Pro",
      status: "In Escrow",
      amount: "450.00",
      date: "Oct 24, 2025",
      role: "buyer",
      counterparty: "Alice Smith",
      description: "Brand new iPhone 15 Pro, 256GB, Blue Titanium. Factory sealed with original accessories.",
      category: "Physical Product",
      escrowFee: "4.50",
      expectedDelivery: "Oct 28, 2025",
      paymentMethod: "Card ending in 4242",
      shippingAddress: "123 Main St, New York, NY 10001",
      terms: "Item must be as described. Buyer has 3 days to inspect and confirm receipt."
    };
  }

  const statusColor = isDark ? {
    "In Escrow": "bg-blue-900/30 text-blue-300",
    "Completed": "bg-green-900/30 text-green-300",
    "In Progress": "bg-orange-900/30 text-orange-300",
    "Pending": "bg-yellow-900/30 text-yellow-300",
    "Disputed": "bg-red-900/30 text-red-300"
  }[transaction.status] || "bg-gray-700 text-gray-300" : {
    "In Escrow": "bg-blue-100 text-blue-700",
    "Completed": "bg-green-100 text-green-700",
    "In Progress": "bg-orange-100 text-orange-700",
    "Pending": "bg-yellow-100 text-yellow-700",
    "Disputed": "bg-red-100 text-red-700"
  }[transaction.status] || "bg-gray-100 text-gray-700";

  const handleDownloadReceipt = () => {
    toast.success("Receipt downloaded successfully");
  };

  const handleRaiseDispute = () => {
    onNavigate("dispute", transaction);
  };

  const handleReleaseFunds = () => {
    onNavigate("pin-confirmation", { action: "release", transaction });
  };

  // Generate activity log based on transaction status
  const getActivityLog = (status: string, role: string, counterparty: string) => {
    const baseLog = [
      { action: "Transaction created", date: "Oct 24, 2025 10:30 AM", user: "You" },
      { action: "Funds deposited to escrow", date: "Oct 24, 2025 10:35 AM", user: "System" },
      { action: `${role === "buyer" ? "Seller" : "Buyer"} notified`, date: "Oct 24, 2025 10:36 AM", user: "System" },
    ];

    if (status === "Completed") {
      return [
        ...baseLog,
        { action: `${role === "buyer" ? "Seller" : "Buyer"} confirmed shipment`, date: "Oct 25, 2025 09:15 AM", user: counterparty },
        { action: "Item marked as delivered", date: "Oct 26, 2025 02:15 PM", user: "System" },
        { action: "Transaction completed", date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + " " + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }), user: "You" },
        { action: "Funds released to seller", date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + " " + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }), user: "System" },
      ];
    } else if (status === "Delivered" || status === "In Progress") {
      return [
        ...baseLog,
        { action: `${role === "buyer" ? "Seller" : "Buyer"} confirmed shipment`, date: "Oct 25, 2025 09:15 AM", user: counterparty },
        { action: "Item marked as delivered", date: "Oct 26, 2025 02:15 PM", user: "System" },
      ];
    } else if (status === "Disputed") {
      return [
        ...baseLog,
        { action: "Dispute raised", date: "Oct 25, 2025 03:45 PM", user: "You" },
        { action: "Dispute under review", date: "Oct 25, 2025 04:00 PM", user: "System" },
      ];
    } else {
      return baseLog;
    }
  };

  const activityLog = getActivityLog(
    transaction.status || "In Escrow", 
    transaction.role || "buyer",
    transaction.counterparty || "Alice Smith"
  );

  return (
    <div style="h-screen bg-[#F9FAFB] pb-24 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style="bg-gradient-to-br from-[#043b69] to-[#032d51] text-white p-6"
      >
        <div style="flex items-center gap-4 max-w-md mx-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            style="p-2 hover:bg-white/10"
          >
            <ArrowLeft style="w-5 h-5" />
          </motion.button>
          <View>
            <Text style={{fontSize:20,fontWeight:"600"}}>Transaction Details</Text>
            <p style="text-xs opacity-80">{transaction.id}</Text>
          </View>
        </View>
      </motion.div>

      <div style="max-w-md mx-auto p-6 space-y-4">
        {/* Main Transaction Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card style="p-6 shadow-md">
            <div style="flex justify-between items-start mb-4">
              <div style="flex-1">
                <div style="flex items-start justify-between mb-2">
                  <h3 style="flex-1">{transaction.name || transaction.title}</Text>
                  <Badge style={`${statusColor} hover:${statusColor} ml-2`}>
                    {transaction.status}
                  </Badge>
                </View>
                <p style="text-gray-500 text-sm mb-4">{transaction.description}</Text>
              </View>
            </View>
            
            <Separator style="my-4" />
            
            <div style="grid grid-cols-2 gap-4">
              <View>
                <p style="text-gray-500 text-xs mb-1">Amount</Text>
                <div style="text-2xl">${transaction.amount}</View>
              </View>
              <View>
                <p style="text-gray-500 text-xs mb-1">Created</Text>
                <div style="text-sm">{transaction.date}</View>
              </View>
            </View>
          </Card>
        </motion.div>

        {/* Progress Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card style="p-6 shadow-md">
            <div style="flex items-center justify-between mb-4">
              <h4>Transaction Progress</h4>
              <span style="text-xs text-gray-500">{Math.round(progressValue)}%</Text>
            </View>
            <Progress value={progressValue} style="mb-6" />
            <div style="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  style="flex items-start gap-3"
                >
                  <div style="mt-0.5">
                    {step.completed ? (
                      <div style="w-6 h-6 bg-green-100 flex items-center justify-center">
                        <CheckCircle style="w-4 h-4 text-green-600" />
                      </View>
                    ) : (
                      <div style="w-6 h-6 border-2 border-gray-300 bg-white flex items-center justify-center">
                        <div style="w-2 h-2 bg-gray-300" />
                      </View>
                    )}
                  </View>
                  <div style="flex-1">
                    <div style={`${step.completed ? "text-gray-900" : "text-gray-400"}`}>
                      {step.label}
                    </View>
                    {step.date && (
                      <p style="text-xs text-gray-500 mt-1">{step.date}</Text>
                    )}
                  </View>
                </motion.div>
              ))}
            </View>
          </Card>
        </motion.div>

        {/* Participants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card style="p-6 shadow-md">
            <h4 style="mb-4">Participants</h4>
            <div style="space-y-4">
              <motion.div 
                whileHover={{ x: 4 }}
                style="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div style="flex items-center gap-3">
                  <Avatar style="w-12 h-12">
                    <AvatarFallback style="bg-[#043b69] text-white">JD</AvatarFallback>
                  </Avatar>
                  <View>
                    <View>John Doe</View>
                    <p style="text-xs text-gray-500">{transaction.role === "buyer" ? "Buyer" : "Seller"}</Text>
                  </View>
                </View>
                <Badge variant="outline" style="text-xs">You</Badge>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 4 }}
                style="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div style="flex items-center gap-3">
                  <Avatar style="w-12 h-12">
                    <AvatarFallback style="bg-green-100 text-green-700">AS</AvatarFallback>
                  </Avatar>
                  <View>
                    <View>{transaction.counterparty || "Alice Smith"}</View>
                    <p style="text-xs text-gray-500">{transaction.role === "buyer" ? "Seller" : "Buyer"}</Text>
                  </View>
                </View>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate("chat", transaction)}
                  style="text-xs text-[#043b69] hover:underline"
                >
                  Message
                </motion.button>
              </motion.div>
            </View>
          </Card>
        </motion.div>

        {/* Payment & Fees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card style="p-6 shadow-md">
            <h4 style="mb-4">Payment Details</h4>
            <div style="space-y-3">
              <div style="flex items-center justify-between">
                <div style="flex items-center gap-3 text-sm">
                  <DollarSign style="w-4 h-4 text-gray-400" />
                  <span style="text-gray-500">Transaction Amount</Text>
                </View>
                <Text>${transaction.amount}</Text>
              </View>
              <div style="flex items-center justify-between">
                <div style="flex items-center gap-3 text-sm">
                  <Shield style="w-4 h-4 text-gray-400" />
                  <span style="text-gray-500">Escrow Fee (1%)</Text>
                </View>
                <Text>${transaction.escrowFee || "4.50"}</Text>
              </View>
              <Separator />
              <div style="flex items-center justify-between">
                <div style="flex items-center gap-3">
                  <Text>Total Amount</Text>
                </View>
                <span style="text-lg">${(parseFloat(transaction.amount) + parseFloat(transaction.escrowFee || "4.50")).toFixed(2)}</Text>
              </View>
              <Separator />
              <div style="flex items-center gap-3 text-sm">
                <CreditCard style="w-4 h-4 text-gray-400" />
                <span style="text-gray-500">Payment Method:</Text>
                <Text>{transaction.paymentMethod || "Card ending in 4242"}</Text>
              </View>
            </View>
          </Card>
        </motion.div>

        {/* Delivery & Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card style="p-6 shadow-md">
            <h4 style="mb-4">Additional Details</h4>
            <div style="space-y-3">
              <div style="flex items-start gap-3 text-sm">
                <Package style="w-4 h-4 text-gray-400 mt-0.5" />
                <div style="flex-1">
                  <span style="text-gray-500">Category:</Text>
                  <span style="ml-2">{transaction.category || "Physical Product"}</Text>
                </View>
              </View>
              <div style="flex items-start gap-3 text-sm">
                <Calendar style="w-4 h-4 text-gray-400 mt-0.5" />
                <div style="flex-1">
                  <span style="text-gray-500">Expected Delivery:</Text>
                  <span style="ml-2">{transaction.expectedDelivery || "Oct 28, 2025"}</Text>
                </View>
              </View>
              {transaction.shippingAddress && (
                <div style="flex items-start gap-3 text-sm">
                  <MapPin style="w-4 h-4 text-gray-400 mt-0.5" />
                  <div style="flex-1">
                    <span style="text-gray-500">Shipping Address:</Text>
                    <p style="mt-1">{transaction.shippingAddress}</Text>
                  </View>
                </View>
              )}
            </View>
          </Card>
        </motion.div>

        {/* Terms & Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card style="p-6 shadow-md">
            <div style="flex items-center gap-2 mb-3">
              <FileText style="w-4 h-4 text-gray-400" />
              <h4>Terms & Conditions</h4>
            </View>
            <p style="text-sm text-gray-600">
              {transaction.terms || "Item must be as described. Buyer has 3 days to inspect and confirm receipt. Seller must ship within 2 business days of escrow confirmation."}
            </Text>
          </Card>
        </motion.div>

        {/* Activity Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card style="p-6 shadow-md">
            <h4 style="mb-4">Activity Log</h4>
            <div style="space-y-3">
              {activityLog.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  style="flex gap-3 border-l-2 border-gray-200 pl-4 py-2"
                >
                  <div style="flex-1">
                    <div style="text-sm">{activity.action}</View>
                    <div style="text-xs text-gray-500 mt-1">
                      {activity.date} • {activity.user}
                    </View>
                  </View>
                </motion.div>
              ))}
            </View>
          </Card>
        </motion.div>

        {/* Download Receipt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="outline"
            style="w-full h-12 gap-2"
            onClick={handleDownloadReceipt}
          >
            <Download style="w-4 h-4" />
            Download Receipt
          </Button>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style="space-y-3"
        >
          {transaction.status === "In Escrow" && transaction.role === "buyer" && (
            <Button
              style="w-full bg-[#043b69] hover:bg-[#032d51] shadow-lg h-12"
              onClick={handleReleaseFunds}
            >
              <CheckCircle style="w-4 h-4 mr-2" />
              Confirm & Release Funds
            </Button>
          )}
          
          {transaction.status !== "Completed" && transaction.status !== "Disputed" && (
            <Button
              variant="outline"
              style="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 h-12"
              onClick={handleRaiseDispute}
            >
              <AlertTriangle style="w-4 h-4 mr-2" />
              Raise Dispute
            </Button>
          )}
          
          {transaction.status === "Completed" && (
            <div style="bg-green-50 border border-green-200 p-4 flex items-center gap-3">
              <CheckCircle style="w-5 h-5 text-green-600" />
              <View>
                <div style="text-sm text-green-800">Transaction Completed</View>
                <p style="text-xs text-green-600 mt-1">Funds have been released successfully</Text>
              </View>
            </View>
          )}
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div style="bg-blue-50 border border-blue-200 p-4 flex items-start gap-3">
            <Info style="w-5 h-5 text-blue-600 mt-0.5" />
            <div style="flex-1">
              <div style="text-sm text-blue-800">Secure Escrow Protection</View>
              <p style="text-xs text-blue-600 mt-1">
                Your funds are held securely in escrow until both parties confirm the transaction is complete.
              </Text>
            </View>
          </View>
        </motion.div>

        {/* Chat Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate("chat", transaction)}
          style="fixed bottom-24 right-6 bg-[#043b69] text-white p-4 rounded-full shadow-lg z-20"
        >
          <MessageCircle style="w-6 h-6" />
        </motion.button>
      </View>
    </View>
  );
}
