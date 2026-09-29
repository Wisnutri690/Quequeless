import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QueueStatus } from '../types';
import { Colors } from '../constants/colors';

interface StatusBadgeProps {
  status: QueueStatus;
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showDot = true }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'WAITING':
        return {
          bg: Colors.statusWaiting.bg,
          text: Colors.statusWaiting.text,
          border: Colors.statusWaiting.border,
          label: 'Waiting in Queue',
        };
      case 'CALLED':
        return {
          bg: Colors.statusCalled.bg,
          text: Colors.statusCalled.text,
          border: Colors.statusCalled.border,
          label: 'Now Called',
        };
      case 'SERVING':
        return {
          bg: Colors.statusServing.bg,
          text: Colors.statusServing.text,
          border: Colors.statusServing.border,
          label: 'In Service',
        };
      case 'SERVED':
        return {
          bg: Colors.statusServed.bg,
          text: Colors.statusServed.text,
          border: Colors.statusServed.border,
          label: 'Served',
        };
      case 'CANCELLED':
        return {
          bg: Colors.statusSkipped.bg,
          text: Colors.statusSkipped.text,
          border: Colors.statusSkipped.border,
          label: 'Cancelled',
        };
      case 'SKIPPED':
        return {
          bg: Colors.statusSkipped.bg,
          text: Colors.statusSkipped.text,
          border: Colors.statusSkipped.border,
          label: 'Skipped',
        };
      default:
        return {
          bg: Colors.surfaceSubtle,
          text: Colors.textMuted,
          border: Colors.border,
          label: String(status),
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: config.bg, borderColor: config.border },
      ]}
    >
      {showDot && (
        <View style={[styles.dot, { backgroundColor: config.text }]} />
      )}
      <Text style={[styles.label, { color: config.text }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});
