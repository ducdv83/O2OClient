import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useJobStore } from '../../store/job.store';
import { formatCurrency } from '../../utils/format';

export default function JobFormStep3() {
  const { draft, updateDraft } = useJobStore();
  const [budgetMin, setBudgetMin] = useState(
    draft?.budgetMin?.toString() || ''
  );
  const [budgetMax, setBudgetMax] = useState(
    draft?.budgetMax?.toString() || ''
  );
  const [tryOneTime, setTryOneTime] = useState(
    draft?.tryOneTime || false
  );

  const handleBudgetMinChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setBudgetMin(numValue);
    updateDraft({ budgetMin: numValue ? parseInt(numValue) : undefined });
  };

  const handleBudgetMaxChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setBudgetMax(numValue);
    updateDraft({ budgetMax: numValue ? parseInt(numValue) : undefined });
  };

  // Mock market price range
  const marketMin = 100000;
  const marketMax = 200000;

  return (
    <View>
      <Text className="text-2xl font-bold text-gray-900 mb-6">
        Ngân sách
      </Text>

      {/* Market Price Hint */}
      <View className="bg-blue-50 rounded-lg p-4 mb-6">
        <Text className="text-blue-800 font-semibold mb-2">
          💡 Khung giá thị trường
        </Text>
        <Text className="text-blue-700">
          {formatCurrency(marketMin)} - {formatCurrency(marketMax)}/giờ
        </Text>
      </View>

      {/* Budget Min */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Ngân sách tối thiểu (VND/giờ) *
        </Text>
        <View className="flex-row items-center">
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base flex-1"
            placeholder="100000"
            value={budgetMin}
            onChangeText={handleBudgetMinChange}
            keyboardType="number-pad"
          />
          {budgetMin && (
            <Text className="ml-2 text-gray-600">
              = {formatCurrency(parseInt(budgetMin))}
            </Text>
          )}
        </View>
      </View>

      {/* Budget Max */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Ngân sách tối đa (VND/giờ) *
        </Text>
        <View className="flex-row items-center">
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base flex-1"
            placeholder="200000"
            value={budgetMax}
            onChangeText={handleBudgetMaxChange}
            keyboardType="number-pad"
          />
          {budgetMax && (
            <Text className="ml-2 text-gray-600">
              = {formatCurrency(parseInt(budgetMax))}
            </Text>
          )}
        </View>
      </View>

      {/* Try One Time Option */}
      <View className="mb-6">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => {
            const newValue = !tryOneTime;
            setTryOneTime(newValue);
            updateDraft({ tryOneTime: newValue });
          }}
        >
          <View
            className={`w-6 h-6 border-2 rounded mr-3 items-center justify-center ${
              tryOneTime
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300'
            }`}
          >
            {tryOneTime && <Text className="text-white text-xs">✓</Text>}
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-900">
              Thử 1 ca đầu
            </Text>
            <Text className="text-sm text-gray-600">
              Chỉ đặt 1 ca để thử nghiệm trước khi đặt dài hạn
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

