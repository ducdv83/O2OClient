import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useBookingStore } from '../../store/booking.store';
import { formatDate, formatTime, formatCurrency } from '../../utils/format';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bookings, updateBooking } = useBookingStore();
  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Không tìm thấy thông tin ca</Text>
      </View>
    );
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-700';
      case 'IN_PROGRESS':
        return 'bg-green-100 text-green-700';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Hủy ca',
      'Bạn có chắc chắn muốn hủy ca này?',
      [
        { text: 'Không', style: 'cancel' },
        {
          text: 'Có, hủy ca',
          style: 'destructive',
          onPress: () => {
            updateBooking(id, { status: 'CANCELLED' });
            Alert.alert('Thành công', 'Ca đã được hủy');
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-blue-500 text-lg">← Quay lại</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">
            Chi tiết ca
          </Text>
          <View style={{ width: 60 }} />
        </View>
      </View>

      {/* CarePro Info */}
      <View className="bg-white px-6 py-4 mb-4">
        <View className="flex-row items-center mb-4">
          <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mr-4">
            <Text className="text-4xl">{booking.careproAvatar || '👤'}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900 mb-1">
              {booking.careproName}
            </Text>
            <View
              className={`px-3 py-1 rounded self-start ${getStatusColor(
                booking.status
              )}`}
            >
              <Text className="text-sm font-medium">{booking.status}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Booking Details */}
      <View className="bg-white px-6 py-4 mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Thông tin ca
        </Text>

        <View className="mb-3">
          <Text className="text-sm text-gray-600 mb-1">Mã ca</Text>
          <Text className="text-gray-900 font-mono">{booking.id}</Text>
        </View>

        <View className="mb-3">
          <Text className="text-sm text-gray-600 mb-1">Thời gian</Text>
          <Text className="text-gray-900">
            {formatDate(booking.startTime, 'dd/MM/yyyy')} •{' '}
            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
          </Text>
        </View>

        <View className="mb-3">
          <Text className="text-sm text-gray-600 mb-1">Địa điểm</Text>
          <Text className="text-gray-900">📍 {booking.location.address}</Text>
        </View>

        <View className="mb-3">
          <Text className="text-sm text-gray-600 mb-1">Giá thỏa thuận</Text>
          <Text className="text-gray-900 text-lg font-semibold">
            {formatCurrency(booking.agreedRate)}/giờ
          </Text>
        </View>

        {booking.payment && (
          <View className="mt-4 pt-4 border-t border-gray-200">
            <Text className="text-sm text-gray-600 mb-1">Thanh toán</Text>
            <Text className="text-gray-900">
              {formatCurrency(booking.payment.amount)} ({booking.payment.method})
            </Text>
            <Text className="text-gray-600 text-xs mt-1">
              Trạng thái: {booking.payment.escrowStatus}
            </Text>
          </View>
        )}
      </View>

      {/* Actions */}
      {booking.status === 'SCHEDULED' && (
        <View className="px-6 py-4">
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 bg-blue-500 py-4 rounded-lg items-center"
              onPress={() => router.push(`/chat/${booking.id}`)}
            >
              <Text className="text-white font-semibold">💬 Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-red-500 py-4 rounded-lg items-center"
              onPress={handleCancel}
            >
              <Text className="text-white font-semibold">Hủy ca</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {booking.status === 'IN_PROGRESS' && (
        <View className="px-6 py-4">
          <View className="bg-green-50 rounded-lg p-4 mb-4">
            <Text className="text-green-800 font-semibold mb-2">
              Ca đang diễn ra
            </Text>
            <Text className="text-green-700 text-sm">
              CarePro đã check-in. Bạn có thể theo dõi tiến độ và chat với
              CarePro.
            </Text>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 bg-blue-500 py-4 rounded-lg items-center"
              onPress={() => router.push(`/chat/${booking.id}`)}
            >
              <Text className="text-white font-semibold">💬 Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-orange-500 py-4 rounded-lg items-center"
              onPress={() => Alert.alert('SOS', 'Tính năng SOS sẽ được implement sau')}
            >
              <Text className="text-white font-semibold">🆘 SOS</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {booking.status === 'COMPLETED' && (
        <View className="px-6 py-4">
          <TouchableOpacity
            className="bg-blue-500 py-4 rounded-lg items-center"
            onPress={() => router.push(`/booking/${booking.id}/review`)}
          >
            <Text className="text-white font-semibold">
              ⭐ Đánh giá CarePro
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

