import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/auth.store';
import { SERVICE_TYPES } from '../../constants/serviceTypes';
import { mockCarePros } from '../../utils/mockData';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <ScrollView className="flex-1">
        <StatusBar style="dark" />

        {/* Header */}
        <View className="bg-white px-6 pt-6 pb-5 border-b border-slate-100">
          <Text className="text-2xl font-semibold text-slate-900">
            Chào mừng, {user?.fullName || 'Bạn'}
          </Text>
          <Text className="text-slate-600 mt-1 text-sm">
            Bạn cần chăm nom gì hôm nay?
          </Text>
        </View>

        {/* Create Job Button */}
        <View className="mx-4 mt-4">
          <TouchableOpacity
            className="bg-blue-600 rounded-2xl p-5 items-center shadow-sm border border-slate-100"
            onPress={() => router.push('/job/create')}
          >
            <Text className="text-white text-base font-semibold">
              + Tạo yêu cầu mới
            </Text>
          </TouchableOpacity>
        </View>

        {/* Service Categories */}
        <View className="mx-4 mt-4 mb-6">
          <Text className="text-lg font-semibold text-slate-900 mb-4">
            Danh mục dịch vụ
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {SERVICE_TYPES.map((service) => (
              <TouchableOpacity
                key={service.id}
                className="bg-white px-4 py-4 rounded-2xl flex-1 min-w-[45%] items-center shadow-sm border border-slate-100"
                onPress={() =>
                  router.push({
                    pathname: '/job/create',
                    params: { serviceType: service.id },
                  })
                }
              >
                <Text className="text-3xl mb-2">{service.icon}</Text>
                <Text className="text-slate-900 font-medium text-center text-sm">
                  {service.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Suggested CarePros */}
        <View className="mx-4 mb-6">
          <Text className="text-lg font-semibold text-slate-900 mb-4">
            Gợi ý gần bạn
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4">
              {mockCarePros.map((carepro) => (
                <TouchableOpacity
                  key={carepro.id}
                  className="bg-white rounded-2xl p-5 w-64 shadow-sm border border-slate-100"
                  onPress={() => router.push(`/carepro/${carepro.id}`)}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center mb-3">
                    <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                      <Text className="text-2xl">{carepro.avatar}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="font-semibold text-slate-900">
                        {carepro.name}
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <Text className="text-amber-500">⭐</Text>
                        <Text className="text-slate-700 ml-1 text-sm">
                          {carepro.ratingAvg.toFixed(1)} ({carepro.ratingCount})
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row flex-wrap gap-2 mb-3">
                    {carepro.skills.slice(0, 2).map((skill, idx) => (
                      <View
                        key={idx}
                        className="bg-blue-50 px-3 py-1 rounded-full"
                      >
                        <Text className="text-blue-700 text-xs">{skill}</Text>
                      </View>
                    ))}
                  </View>

                  <View className="flex-row justify-between items-center gap-2">
                    <Text
                      className="text-slate-600 text-sm flex-1 min-w-0"
                      numberOfLines={1}
                    >
                      {(Math.random() * 5).toFixed(1)} km
                    </Text>
                    <Text
                      className="text-blue-600 font-semibold text-sm shrink-0"
                      numberOfLines={1}
                    >
                      {carepro.hourlyRateHint.toLocaleString('vi-VN')}đ/h
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
