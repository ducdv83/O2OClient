import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/auth.store';
import { useBookingStore } from '../../store/booking.store';
import { formatCurrency } from '../../utils/format';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { bookings } = useBookingStore();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/welcome');
  };

  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED');
  const totalSpent = completedBookings.reduce((sum, b) => {
    const hours = Math.ceil(
      (new Date(b.endTime).getTime() - new Date(b.startTime).getTime()) /
        (1000 * 60 * 60)
    );
    return sum + b.agreedRate * hours;
  }, 0);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Profile Header */}
      <View className="bg-white px-6 py-8 mb-4">
        <View className="items-center mb-6">
          <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-4xl font-bold">
              {user?.fullName?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900">
            {user?.fullName || 'Chưa cập nhật'}
          </Text>
          <Text className="text-gray-600 mt-1">{user?.phone}</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around pt-4 border-t border-gray-200">
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-900">
              {bookings.length}
            </Text>
            <Text className="text-gray-600 text-sm">Tổng ca</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-900">
              {completedBookings.length}
            </Text>
            <Text className="text-gray-600 text-sm">Đã hoàn tất</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalSpent)}
            </Text>
            <Text className="text-gray-600 text-sm">Đã chi</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View className="bg-white mb-4">
        <TouchableOpacity
          className="px-6 py-4 border-b border-gray-200 flex-row items-center justify-between"
          onPress={() => {}}
        >
          <Text className="text-gray-900">Chỉnh sửa hồ sơ</Text>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-6 py-4 border-b border-gray-200 flex-row items-center justify-between"
          onPress={() => router.push('/wallet')}
        >
          <Text className="text-gray-900">Ví & Thanh toán</Text>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-6 py-4 border-b border-gray-200 flex-row items-center justify-between"
          onPress={() => router.push('/chat')}
        >
          <Text className="text-gray-900">Tin nhắn</Text>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-6 py-4 flex-row items-center justify-between"
          onPress={() => {}}
        >
          <Text className="text-gray-900">Cài đặt</Text>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <View className="px-6 py-4">
        <TouchableOpacity
          className="bg-red-500 py-4 rounded-lg items-center"
          onPress={handleLogout}
        >
          <Text className="text-white font-semibold text-lg">Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
