import { View, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <StatusBar style="dark" />

      {/* Logo */}
      <Image
        source={require('../../assets/logo.png')}
        style={{ width: 160, height: 160, marginBottom: 32 }}
        resizeMode="contain"
      />

      <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
        Chào mừng đến với{'\n'}O2O Care Platform
      </Text>
      
      <Text className="text-base text-gray-600 text-center mb-12 px-4">
        Kết nối gia đình với người chăm nom đáng tin cậy
      </Text>

      <View className="w-full gap-4">
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-lg items-center"
          onPress={() => router.push('/(auth)/login')}
        >
          <Text className="text-white text-lg font-semibold">Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white border-2 border-blue-500 py-4 rounded-lg items-center"
          onPress={() => router.push('/(auth)/register')}
        >
          <Text className="text-blue-500 text-lg font-semibold">Tạo tài khoản</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

