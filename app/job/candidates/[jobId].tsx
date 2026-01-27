import { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { mockCarePros, calculateFitScore } from '../../../utils/mockData';
import { CarePro } from '../../../types/carepro.types';
import CareProCard from '../../../components/carepro/CareProCard';

type SortOption = 'fitscore' | 'distance' | 'price' | 'rating';

export default function CandidatesScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('fitscore');
  const [filterSkills, setFilterSkills] = useState<string[]>([]);

  // Mock job requirements - sẽ lấy từ store hoặc API sau
  const jobRequirements = {
    serviceType: 'patient',
    skills: ['Tiêm thuốc', 'Sơ cứu'],
    budgetMin: 100000,
    budgetMax: 150000,
    location: { latitude: 10.7769, longitude: 106.7009 },
  };

  // Calculate FitScore và filter
  const candidates = useMemo(() => {
    let filtered = mockCarePros.map((carepro) => ({
      ...carepro,
      fitScore: calculateFitScore(carepro, jobRequirements),
      distance: Math.random() * 5, // Mock distance
    }));

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by skills
    if (filterSkills.length > 0) {
      filtered = filtered.filter((c) =>
        filterSkills.some((skill) => c.skills.includes(skill))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'fitscore':
          return b.fitScore - a.fitScore;
        case 'distance':
          return a.distance - b.distance;
        case 'price':
          return a.hourlyRateHint - b.hourlyRateHint;
        case 'rating':
          return b.ratingAvg - a.ratingAvg;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, filterSkills, jobRequirements]);

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Độ phù hợp', value: 'fitscore' },
    { label: 'Khoảng cách', value: 'distance' },
    { label: 'Giá', value: 'price' },
    { label: 'Đánh giá', value: 'rating' },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-blue-500 text-lg">← Quay lại</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">
            {candidates.length} ứng viên phù hợp
          </Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Search */}
        <View className="mb-3">
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
            placeholder="Tìm kiếm theo tên, kỹ năng..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Sort */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                className={`px-4 py-2 rounded-full ${
                  sortBy === option.value
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                }`}
                onPress={() => setSortBy(option.value)}
              >
                <Text
                  className={
                    sortBy === option.value
                      ? 'text-white font-semibold'
                      : 'text-gray-700'
                  }
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Candidates List */}
      <ScrollView className="flex-1 px-6 py-4">
        {candidates.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-lg">
              Không tìm thấy ứng viên phù hợp
            </Text>
          </View>
        ) : (
          candidates.map((candidate) => (
            <CareProCard
              key={candidate.id}
              carepro={candidate}
              fitScore={candidate.fitScore}
              distance={candidate.distance}
              onPress={() => router.push(`/carepro/${candidate.id}`)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

