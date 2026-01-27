import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useJobStore } from '../../store/job.store';
import { SERVICE_TYPES } from '../../constants/serviceTypes';
import { formatDate, formatTime, formatCurrency } from '../../utils/format';

export default function JobPreviewScreen() {
  const { draft, clearDraft, addJob } = useJobStore();

  if (!draft) {
    router.back();
    return null;
  }

  const serviceType = SERVICE_TYPES.find((s) => s.id === draft.serviceType);

  const { addJob } = useJobStore();

  const handlePost = () => {
    if (!draft.serviceType || !draft.startTime || !draft.endTime || !draft.location || !draft.budgetMin || !draft.budgetMax) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Create job from draft
    const newJob: import('../../store/job.store').Job = {
      id: 'job_' + Date.now(),
      serviceType: draft.serviceType,
      skills: draft.skills || [],
      description: draft.description || '',
      startTime: draft.startTime!,
      endTime: draft.endTime!,
      location: draft.location,
      budgetMin: draft.budgetMin,
      budgetMax: draft.budgetMax,
      tryOneTime: draft.tryOneTime || false,
      status: 'OPEN',
      createdAt: new Date(),
      candidateCount: 0,
    };

    addJob(newJob);
    clearDraft();

    Alert.alert(
      'Thành công',
      'Yêu cầu của bạn đã được đăng thành công!',
      [
        {
          text: 'Xem ứng viên',
          onPress: () => {
            router.replace(`/job/candidates/${newJob.id}`);
          },
        },
        {
          text: 'OK',
          style: 'cancel',
          onPress: () => {
            router.replace('/(tabs)/jobs');
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-blue-500 text-lg">← Quay lại</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">
            Xem trước
          </Text>
          <View style={{ width: 60 }} />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Xem trước yêu cầu
        </Text>

        {/* Service Type */}
        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <Text className="text-sm text-gray-600 mb-1">Loại dịch vụ</Text>
          <Text className="text-lg font-semibold text-gray-900">
            {serviceType?.icon} {serviceType?.name}
          </Text>
        </View>

        {/* Skills */}
        {draft.skills && draft.skills.length > 0 && (
          <View className="bg-gray-50 rounded-lg p-4 mb-4">
            <Text className="text-sm text-gray-600 mb-2">Kỹ năng yêu cầu</Text>
            <View className="flex-row flex-wrap gap-2">
              {draft.skills.map((skill, idx) => (
                <View key={idx} className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-blue-700 text-sm">{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Description */}
        {draft.description && (
          <View className="bg-gray-50 rounded-lg p-4 mb-4">
            <Text className="text-sm text-gray-600 mb-2">Ghi chú</Text>
            <Text className="text-gray-900">{draft.description}</Text>
          </View>
        )}

        {/* Schedule */}
        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <Text className="text-sm text-gray-600 mb-2">Lịch</Text>
          {draft.date && (
            <Text className="text-gray-900 mb-1">
              📅 {formatDate(draft.date, 'dd/MM/yyyy')}
            </Text>
          )}
          {draft.startTime && draft.endTime && (
            <Text className="text-gray-900">
              🕐 {formatTime(draft.startTime)} - {formatTime(draft.endTime)}
            </Text>
          )}
        </View>

        {/* Location */}
        {draft.location && (
          <View className="bg-gray-50 rounded-lg p-4 mb-4">
            <Text className="text-sm text-gray-600 mb-2">Địa điểm</Text>
            <Text className="text-gray-900">📍 {draft.location.address}</Text>
          </View>
        )}

        {/* Budget */}
        {(draft.budgetMin || draft.budgetMax) && (
          <View className="bg-gray-50 rounded-lg p-4 mb-4">
            <Text className="text-sm text-gray-600 mb-2">Ngân sách</Text>
            <Text className="text-gray-900">
              {draft.budgetMin && formatCurrency(draft.budgetMin)}
              {draft.budgetMin && draft.budgetMax && ' - '}
              {draft.budgetMax && formatCurrency(draft.budgetMax)}/giờ
            </Text>
          </View>
        )}

        {/* Try One Time */}
        {draft.tryOneTime && (
          <View className="bg-blue-50 rounded-lg p-4 mb-4">
            <Text className="text-blue-800 font-semibold">
              ✓ Thử 1 ca đầu
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View className="bg-white px-6 py-4 border-t border-gray-200">
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-lg items-center"
          onPress={handlePost}
        >
          <Text className="text-white text-lg font-semibold">
            Đăng yêu cầu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

