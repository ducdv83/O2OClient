import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SERVICE_TYPES, SKILLS } from '../../constants/serviceTypes';
import { useJobStore } from '../../store/job.store';

interface JobFormStep1Props {
  serviceType: string;
  onServiceTypeChange: (type: string) => void;
}

export default function JobFormStep1({
  serviceType,
  onServiceTypeChange,
}: JobFormStep1Props) {
  const { draft, updateDraft } = useJobStore();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    draft?.skills || []
  );
  const [description, setDescription] = useState(draft?.description || '');

  useEffect(() => {
    updateDraft({ skills: selectedSkills, description });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSkills, description]);

  const toggleSkill = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
  };

  return (
    <View>
      <Text className="text-2xl font-bold text-gray-900 mb-6">
        Thông tin dịch vụ
      </Text>

      {/* Service Type */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Loại dịch vụ *
        </Text>
        <View className="flex-row flex-wrap gap-3">
          {SERVICE_TYPES.map((service) => (
            <TouchableOpacity
              key={service.id}
              className={`px-4 py-3 rounded-lg border-2 ${
                serviceType === service.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white'
              }`}
              onPress={() => onServiceTypeChange(service.id)}
            >
              <Text className="text-2xl text-center mb-1">
                {service.icon}
              </Text>
              <Text
                className={`text-center text-sm ${
                  serviceType === service.id
                    ? 'text-blue-700 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {service.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Skills */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Yêu cầu kỹ năng (tùy chọn)
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <TouchableOpacity
              key={skill}
              className={`px-4 py-2 rounded-full border ${
                selectedSkills.includes(skill)
                  ? 'bg-blue-500 border-blue-500'
                  : 'bg-white border-gray-300'
              }`}
              onPress={() => toggleSkill(skill)}
            >
              <Text
                className={
                  selectedSkills.includes(skill)
                    ? 'text-white font-medium'
                    : 'text-gray-700'
                }
              >
                {skill}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Description */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Ghi chú thêm (tùy chọn)
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-base min-h-[100px]"
          placeholder="Mô tả thêm về yêu cầu của bạn..."
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}

