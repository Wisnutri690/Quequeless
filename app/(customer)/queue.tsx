import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { QueueTicket } from '../../types';
import { QueueService } from '../../services/queueService';

const DEV_FALLBACK_TICKET: QueueTicket = {
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
  const params = useLocalSearchParams<{ ticketId?: string }>();
  const [ticket, setTicket] = useState<QueueTicket | null>(
    params.ticketId ? null : DEV_FALLBACK_TICKET
  );

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (params.ticketId) {
      QueueService.getTicketById(params.ticketId).then((fetchedTicket) => {
        if (fetchedTicket) {
          setTicket(fetchedTicket);
        } else {
          setTicket(DEV_FALLBACK_TICKET);
        }
      });

      unsubscribe = QueueService.subscribeTicket(params.ticketId, (updatedTicket) => {
        setTicket(updatedTicket);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [params.ticketId]);

  const isCalled = ticket?.status === 'CALLED';
  const isServing = ticket?.status === 'SERVING';

  const handleCancel = async () => {
    if (ticket?.id) {
      await QueueService.updateTicketStatus(ticket.id, 'CANCELLED');
    }
    setTicket(null);
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.screenHeading}>My Ticket</Text>
      </View>

      {ticket ? (
        <View style={styles.ticketWrapper}>
          <View style={styles.ticketCenter}>
            <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
            <Text style={styles.serviceAndBranch}>
              {ticket.serviceName} • {ticket.branchName}
            </Text>
            <View style={styles.badgeWrap}>
              <StatusBadge status={ticket.status} />
            </View>
          </View>

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

          <View style={styles.sectionCard}>
            <Text style={styles.sectionCardTitle}>QUEUE PROGRESS</Text>
            <View style={styles.stepContainer}>
              <View style={styles.stepNode}>
                <View style={[styles.stepCircle, styles.stepCircleDone]}>
                  <Text style={styles.stepCheckmark}>✓</Text>
                </View>
                <Text style={[styles.stepText, styles.stepTextDone]}>Issued</Text>
              </View>

              <View style={[styles.stepConnector, styles.stepConnectorActive]} />

              <View style={styles.stepNode}>
                <View
                  style={[
                    styles.stepCircle,
                    (isCalled || isServing) && styles.stepCircleDone,
                    ticket.status === 'WAITING' && styles.stepCircleActive,
                  ]}
                >
                  {isCalled || isServing ? (
                    <Text style={styles.stepCheckmark}>✓</Text>
                  ) : (
                    <Text
                      style={[
                        styles.stepIndex,
                        ticket.status === 'WAITING' && styles.stepIndexActive,
                      ]}
                    >
                      2
                    </Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.stepText,
                    (isCalled || isServing) && styles.stepTextDone,
                    ticket.status === 'WAITING' && styles.stepTextActive,
                  ]}
                >
                  Waiting
                </Text>
              </View>

              <View
                style={[
                  styles.stepConnector,
                  (isCalled || isServing) && styles.stepConnectorActive,
                ]}
              />

              <View style={styles.stepNode}>
                <View
                  style={[
                    styles.stepCircle,
                    isServing && styles.stepCircleDone,
                    isCalled && styles.stepCircleActive,
                  ]}
                >
                  {isServing ? (
                    <Text style={styles.stepCheckmark}>✓</Text>
                  ) : (
                    <Text
                      style={[
                        styles.stepIndex,
                        isCalled && styles.stepIndexActive,
                      ]}
                    >
                      3
                    </Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.stepText,
                    isServing && styles.stepTextDone,
                    isCalled && styles.stepTextActive,
                  ]}
                >
                  Called
                </Text>
              </View>

              <View
                style={[
                  styles.stepConnector,
                  isServing && styles.stepConnectorActive,
                ]}
              />

              <View style={styles.stepNode}>
                <View
                  style={[
                    styles.stepCircle,
                    isServing && styles.stepCircleActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepIndex,
                      isServing && styles.stepIndexActive,
                    ]}
                  >
                    4
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepText,
                    isServing && styles.stepTextActive,
                  ]}
                >
                  Served
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.nowServingBanner}>
            <View style={styles.nowServingLeft}>
              <Text style={styles.nowServingSub}>NOW SERVING AT LOBBY</Text>
              <Text style={styles.nowServingNum}>
                {ticket.nowServingNumber || 'T-017'}
              </Text>
              <Text style={styles.nowServingCounter}>
                {ticket.counterName || 'Counter 03'} • In Consultation
              </Text>
            </View>
            <View style={styles.liveIndicatorBadge}>
              <View style={styles.livePulseDot} />
              <Text style={styles.liveIndicatorText}>Live Monitor</Text>
            </View>
          </View>

          <View style={styles.detailsCard}>
            <Text style={styles.sectionCardTitle}>TICKET DETAILS</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Branch</Text>
              <Text style={styles.detailValue}>{ticket.branchName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>{ticket.serviceName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Issued Time</Text>
              <Text style={styles.detailValue}>
                {ticket.createdAt || '09:45 AM'}
              </Text>
            </View>
          </View>

          {ticket.status === 'WAITING' && (
            <Button
              title="Cancel Queue"
              variant="outline"
              size="md"
              onPress={handleCancel}
              style={styles.cancelBtn}
            />
          )}
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
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  sectionCardTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 14,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepNode: {
    alignItems: 'center',
    minWidth: 50,
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepCircleDone: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
  },
  stepCircleActive: {
    backgroundColor: Colors.bankBlue,
    borderColor: Colors.bankBlue,
  },
  stepCheckmark: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepIndex: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
  },
  stepIndexActive: {
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textMuted,
    textAlign: 'center',
  },
  stepTextDone: {
    color: '#059669',
    fontWeight: '700',
  },
  stepTextActive: {
    color: Colors.bankBlue,
    fontWeight: '800',
  },
  stepConnector: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border,
    marginBottom: 14,
    marginHorizontal: 2,
  },
  stepConnectorActive: {
    backgroundColor: '#10B981',
  },
  nowServingBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  nowServingLeft: {
    gap: 2,
  },
  nowServingSub: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
  },
  nowServingNum: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  nowServingCounter: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  liveIndicatorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  liveIndicatorText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
  },
  detailsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.bankNavy,
  },
  cancelBtn: {
    marginBottom: 20,
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
