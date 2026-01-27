import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useBookingStore } from '../../../store/booking.store';
import { useAuthStore } from '../../../store/auth.store';

export default function ReviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bookings, updateBooking } = useBookingStore();
  const { user } = useAuthStore();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(false);

  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Không tìm thấy thông tin</Text>
      </View>
    );
  }

  const handleSubmit = () => {
    if (!comment.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nhận xét');
      return;
    }

    setLoading(true);

    // Mock submit review
    setTimeout(() => {
      updateBooking(id, { status: 'COMPLETED' });
      setLoading(false);
      Alert.alert(
        'Thành công',
        'Cảm ơn bạn đã đánh giá!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)/bookings'),
          },
        ]
      );
    }, 1000);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => setRating(i + 1)}
        className="mr-2"
      >
        <Text className="text-4xl">
          {i < rating ? '⭐' : '☆'}
        </Text>
      </TouchableOpacity>
    ));
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
            Đánh giá
          </Text>
          <View style={{ width: 60 }} />
        </View>
      </View>

      {/* CarePro Info */}
      <View className="bg-white px-6 py-6 mb-4">
        <View className="flex-row items-center mb-4">
          <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mr-4">
            <Text className="text-4xl">{booking.careproAvatar || '👤'}</Text>
          </View>
          <View>
            <Text className="text-xl font-bold text-gray-900">
              {booking.careproName}
            </Text>
            <Text className="text-gray-600">Ca đã hoàn tất</Text>
          </View>
        </View>
      </View>

      {/* Rating */}
      <View className="bg-white px-6 py-6 mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Bạn đánh giá như thế nào?
        </Text>
        <View className="flex-row items-center justify-center mb-6">
          {renderStars()}
        </View>
        <Text className="text-center text-gray-600">
          {rating === 5 && 'Tuyệt vời!'}
          {rating === 4 && 'Rất tốt!'}
          {rating === 3 && 'Tốt'}
          {rating === 2 && 'Cần cải thiện'}
          {rating === 1 && 'Không hài lòng'}
        </Text>
      </View>

      {/* Comment */}
      <View className="bg-white px-6 py-4 mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          Nhận xét (bắt buộc)
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-base min-h-[120px]"
          placeholder="Chia sẻ trải nghiệm của bạn..."
          value={comment}
          onChangeText={setComment}
          multiline
          textAlignVertical="top"
          maxLength={500}
        />
        <Text className="text-gray-400 text-xs mt-2 text-right">
          {comment.length}/500
        </Text>
      </View>

      {/* Tip */}
      <View className="bg-white px-6 py-4 mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          Tip (tùy chọn)
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          placeholder="Nhập số tiền tip (VND)"
          value={tip}
          onChangeText={(text) => setTip(text.replace(/[^0-9]/g, ''))}
          keyboardType="number-pad"
        />
        {tip && (
          <Text className="text-gray-600 text-sm mt-2">
            Tip: {parseInt(tip).toLocaleString('vi-VN')} VND
          </Text>
        )}
      </View>

      {/* Submit */}
      <View className="px-6 py-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          className={`bg-blue-500 py-4 rounded-lg items-center ${
            loading ? 'opacity-50' : ''
          }`}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white text-lg font-semibold">
            {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

