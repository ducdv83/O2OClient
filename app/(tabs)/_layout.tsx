import { Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';

const TAB_ICON_SOURCES = {
  index: require('../../assets/icons/home.png'),
  jobs: require('../../assets/icons/request.png'),
  bookings: require('../../assets/icons/bookings.png'),
  calendar: require('../../assets/icons/calendar.png'),
  profile: require('../../assets/icons/profile.png'),
} as const;

function TabIcon({ name }: { name: keyof typeof TAB_ICON_SOURCES }) {
  const source = TAB_ICON_SOURCES[name];
  return (
    <Image
      source={source}
      style={styles.tabIcon}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 80,
    height: 80,
  },
});

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          shadowColor: '#000000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -2 },
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: () => <TabIcon name="index" />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Yêu cầu',
          tabBarIcon: () => <TabIcon name="jobs" />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Ca đã đặt',
          tabBarIcon: () => <TabIcon name="bookings" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Cá nhân',
          tabBarIcon: () => <TabIcon name="profile" />,
        }}
      />
      <Tabs.Screen
        name="bookings/calendar"
        options={{
          title: 'Lịch',
          tabBarIcon: () => <TabIcon name="calendar" />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
