import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Edit2, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  LogOut, 
  Settings, 
  Copy, 
  Check,
  Shield,
  Star,
  TrendingUp,
  Award,
  Calendar,
  User,
  CreditCard,
  Clock,
  DollarSign,
  Package,
  MessageCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { useTheme } from "./ThemeContext";

interface ProfileScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  kycStatus?: string;
}

export function ProfileScreen({ onBack, onNavigate, kycStatus = "pending" }: ProfileScreenProps) {
  const [copiedUserId, setCopiedUserId] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const { isDark } = useTheme();
  
  const profileData = {
    name: "John Doe",
    username: "@johndoe",
    userId: "ESC-USER-10234567",
    email: "john.doe@example.com",
    phone: "+1 (234) 567-8900",
    location: "New York, USA",
    kycStatus: "Verified",
    memberSince: "Jan 2024",
    bio: "Professional buyer and seller on the platform. Specializing in electronics and tech products.",
    walletBalance: 4500.00,
    escrowBalance: 200.00,
  };

  const copyUserId = () => {
    navigator.clipboard.writeText(profileData.userId);
    setCopiedUserId(true);
    toast.success("User ID copied to clipboard!");
    setTimeout(() => setCopiedUserId(false), 2000);
  };

  const stats = [
    { label: "Total Deals", value: "59", icon: Package, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Success Rate", value: "98%", icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-900/20" },
    { label: "Rating", value: "4.9", icon: Star, color: "text-yellow-600", bgColor: "bg-yellow-50 dark:bg-yellow-900/20" },
    { label: "Response Time", value: "2h", icon: Clock, color: "text-purple-600", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
  ];

  const achievements = [
    { title: "Verified Seller", icon: Shield, color: "text-blue-600", earned: true },
    { title: "Top Rated", icon: Star, color: "text-yellow-600", earned: true },
    { title: "Fast Responder", icon: MessageCircle, color: "text-green-600", earned: true },
    { title: "100 Deals", icon: Award, color: "text-purple-600", earned: false },
  ];

  const recentActivity = [
    { action: "Completed transaction", detail: "ESC-45822 - Web Development", time: "1 day ago", type: "success" },
    { action: "New escrow created", detail: "ESC-45823 - MacBook Pro M3", time: "2 days ago", type: "info" },
    { action: "Funds received", detail: "$1,200.00 to wallet", time: "3 days ago", type: "payment" },
    { action: "Profile updated", detail: "Updated contact information", time: "1 week ago", type: "info" },
  ];

  const transactionStats = {
    totalVolume: 45230.50,
    avgTransactionValue: 766.61,
    completedDeals: 59,
    activeDeals: 3,
  };

  return (
    <View style={`h-screen pb-24 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-[#F9FAFB]'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={`sticky top-0 z-10 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4`}
      >
        <View style="flex items-center justify-between max-w-md mx-auto">
          <View style="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onPress={onBack}
              style={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <ArrowLeft style="w-5 h-5" />
            </motion.button>
            <Text style={isDark ? 'text-white' : ''}>Profile</Text>
          </View>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onPress={() => onNavigate("settings")}
            style={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <Settings style="w-5 h-5" />
          </motion.button>
        </View>
      </motion.div>

      <View style="max-w-md mx-auto p-6">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Card style={`p-6 shadow-lg mb-6 ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
            <View style="flex items-start gap-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                style="relative"
              >
                <Avatar style="w-20 h-20">
                  <AvatarFallback style="bg-[#043b69] dark:bg-blue-600 text-white text-2xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <View style="absolute -bottom-1 -right-1 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full w-6 h-6" />
              </motion.div>
              
              <View style="flex-1">
                <View style="flex items-center gap-2 mb-1">
                  <Text style={isDark ? 'text-white' : ''}>{profileData.name}</Text>
                  {kycStatus === "verified" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <CheckCircle2 style="w-5 h-5 text-green-600 dark:text-green-400" />
                    </motion.div>
                  )}
                </View>
                <Text style={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {profileData.username}
                </Text>
                <View style="flex gap-2">
                  <Badge style={`border-0 ${
                    kycStatus === "verified"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : kycStatus === "under-review"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : kycStatus === "rejected"
                      ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                  }`}>
                    {kycStatus === "verified" && "Verified"}
                    {kycStatus === "under-review" && "Under Review"}
                    {kycStatus === "rejected" && "Rejected"}
                    {kycStatus === "pending" && "Pending Verification"}
                  </Badge>
                  <Badge variant="outline" style={isDark ? 'border-gray-600 text-gray-300' : ''}>
                    Member since {profileData.memberSince}
                  </Badge>
                </View>
              </View>
            </View>

            <Text style={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {profileData.bio}
            </Text>

            {/* User ID */}
            <View style={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <View style="flex items-center gap-2">
                <User style="w-4 h-4 text-gray-500" />
                <Text style={`text-sm font-mono ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {profileData.userId}
                </Text>
              </View>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onPress={copyUserId}
                style={`p-1.5 rounded-lg ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
              >
                {copiedUserId ? (
                  <Check style="w-4 h-4 text-green-600" />
                ) : (
                  <Copy style="w-4 h-4 text-gray-500" />
                )}
              </motion.button>
            </View>
          </Card>
        </motion.div>

        {/* Wallet Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card style={`p-6 shadow-lg mb-6 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-[#043b69] to-[#032d51]'} text-white`}>
            <View style="flex items-center justify-between mb-4">
              <View style="flex items-center gap-2">
                <DollarSign style="w-5 h-5" />
                <Text style="text-sm opacity-80">Total Balance</Text>
              </View>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onPress={() => setShowBalance(!showBalance)}
                style="p-1.5 hover:bg-white/10 rounded"
              >
                {showBalance ? <Eye style="w-4 h-4" /> : <EyeOff style="w-4 h-4" />}
              </motion.button>
            </View>
            
            <View style="text-3xl mb-4">
              {showBalance ? `$${(profileData.walletBalance + profileData.escrowBalance).toFixed(2)}` : "••••••"}
            </View>
            
            <View style="flex justify-between items-center pt-4 border-t border-white/20">
              <View>
                <View style="text-sm opacity-80">Available</View>
                <View style="text-xl">{showBalance ? `$${profileData.walletBalance.toFixed(2)}` : "••••"}</View>
              </View>
              <View style="text-right">
                <View style="text-sm opacity-80">In Escrow</View>
                <View style="text-xl">{showBalance ? `$${profileData.escrowBalance.toFixed(2)}` : "••••"}</View>
              </View>
            </View>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style="grid grid-cols-2 gap-3 mb-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card style={`p-4 shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
                  <View style={`p-2 w-fit rounded-lg ${stat.bgColor} mb-3`}>
                    <Icon style={`w-5 h-5 ${stat.color}`} />
                  </View>
                  <View style={`text-2xl mb-1 ${isDark ? 'text-white' : ''}`}>{stat.value}</View>
                  <View style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</View>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="overview" style="w-full">
            <TabsList style={`grid w-full grid-cols-3 mb-6 ${isDark ? 'bg-gray-800' : ''}`}>
              <TabsTrigger value="overview" style={isDark ? 'data-[state=active]:bg-gray-700' : ''}>Overview</TabsTrigger>
              <TabsTrigger value="achievements" style={isDark ? 'data-[state=active]:bg-gray-700' : ''}>Badges</TabsTrigger>
              <TabsTrigger value="activity" style={isDark ? 'data-[state=active]:bg-gray-700' : ''}>Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" style="space-y-4">
              {/* Contact Information */}
              <Card style={`p-4 shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
                <Text style={`mb-4 flex items-center gap-2 ${isDark ? 'text-white' : ''}`}>
                  <User style="w-4 h-4" />
                  Contact Information
                </Text>
                <View style="space-y-3">
                  <View style="flex items-center gap-3">
                    <Mail style="w-4 h-4 text-gray-500" />
                    <View style="flex-1">
                      <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</Text>
                      <Text style={`text-sm ${isDark ? 'text-white' : ''}`}>{profileData.email}</Text>
                    </View>
                  </View>
                  <Separator style={isDark ? 'bg-gray-700' : ''} />
                  <View style="flex items-center gap-3">
                    <Phone style="w-4 h-4 text-gray-500" />
                    <View style="flex-1">
                      <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</Text>
                      <Text style={`text-sm ${isDark ? 'text-white' : ''}`}>{profileData.phone}</Text>
                    </View>
                  </View>
                  <Separator style={isDark ? 'bg-gray-700' : ''} />
                  <View style="flex items-center gap-3">
                    <MapPin style="w-4 h-4 text-gray-500" />
                    <View style="flex-1">
                      <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Location</Text>
                      <Text style={`text-sm ${isDark ? 'text-white' : ''}`}>{profileData.location}</Text>
                    </View>
                  </View>
                </View>
              </Card>

              {/* Transaction Statistics */}
              <Card style={`p-4 shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
                <Text style={`mb-4 flex items-center gap-2 ${isDark ? 'text-white' : ''}`}>
                  <TrendingUp style="w-4 h-4" />
                  Transaction Statistics
                </Text>
                <View style="space-y-4">
                  <View>
                    <View style="flex justify-between mb-2">
                      <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Volume</Text>
                      <Text style={isDark ? 'text-white' : ''}>${transactionStats.totalVolume.toLocaleString()}</Text>
                    </View>
                    <Progress value={75} style="h-2" />
                  </View>
                  <View>
                    <View style="flex justify-between mb-2">
                      <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Avg Transaction</Text>
                      <Text style={isDark ? 'text-white' : ''}>${transactionStats.avgTransactionValue.toFixed(2)}</Text>
                    </View>
                    <Progress value={60} style="h-2" />
                  </View>
                  <Separator style={isDark ? 'bg-gray-700' : ''} />
                  <View style="grid grid-cols-2 gap-4">
                    <View>
                      <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</Text>
                      <Text style={`text-2xl ${isDark ? 'text-white' : ''}`}>{transactionStats.completedDeals}</Text>
                    </View>
                    <View>
                      <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active</Text>
                      <Text style={`text-2xl ${isDark ? 'text-white' : ''}`}>{transactionStats.activeDeals}</Text>
                    </View>
                  </View>
                </View>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" style="space-y-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card style={`p-4 shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : ''} ${achievement.earned ? '' : 'opacity-50'}`}>
                      <View style="flex items-center gap-3">
                        <View style={`p-3 rounded-lg ${achievement.earned ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30' : isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <Icon style={`w-6 h-6 ${achievement.earned ? achievement.color : 'text-gray-400'}`} />
                        </View>
                        <View style="flex-1">
                          <View style={`mb-1 ${isDark ? 'text-white' : ''}`}>{achievement.title}</View>
                          <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {achievement.earned ? "Earned" : "Not yet earned"}
                          </Text>
                        </View>
                        {achievement.earned && (
                          <CheckCircle2 style="w-5 h-5 text-green-600" />
                        )}
                      </View>
                    </Card>
                  </motion.div>
                );
              })}
            </TabsContent>

            <TabsContent value="activity" style="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card style={`p-4 shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <View style="flex items-start gap-3">
                      <View style={`p-2 rounded-lg ${
                        activity.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                        activity.type === 'payment' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        'bg-blue-100 dark:bg-blue-900/30'
                      }`}>
                        <Calendar style={`w-4 h-4 ${
                          activity.type === 'success' ? 'text-green-600' :
                          activity.type === 'payment' ? 'text-purple-600' :
                          'text-blue-600'
                        }`} />
                      </View>
                      <View style="flex-1">
                        <View style={`mb-1 ${isDark ? 'text-white' : ''}`}>{activity.action}</View>
                        <Text style={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{activity.detail}</Text>
                        <Text style={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{activity.time}</Text>
                      </View>
                    </View>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style="space-y-3 mt-6"
        >
          <Button
            style={`w-full h-12 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#043b69] hover:bg-[#032d51]'}`}
            onPress={() => onNavigate("edit-profile")}
          >
            <Edit2 style="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          
          <Button
            variant="outline"
            style={`w-full h-12 ${isDark ? 'border-red-600 text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'}`}
            onPress={() => toast.info("Logout feature")}
          >
            <LogOut style="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>
      </View>
    </View>
  );
}
