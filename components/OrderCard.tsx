import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrderItem } from '../types';
import { Colors } from '../constants/colors';
import { StatusBadge } from './StatusBadge';
import { Button } from './Button';

interface OrderCardProps {
  order: OrderItem;
  onView?: () => void;
  onAction?: (actionName: string) => void;
  actionTitle?: string;
  isCompact?: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onView,
  onAction,
  actionTitle,
  isCompact = false,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.placeName}>{order.placeName}</Text>
          <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
        </View>
        <StatusBadge status={order.status} />
      </View>

      <View style={styles.itemsBox}>
        {order.items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName}>
              {item.quantity}x {item.name}
            </Text>
            <Text style={styles.itemPrice}>
              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.statusFooter}>
        <View style={styles.estimateBox}>
          <Text style={styles.estimateLabel}>ESTIMATED READY</Text>
          <Text style={styles.estimateValue}>
            {order.status === 'READY'
              ? 'Ready for Pickup!'
              : order.status === 'PICKED_UP'
              ? 'Completed'
              : `~${order.estimatedMinutes} min`}
          </Text>
        </View>

        {!isCompact && order.status !== 'PICKED_UP' && order.status !== 'CANCELLED' && (
          <View style={styles.liveTag}>
            <View style={styles.liveDot} />
            <Text style={styles.liveTagText}>LIVE STATUS</Text>
          </View>
        )}
      </View>

      {onAction && actionTitle && (
        <Button
          title={actionTitle}
          variant="primary"
          size="sm"
          onPress={() => onAction(actionTitle)}
          style={styles.actionBtn}
        />
      )}

      {onView && (
        <Button
          title="View Order Details"
          variant="outline"
          size="sm"
          onPress={onView}
          style={styles.actionBtn}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  orderNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primaryAccent,
    marginTop: 2,
  },
  itemsBox: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  itemName: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  statusFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    marginBottom: 8,
  },
  estimateBox: {
    flex: 1,
  },
  estimateLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 2,
  },
  estimateValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primaryAccent,
    marginRight: 5,
  },
  liveTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryAccent,
  },
  actionBtn: {
    marginTop: 8,
  },
});
