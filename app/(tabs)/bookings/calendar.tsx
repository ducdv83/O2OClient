import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Calendar, DateData } from 'react-native-calendars';
import { BookingStatus } from '../../../types/booking.types';
import { router } from 'expo-router';
import { useBookingStore } from '../../../store/booking.store';
import { formatTime, formatCurrency } from '../../../utils/format';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarViewScreen() {
  const { bookings } = useBookingStore();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Mark dates with bookings
  const markedDates: { [key: string]: any } = {};
  bookings.forEach((booking) => {
    const dateKey = new Date(booking.startTime)
      .toISOString()
      .split('T')[0];
    if (!markedDates[dateKey]) {
      markedDates[dateKey] = {
        marked: true,
        dotColor: getStatusColor(booking.status),
        selected: dateKey === selectedDate,
        selectedColor: '#007AFF',
      };
    } else {
      markedDates[dateKey].dots = [
        ...(markedDates[dateKey].dots || []),
        { color: getStatusColor(booking.status) },
      ];
    }
  });

  // Mark selected date
  if (markedDates[selectedDate]) {
    markedDates[selectedDate].selected = true;
    markedDates[selectedDate].selectedColor = '#007AFF';
  } else {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#007AFF',
    };
  }

  const getStatusColor = (status: BookingStatus): string => {
    switch (status) {
      case 'SCHEDULED':
        return '#007AFF';
      case 'IN_PROGRESS':
        return '#34C759';
      case 'COMPLETED':
        return '#8E8E93';
      case 'CANCELLED':
        return '#FF3B30';
      default:
        return '#8E8E93';
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
      default:
        return status;
    }
  };

  // Get bookings for selected date
  const selectedDateBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.startTime)
      .toISOString()
      .split('T')[0];
    return bookingDate === selectedDate;
  });

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <StatusBar style="dark" />

      {/* Header */}
      <View className="bg-white px-6 pt-6 pb-5 border-b border-slate-100">
        <Text className="text-2xl font-semibold text-slate-900">Lịch ca</Text>
      </View>

      {/* Calendar */}
      <View className="bg-white mx-4 mt-4 rounded-2xl border border-slate-100 overflow-hidden">
        <Calendar
          current={selectedDate}
          onDayPress={onDayPress}
          markedDates={markedDates}
          markingType="multi-dot"
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#8E8E93',
            selectedDayBackgroundColor: '#007AFF',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#007AFF',
            dayTextColor: '#000000',
            textDisabledColor: '#d9e1e8',
            dotColor: '#007AFF',
            selectedDotColor: '#ffffff',
            arrowColor: '#007AFF',
            monthTextColor: '#000000',
            textDayFontWeight: '400',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 13,
          }}
        />
      </View>

      {/* Legend */}
      <View className="bg-white mx-4 mt-2 px-5 py-4 rounded-2xl border border-slate-100">
        <Text className="text-sm font-semibold text-slate-900 mb-2">
          Chú thích:
        </Text>
        <View className="flex-row flex-wrap gap-4">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-blue-600 mr-2" />
            <Text className="text-xs text-slate-600">Sắp tới</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
            <Text className="text-xs text-slate-600">Đang diễn ra</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-slate-400 mr-2" />
            <Text className="text-xs text-slate-600">Hoàn tất</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-rose-500 mr-2" />
            <Text className="text-xs text-slate-600">Đã hủy</Text>
          </View>
        </View>
      </View>

      {/* Bookings for selected date */}
      <ScrollView
        className="flex-1 px-4 mt-4"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text className="text-lg font-semibold text-slate-900 mb-4">
          {selectedDateBookings.length > 0
            ? `${selectedDateBookings.length} ca vào ngày ${new Date(selectedDate).toLocaleDateString('vi-VN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}`
            : 'Không có ca nào vào ngày này'}
        </Text>

        {selectedDateBookings.map((booking) => (
          <TouchableOpacity
            key={booking.id}
            className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-100"
            onPress={() => router.push(`/booking/${booking.id}`)}
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
                  className={`px-3 py-1 rounded-full self-start ${
                    booking.status === 'SCHEDULED'
                      ? 'bg-blue-50'
                      : booking.status === 'IN_PROGRESS'
                        ? 'bg-emerald-50'
                        : booking.status === 'COMPLETED'
                          ? 'bg-slate-100'
                          : 'bg-rose-50'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      booking.status === 'SCHEDULED'
                        ? 'text-blue-700'
                        : booking.status === 'IN_PROGRESS'
                          ? 'text-emerald-700'
                          : booking.status === 'COMPLETED'
                            ? 'text-slate-700'
                            : 'text-rose-700'
                    }`}
                  >
                    {getStatusLabel(booking.status)}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-3">
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
      </ScrollView>
    </SafeAreaView>
  );
}

