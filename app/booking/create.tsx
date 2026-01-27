import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { mockCarePros } from '../../utils/mockData';
import { useJobStore } from '../../store/job.store';
import { useBookingStore } from '../../store/booking.store';
import { PaymentMethod } from '../../types/booking.types';
import { formatDate, formatTime, formatCurrency } from '../../utils/format';

export default function CreateBookingScreen() {
  const { careproId } = useLocalSearchParams<{ careproId: string }>();
  const { draft } = useJobStore();
  const { addBooking } = useBookingStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>('WALLET');
  const [loading, setLoading] = useState(false);

  const carepro = mockCarePros.find((c) => c.id === careproId);

  if (!carepro || !draft) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Không tìm thấy thông tin</Text>
      </View>
    );
  }

  // Calculate total amount
  const hours =
    draft.startTime && draft.endTime
      ? Math.ceil(
          (new Date(draft.endTime).getTime() -
            new Date(draft.startTime).getTime()) /
            (1000 * 60 * 60)
        )
      : 1;
  const agreedRate = draft.budgetMax || carepro.hourlyRateHint;
  const totalAmount = hours * agreedRate;
  const platformFee = Math.round(totalAmount * 0.1); // 10% platform fee
  const finalAmount = totalAmount + platformFee;

  const paymentMethods: { value: PaymentMethod; label: string; icon: string }[] =
    [
      { value: 'WALLET', label: 'Ví O2O', icon: '💳' },
      { value: 'CARD', label: 'Thẻ ngân hàng', icon: '💳' },
      { value: 'MOMO', label: 'MoMo', icon: '📱' },
      { value: 'ZALOPAY', label: 'ZaloPay', icon: '📱' },
    ];

  const handleConfirm = () => {
    setLoading(true);

    // Mock payment processing
    setTimeout(() => {
      const newBooking = {
        id: 'booking_' + Date.now(),
        jobId: 'job_' + Date.now(),
        careproId: carepro.id,
        careproName: carepro.name,
        careproAvatar: carepro.avatar,
        agreedRate,
        startTime: new Date(draft.date!),
        endTime: new Date(draft.endTime!),
        location: draft.location!,
        status: 'SCHEDULED' as const,
        createdAt: new Date(),
        payment: {
          id: 'payment_' + Date.now(),
          amount: finalAmount,
          method: selectedPaymentMethod,
          escrowStatus: 'HELD' as const,
        },
      };

      addBooking(newBooking);
      setLoading(false);

      router.replace({
        pathname: '/booking/success',
        params: { bookingId: newBooking.id },
      });
    }, 2000);
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
            Đặt ca
          </Text>
          <View style={{ width: 60 }} />
        </View>
      </View>

      {/* Summary */}
      <View className="bg-white px-6 py-4 mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Tóm tắt ca
        </Text>

        {/* CarePro Info */}
        <View className="flex-row items-center mb-4 pb-4 border-b border-gray-200">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-4">
            <Text className="text-3xl">{carepro.avatar}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              {carepro.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-yellow-500">⭐</Text>
              <Text className="text-gray-700 ml-1">
                {carepro.ratingAvg.toFixed(1)} ({carepro.ratingCount})
              </Text>
            </View>
          </View>
        </View>

        {/* Time */}
        <View className="mb-3">
          <Text className="text-sm text-gray-600 mb-1">Thời gian</Text>
          <Text className="text-gray-900">
            {draft.date && formatDate(draft.date, 'dd/MM/yyyy')}
            {draft.startTime && draft.endTime && (
              <> • {formatTime(draft.startTime)} - {formatTime(draft.endTime)}</>
            )}
          </Text>
          <Text className="text-gray-600 text-sm mt-1">
            ({hours} giờ)
          </Text>
        </View>

        {/* Location */}
        {draft.location && (
          <View className="mb-3">
            <Text className="text-sm text-gray-600 mb-1">Địa điểm</Text>
            <Text className="text-gray-900">📍 {draft.location.address}</Text>
          </View>
        )}

        {/* Rate */}
        <View className="mb-3">
          <Text className="text-sm text-gray-600 mb-1">Giá thỏa thuận</Text>
          <Text className="text-gray-900 text-lg font-semibold">
            {formatCurrency(agreedRate)}/giờ
          </Text>
        </View>
      </View>

      {/* Payment Method */}
      <View className="bg-white px-6 py-4 mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Phương thức thanh toán
        </Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.value}
            className={`flex-row items-center py-4 border-b border-gray-200 last:border-0 ${
              selectedPaymentMethod === method.value ? 'bg-blue-50' : ''
            }`}
            onPress={() => setSelectedPaymentMethod(method.value)}
          >
            <Text className="text-2xl mr-4">{method.icon}</Text>
            <Text className="flex-1 text-gray-900 font-medium">
              {method.label}
            </Text>
            {selectedPaymentMethod === method.value && (
              <Text className="text-blue-500">✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Payment Summary */}
      <View className="bg-white px-6 py-4 mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Chi tiết thanh toán
        </Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Tiền ca ({hours} giờ)</Text>
          <Text className="text-gray-900">{formatCurrency(totalAmount)}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Phí nền tảng (10%)</Text>
          <Text className="text-gray-900">{formatCurrency(platformFee)}</Text>
        </View>
        <View className="border-t border-gray-200 pt-3 mt-3">
          <View className="flex-row justify-between">
            <Text className="text-lg font-semibold text-gray-900">
              Tổng cộng
            </Text>
            <Text className="text-lg font-bold text-blue-600">
              {formatCurrency(finalAmount)}
            </Text>
          </View>
        </View>
        <View className="bg-blue-50 rounded-lg p-3 mt-4">
          <Text className="text-blue-800 text-sm">
            💡 Số tiền này sẽ được ký quỹ (escrow) và chỉ giải ngân sau khi ca
            hoàn tất.
          </Text>
        </View>
      </View>

      {/* Cancel Policy */}
      <View className="bg-white px-6 py-4 mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          Chính sách hủy
        </Text>
        <View>
          <Text className="text-gray-700 text-sm mb-2">
            • Hủy trước 24h: Hoàn 100% tiền
          </Text>
          <Text className="text-gray-700 text-sm mb-2">
            • Hủy trong 24h: Hoàn 50% tiền
          </Text>
          <Text className="text-gray-700 text-sm">
            • Hủy sau khi ca bắt đầu: Không hoàn tiền
          </Text>
        </View>
      </View>

      {/* Confirm Button */}
      <View className="px-6 py-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          className={`bg-blue-500 py-4 rounded-lg items-center ${
            loading ? 'opacity-50' : ''
          }`}
          onPress={handleConfirm}
          disabled={loading}
        >
          <Text className="text-white text-lg font-semibold">
            {loading ? 'Đang xử lý...' : `Thanh toán ${formatCurrency(finalAmount)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

