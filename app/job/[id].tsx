import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useJobStore } from '../../store/job.store';
import { SERVICE_TYPES } from '../../constants/serviceTypes';
import { formatDate, formatTime, formatCurrency } from '../../utils/format';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { jobs, updateJob } = useJobStore();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Không tìm thấy yêu cầu</Text>
        <TouchableOpacity
          className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const serviceType = SERVICE_TYPES.find((s) => s.id === job.serviceType);

  const handleCancel = () => {
    Alert.alert(
      'Hủy yêu cầu',
      'Bạn có chắc chắn muốn hủy yêu cầu này?',
      [
        { text: 'Không', style: 'cancel' },
        {
          text: 'Có, hủy',
          style: 'destructive',
          onPress: () => {
            updateJob(id, { status: 'CANCELLED' });
            Alert.alert('Thành công', 'Yêu cầu đã được hủy');
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
            Chi tiết yêu cầu
          </Text>
          <View style={{ width: 60 }} />
        </View>
      </View>

      {/* Job Info */}
      <View className="bg-white px-6 py-6 mb-4">
        <View className="flex-row items-center mb-4">
          <Text className="text-4xl mr-3">{serviceType?.icon}</Text>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              {serviceType?.name}
            </Text>
            <View className="bg-blue-100 px-2 py-1 rounded self-start">
              <Text className="text-blue-700 text-xs font-semibold">
                {job.status === 'OPEN' ? 'Đang tìm' : job.status}
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-900 mb-2">
            Mô tả
          </Text>
          <Text className="text-gray-700 leading-6">{job.description}</Text>
        </View>

        {job.skills.length > 0 && (
          <View className="mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-2">
              Kỹ năng yêu cầu
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <View key={idx} className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-blue-700 text-sm">{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-900 mb-2">
            Thời gian
          </Text>
          <Text className="text-gray-700">
            📅 {formatDate(job.startTime, 'dd/MM/yyyy')}
          </Text>
          <Text className="text-gray-700">
            🕐 {formatTime(job.startTime)} - {formatTime(job.endTime)}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-900 mb-2">
            Địa điểm
          </Text>
          <Text className="text-gray-700">📍 {job.location.address}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-900 mb-2">
            Khung giá
          </Text>
          <Text className="text-gray-900 text-lg font-semibold">
            {formatCurrency(job.budgetMin)} - {formatCurrency(job.budgetMax)}/giờ
          </Text>
        </View>

        {job.tryOneTime && (
          <View className="bg-blue-50 rounded-lg p-3">
            <Text className="text-blue-800 font-semibold">
              ✓ Thử 1 ca đầu
            </Text>
          </View>
        )}
      </View>

      {/* Actions */}
      {job.status === 'OPEN' && (
        <View className="px-6 py-4">
          <TouchableOpacity
            className="bg-blue-500 py-4 rounded-lg items-center mb-3"
            onPress={() => router.push(`/job/candidates/${job.id}`)}
          >
            <Text className="text-white font-semibold text-lg">
              Xem ứng viên ({job.candidateCount || 0})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 py-4 rounded-lg items-center"
            onPress={handleCancel}
          >
            <Text className="text-white font-semibold">Hủy yêu cầu</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

