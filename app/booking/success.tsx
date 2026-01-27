import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useBookingStore } from '../../store/booking.store';

export default function BookingSuccessScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { bookings } = useBookingStore();
  const booking = bookings.find((b) => b.id === bookingId);

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <StatusBar style="dark" />
      
      {/* Success Icon */}
      <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-6">
        <Text className="text-5xl">✓</Text>
      </View>

      <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">
        Đặt ca thành công!
      </Text>

      {booking && (
        <>
          <Text className="text-gray-600 text-center mb-2">
            Mã đặt ca: {booking.id}
          </Text>
          <Text className="text-gray-600 text-center mb-8">
            Bạn sẽ nhận được thông báo khi CarePro xác nhận
          </Text>
        </>
      )}

      <View className="w-full gap-4">
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-lg items-center"
          onPress={() => router.replace('/(tabs)/bookings')}
        >
          <Text className="text-white text-lg font-semibold">
            Xem ca đã đặt
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white border-2 border-blue-500 py-4 rounded-lg items-center"
          onPress={() => router.replace('/(tabs)')}
        >
          <Text className="text-blue-500 text-lg font-semibold">
            Về trang chủ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

