import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, AlertCircle, Info, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface NotificationDetailsProps {
  notification: any;
  onBack: () => void;
}

export function NotificationDetails({ notification, onBack }: NotificationDetailsProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" };
      case "alert":
        return { icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" };
      case "info":
        return { icon: Info, color: "text-blue-600", bg: "bg-blue-100" };
      case "payment":
        return { icon: DollarSign, color: "text-purple-600", bg: "bg-purple-100" };
      default:
        return { icon: Info, color: "text-gray-600", bg: "bg-gray-100" };
    }
  };

  const { icon: Icon, color, bg } = getNotificationIcon(notification?.type || "info");

  return (
    <div style="h-screen bg-[#F9FAFB] pb-24 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style="bg-gradient-to-br from-[#043b69] to-[#032d51] text-white p-6"
      >
        <div style="max-w-md mx-auto">
          <div style="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              style="p-2 hover:bg-white/10"
            >
              <ArrowLeft style="w-5 h-5" />
            </motion.button>
            <View>
              <Text style={{fontSize:20,fontWeight:"600"}}>Notification Details</Text>
              <p style="text-xs opacity-80">{notification?.time || "Just now"}</Text>
            </View>
          </View>
        </View>
      </motion.div>

      <div style="max-w-md mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card style="p-6 shadow-lg">
            <div style="flex items-center gap-4 mb-6">
              <div style={`p-4 ${bg}`}>
                <Icon style={`w-8 h-8 ${color}`} />
              </View>
              <div style="flex-1">
                <h3 style="mb-1">{notification?.title || "Notification"}</Text>
                <p style="text-sm text-gray-500">{notification?.type || "General"}</Text>
              </View>
            </View>

            <div style="mb-6">
              <p style="text-gray-700">{notification?.message || "No additional details available."}</Text>
            </View>

            {notification?.details && (
              <div style="border-t pt-4 space-y-3">
                <h4 style="text-sm">Additional Information</h4>
                {Object.entries(notification.details).map(([key, value]: [string, any]) => (
                  <div key={key} style="flex justify-between text-sm">
                    <span style="text-gray-500 capitalize">{key.replace(/_/g, ' ')}</Text>
                    <Text>{value}</Text>
                  </View>
                ))}
              </View>
            )}

            {notification?.actionUrl && (
              <div style="mt-6">
                <Button style="w-full bg-[#043b69] hover:bg-[#032d51]">
                  Take Action
                </Button>
              </View>
            )}
          </Card>

          <div style="mt-4">
            <Button
              onClick={onBack}
              variant="outline"
              style="w-full"
            >
              Close
            </Button>
          </View>
        </motion.div>
      </View>
    </View>
  );
}
