import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/auth.store';
import { useBookingStore } from '../../store/booking.store';
import { formatCurrency } from '../../utils/format';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <ScrollView className="flex-1">
        <StatusBar style="dark" />

        {/* Profile Header */}
        <View className="bg-white px-6 pt-6 pb-8 items-center border-b border-slate-100">
          <View className="w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl font-bold">
              {user?.fullName?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text className="text-2xl font-semibold text-slate-900 mb-2">
            {user?.fullName || 'Chưa cập nhật'}
          </Text>
          <Text className="text-slate-600 text-sm">{user?.phone}</Text>

          {/* Stats */}
          <View className="flex-row justify-around w-full pt-6 mt-4 border-t border-slate-100">
            <View className="items-center">
              <Text className="text-xl font-semibold text-slate-900">
                {bookings.length}
              </Text>
              <Text className="text-slate-600 text-sm">Tổng ca</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-semibold text-slate-900">
                {completedBookings.length}
              </Text>
              <Text className="text-slate-600 text-sm">Đã hoàn tất</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-semibold text-slate-900">
                {formatCurrency(totalSpent)}
              </Text>
              <Text className="text-slate-600 text-sm">Đã chi</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mt-3 mx-4 gap-3">
          <TouchableOpacity
            className="bg-white px-5 py-4 flex-row items-center justify-between rounded-2xl border border-slate-100"
            onPress={() => {}}
          >
            <Text className="text-slate-900">Chỉnh sửa hồ sơ</Text>
            <Text className="text-slate-400">›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white px-5 py-4 flex-row items-center justify-between rounded-2xl border border-slate-100"
            onPress={() => router.push('/wallet')}
          >
            <Text className="text-slate-900">Ví & Thanh toán</Text>
            <Text className="text-slate-400">›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white px-5 py-4 flex-row items-center justify-between rounded-2xl border border-slate-100"
            onPress={() => router.push('/chat')}
          >
            <Text className="text-slate-900">Tin nhắn</Text>
            <Text className="text-slate-400">›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white px-5 py-4 flex-row items-center justify-between rounded-2xl border border-slate-100"
            onPress={() => {}}
          >
            <Text className="text-slate-900">Cài đặt</Text>
            <Text className="text-slate-400">›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <View className="px-6 py-8">
          <TouchableOpacity
            className="bg-rose-500 rounded-full py-4 items-center"
            onPress={handleLogout}
          >
            <Text className="text-white font-semibold">Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
