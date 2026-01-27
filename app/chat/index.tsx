import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useChatStore } from '../../store/chat.store';
import { useBookingStore } from '../../store/booking.store';

export default function ChatListScreen() {
  const { conversations } = useChatStore();
  const { bookings } = useBookingStore();

  // Generate conversations from bookings
  const allConversations = bookings.map((booking) => ({
    bookingId: booking.id,
    careproId: booking.careproId,
    careproName: booking.careproName,
    careproAvatar: booking.careproAvatar,
    lastMessage: undefined,
    unreadCount: 0,
  }));

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">Tin nhắn</Text>
      </View>

      {/* Conversations List */}
      <ScrollView className="flex-1">
        {allConversations.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-lg">
              Chưa có cuộc trò chuyện nào
            </Text>
          </View>
        ) : (
          allConversations.map((conversation) => (
            <TouchableOpacity
              key={conversation.bookingId}
              className="bg-white px-6 py-4 border-b border-gray-200"
              onPress={() => router.push(`/chat/${conversation.bookingId}`)}
            >
              <View className="flex-row items-center">
                <View className="w-14 h-14 bg-blue-100 rounded-full items-center justify-center mr-4">
                  <Text className="text-3xl">
                    {conversation.careproAvatar || '👤'}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900 mb-1">
                    {conversation.careproName}
                  </Text>
                  {conversation.lastMessage ? (
                    <Text className="text-gray-600 text-sm" numberOfLines={1}>
                      {conversation.lastMessage.body}
                    </Text>
                  ) : (
                    <Text className="text-gray-400 text-sm">
                      Chưa có tin nhắn
                    </Text>
                  )}
                </View>
                {conversation.unreadCount > 0 && (
                  <View className="bg-blue-500 rounded-full w-6 h-6 items-center justify-center">
                    <Text className="text-white text-xs font-semibold">
                      {conversation.unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

