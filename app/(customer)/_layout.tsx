import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function CustomerTabsLayout() {
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
          title: 'HOME',
          tabBarLabel: 'HOME',
        }}
      />
      <Tabs.Screen
        name="queue"
        options={{
          title: 'MY TICKET',
          tabBarLabel: 'MY TICKET',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'HISTORY',
          tabBarLabel: 'HISTORY',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarLabel: 'PROFILE',
        }}
      />
    </Tabs>
  );
}
