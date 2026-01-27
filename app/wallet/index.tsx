import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useBookingStore } from '../../store/booking.store';
import { formatCurrency } from '../../utils/format';
import { formatDate } from '../../utils/format';

export default function WalletScreen() {
  const { bookings } = useBookingStore();

  // Calculate escrow balance
  const escrowBalance = bookings
    .filter((b) => b.payment?.escrowStatus === 'HELD')
    .reduce((sum, b) => sum + (b.payment?.amount || 0), 0);

  // Mock transaction history
  const transactions = bookings
    .filter((b) => b.payment)
    .map((b) => ({
      id: b.id,
      type: b.status === 'COMPLETED' ? 'completed' : 'escrow',
      amount: b.payment!.amount,
      date: b.createdAt,
      description: `Ca với ${b.careproName}`,
      status: b.payment!.escrowStatus,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-blue-500 text-lg">← Quay lại</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">Ví</Text>
          <View style={{ width: 60 }} />
        </View>
      </View>

      {/* Balance Card */}
      <View className="bg-blue-500 mx-6 mt-6 rounded-lg p-6 mb-4">
        <Text className="text-white text-sm mb-2">Số dư ký quỹ</Text>
        <Text className="text-white text-3xl font-bold mb-4">
          {formatCurrency(escrowBalance)}
        </Text>
        <Text className="text-blue-100 text-sm">
          Số tiền đang được giữ để đảm bảo giao dịch
        </Text>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mb-4">
        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 bg-white rounded-lg p-4 items-center shadow-sm">
            <Text className="text-2xl mb-2">💳</Text>
            <Text className="text-gray-900 font-medium text-sm">
              Thêm thẻ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white rounded-lg p-4 items-center shadow-sm">
            <Text className="text-2xl mb-2">📤</Text>
            <Text className="text-gray-900 font-medium text-sm">
              Rút tiền
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction History */}
      <View className="bg-white px-6 py-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Lịch sử giao dịch
        </Text>
        {transactions.length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="text-gray-500">Chưa có giao dịch nào</Text>
          </View>
        ) : (
          transactions.map((tx) => (
            <View
              key={tx.id}
              className="flex-row items-center justify-between py-4 border-b border-gray-200 last:border-0"
            >
              <View className="flex-1">
                <Text className="text-gray-900 font-medium mb-1">
                  {tx.description}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {formatDate(tx.date, 'dd/MM/yyyy HH:mm')}
                </Text>
                <View className="mt-1">
                  <View
                    className={`px-2 py-1 rounded self-start ${
                      tx.status === 'HELD'
                        ? 'bg-yellow-100'
                        : tx.status === 'RELEASED'
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Text
                      className={`text-xs ${
                        tx.status === 'HELD'
                          ? 'text-yellow-700'
                          : tx.status === 'RELEASED'
                          ? 'text-green-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {tx.status === 'HELD'
                        ? 'Đang ký quỹ'
                        : tx.status === 'RELEASED'
                        ? 'Đã giải ngân'
                        : 'Đã hoàn tiền'}
                    </Text>
                  </View>
                </View>
              </View>
              <Text
                className={`text-lg font-semibold ${
                  tx.type === 'completed' ? 'text-green-600' : 'text-gray-900'
                }`}
              >
                {tx.type === 'completed' ? '+' : '-'}
                {formatCurrency(tx.amount)}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

