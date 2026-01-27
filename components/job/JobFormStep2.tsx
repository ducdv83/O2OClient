import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useJobStore } from '../../store/job.store';
import { formatDate, formatTime } from '../../utils/format';

export default function JobFormStep2() {
  const { draft, updateDraft } = useJobStore();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      updateDraft({ date: selectedDate });
    }
  };

  const handleStartTimeChange = (event: any, selectedTime?: Date) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      updateDraft({ startTime: selectedTime });
    }
  };

  const handleEndTimeChange = (event: any, selectedTime?: Date) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      updateDraft({ endTime: selectedTime });
    }
  };

  const handleLocationPress = () => {
    // Mock location picker - sẽ implement với map sau
    Alert.alert(
      'Chọn địa điểm',
      'Tính năng chọn địa điểm sẽ được implement với map picker',
      [
        {
          text: 'Chọn địa điểm mẫu',
          onPress: () => {
            updateDraft({
              location: {
                address: '123 Đường ABC, Quận 1, TP.HCM',
                latitude: 10.7769,
                longitude: 106.7009,
              },
            });
          },
        },
        { text: 'Hủy', style: 'cancel' },
      ]
    );
  };

  return (
    <View>
      <Text className="text-2xl font-bold text-gray-900 mb-6">
        Lịch & Địa điểm
      </Text>

      {/* Date */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Ngày *
        </Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-base">
            {draft?.date
              ? formatDate(draft.date, 'dd/MM/yyyy')
              : 'Chọn ngày'}
          </Text>
          <Text className="text-gray-400">📅</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={draft?.date || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </View>

      {/* Start Time */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Giờ bắt đầu *
        </Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
          onPress={() => setShowStartTimePicker(true)}
        >
          <Text className="text-base">
            {draft?.startTime
              ? formatTime(draft.startTime)
              : 'Chọn giờ bắt đầu'}
          </Text>
          <Text className="text-gray-400">🕐</Text>
        </TouchableOpacity>
        {showStartTimePicker && (
          <DateTimePicker
            value={draft?.startTime || new Date()}
            mode="time"
            display="default"
            onChange={handleStartTimeChange}
          />
        )}
      </View>

      {/* End Time */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Giờ kết thúc *
        </Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
          onPress={() => setShowEndTimePicker(true)}
        >
          <Text className="text-base">
            {draft?.endTime
              ? formatTime(draft.endTime)
              : 'Chọn giờ kết thúc'}
          </Text>
          <Text className="text-gray-400">🕐</Text>
        </TouchableOpacity>
        {showEndTimePicker && (
          <DateTimePicker
            value={draft?.endTime || new Date()}
            mode="time"
            display="default"
            onChange={handleEndTimeChange}
          />
        )}
      </View>

      {/* Location */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Địa điểm *
        </Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
          onPress={handleLocationPress}
        >
          <Text
            className={`text-base flex-1 ${
              draft?.location ? 'text-gray-900' : 'text-gray-400'
            }`}
            numberOfLines={2}
          >
            {draft?.location?.address || 'Chọn địa điểm'}
          </Text>
          <Text className="text-gray-400 ml-2">📍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

