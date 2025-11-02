import { View, Text, Image, TextInput, Pressable } from 'react-native';

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
    <View style="h-screen bg-[#F9FAFB] pb-24 overflow-y-auto">
      <Animated.View
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style="bg-gradient-to-br from-[#043b69] to-[#032d51] text-white p-6"
      >
        <View style="max-w-md mx-auto">
          <View style="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onPress={onBack}
              style="p-2 hover:bg-white/10"
            >
              <ArrowLeft style="w-5 h-5" />
            </motion.button>
            <View>
              <Text style={{fontSize:20,fontWeight:"600"}}>Notification Details</Text>
              <Text style="text-xs opacity-80">{notification?.time || "Just now"}</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      <View style="max-w-md mx-auto p-6">
        <Animated.View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card style="p-6 shadow-lg">
            <View style="flex items-center gap-4 mb-6">
              <View style={`p-4 ${bg}`}>
                <Icon style={`w-8 h-8 ${color}`} />
              </View>
              <View style="flex-1">
                <Text style="mb-1">{notification?.title || "Notification"}</Text>
                <Text style="text-sm text-gray-500">{notification?.type || "General"}</Text>
              </View>
            </View>

            <View style="mb-6">
              <Text style="text-gray-700">{notification?.message || "No additional details available."}</Text>
            </View>

            {notification?.details && (
              <View style="border-t pt-4 space-y-3">
                <Text style="text-sm">Additional Information</Text>
                {Object.entries(notification.details).map(([key, value]: [string, any]) => (
                  <View key={key} style="flex justify-between text-sm">
                    <Text style="text-gray-500 capitalize">{key.replace(/_/g, ' ')}</Text>
                    <Text>{value}</Text>
                  </View>
                ))}
              </View>
            )}

            {notification?.actionUrl && (
              <View style="mt-6">
                <Button style="w-full bg-[#043b69] hover:bg-[#032d51]">
                  Take Action
                </Button>
              </View>
            )}
          </Card>

          <View style="mt-4">
            <Button
              onPress={onBack}
              variant="outline"
              style="w-full"
            >
              Close
            </Button>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});
