import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { QueueCard } from '../../components/QueueCard';
import { Colors } from '../../constants/colors';
import { MOCK_CUSTOMER_ACTIVE_QUEUE } from '../../constants/mockData';
import { QueueItem } from '../../types';

export default function CustomerQueueScreen() {
  const [activeQueue, setActiveQueue] = useState<QueueItem | null>(
    MOCK_CUSTOMER_ACTIVE_QUEUE
  );

  const handleCancelQueue = () => {
    setActiveQueue(null);
  };

  const handleRestoreQueue = () => {
    setActiveQueue(MOCK_CUSTOMER_ACTIVE_QUEUE);
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.screenTitle}>My Barber Queue</Text>
          <Text style={styles.screenSubtitle}>
            Live turn status & real-time estimates
          </Text>
        </View>

        <TouchableOpacity
          style={styles.demoToggle}
          onPress={activeQueue ? handleCancelQueue : handleRestoreQueue}
        >
          <Text style={styles.demoToggleText}>
            {activeQueue ? 'Simulate Empty' : 'Restore Demo'}
          </Text>
        </TouchableOpacity>
      </View>

      {activeQueue ? (
        <View style={styles.activeContainer}>
          <QueueCard
            queue={activeQueue}
            onCancel={handleCancelQueue}
          />

          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>💡 How it works</Text>
            <Text style={styles.tipsText}>
              • You don't need to stay inside the barber shop.{'\n'}
              • The estimate updates live as the barber serves customers.{'\n'}
              • When your status turns to <Text style={{ fontWeight: '700' }}>CALLED</Text>, you will have 5 minutes to take your seat.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Text style={styles.emptyIcon}>⏳</Text>
          </View>
          <Text style={styles.emptyTitle}>No active queue</Text>
          <Text style={styles.emptySubtitle}>
            Join a queue at your favorite barber or salon and we'll keep you updated without you having to stay in line.
          </Text>
          <Button
            title="Find a Place"
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
  tipsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  tipsText: {
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
