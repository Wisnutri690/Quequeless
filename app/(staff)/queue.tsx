import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';
import { QueueTicket } from '../../types';
import { QueueService } from '../../services/queueService';

const DEV_FALLBACK_QUEUE_LIST: QueueTicket[] = [
  {
    id: '1',
    ticketNumber: 'T-017',
    serviceType: 'TELLER',
    serviceName: 'Teller',
    branchId: 'branch-depok',
    branchName: 'Depok Branch',
    customerId: 'c-1',
    customerName: 'Customer 1',
    status: 'SERVING',
    counterName: 'Counter 03',
    nowServingNumber: 'T-017',
    peopleAhead: 0,
    estimatedWaitMinutes: 0,
    createdAt: '09:40 AM',
  },
  {
    id: '2',
    ticketNumber: 'T-018',
    serviceType: 'TELLER',
    serviceName: 'Teller',
    branchId: 'branch-depok',
    branchName: 'Depok Branch',
    customerId: 'c-2',
    customerName: 'Customer 2',
    status: 'WAITING',
    counterName: 'Counter 03',
    nowServingNumber: 'T-017',
    peopleAhead: 1,
    estimatedWaitMinutes: 5,
    createdAt: '09:42 AM',
  },
  {
    id: '3',
    ticketNumber: 'T-019',
    serviceType: 'TELLER',
    serviceName: 'Teller',
    branchId: 'branch-depok',
    branchName: 'Depok Branch',
    customerId: 'c-3',
    customerName: 'Customer 3',
    status: 'WAITING',
    counterName: 'Counter 03',
    nowServingNumber: 'T-017',
    peopleAhead: 2,
    estimatedWaitMinutes: 10,
    createdAt: '09:45 AM',
  },
  {
    id: '4',
    ticketNumber: 'T-020',
    serviceType: 'TELLER',
    serviceName: 'Teller',
    branchId: 'branch-depok',
    branchName: 'Depok Branch',
    customerId: 'c-4',
    customerName: 'Customer 4',
    status: 'WAITING',
    counterName: 'Counter 03',
    nowServingNumber: 'T-017',
    peopleAhead: 3,
    estimatedWaitMinutes: 15,
    createdAt: '09:48 AM',
  },
  {
    id: '5',
    ticketNumber: 'T-021',
    serviceType: 'TELLER',
    serviceName: 'Teller',
    branchId: 'branch-depok',
    branchName: 'Depok Branch',
    customerId: 'c-5',
    customerName: 'Customer 5',
    status: 'WAITING',
    counterName: 'Counter 03',
    nowServingNumber: 'T-017',
    peopleAhead: 4,
    estimatedWaitMinutes: 20,
    createdAt: '09:50 AM',
  },
];

export default function StaffQueueScreen() {
  const branchId = 'branch-depok';
  const [queues, setQueues] = useState<QueueTicket[]>(DEV_FALLBACK_QUEUE_LIST);

  const loadTickets = useCallback(async () => {
    const data = await QueueService.getBranchTickets(branchId);
    if (data && data.length > 0) {
      setQueues(data);
    }
  }, [branchId]);

  useEffect(() => {
    loadTickets();
    const unsubscribe = QueueService.subscribeBranchTickets(branchId, () => {
      loadTickets();
    });

    return () => {
      unsubscribe();
    };
  }, [branchId, loadTickets]);

  const nowServing = queues.find((q) => q.status === 'SERVING');
  const calledNext = queues.find((q) => q.status === 'CALLED');
  const waitingList = queues.filter((q) => q.status === 'WAITING');

  const handleCallNext = async () => {
    if (waitingList.length === 0) return;
    const nextTicket = waitingList[0];
    setQueues((prev) =>
      prev.map((q) =>
        q.id === nextTicket.id ? { ...q, status: 'CALLED' } : q
      )
    );
    await QueueService.updateTicketStatus(nextTicket.id, 'CALLED', 'Counter 03');
  };

  const handleStartService = async () => {
    if (!calledNext) return;
    const currentServing = nowServing;
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
    if (currentServing) {
      await QueueService.updateTicketStatus(currentServing.id, 'SERVED');
    }
    await QueueService.updateTicketStatus(calledNext.id, 'SERVING', 'Counter 03');
  };

  const handleMarkServed = async () => {
    if (!nowServing) return;
    const targetId = nowServing.id;
    setQueues((prev) =>
      prev.map((q) =>
        q.id === targetId ? { ...q, status: 'SERVED' } : q
      )
    );
    await QueueService.updateTicketStatus(targetId, 'SERVED');
  };

  const handleSkip = async () => {
    if (!calledNext) return;
    const targetId = calledNext.id;
    setQueues((prev) =>
      prev.map((q) =>
        q.id === targetId ? { ...q, status: 'SKIPPED' } : q
      )
    );
    await QueueService.updateTicketStatus(targetId, 'SKIPPED');
  };

  const handleRefresh = () => {
    loadTickets();
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.counterHeading}>Counter 03</Text>
          <Text style={styles.stationSub}>Teller Operations</Text>
        </View>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshBtn}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.servingSection}>
        <View style={styles.servingHeaderRow}>
          <Text style={styles.sectionLabel}>NOW SERVING</Text>
          {nowServing && (
            <View style={styles.timerPill}>
              <View style={styles.timerDot} />
              <Text style={styles.timerText}>In Service • Counter 03</Text>
            </View>
          )}
        </View>

        <Text style={styles.mainServingNumber}>
          {nowServing ? nowServing.ticketNumber : '—'}
        </Text>

        {nowServing && (
          <View style={styles.servingDetailsRow}>
            <Text style={styles.servingDetailText}>Teller Services • Cash & Transfers</Text>
          </View>
        )}

        {nowServing && (
          <View style={styles.servingActionRow}>
            <Button
              title="MARK SERVED"
              size="md"
              onPress={handleMarkServed}
              style={styles.markServedBtn}
            />
            <Button
              title="RECALL"
              variant="outline"
              size="md"
              onPress={() => {}}
              style={styles.recallBtn}
            />
          </View>
        )}
      </View>

      <View style={styles.nextSection}>
        <Text style={styles.sectionLabel}>NEXT IN LINE</Text>
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
  refreshBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  refreshText: {
    fontSize: 12,
    color: Colors.bankBlue,
    fontWeight: '700',
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
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginBottom: 16,
  },
  servingHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  timerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  timerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
  },
  mainServingNumber: {
    fontSize: 52,
    fontWeight: '900',
    color: Colors.bankNavy,
    letterSpacing: -1,
    marginVertical: 4,
  },
  servingDetailsRow: {
    marginBottom: 12,
  },
  servingDetailText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  servingActionRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 6,
  },
  markServedBtn: {
    flex: 2,
  },
  recallBtn: {
    flex: 1,
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
