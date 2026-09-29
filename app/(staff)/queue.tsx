import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';

interface QueueNumberItem {
  id: string;
  ticketNumber: string;
  status: 'WAITING' | 'CALLED' | 'SERVING' | 'SERVED' | 'SKIPPED';
}

const INITIAL_QUEUE_LIST: QueueNumberItem[] = [
  { id: '1', ticketNumber: 'T-017', status: 'SERVING' },
  { id: '2', ticketNumber: 'T-018', status: 'WAITING' },
  { id: '3', ticketNumber: 'T-019', status: 'WAITING' },
  { id: '4', ticketNumber: 'T-020', status: 'WAITING' },
  { id: '5', ticketNumber: 'T-021', status: 'WAITING' },
];

export default function StaffQueueScreen() {
  const [queues, setQueues] = useState<QueueNumberItem[]>(INITIAL_QUEUE_LIST);

  const nowServing = queues.find((q) => q.status === 'SERVING');
  const calledNext = queues.find((q) => q.status === 'CALLED');
  const waitingList = queues.filter((q) => q.status === 'WAITING');

  const handleCallNext = () => {
    if (waitingList.length === 0) return;
    const nextTicket = waitingList[0];
    setQueues((prev) =>
      prev.map((q) =>
        q.id === nextTicket.id ? { ...q, status: 'CALLED' } : q
      )
    );
  };

  const handleStartService = () => {
    if (!calledNext) return;
    setQueues((prev) =>
      prev.map((q) => {
        if (q.status === 'SERVING') {
          return { ...q, status: 'SERVED' };
        }
        if (q.id === calledNext.id) {
          return { ...q, status: 'SERVING' };
        }
        return q;
      })
    );
  };

  const handleMarkServed = () => {
    if (!nowServing) return;
    setQueues((prev) =>
      prev.map((q) =>
        q.id === nowServing.id ? { ...q, status: 'SERVED' } : q
      )
    );
  };

  const handleSkip = () => {
    if (!calledNext) return;
    setQueues((prev) =>
      prev.map((q) =>
        q.id === calledNext.id ? { ...q, status: 'SKIPPED' } : q
      )
    );
  };

  const handleReset = () => {
    setQueues(INITIAL_QUEUE_LIST);
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.counterHeading}>Counter 03</Text>
          <Text style={styles.stationSub}>Teller Operations</Text>
        </View>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Now Serving Section */}
      <View style={styles.servingSection}>
        <Text style={styles.sectionLabel}>NOW SERVING</Text>
        <Text style={styles.mainServingNumber}>
          {nowServing ? nowServing.ticketNumber : '—'}
        </Text>

        {nowServing && (
          <Button
            title="MARK SERVED"
            size="md"
            onPress={handleMarkServed}
            style={styles.markServedBtn}
          />
        )}
      </View>

      {/* Next Section */}
      <View style={styles.nextSection}>
        <Text style={styles.sectionLabel}>NEXT</Text>
        <Text style={styles.nextNumber}>
          {calledNext ? calledNext.ticketNumber : waitingList[0]?.ticketNumber || '—'}
        </Text>

        {calledNext ? (
          <View style={styles.nextActionsRow}>
            <Button
              title="START SERVICE"
              size="md"
              onPress={handleStartService}
              style={styles.flexBtn}
            />
            <Button
              title="SKIP"
              variant="outline"
              size="md"
              onPress={handleSkip}
              style={styles.skipBtn}
            />
          </View>
        ) : (
          <Button
            title="CALL NEXT"
            variant="primary"
            size="md"
            onPress={handleCallNext}
            disabled={waitingList.length === 0}
            style={styles.callNextBtn}
          />
        )}
      </View>

      {/* Waiting Section */}
      <View style={styles.waitingSection}>
        <Text style={styles.sectionLabel}>WAITING ({waitingList.length})</Text>

        {waitingList.length > 0 ? (
          <View style={styles.waitingList}>
            {waitingList.map((item) => (
              <View key={item.id} style={styles.waitingRow}>
                <Text style={styles.waitingNumberText}>{item.ticketNumber}</Text>
                <Text style={styles.waitingStatusText}>Waiting</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyWaitingText}>No tickets waiting</Text>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  counterHeading: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  stationSub: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  resetText: {
    fontSize: 13,
    color: Colors.bankBlue,
    fontWeight: '600',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  servingSection: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginBottom: 20,
  },
  mainServingNumber: {
    fontSize: 52,
    fontWeight: '900',
    color: Colors.bankNavy,
    letterSpacing: -1,
    marginVertical: 8,
  },
  markServedBtn: {
    width: '100%',
    marginTop: 12,
  },
  nextSection: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginBottom: 24,
  },
  nextNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.bankBlue,
    marginVertical: 4,
  },
  nextActionsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 12,
  },
  flexBtn: {
    flex: 2,
  },
  skipBtn: {
    flex: 1,
  },
  callNextBtn: {
    width: '100%',
    marginTop: 12,
  },
  waitingSection: {
    marginTop: 4,
  },
  waitingList: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  waitingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  waitingNumberText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  waitingStatusText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  emptyWaitingText: {
    fontSize: 14,
    color: Colors.textMuted,
    paddingVertical: 12,
  },
});
