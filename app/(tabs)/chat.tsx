// Redirect to chat list
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function ChatTab() {
  useEffect(() => {
    router.replace('/chat');
  }, []);
  return null;
}

