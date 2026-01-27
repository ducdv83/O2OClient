import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useChatStore } from '../../store/chat.store';
import { useBookingStore } from '../../store/booking.store';
import { useAuthStore } from '../../store/auth.store';
import { formatTime } from '../../utils/format';

export default function ChatScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { messages, addMessage, getMessages, markAsRead } = useChatStore();
  const { bookings } = useBookingStore();
  const { user } = useAuthStore();
  const [messageText, setMessageText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const booking = bookings.find((b) => b.id === bookingId);
  const chatMessages = getMessages(bookingId || '');

  useEffect(() => {
    if (bookingId) {
      markAsRead(bookingId);
    }
  }, [bookingId]);

  useEffect(() => {
    // Auto scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [chatMessages]);

  const handleSend = () => {
    if (!messageText.trim() || !bookingId || !user) return;

    const newMessage = {
      id: 'msg_' + Date.now(),
      bookingId,
      senderId: user.id || 'client',
      senderName: user.fullName || 'Bạn',
      senderAvatar: undefined,
      body: messageText.trim(),
      sentAt: new Date(),
      isRead: false,
    };

    addMessage(bookingId, newMessage);
    setMessageText('');

    // Mock reply from CarePro
    setTimeout(() => {
      const replyMessage = {
        id: 'msg_' + Date.now(),
        bookingId,
        senderId: booking?.careproId || 'carepro',
        senderName: booking?.careproName || 'CarePro',
        senderAvatar: booking?.careproAvatar,
        body: 'Cảm ơn bạn! Tôi sẽ đến đúng giờ.',
        sentAt: new Date(),
        isRead: false,
      };
      addMessage(bookingId, replyMessage);
    }, 1000);
  };

  if (!booking) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Không tìm thấy thông tin</Text>
      </View>
    );
  }

  const isMyMessage = (senderId: string) => {
    return senderId === (user?.id || 'client');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-blue-500 text-lg">← Quay lại</Text>
          </TouchableOpacity>
          <View className="flex-row items-center flex-1 ml-4">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Text className="text-2xl">{booking.careproAvatar || '👤'}</Text>
            </View>
            <View>
              <Text className="text-lg font-semibold text-gray-900">
                {booking.careproName}
              </Text>
              <Text className="text-gray-500 text-xs">Đang hoạt động</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {chatMessages.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500">
              Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!
            </Text>
          </View>
        ) : (
          chatMessages.map((message) => {
            const isMine = isMyMessage(message.senderId);
            return (
              <View
                key={message.id}
                className={`mb-4 ${isMine ? 'items-end' : 'items-start'}`}
              >
                <View
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    isMine
                      ? 'bg-blue-500 rounded-br-none'
                      : 'bg-gray-200 rounded-bl-none'
                  }`}
                >
                  {!isMine && (
                    <Text className="text-gray-600 text-xs mb-1">
                      {message.senderName}
                    </Text>
                  )}
                  <Text
                    className={isMine ? 'text-white' : 'text-gray-900'}
                  >
                    {message.body}
                  </Text>
                  <Text
                    className={`text-xs mt-1 ${
                      isMine ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.sentAt)}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Input */}
      <View className="bg-white border-t border-gray-200 px-4 py-3">
        <View className="flex-row items-center">
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 mr-3"
            placeholder="Nhập tin nhắn..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            className={`bg-blue-500 px-6 py-3 rounded-lg ${
              !messageText.trim() ? 'opacity-50' : ''
            }`}
            onPress={handleSend}
            disabled={!messageText.trim()}
          >
            <Text className="text-white font-semibold">Gửi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

