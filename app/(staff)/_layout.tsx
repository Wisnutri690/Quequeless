import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function StaffTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          height: 56,
          paddingBottom: 16,
          paddingTop: 16,
          elevation: 0,
        },
        tabBarActiveTintColor: Colors.bankBlue,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '800',
          letterSpacing: 0.8,
        },
        tabBarIcon: () => null, // Strictly text-only navigation
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'DESK',
          tabBarLabel: 'DESK',
        }}
      />
      <Tabs.Screen
        name="queue"
        options={{
          title: 'COUNTER OPS',
          tabBarLabel: 'COUNTER OPS',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'DAILY LOGS',
          tabBarLabel: 'DAILY LOGS',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'OPERATOR',
          tabBarLabel: 'OPERATOR',
        }}
      />
    </Tabs>
  );
}
