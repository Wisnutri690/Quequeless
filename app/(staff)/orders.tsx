import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { MOCK_STAFF_ORDERS } from '../../constants/mockData';
import { OrderItem, OrderStatus } from '../../types';

export default function StaffOrdersScreen() {
  const [orders, setOrders] = useState<OrderItem[]>(MOCK_STAFF_ORDERS);

  const advanceOrderStatus = (orderId: string, currentStatus: OrderStatus) => {
    let nextStatus: OrderStatus = currentStatus;
    if (currentStatus === 'PENDING') nextStatus = 'PREPARING';
    else if (currentStatus === 'PREPARING') nextStatus = 'ALMOST_READY';
    else if (currentStatus === 'ALMOST_READY') nextStatus = 'READY';
    else if (currentStatus === 'READY') nextStatus = 'PICKED_UP';

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const getActionTitle = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'Start Preparing 🍳';
      case 'PREPARING':
        return 'Almost Ready ⏱️';
      case 'ALMOST_READY':
        return 'Mark Ready for Pickup 🔔';
      case 'READY':
        return 'Mark Picked Up ✓';
      default:
        return null;
    }
  };

  const handleResetOrders = () => {
    setOrders(MOCK_STAFF_ORDERS);
  };

  const activeOrders = orders.filter((o) => o.status !== 'PICKED_UP');
  const completedOrders = orders.filter((o) => o.status === 'PICKED_UP');

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.placeName}>The Daily Bowl Kitchen</Text>
          <Text style={styles.title}>Kitchen Order Board</Text>
        </View>
        <TouchableOpacity style={styles.resetBtn} onPress={handleResetOrders}>
          <Text style={styles.resetText}>Reset Board</Text>
        </TouchableOpacity>
      </View>

      {/* Active Orders List */}
      <Text style={styles.sectionTitle}>
        Active Kitchen Queue ({activeOrders.length})
      </Text>

      {activeOrders.map((order) => {
        const actionTitle = getActionTitle(order.status);

        return (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeaderRow}>
              <View>
                <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
                <Text style={styles.customerName}>
                  {order.customerName} • {order.createdAt}
                </Text>
              </View>
              <StatusBadge status={order.status} />
            </View>

            <View style={styles.itemsBox}>
              {order.items.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <Text style={styles.itemQty}>{item.quantity}x</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </Text>
                </View>
              ))}
            </View>

            {actionTitle && (
              <Button
                title={actionTitle}
                variant={order.status === 'READY' ? 'secondary' : 'primary'}
                size="sm"
                onPress={() => advanceOrderStatus(order.id, order.status)}
                style={styles.actionBtn}
              />
            )}
          </View>
        );
      })}

      {completedOrders.length > 0 && (
        <View style={styles.completedSection}>
          <Text style={styles.completedSectionTitle}>
            Completed & Picked Up ({completedOrders.length})
          </Text>

          {completedOrders.map((order) => (
            <View key={order.id} style={styles.completedCard}>
              <View>
                <Text style={styles.completedOrderNum}>
                  Order #{order.orderNumber}
                </Text>
                <Text style={styles.completedCust}>
                  {order.customerName} • {order.items.length} items
                </Text>
              </View>
              <StatusBadge status={order.status} showDot={false} />
            </View>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 8,
  },
  placeName: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  resetBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resetText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 14,
  },
  orderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  customerName: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  itemsBox: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },
  itemQty: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryAccent,
    width: 26,
  },
  itemName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
  },
  itemPrice: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  actionBtn: {
    marginTop: 2,
  },
  completedSection: {
    marginTop: 16,
  },
  completedSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 10,
  },
  completedCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
    opacity: 0.8,
  },
  completedOrderNum: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  completedCust: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});
