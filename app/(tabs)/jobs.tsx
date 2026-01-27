import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useJobStore } from '../../store/job.store';
import { SERVICE_TYPES } from '../../constants/serviceTypes';
import { formatDate, formatTime, formatCurrency } from '../../utils/format';

type TabType = 'DRAFT' | 'OPEN' | 'BOOKED' | 'COMPLETED' | 'CANCELLED';

export default function JobsScreen() {
  const { jobs } = useJobStore();
  const [activeTab, setActiveTab] = useState<TabType>('OPEN');

  const getJobsByTab = (tab: TabType) => {
    if (tab === 'DRAFT') {
      return jobs.filter((j) => j.status === 'DRAFT');
    }
    return jobs.filter((j) => j.status === tab);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-700';
      case 'OPEN':
        return 'bg-blue-100 text-blue-700';
      case 'BOOKED':
        return 'bg-green-100 text-green-700';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'DRAFT':
        return 'Bản nháp';
      case 'OPEN':
        return 'Đang tìm';
      case 'BOOKED':
        return 'Đã đặt';
      case 'COMPLETED':
        return 'Hoàn tất';
      case 'CANCELLED':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const tabs: { key: TabType; label: string }[] = [
    { key: 'DRAFT', label: 'Bản nháp' },
    { key: 'OPEN', label: 'Đang tìm' },
    { key: 'BOOKED', label: 'Đã đặt' },
    { key: 'COMPLETED', label: 'Hoàn tất' },
    { key: 'CANCELLED', label: 'Đã hủy' },
  ];

  const filteredJobs = getJobsByTab(activeTab);

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-900">Yêu cầu của tôi</Text>
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-lg"
            onPress={() => router.push('/job/create')}
          >
            <Text className="text-white font-semibold">+ Tạo mới</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white border-b border-gray-200"
      >
        <View className="flex-row px-4">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`px-4 py-3 border-b-2 ${
                activeTab === tab.key
                  ? 'border-blue-500'
                  : 'border-transparent'
              }`}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                className={
                  activeTab === tab.key
                    ? 'text-blue-500 font-semibold'
                    : 'text-gray-600'
                }
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Jobs List */}
      <ScrollView className="flex-1 px-6 py-4">
        {filteredJobs.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-4xl mb-4">📋</Text>
            <Text className="text-gray-500 text-lg mb-2">
              Chưa có yêu cầu nào trong danh mục này
            </Text>
            {activeTab === 'OPEN' && (
              <TouchableOpacity
                className="bg-blue-500 px-6 py-3 rounded-lg mt-4"
                onPress={() => router.push('/job/create')}
              >
                <Text className="text-white font-semibold">Tạo yêu cầu mới</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredJobs.map((job) => {
            const serviceType = SERVICE_TYPES.find((s) => s.id === job.serviceType);
            return (
              <TouchableOpacity
                key={job.id}
                className="bg-white rounded-lg p-4 mb-4 shadow-sm"
                onPress={() => router.push(`/job/${job.id}`)}
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <Text className="text-2xl mr-2">{serviceType?.icon}</Text>
                      <Text className="text-lg font-semibold text-gray-900">
                        {serviceType?.name}
                      </Text>
                    </View>
                    <View
                      className={`px-2 py-1 rounded self-start ${getStatusColor(
                        job.status
                      )}`}
                    >
                      <Text className="text-xs font-medium">
                        {getStatusLabel(job.status)}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text className="text-gray-700 mb-3" numberOfLines={2}>
                  {job.description}
                </Text>

                <View className="mb-3">
                  <Text className="text-gray-600 text-sm mb-1">
                    📅 {formatDate(job.startTime, 'dd/MM/yyyy')}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    🕐 {formatTime(job.startTime)} - {formatTime(job.endTime)}
                  </Text>
                  <Text className="text-gray-600 text-sm mt-1">
                    📍 {job.location.address}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between pt-3 border-t border-gray-200">
                  <View>
                    <Text className="text-gray-600 text-sm">Khung giá</Text>
                    <Text className="text-gray-900 font-semibold">
                      {formatCurrency(job.budgetMin)} - {formatCurrency(job.budgetMax)}/giờ
                    </Text>
                  </View>
                  {job.candidateCount !== undefined && job.candidateCount > 0 && (
                    <View className="bg-blue-50 px-3 py-1 rounded-full">
                      <Text className="text-blue-700 text-sm font-semibold">
                        {job.candidateCount} ứng viên
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
