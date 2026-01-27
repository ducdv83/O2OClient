import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../store/auth.store';

export default function IndexScreen() {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Redirect based on auth status
    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(auth)/welcome');
    }
  }, [isAuthenticated]);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

