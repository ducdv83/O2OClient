import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useBookingStore } from '../../store/booking.store';
import { BookingStatus } from '../../types/booking.types';
import { formatDate, formatTime, formatCurrency } from '../../utils/format';
import { SafeAreaView } from 'react-native-safe-area-context';

type StatusTabType = 'upcoming' | 'in_progress' | 'completed' | 'cancelled';

export default function BookingsScreen() {
  const { bookings } = useBookingStore();
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
        return 'bg-blue-50 text-blue-700';
      case 'IN_PROGRESS':
        return 'bg-emerald-50 text-emerald-700';
      case 'COMPLETED':
        return 'bg-slate-100 text-slate-700';
      case 'CANCELLED':
        return 'bg-rose-50 text-rose-700';
      case 'DISPUTED':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-slate-100 text-slate-700';
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

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <StatusBar style="dark" />

      {/* Header */}
      <View className="bg-white px-5 pt-5 pb-4 border-b border-slate-100">
        <Text className="text-2xl font-semibold text-slate-900">
          Ca đã đặt
        </Text>
        <Text className="text-slate-600 text-sm mt-1">
          Xem và quản lý các ca đã đặt
        </Text>
      </View>

      {/* Filter Tabs - scroll on small screen */}
      <View className="bg-white px-4 py-3 border-b border-slate-100">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingRight: 16 }}
        >
          {statusTabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`h-10 px-4 rounded-full items-center justify-center ${
                activeTab === tab.key ? 'bg-blue-600' : 'bg-slate-100'
              }`}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.8}
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

      {/* Bookings List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 32,
          flexGrow: 1,
        }}
      >
        {filteredBookings.length === 0 ? (
          <View className="bg-white rounded-2xl p-10 items-center justify-center min-h-[280px] border border-slate-100 shadow-sm">
            <View className="w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-5">
              <Text className="text-3xl">📋</Text>
            </View>
            <Text className="text-slate-900 text-lg font-semibold mb-2 text-center">
              Chưa có ca nào
            </Text>
            <Text className="text-slate-600 text-center text-sm leading-5 px-2">
              Chưa có ca nào trong danh mục này. Ca đã đặt sẽ hiển thị tại đây.
            </Text>
          </View>
        ) : (
          <View className="gap-4">
            {filteredBookings.map((booking) => (
              <TouchableOpacity
                key={booking.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 active:opacity-90"
                onPress={() => router.push(`/booking/${booking.id}`)}
                activeOpacity={0.9}
              >
                <View className="flex-row items-start mb-3">
                  <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Text className="text-2xl">
                      {booking.careproAvatar || '👤'}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-slate-900 mb-1">
                      {booking.careproName}
                    </Text>
                    <View
                      className={`px-3 py-1 rounded-full self-start ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      <Text className="text-xs font-semibold">
                        {getStatusLabel(booking.status)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="mb-3">
                  <Text className="text-slate-600 text-sm mb-1">
                    📅 {formatDate(booking.startTime, 'dd/MM/yyyy')}
                  </Text>
                  <Text className="text-slate-600 text-sm">
                    🕐 {formatTime(booking.startTime)} -{' '}
                    {formatTime(booking.endTime)}
                  </Text>
                  <Text className="text-slate-600 text-sm mt-1">
                    📍 {booking.location.address}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center pt-3 border-t border-slate-100">
                  <Text className="text-slate-900 font-semibold">
                    {formatCurrency(booking.agreedRate)}/giờ
                  </Text>
                  <TouchableOpacity
                    className="bg-blue-600 px-5 py-2 rounded-full"
                    onPress={() => router.push(`/booking/${booking.id}`)}
                  >
                    <Text className="text-white text-sm font-semibold">
                      Chi tiết
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
