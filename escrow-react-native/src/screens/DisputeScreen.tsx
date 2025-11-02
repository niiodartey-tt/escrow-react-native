import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { ArrowLeft, AlertTriangle, Upload, FileText, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { useTheme } from "./ThemeContext";

interface DisputeScreenProps {
  transaction: any;
  onBack: () => void;
  onSubmit?: (data: any) => void;
}

export function DisputeScreen({ transaction, onBack, onSubmit }: DisputeScreenProps) {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    reason: "",
    description: "",
    evidence: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.reason) {
      toast.error("Please select a reason for the dispute");
      return;
    }
    
    if (!formData.description || formData.description.trim().length < 50) {
      toast.error("Please provide a detailed description (minimum 50 characters)");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Dispute submitted successfully", {
        description: "Our team will review your case within 24-48 hours"
      });
      if (onSubmit) {
        onSubmit({
          ...formData,
          transactionId: transaction.id,
          submittedAt: new Date().toISOString(),
        });
      }
      onBack();
    }, 1500);
  };

  const disputeReasons = [
    { value: "not-received", label: "Item not received" },
    { value: "not-as-described", label: "Item not as described" },
    { value: "damaged", label: "Item arrived damaged" },
    { value: "counterfeit", label: "Counterfeit/fake item" },
    { value: "missing-parts", label: "Missing parts/accessories" },
    { value: "seller-unresponsive", label: "Seller not responding" },
    { value: "other", label: "Other issue" },
  ];

  return (
    <View style={`h-screen pb-24 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-[#F9FAFB]'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={`sticky top-0 z-10 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
            : 'bg-gradient-to-br from-red-600 to-red-700'
        } text-white p-6`}
      >
        <View style="flex items-center gap-4 max-w-md mx-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onPress={onBack}
            style="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft style="w-5 h-5" />
          </motion.button>
          <View style="flex-1">
            <Text style={{fontSize:20,fontWeight:"600"}}>Raise Dispute</Text>
            <Text style="text-xs opacity-80">Transaction: {transaction.id}</Text>
          </View>
          <AlertTriangle style="w-6 h-6" />
        </View>
      </motion.div>

      <View style="max-w-md mx-auto p-6 space-y-6">
        {/* Warning Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card style={`p-4 border-2 ${
            isDark 
              ? 'bg-yellow-900/20 border-yellow-700' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <View style="flex gap-3">
              <AlertTriangle style="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
              <View>
                <Text style={`mb-1 ${isDark ? 'text-yellow-200' : 'text-yellow-800'}`}>
                  Important Information
                </Text>
                <Text style={`text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
                  Raising a dispute will pause this transaction and notify both parties. 
                  Our support team will review your case within 24-48 hours. Please provide 
                  detailed information and evidence to support your claim.
                </Text>
              </View>
            </View>
          </Card>
        </motion.div>

        {/* Transaction Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card style={`p-6 shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
            <Text style={`mb-4 ${isDark ? 'text-white' : ''}`}>Transaction Details</Text>
            <View style="space-y-3">
              <View style="flex justify-between items-start">
                <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Item
                </Text>
                <Text style={isDark ? 'text-white' : ''}>{transaction.name || transaction.title}</Text>
              </View>
              <Separator style={isDark ? 'bg-gray-700' : ''} />
              <View style="flex justify-between items-start">
                <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Amount
                </Text>
                <Text style={isDark ? 'text-white' : ''}>${transaction.amount}</Text>
              </View>
              <Separator style={isDark ? 'bg-gray-700' : ''} />
              <View style="flex justify-between items-start">
                <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Status
                </Text>
                <Badge style="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0">
                  {transaction.status}
                </Badge>
              </View>
            </View>
          </Card>
        </motion.div>

        {/* Dispute Form */}
        <View onSubmit={handleSubmit} style="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card style={`p-6 shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
              <Text style={`mb-4 ${isDark ? 'text-white' : ''}`}>Dispute Information</Text>
              
              <View style="space-y-4">
                <View>
                  <Label style={isDark ? 'text-gray-300' : ''}>Reason for Dispute *</Label>
                  <Select 
                    value={formData.reason} 
                    onValueChange={(value) => setFormData({ ...formData, reason: value })}
                  >
                    <SelectTrigger style={`mt-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent style={isDark ? 'bg-gray-800 border-gray-700' : ''}>
                      {disputeReasons.map((reason) => (
                        <SelectItem 
                          key={reason.value} 
                          value={reason.value}
                          style={isDark ? 'text-white focus:bg-gray-700' : ''}
                        >
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </View>

                <View>
                  <Label style={isDark ? 'text-gray-300' : ''}>Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={`mt-2 min-h-[150px] ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    placeholder="Please provide detailed information about the issue. Include dates, communications with the other party, and any relevant details that will help us resolve this dispute."
                    required
                  />
                  <View style="flex justify-between items-center mt-1">
                    <Text style={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Minimum 50 characters required
                    </Text>
                    <Text style={`text-xs ${
                      formData.description.length >= 50 
                        ? (isDark ? 'text-green-400' : 'text-green-600')
                        : (isDark ? 'text-gray-400' : 'text-gray-500')
                    }`}>
                      {formData.description.length}/50
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </motion.div>

          {/* Upload Evidence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card style={`p-6 shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
              <View style="flex items-center gap-2 mb-4">
                <FileText style="w-4 h-4" />
                <Text style={isDark ? 'text-white' : ''}>Supporting Evidence (Optional)</Text>
              </View>
              
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                  isDark 
                    ? 'border-gray-600 hover:border-blue-500 bg-gray-700/30' 
                    : 'border-gray-300 hover:border-[#043b69] bg-gray-50'
                }`}
              >
                <Upload style={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <Text style={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  Click to upload or drag and drop
                </Text>
                <Text style={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Images, PDFs, screenshots, chat logs, etc. (Max 10MB per file)
                </Text>
              </motion.div>

              <View style={`mt-4 p-3 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
                <Text style={`text-sm ${isDark ? 'text-gray-300' : 'text-blue-800'}`}>
                  <strong>Tip:</strong> Include screenshots of conversations, photos of the item, 
                  shipping receipts, or any other relevant documentation to strengthen your case.
                </Text>
              </View>
            </Card>
          </motion.div>

          {/* Dispute Resolution Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card style={`p-6 shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
              <Text style={`mb-4 ${isDark ? 'text-white' : ''}`}>What Happens Next?</Text>
              <View style="space-y-3">
                <View style="flex gap-3">
                  <View style={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    1
                  </View>
                  <View>
                    <Text style={isDark ? 'text-white' : ''}>Review Period</Text>
                    <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Our team will review your dispute within 24-48 hours
                    </Text>
                  </View>
                </View>
                <View style="flex gap-3">
                  <View style={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    2
                  </View>
                  <View>
                    <Text style={isDark ? 'text-white' : ''}>Investigation</Text>
                    <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      We'll contact both parties and review all evidence
                    </Text>
                  </View>
                </View>
                <View style="flex gap-3">
                  <View style={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    3
                  </View>
                  <View>
                    <Text style={isDark ? 'text-white' : ''}>Resolution</Text>
                    <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      A fair decision will be made and funds distributed accordingly
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style="space-y-3"
          >
            <Button
              type="submit"
              disabled={isSubmitting || !formData.reason || !formData.description || formData.description.length < 50}
              style={`w-full h-12 text-white transition-all ${
                isSubmitting || !formData.reason || !formData.description || formData.description.length < 50
                  ? 'opacity-50 cursor-not-allowed bg-red-400'
                  : (isDark 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-red-600 hover:bg-red-700')
              }`}
            >
              {isSubmitting ? (
                <View style="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Submitting Dispute...
                </View>
              ) : (
                <>
                  <Send style="w-4 h-4 mr-2" />
                  Submit Dispute
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onPress={onBack}
              style={`w-full h-12 ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </Button>
          </motion.div>
        </View>
      </View>
    </View>
  );
}
