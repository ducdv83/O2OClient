import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/auth.store';

export default function OnboardingScreen() {
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleComplete = async () => {
    if (!fullName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập họ tên');
      return;
    }

    setLoading(true);
    
    // Mock complete profile - sẽ thay bằng API thật sau
    setTimeout(() => {
      const currentUser = useAuthStore.getState().user;
      setUser({ ...currentUser, fullName });
      setLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="px-6 py-12">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Hoàn thiện hồ sơ
        </Text>
        <Text className="text-base text-gray-600 mb-8">
          Thông tin của bạn giúp chúng tôi kết nối với người chăm nom phù hợp
        </Text>

        <View className="mb-6">
          <Text className="text-sm text-gray-700 mb-2">Họ và tên *</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-lg"
            placeholder="Nguyễn Văn A"
            value={fullName}
            onChangeText={setFullName}
            autoFocus
          />
        </View>

        <TouchableOpacity
          className={`bg-blue-500 py-4 rounded-lg items-center mt-4 ${loading ? 'opacity-50' : ''}`}
          onPress={handleComplete}
          disabled={loading}
        >
          <Text className="text-white text-lg font-semibold">
            {loading ? 'Đang xử lý...' : 'Hoàn tất'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

