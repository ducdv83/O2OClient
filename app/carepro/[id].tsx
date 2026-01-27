import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { mockCarePros, mockReviews } from '../../utils/mockData';
import { CarePro, Review } from '../../types/carepro.types';
import { formatCurrency } from '../../utils/format';

export default function CareProDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const carepro = mockCarePros.find((c) => c.id === id);
  const reviews = mockReviews[id || ''] || [];

  if (!carepro) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Không tìm thấy thông tin</Text>
      </View>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Text key={i} className={i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}>
        ⭐
      </Text>
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
            Hồ sơ ứng viên
          </Text>
          <View style={{ width: 60 }} />
        </View>
      </View>

      {/* Profile Header */}
      <View className="bg-white px-6 py-6 mb-4">
        <View className="flex-row items-start mb-4">
          <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mr-4">
            <Text className="text-5xl">{carepro.avatar || '👤'}</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Text className="text-2xl font-bold text-gray-900 mr-2">
                {carepro.name}
              </Text>
              {carepro.verifiedLevel >= 2 && (
                <View className="bg-blue-500 px-2 py-1 rounded">
                  <Text className="text-white text-xs font-semibold">
                    Đã xác minh ✓
                  </Text>
                </View>
              )}
            </View>
            <View className="flex-row items-center mb-2">
              {renderStars(carepro.ratingAvg)}
              <Text className="text-gray-700 ml-2">
                {carepro.ratingAvg.toFixed(1)} ({carepro.ratingCount} đánh giá)
              </Text>
            </View>
            <Text className="text-gray-600">
              {carepro.yearsExp} năm kinh nghiệm
            </Text>
          </View>
        </View>

        {/* Bio */}
        {carepro.bio && (
          <View className="mb-4">
            <Text className="text-gray-900 leading-6">{carepro.bio}</Text>
          </View>
        )}

        {/* Price */}
        <View className="bg-blue-50 rounded-lg p-4">
          <Text className="text-sm text-gray-600 mb-1">Giá tham khảo</Text>
          <Text className="text-2xl font-bold text-blue-600">
            {formatCurrency(carepro.hourlyRateHint)}/giờ
          </Text>
        </View>
      </View>

      {/* Skills */}
      <View className="bg-white px-6 py-4 mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          Kỹ năng
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {carepro.skills.map((skill, idx) => (
            <View
              key={idx}
              className="bg-blue-50 px-4 py-2 rounded-full"
            >
              <Text className="text-blue-700 font-medium">{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Certificates */}
      {carepro.certificates.length > 0 && (
        <View className="bg-white px-6 py-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Chứng chỉ
          </Text>
          {carepro.certificates.map((cert, idx) => (
            <View key={idx} className="flex-row items-center mb-2">
              <Text className="text-green-500 mr-2">✓</Text>
              <Text className="text-gray-700">{cert}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Available Hours */}
      {carepro.availableHours && (
        <View className="bg-white px-6 py-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Lịch rảnh
          </Text>
          <Text className="text-gray-600">
            Có thể làm việc theo lịch linh hoạt. Vui lòng liên hệ để thỏa thuận.
          </Text>
        </View>
      )}

      {/* Reviews */}
      <View className="bg-white px-6 py-4 mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          Đánh giá ({reviews.length})
        </Text>
        {reviews.length === 0 ? (
          <Text className="text-gray-500">Chưa có đánh giá</Text>
        ) : (
          reviews.map((review) => (
            <View key={review.id} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
              <View className="flex-row items-center mb-2">
                <Text className="font-semibold text-gray-900 mr-2">
                  {review.raterName}
                </Text>
                <View className="flex-row">
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text className="text-gray-700">{review.comment}</Text>
              <Text className="text-gray-400 text-xs mt-1">
                {review.createdAt.toLocaleDateString('vi-VN')}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* Action Buttons */}
      <View className="px-6 py-4 bg-white border-t border-gray-200">
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-4 rounded-lg items-center"
            onPress={() => {
              // Navigate to chat
              router.push(`/chat/${id}`);
            }}
          >
            <Text className="text-gray-900 font-semibold">💬 Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-blue-500 py-4 rounded-lg items-center"
            onPress={() => {
              // Navigate to booking - cần có job draft trước
              router.push({
                pathname: '/booking/create',
                params: { careproId: id },
              });
            }}
          >
            <Text className="text-white font-semibold">Đặt ca</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

