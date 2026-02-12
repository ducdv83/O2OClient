import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useJobStore } from '../../store/job.store';
import { SERVICE_TYPES } from '../../constants/serviceTypes';
import { formatDate, formatTime, formatCurrency } from '../../utils/format';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        return 'bg-slate-100 text-slate-700';
      case 'OPEN':
        return 'bg-blue-50 text-blue-700';
      case 'BOOKED':
        return 'bg-emerald-50 text-emerald-700';
      case 'COMPLETED':
        return 'bg-slate-100 text-slate-700';
      case 'CANCELLED':
        return 'bg-rose-50 text-rose-700';
      default:
        return 'bg-slate-100 text-slate-700';
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
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <StatusBar style="dark" />

      {/* Header */}
      <View className="bg-white px-6 pt-6 pb-5 border-b border-slate-100">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-semibold text-slate-900">
            Yêu cầu của tôi
          </Text>
          <TouchableOpacity
            className="bg-blue-600 px-5 py-2 rounded-full"
            onPress={() => router.push('/job/create')}
          >
            <Text className="text-white text-sm font-semibold">+ Tạo mới</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="bg-white px-4 pt-2 pb-2 border-b border-slate-100">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`h-9 px-4 rounded-full items-center justify-center ${
                activeTab === tab.key ? 'bg-blue-600' : 'bg-slate-100'
              }`}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                className={`text-sm font-medium ${
                  activeTab === tab.key ? 'text-white' : 'text-slate-700'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Jobs List */}
      <ScrollView
        className="flex-1 px-4 pt-2"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {filteredJobs.length === 0 ? (
          <View className="bg-white rounded-2xl p-8 items-center mt-8 border border-slate-100">
            <View className="w-12 h-12 rounded-full bg-blue-50 mb-4 items-center justify-center">
              <Text className="text-2xl">📋</Text>
            </View>
            <Text className="text-slate-900 text-lg font-semibold mb-2 text-center">
              Chưa có yêu cầu nào
            </Text>
            <Text className="text-slate-600 text-center text-sm mb-4">
              Chưa có yêu cầu nào trong danh mục này
            </Text>
            {activeTab === 'OPEN' && (
              <TouchableOpacity
                className="bg-blue-600 px-6 py-3 rounded-full"
                onPress={() => router.push('/job/create')}
              >
                <Text className="text-white font-semibold">Tạo yêu cầu mới</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View className="gap-4 mt-4">
            {filteredJobs.map((job) => {
              const serviceType = SERVICE_TYPES.find(
                (s) => s.id === job.serviceType
              );
              return (
                <TouchableOpacity
                  key={job.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                  onPress={() => router.push(`/job/${job.id}`)}
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <View className="flex-row items-center mb-2">
                        <Text className="text-2xl mr-2">{serviceType?.icon}</Text>
                        <Text className="text-lg font-semibold text-slate-900">
                          {serviceType?.name}
                        </Text>
                      </View>
                      <View
                        className={`px-3 py-1 rounded-full self-start ${getStatusColor(
                          job.status
                        )}`}
                      >
                        <Text className="text-xs font-semibold">
                          {getStatusLabel(job.status)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Text className="text-slate-700 mb-3 text-sm" numberOfLines={2}>
                    {job.description}
                  </Text>

                  <View className="mb-3">
                    <Text className="text-slate-600 text-sm mb-1">
                      📅 {formatDate(job.startTime, 'dd/MM/yyyy')}
                    </Text>
                    <Text className="text-slate-600 text-sm">
                      🕐 {formatTime(job.startTime)} -{' '}
                      {formatTime(job.endTime)}
                    </Text>
                    <Text className="text-slate-600 text-sm mt-1">
                      📍 {job.location.address}
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between pt-3 border-t border-slate-100">
                    <View>
                      <Text className="text-slate-600 text-sm">Khung giá</Text>
                      <Text className="text-slate-900 font-semibold">
                        {formatCurrency(job.budgetMin)} -{' '}
                        {formatCurrency(job.budgetMax)}/giờ
                      </Text>
                    </View>
                    {job.candidateCount !== undefined &&
                      job.candidateCount > 0 && (
                        <View className="bg-blue-50 px-3 py-1 rounded-full">
                          <Text className="text-blue-700 text-sm font-semibold">
                            {job.candidateCount} ứng viên
                          </Text>
                        </View>
                      )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
