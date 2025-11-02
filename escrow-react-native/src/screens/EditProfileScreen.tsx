import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { motion } from "motion/react";
import { ArrowLeft, Save, Camera, User, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { useTheme } from "./ThemeContext";

interface EditProfileScreenProps {
  onBack: () => void;
  onSave?: (data: any) => void;
}

export function EditProfileScreen({ onBack, onSave }: EditProfileScreenProps) {
  const { isDark } = useTheme();
  
  // Initialize with existing profile data
  const [formData, setFormData] = useState({
    name: "John Doe",
    username: "@johndoe",
    email: "john.doe@example.com",
    phone: "+1 (234) 567-8900",
    location: "New York, USA",
    bio: "Professional buyer and seller on the platform. Specializing in electronics and tech products.",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated successfully!");
      if (onSave) {
        onSave(formData);
      }
      onBack();
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <View style={`h-screen pb-24 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-[#F9FAFB]'}`}>
      {/* Header */}
      <View
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
            <Text style={isDark ? 'text-white' : ''}>Edit Profile</Text>
          </View>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onPress={handleSubmit}
            disabled={isLoading}
            style={`flex items-center gap-2 px-4 py-2 rounded-full ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-[#043b69] hover:bg-[#032d51] text-white'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Save style="w-4 h-4" />
            Save
          </motion.button>
        </View>
      </View>

      <View style="max-w-md mx-auto p-6">
        <View onSubmit={handleSubmit} style="space-y-6">
          {/* Profile Picture */}
          <View
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card style={`p-6 shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
              <View style="flex flex-col items-center">
                <View
                  whileHover={{ scale: 1.05 }}
                  style="relative cursor-pointer"
                >
                  <Avatar style="w-24 h-24">
                    <AvatarFallback style="bg-[#043b69] dark:bg-blue-600 text-white text-3xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <View
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={`absolute bottom-0 right-0 p-2 rounded-full ${
                      isDark ? 'bg-blue-600' : 'bg-[#043b69]'
                    } text-white shadow-lg cursor-pointer`}
                  >
                    <Camera style="w-4 h-4" />
                  </View>
                </View>
                <Text style={`text-sm mt-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Click to change profile picture
                </Text>
              </View>
            </Card>
          </View>

          {/* Personal Information */}
          <View
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card style={`p-6 shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
              <Text style={`mb-4 flex items-center gap-2 ${isDark ? 'text-white' : ''}`}>
                <User style="w-4 h-4" />
                Personal Information
              </Text>
              
              <View style="space-y-4">
                <View>
                  <Label style={isDark ? 'text-gray-300' : ''}>Full Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    style={`mt-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    placeholder="Enter your full name"
                  />
                </View>

                <View>
                  <Label style={isDark ? 'text-gray-300' : ''}>Username</Label>
                  <Input
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    style={`mt-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    placeholder="@username"
                  />
                  <Text style={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your unique username on the platform
                  </Text>
                </View>

                <View>
                  <Label style={isDark ? 'text-gray-300' : ''}>Bio</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    style={`mt-2 min-h-[100px] ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    placeholder="Tell us about yourself"
                  />
                </View>
              </View>
            </Card>
          </View>

          {/* Contact Information */}
          <View
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card style={`p-6 shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
              <Text style={`mb-4 flex items-center gap-2 ${isDark ? 'text-white' : ''}`}>
                <Mail style="w-4 h-4" />
                Contact Information
              </Text>
              
              <View style="space-y-4">
                <View>
                  <Label style={isDark ? 'text-gray-300' : ''}>Email Address</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    style={`mt-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    placeholder="your.email@example.com"
                  />
                </View>

                <View>
                  <Label style={isDark ? 'text-gray-300' : ''}>Phone Number</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    style={`mt-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    placeholder="+1 (234) 567-8900"
                  />
                </View>

                <View>
                  <Label style={isDark ? 'text-gray-300' : ''}>Location</Label>
                  <View style="relative mt-2">
                    <MapPin style={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <Input
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      style={`pl-10 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                      placeholder="City, Country"
                    />
                  </View>
                </View>
              </View>
            </Card>
          </View>

          {/* Submit Button */}
          <View
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              type="submit"
              disabled={isLoading}
              style={`w-full h-12 ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-[#043b69] hover:bg-[#032d51]'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <View style="flex items-center gap-2">
                  <View
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Saving...
                </View>
              ) : (
                <>
                  <Save style="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
