import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useBookingStore } from '../../store/booking.store';
import { BookingStatus } from '../../types/booking.types';
import { formatDate, formatTime, formatCurrency } from '../../utils/format';
import CalendarView from './bookings/calendar';

type StatusTabType = 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
type ViewModeType = 'list' | 'calendar';

export default function BookingsScreen() {
  const { bookings } = useBookingStore();
  const [viewMode, setViewMode] = useState<ViewModeType>('list');
  const [activeTab, setActiveTab] = useState<StatusTabType>('upcoming');

  const getBookingsByTab = (tab: StatusTabType): typeof bookings => {
    switch (tab) {
      case 'upcoming':
        return bookings.filter((b) => b.status === 'SCHEDULED');
      case 'in_progress':
        return bookings.filter((b) => b.status === 'IN_PROGRESS');
      case 'completed':
        return bookings.filter((b) => b.status === 'COMPLETED');
      case 'cancelled':
        return bookings.filter((b) => b.status === 'CANCELLED');
      default:
        return [];
    }
  };

  const getStatusColor = (status: BookingStatus): string => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-700';
      case 'IN_PROGRESS':
        return 'bg-green-100 text-green-700';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      case 'DISPUTED':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: BookingStatus): string => {
    switch (status) {
      case 'SCHEDULED':
        return 'Sắp tới';
      case 'IN_PROGRESS':
        return 'Đang diễn ra';
      case 'COMPLETED':
        return 'Hoàn tất';
      case 'CANCELLED':
        return 'Đã hủy';
      case 'DISPUTED':
        return 'Tranh chấp';
      default:
        return status;
    }
  };

  const statusTabs: { key: StatusTabType; label: string }[] = [
    { key: 'upcoming', label: 'Sắp tới' },
    { key: 'in_progress', label: 'Đang diễn ra' },
    { key: 'completed', label: 'Hoàn tất' },
    { key: 'cancelled', label: 'Đã hủy' },
  ];

  const filteredBookings = getBookingsByTab(activeTab);

  if (viewMode === 'calendar') {
    return <CalendarView />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-2xl font-bold text-gray-900">Ca đã đặt</Text>
          <TouchableOpacity
            onPress={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
          >
            <Text className="text-blue-500 font-semibold">
              {viewMode === 'list' ? '📅 Lịch' : '📋 Danh sách'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Status Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white border-b border-gray-200"
      >
        <View className="flex-row px-4">
          {statusTabs.map((tab) => (
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

      {/* Bookings List */}
      <ScrollView className="flex-1 px-6 py-4">
        {filteredBookings.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-lg">
              Chưa có ca nào trong danh mục này
            </Text>
          </View>
        ) : (
          filteredBookings.map((booking) => (
            <TouchableOpacity
              key={booking.id}
              className="bg-white rounded-lg p-4 mb-4 shadow-sm"
              onPress={() => router.push(`/booking/${booking.id}`)}
            >
              <View className="flex-row items-start mb-3">
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                  <Text className="text-2xl">
                    {booking.careproAvatar || '👤'}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900 mb-1">
                    {booking.careproName}
                  </Text>
                  <View
                    className={`px-2 py-1 rounded self-start ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    <Text className="text-xs font-medium">
                      {getStatusLabel(booking.status)}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mb-3">
                <Text className="text-gray-600 text-sm mb-1">
                  📅 {formatDate(booking.startTime, 'dd/MM/yyyy')}
                </Text>
                <Text className="text-gray-600 text-sm">
                  🕐 {formatTime(booking.startTime)} -{' '}
                  {formatTime(booking.endTime)}
                </Text>
                <Text className="text-gray-600 text-sm mt-1">
                  📍 {booking.location.address}
                </Text>
              </View>

              <View className="flex-row justify-between items-center pt-3 border-t border-gray-200">
                <Text className="text-gray-900 font-semibold">
                  {formatCurrency(booking.agreedRate)}/giờ
                </Text>
                <TouchableOpacity
                  className="bg-blue-500 px-4 py-2 rounded-lg"
                  onPress={() => router.push(`/booking/${booking.id}`)}
                >
                  <Text className="text-white font-medium">Chi tiết</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
