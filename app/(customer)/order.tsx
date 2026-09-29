import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { OrderCard } from '../../components/OrderCard';
import { Colors } from '../../constants/colors';
import { MOCK_CUSTOMER_ACTIVE_ORDER } from '../../constants/mockData';
import { OrderItem } from '../../types';

export default function CustomerOrderScreen() {
  const [activeOrder, setActiveOrder] = useState<OrderItem | null>(
    MOCK_CUSTOMER_ACTIVE_ORDER
  );

  const handleSimulatePickedUp = () => {
    if (!activeOrder) return;
    setActiveOrder({
      ...activeOrder,
      status: 'PICKED_UP',
      estimatedMinutes: 0,
    });
  };

  const handleResetOrder = () => {
    setActiveOrder(MOCK_CUSTOMER_ACTIVE_ORDER);
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.screenTitle}>My Food Orders</Text>
          <Text style={styles.screenSubtitle}>
            Kitchen progress & pickup notifications
          </Text>
        </View>

        <TouchableOpacity
          style={styles.demoToggle}
          onPress={() => setActiveOrder(activeOrder ? null : MOCK_CUSTOMER_ACTIVE_ORDER)}
        >
          <Text style={styles.demoToggleText}>
            {activeOrder ? 'Simulate Empty' : 'Restore Demo'}
          </Text>
        </TouchableOpacity>
      </View>

      {activeOrder ? (
        <View style={styles.activeContainer}>
          <OrderCard order={activeOrder} />

          {activeOrder.status !== 'PICKED_UP' ? (
            <Button
              title="Simulate Pickup Completed"
              variant="outline"
              size="sm"
              onPress={handleSimulatePickedUp}
              style={styles.secondaryBtn}
            />
          ) : (
            <Button
              title="Reset Demo Order"
              variant="secondary"
              size="sm"
              onPress={handleResetOrder}
              style={styles.secondaryBtn}
            />
          )}

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📌 Pickup Instructions</Text>
            <Text style={styles.infoText}>
              Show your Order #{activeOrder.orderNumber} to the kitchen counter when your status changes to{' '}
              <Text style={{ fontWeight: '700' }}>READY</Text>. Your order will be packed and waiting for you.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Text style={styles.emptyIcon}>🍜</Text>
          </View>
          <Text style={styles.emptyTitle}>No active orders</Text>
          <Text style={styles.emptySubtitle}>
            Your food and beverage orders will appear here so you can track kitchen preparation live.
          </Text>
          <Button
            title="Browse Restaurants"
            variant="primary"
            onPress={() => router.push('/(customer)/home')}
            style={styles.findPlaceBtn}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 8,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  screenSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  demoToggle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  demoToggleText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  activeContainer: {
    gap: 12,
  },
  secondaryBtn: {
    marginTop: -4,
    marginBottom: 4,
  },
  infoBox: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 20,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyIcon: {
    fontSize: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  findPlaceBtn: {
    minWidth: 180,
  },
});
