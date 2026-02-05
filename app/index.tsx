import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/auth.store';

export default function IndexScreen() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Redirect href={isAuthenticated ? '/(tabs)' : '/(auth)/welcome'} />
  );
}

