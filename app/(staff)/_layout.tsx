import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { Colors } from '../../constants/colors';

export default function StaffTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primaryAccent,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Staff Home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📋</Text>,
        }}
      />
      <Tabs.Screen
        name="queue"
        options={{
          title: 'Queue Ops',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>✂️</Text>,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Order Ops',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🍳</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Staff Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🛡️</Text>,
        }}
      />
    </Tabs>
  );
}
