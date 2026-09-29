import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QueueStatus, OrderStatus } from '../types';
import { Colors } from '../constants/colors';

interface StatusBadgeProps {
  status: QueueStatus | OrderStatus;
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showDot = true }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'WAITING':
      case 'PENDING':
        return {
          bg: Colors.waiting.bg,
          text: Colors.waiting.text,
          border: Colors.waiting.border,
          label: status === 'WAITING' ? 'Waiting' : 'Pending',
        };
      case 'CALLED':
        return {
          bg: Colors.called.bg,
          text: Colors.called.text,
          border: Colors.called.border,
          label: "You're Called",
        };
      case 'SERVING':
      case 'PREPARING':
        return {
          bg: Colors.serving.bg,
          text: Colors.serving.text,
          border: Colors.serving.border,
          label: status === 'SERVING' ? 'Serving' : 'Preparing',
        };
      case 'ALMOST_READY':
        return {
          bg: '#FEF9C3',
          text: '#854D0E',
          border: '#FEF08A',
          label: 'Almost Ready',
        };
      case 'READY':
      case 'SERVED':
        return {
          bg: Colors.ready.bg,
          text: Colors.ready.text,
          border: Colors.ready.border,
          label: status === 'READY' ? 'Ready for Pickup' : 'Served',
        };
      case 'PICKED_UP':
        return {
          bg: Colors.pickedUp.bg,
          text: Colors.pickedUp.text,
          border: Colors.pickedUp.border,
          label: 'Picked Up',
        };
      case 'CANCELLED':
      case 'SKIPPED':
        return {
          bg: Colors.danger.bg,
          text: Colors.danger.text,
          border: Colors.danger.border,
          label: status === 'CANCELLED' ? 'Cancelled' : 'Skipped',
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
    paddingHorizontal: 10,
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
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});
