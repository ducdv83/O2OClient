import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useJobStore } from '../../store/job.store';
import { SERVICE_TYPES, SKILLS } from '../../constants/serviceTypes';
import JobFormStep1 from '../../components/job/JobFormStep1';
import JobFormStep2 from '../../components/job/JobFormStep2';
import JobFormStep3 from '../../components/job/JobFormStep3';

export default function CreateJobScreen() {
  const { serviceType: initialServiceType } = useLocalSearchParams<{
    serviceType?: string;
  }>();
  const { draft, updateDraft, clearDraft } = useJobStore();
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState(
    initialServiceType || draft?.serviceType || ''
  );

  useEffect(() => {
    if (initialServiceType) {
      updateDraft({ serviceType: initialServiceType });
    }
  }, [initialServiceType]);

  const handleNext = () => {
    if (step === 1) {
      if (!serviceType) {
        Alert.alert('Lỗi', 'Vui lòng chọn loại dịch vụ');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!draft?.date || !draft?.startTime || !draft?.endTime || !draft?.location) {
        Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin lịch và địa điểm');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Navigate to preview
      router.push('/job/preview');
    }
  };

  const handleBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-2">
          <TouchableOpacity onPress={handleBack}>
            <Text className="text-blue-500 text-lg">← Quay lại</Text>
          </TouchableOpacity>
          <Text className="text-gray-600">
            Bước {step}/3
          </Text>
        </View>
        <View className="flex-row gap-2 mt-2">
          {[1, 2, 3].map((s) => (
            <View
              key={s}
              className={`flex-1 h-1 rounded ${
                s <= step ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {step === 1 && (
          <JobFormStep1
            serviceType={serviceType}
            onServiceTypeChange={(type) => {
              setServiceType(type);
              updateDraft({ serviceType: type });
            }}
          />
        )}
        {step === 2 && <JobFormStep2 />}
        {step === 3 && <JobFormStep3 />}
      </ScrollView>

      {/* Footer */}
      <View className="bg-white px-6 py-4 border-t border-gray-200">
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-lg items-center"
          onPress={handleNext}
        >
          <Text className="text-white text-lg font-semibold">
            {step === 3 ? 'Xem trước' : 'Tiếp tục'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

