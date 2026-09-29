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
        tabBarActiveTintColor: Colors.bankNavy,
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
          title: 'Branch Desk',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🏛️</Text>,
        }}
      />
      <Tabs.Screen
        name="queue"
        options={{
          title: 'Counter Ops',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📢</Text>,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Daily Logs',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📋</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Operator',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🛡️</Text>,
        }}
      />
    </Tabs>
  );
}
