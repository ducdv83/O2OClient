import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/auth.store';
import { SERVICE_TYPES } from '../../constants/serviceTypes';
import { mockCarePros } from '../../utils/mockData';

export default function HomeScreen() {
  const { user } = useAuthStore();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900">
          Chào mừng, {user?.fullName || 'Bạn'}
        </Text>
        <Text className="text-gray-600 mt-1">
          Bạn cần chăm nom gì hôm nay?
        </Text>
      </View>

      {/* Create Job Button */}
      <View className="px-6 py-4">
        <TouchableOpacity
          className="bg-blue-500 rounded-lg p-4 items-center shadow-sm"
          onPress={() => router.push('/job/create')}
        >
          <Text className="text-white text-lg font-semibold">
            + Tạo yêu cầu mới
          </Text>
        </TouchableOpacity>
      </View>

      {/* Service Categories */}
      <View className="px-6 mb-6">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Danh mục dịch vụ
        </Text>
        <View className="flex-row flex-wrap gap-3">
          {SERVICE_TYPES.map((service) => (
            <TouchableOpacity
              key={service.id}
              className="bg-white px-4 py-3 rounded-lg flex-1 min-w-[45%] items-center shadow-sm"
              onPress={() => router.push({
                pathname: '/job/create',
                params: { serviceType: service.id },
              })}
            >
              <Text className="text-3xl mb-2">{service.icon}</Text>
              <Text className="text-gray-900 font-medium text-center">
                {service.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Suggested CarePros */}
      <View className="px-6 mb-6">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Gợi ý gần bạn
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4">
            {mockCarePros.map((carepro) => (
              <TouchableOpacity
                key={carepro.id}
                className="bg-white rounded-lg p-4 w-64 shadow-sm"
                onPress={() => router.push(`/carepro/${carepro.id}`)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center mb-3">
                  <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Text className="text-2xl">{carepro.avatar}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900">
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
                
                <View className="flex-row flex-wrap gap-2 mb-3">
                  {carepro.skills.slice(0, 2).map((skill, idx) => (
                    <View
                      key={idx}
                      className="bg-blue-50 px-2 py-1 rounded"
                    >
                      <Text className="text-blue-700 text-xs">{skill}</Text>
                    </View>
                  ))}
                </View>

                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-600 text-sm">
                    {Math.random() * 5} km
                  </Text>
                  <Text className="text-blue-600 font-semibold">
                    {carepro.hourlyRateHint.toLocaleString('vi-VN')}đ/h
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
