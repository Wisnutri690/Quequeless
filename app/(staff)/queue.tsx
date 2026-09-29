import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { MOCK_STAFF_QUEUES } from '../../constants/mockData';
import { QueueItem } from '../../types';

export default function StaffQueueScreen() {
  const [queues, setQueues] = useState<QueueItem[]>(MOCK_STAFF_QUEUES);

  const currentServing = queues.find((q) => q.status === 'SERVING');
  const currentCalled = queues.find((q) => q.status === 'CALLED');
  const waitingList = queues.filter((q) => q.status === 'WAITING');

  // Interactive local actions for operator
  const handleCallNext = () => {
    if (waitingList.length === 0) return;
    const nextQueue = waitingList[0];
    setQueues((prev) =>
      prev.map((q) =>
        q.id === nextQueue.id
          ? { ...q, status: 'CALLED', calledAt: 'Just now' }
          : q
      )
    );
  };

  const handleStartService = () => {
    if (!currentCalled) return;
    setQueues((prev) =>
      prev.map((q) => {
        if (q.status === 'SERVING') {
          return { ...q, status: 'SERVED' };
        }
        if (q.id === currentCalled.id) {
          return { ...q, status: 'SERVING', servedAt: 'Just now' };
        }
        return q;
      })
    );
  };

  const handleMarkServed = () => {
    if (!currentServing) return;
    setQueues((prev) =>
      prev.map((q) =>
        q.id === currentServing.id ? { ...q, status: 'SERVED' } : q
      )
    );
  };

  const handleSkipCalled = () => {
    if (!currentCalled) return;
    setQueues((prev) =>
      prev.map((q) =>
        q.id === currentCalled.id ? { ...q, status: 'SKIPPED' } : q
      )
    );
  };

  const handleResetDemo = () => {
    setQueues(MOCK_STAFF_QUEUES);
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.placeName}>Barber Hub Operations</Text>
          <Text style={styles.title}>Today's Queue Manager</Text>
        </View>
        <TouchableOpacity style={styles.resetBtn} onPress={handleResetDemo}>
          <Text style={styles.resetText}>Reset List</Text>
        </TouchableOpacity>
      </View>

      {/* Primary Actions Panel */}
      <View style={styles.actionPanel}>
        <Text style={styles.panelTitle}>STAFF ACTIONS</Text>
        <View style={styles.actionGrid}>
          <Button
            title="Call Next"
            variant="primary"
            size="md"
            onPress={handleCallNext}
            disabled={waitingList.length === 0}
            style={styles.actionBtn}
          />
          <Button
            title="Start Service"
            variant="secondary"
            size="md"
            onPress={handleStartService}
            disabled={!currentCalled}
            style={styles.actionBtn}
          />
        </View>

        <View style={styles.secondaryActionGrid}>
          <Button
            title="Mark Served ✓"
            variant="outline"
            size="sm"
            onPress={handleMarkServed}
            disabled={!currentServing}
            style={styles.actionBtn}
          />
          <Button
            title="Skip Customer ✕"
            variant="danger"
            size="sm"
            onPress={handleSkipCalled}
            disabled={!currentCalled}
            style={styles.actionBtn}
          />
        </View>
      </View>

      {/* Serving & Called Status Cards */}
      <View style={styles.liveGrid}>
        <View style={[styles.statusBox, styles.servingBox]}>
          <Text style={styles.statusBoxLabel}>NOW SERVING</Text>
          <Text style={styles.statusBoxNumber}>
            {currentServing ? `#${currentServing.queueNumber}` : '—'}
          </Text>
          <Text style={styles.statusBoxName}>
            {currentServing ? currentServing.customerName : 'Chair Empty'}
          </Text>
        </View>

        <View style={[styles.statusBox, styles.calledBox]}>
          <Text style={styles.statusBoxLabel}>CALLED (NEXT)</Text>
          <Text style={styles.statusBoxNumber}>
            {currentCalled ? `#${currentCalled.queueNumber}` : '—'}
          </Text>
          <Text style={styles.statusBoxName}>
            {currentCalled ? currentCalled.customerName : 'No one called'}
          </Text>
        </View>
      </View>

      {/* Waiting List */}
      <View style={styles.listSection}>
        <View style={styles.listHeaderRow}>
          <Text style={styles.listSectionTitle}>
            Waiting Customers ({waitingList.length})
          </Text>
          <Text style={styles.listSub}>Avg. 5 min / customer</Text>
        </View>

        {waitingList.length > 0 ? (
          waitingList.map((q, idx) => (
            <View key={q.id} style={styles.waitingItem}>
              <View style={styles.waitingNumberCircle}>
                <Text style={styles.waitingNumberText}>#{q.queueNumber}</Text>
              </View>

              <View style={styles.waitingInfo}>
                <Text style={styles.waitingCustomerName}>{q.customerName}</Text>
                <Text style={styles.waitingTime}>
                  Joined {q.joinedAt} • {idx} people ahead
                </Text>
              </View>

              <StatusBadge status={q.status} showDot={false} />
            </View>
          ))
        ) : (
          <View style={styles.emptyList}>
            <Text style={styles.emptyListText}>
              All customers have been called or served! 🎉
            </Text>
          </View>
        )}
      </View>
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
    marginBottom: 16,
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
  actionPanel: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  panelTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 10,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  secondaryActionGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
  },
  liveGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statusBox: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  servingBox: {
    backgroundColor: Colors.primaryLight,
    borderColor: '#BFDBFE',
  },
  calledBox: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  statusBoxLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statusBoxNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text,
  },
  statusBoxName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  listSection: {
    marginTop: 4,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  listSub: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  waitingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
  },
  waitingNumberCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  waitingNumberText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  waitingInfo: {
    flex: 1,
  },
  waitingCustomerName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  waitingTime: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  emptyList: {
    padding: 24,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyListText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
});
