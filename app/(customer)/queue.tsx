import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { QueueTicket } from '../../types';

const INITIAL_TICKET: QueueTicket = {
  id: 'ticket-t-018',
  ticketNumber: 'T-018',
  serviceType: 'TELLER',
  serviceName: 'Teller',
  branchId: 'branch-depok',
  branchName: 'NEXA Bank — Depok',
  customerId: 'cust-wisnu',
  customerName: 'Wisnu Tri',
  status: 'WAITING',
  counterName: 'Counter 03',
  nowServingNumber: 'T-016',
  peopleAhead: 2,
  estimatedWaitMinutes: 10,
  createdAt: '09:45 AM',
};

export default function CustomerQueueScreen() {
  const [ticket, setTicket] = useState<QueueTicket | null>(INITIAL_TICKET);

  const isCalled = ticket?.status === 'CALLED';
  const isServing = ticket?.status === 'SERVING';

  const handleCancel = () => {
    setTicket(null);
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <Text style={styles.screenHeading}>My Ticket</Text>
      </View>

      {ticket ? (
        <View style={styles.ticketWrapper}>
          {/* Main Number Display */}
          <View style={styles.ticketCenter}>
            <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
            <Text style={styles.serviceName}>{ticket.serviceName}</Text>
            <View style={styles.statusBadgeWrap}>
              <StatusBadge status={ticket.status} />
            </View>
          </View>

          {/* Dynamic Content based on Status */}
          {isCalled ? (
            <View style={styles.calledBox}>
              <Text style={styles.calledCounterLabel}>PLEASE PROCEED TO</Text>
              <Text style={styles.calledCounterName}>
                {ticket.counterName || 'Counter 03'}
              </Text>
              <Text style={styles.calledPrompt}>
                Please step forward to the counter.
              </Text>
            </View>
          ) : isServing ? (
            <View style={styles.servingBox}>
              <Text style={styles.servingCounterLabel}>IN SERVICE AT</Text>
              <Text style={styles.servingCounterName}>
                {ticket.counterName || 'Counter 03'}
              </Text>
            </View>
          ) : (
            <View style={styles.waitingMetrics}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>PEOPLE AHEAD</Text>
                <Text style={styles.metricValue}>{ticket.peopleAhead}</Text>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>ESTIMATED WAIT</Text>
                <Text style={styles.metricValue}>
                  ~{ticket.estimatedWaitMinutes} min
                </Text>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>COUNTER</Text>
                <Text style={styles.metricValue}>—</Text>
              </View>
            </View>
          )}

          {/* Primary Action Button (Cancel queue only when waiting) */}
          {ticket.status === 'WAITING' && (
            <Button
              title="Cancel Queue"
              variant="outline"
              size="md"
              onPress={handleCancel}
              style={styles.cancelBtn}
            />
          )}

          {/* Subtle Simulation Controls for Review */}
          <View style={styles.simulatorRow}>
            <Text style={styles.simLabel}>Demo state:</Text>
            <TouchableOpacity
              onPress={() =>
                setTicket((prev) =>
                  prev
                    ? {
                        ...prev,
                        status: 'WAITING',
                        peopleAhead: 2,
                        estimatedWaitMinutes: 10,
                      }
                    : INITIAL_TICKET
                )
              }
            >
              <Text
                style={[
                  styles.simPill,
                  ticket.status === 'WAITING' && styles.simPillActive,
                ]}
              >
                Waiting
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setTicket((prev) =>
                  prev
                    ? {
                        ...prev,
                        status: 'CALLED',
                        counterName: 'Counter 03',
                        peopleAhead: 0,
                      }
                    : null
                )
              }
            >
              <Text
                style={[
                  styles.simPill,
                  ticket.status === 'CALLED' && styles.simPillActive,
                ]}
              >
                Called
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setTicket((prev) =>
                  prev
                    ? {
                        ...prev,
                        status: 'SERVING',
                        counterName: 'Counter 03',
                      }
                    : null
                )
              }
            >
              <Text
                style={[
                  styles.simPill,
                  ticket.status === 'SERVING' && styles.simPillActive,
                ]}
              >
                Serving
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setTicket(null)}>
              <Text style={styles.simPill}>Empty</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyTitle}>No active ticket</Text>
          <Text style={styles.emptySub}>
            Take a queue ticket when you are ready to visit.
          </Text>
          <Button
            title="Take Queue Ticket"
            size="lg"
            onPress={() => router.push('/(customer)/home')}
            style={styles.takeTicketBtn}
          />
          <TouchableOpacity
            style={{ marginTop: 24 }}
            onPress={() => setTicket(INITIAL_TICKET)}
          >
            <Text style={styles.restoreText}>Restore Sample Ticket</Text>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
  },
  topBar: {
    marginBottom: 32,
  },
  screenHeading: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  ticketWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  ticketCenter: {
    alignItems: 'center',
    paddingVertical: 36,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  ticketNumber: {
    fontSize: 64,
    fontWeight: '900',
    color: Colors.bankNavy,
    letterSpacing: -1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 14,
  },
  statusBadgeWrap: {
    marginTop: 4,
  },
  calledBox: {
    backgroundColor: Colors.bankBlue,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  calledCounterLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#BFDBFE',
    letterSpacing: 1.5,
  },
  calledCounterName: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  calledPrompt: {
    fontSize: 14,
    color: '#EFF6FF',
    marginTop: 2,
  },
  servingBox: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  servingCounterLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  servingCounterName: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginTop: 4,
  },
  waitingMetrics: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 6,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.bankNavy,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border,
  },
  cancelBtn: {
    marginBottom: 24,
  },
  simulatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 'auto',
    paddingTop: 16,
  },
  simLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginRight: 4,
  },
  simPill: {
    fontSize: 11,
    color: Colors.textSecondary,
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: '600',
  },
  simPillActive: {
    backgroundColor: Colors.bankNavy,
    color: '#FFFFFF',
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.bankNavy,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  takeTicketBtn: {
    minWidth: 200,
  },
  restoreText: {
    fontSize: 13,
    color: Colors.bankBlue,
    fontWeight: '600',
  },
});
