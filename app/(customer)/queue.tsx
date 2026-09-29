import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { QueueTicket } from '../../types';

const INITIAL_TICKET: QueueTicket = {
  id: 'ticket-t-019',
  ticketNumber: 'T-019',
  serviceType: 'TELLER',
  serviceName: 'Teller',
  branchId: 'branch-depok',
  branchName: 'Depok Branch',
  customerId: 'guest-session',
  customerName: 'Customer',
  status: 'WAITING',
  counterName: 'Counter 03',
  nowServingNumber: 'T-017',
  peopleAhead: 4,
  estimatedWaitMinutes: 20,
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
      <View style={styles.topBar}>
        <Text style={styles.screenHeading}>My Ticket</Text>
      </View>

      {ticket ? (
        <View style={styles.ticketWrapper}>
          {/* Main Number Display */}
          <View style={styles.ticketCenter}>
            <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
            <Text style={styles.serviceAndBranch}>
              {ticket.serviceName} • {ticket.branchName}
            </Text>
            <View style={styles.badgeWrap}>
              <StatusBadge status={ticket.status} />
            </View>
          </View>

          {/* Conditional Focus Area */}
          {isCalled ? (
            <View style={styles.calledBox}>
              <Text style={styles.calledNotice}>PLEASE PROCEED TO</Text>
              <Text style={styles.counterTitle}>
                {ticket.counterName || 'Counter 03'}
              </Text>
              <Text style={styles.calledInstruction}>
                Please proceed to {ticket.counterName || 'Counter 03'}.
              </Text>
            </View>
          ) : isServing ? (
            <View style={styles.servingBox}>
              <Text style={styles.servingLabel}>CURRENTLY SERVING AT</Text>
              <Text style={styles.servingCounter}>
                {ticket.counterName || 'Counter 03'}
              </Text>
            </View>
          ) : (
            <View style={styles.waitingMetrics}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>PEOPLE AHEAD</Text>
                <Text style={styles.metricVal}>{ticket.peopleAhead}</Text>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>ESTIMATED WAIT</Text>
                <Text style={styles.metricVal}>
                  {ticket.estimatedWaitMinutes} min
                </Text>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>STATUS</Text>
                <Text style={styles.metricVal}>WAITING</Text>
              </View>
            </View>
          )}

          {/* Action button */}
          {ticket.status === 'WAITING' && (
            <Button
              title="Cancel Queue"
              variant="outline"
              size="md"
              onPress={handleCancel}
              style={styles.cancelBtn}
            />
          )}

          {/* State Switcher for Verification */}
          <View style={styles.stateSwitcher}>
            <TouchableOpacity
              onPress={() =>
                setTicket((prev) =>
                  prev
                    ? { ...prev, status: 'WAITING', peopleAhead: 4, estimatedWaitMinutes: 20 }
                    : INITIAL_TICKET
                )
              }
            >
              <Text
                style={[
                  styles.switchPill,
                  ticket.status === 'WAITING' && styles.switchPillActive,
                ]}
              >
                Waiting
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setTicket((prev) =>
                  prev
                    ? { ...prev, status: 'CALLED', counterName: 'Counter 03' }
                    : null
                )
              }
            >
              <Text
                style={[
                  styles.switchPill,
                  ticket.status === 'CALLED' && styles.switchPillActive,
                ]}
              >
                Called
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setTicket((prev) =>
                  prev
                    ? { ...prev, status: 'SERVING', counterName: 'Counter 03' }
                    : null
                )
              }
            >
              <Text
                style={[
                  styles.switchPill,
                  ticket.status === 'SERVING' && styles.switchPillActive,
                ]}
              >
                Serving
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setTicket(null)}>
              <Text style={styles.switchPill}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyTitle}>No active ticket</Text>
          <Text style={styles.emptySubtitle}>
            Scan a branch QR or take a queue ticket when you arrive.
          </Text>
          <Button
            title="Take Queue Ticket"
            size="lg"
            onPress={() => router.push('/(customer)/home')}
            style={styles.takeTicketBtn}
          />
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
    marginBottom: 28,
  },
  screenHeading: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  ticketWrapper: {
    flex: 1,
    justifyContent: 'space-between',
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
  serviceAndBranch: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 12,
  },
  badgeWrap: {
    marginTop: 2,
  },
  calledBox: {
    backgroundColor: Colors.bankBlue,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  calledNotice: {
    fontSize: 11,
    fontWeight: '800',
    color: '#BFDBFE',
    letterSpacing: 1.5,
  },
  counterTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  calledInstruction: {
    fontSize: 14,
    color: '#EFF6FF',
    marginTop: 2,
  },
  servingBox: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  servingLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  servingCounter: {
    fontSize: 28,
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
  metricVal: {
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
  stateSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 'auto',
    paddingTop: 16,
  },
  switchPill: {
    fontSize: 11,
    color: Colors.textSecondary,
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    fontWeight: '600',
  },
  switchPillActive: {
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
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  takeTicketBtn: {
    minWidth: 200,
  },
});
