import { View, Text, TouchableOpacity } from 'react-native';
import { CarePro } from '../../types/carepro.types';
import { formatCurrency } from '../../utils/format';

interface CareProCardProps {
  carepro: CarePro;
  fitScore: number;
  distance: number;
  onPress: () => void;
}

export default function CareProCard({
  carepro,
  fitScore,
  distance,
  onPress,
}: CareProCardProps) {
  const fitScorePercent = Math.round(fitScore * 100);

  return (
    <TouchableOpacity
      className="bg-white rounded-lg p-4 mb-4 shadow-sm"
      onPress={onPress}
    >
      <View className="flex-row items-start mb-3">
        {/* Avatar */}
        <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-4">
          <Text className="text-3xl">{carepro.avatar || '👤'}</Text>
        </View>

        {/* Info */}
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="text-lg font-semibold text-gray-900 mr-2">
              {carepro.name}
            </Text>
            {carepro.verifiedLevel >= 2 && (
              <Text className="text-blue-500">✓</Text>
            )}
          </View>

          {/* Rating */}
          <View className="flex-row items-center mb-2">
            <Text className="text-yellow-500">⭐</Text>
            <Text className="text-gray-700 ml-1">
              {carepro.ratingAvg.toFixed(1)} ({carepro.ratingCount} đánh giá)
            </Text>
          </View>

          {/* Skills */}
          <View className="flex-row flex-wrap gap-2 mb-2">
            {carepro.skills.slice(0, 3).map((skill, idx) => (
              <View
                key={idx}
                className="bg-blue-50 px-2 py-1 rounded"
              >
                <Text className="text-blue-700 text-xs">{skill}</Text>
              </View>
            ))}
            {carepro.skills.length > 3 && (
              <Text className="text-gray-500 text-xs">
                +{carepro.skills.length - 3} kỹ năng
              </Text>
            )}
          </View>

          {/* Distance & Price */}
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600 text-sm">
              📍 {distance.toFixed(1)} km
            </Text>
            <Text className="text-blue-600 font-semibold">
              {formatCurrency(carepro.hourlyRateHint)}/h
            </Text>
          </View>
        </View>
      </View>

      {/* FitScore */}
      <View className="mt-3 pt-3 border-t border-gray-200">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-sm text-gray-600">Độ phù hợp</Text>
          <Text className="text-sm font-semibold text-blue-600">
            {fitScorePercent}%
          </Text>
        </View>
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${fitScorePercent}%` }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

