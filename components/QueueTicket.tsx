import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QueueTicket as QueueTicketType } from '../types';
import { Colors } from '../constants/colors';
import { StatusBadge } from './StatusBadge';
import { Button } from './Button';

interface QueueTicketProps {
  ticket: QueueTicketType;
  onCancel?: () => void;
  onView?: () => void;
  isCompact?: boolean;
}

export const QueueTicket: React.FC<QueueTicketProps> = ({
  ticket,
  onCancel,
  onView,
  isCompact = false,
}) => {
  const isCalled = ticket.status === 'CALLED';
  const isServing = ticket.status === 'SERVING';

  return (
    <View style={styles.card}>
      {/* Ticket Header */}
      <View style={styles.headerRow}>
        <View style={styles.bankIdentity}>
          <Text style={styles.brandTitle}>NEXA BANK</Text>
          <Text style={styles.branchName}>{ticket.branchName}</Text>
          <Text style={styles.serviceName}>{ticket.serviceName}</Text>
        </View>
        <StatusBadge status={ticket.status} />
      </View>

      {/* Prominent Called Alert Banner */}
      {isCalled && (
        <View style={styles.calledBanner}>
          <View style={styles.calledBadgeRow}>
            <View style={styles.calledPulseDot} />
            <Text style={styles.calledHeader}>YOUR TURN</Text>
          </View>
          <Text style={styles.calledInstruction}>Please proceed immediately to</Text>
          <Text style={styles.counterHighlight}>
            {ticket.counterName || 'COUNTER 02'}
          </Text>
        </View>
      )}

      {/* Main Ticket Number */}
      <View style={[styles.numberBox, isCalled && styles.numberBoxCalled]}>
        <Text style={styles.numberLabel}>YOUR QUEUE NUMBER</Text>
        <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
        <Text style={styles.timestamp}>Issued at {ticket.createdAt}</Text>
      </View>

      {/* Queue Metrics */}
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>NOW SERVING</Text>
          <Text style={styles.metricVal}>
            {ticket.nowServingNumber || '—'}
          </Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>PEOPLE AHEAD</Text>
          <Text style={styles.metricVal}>
            {isCalled ? '0 (Next)' : `${ticket.peopleAhead} people`}
          </Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>EST. WAIT</Text>
          <Text style={styles.metricVal}>
            {isCalled ? 'Now' : isServing ? 'In Chair' : `~${ticket.estimatedWaitMinutes} min`}
          </Text>
        </View>
      </View>

      {/* Live Notice */}
      {!isCompact && (
        <View style={styles.liveNotice}>
          <View style={styles.liveDot} />
          <Text style={styles.liveNoticeText}>
            {isCalled
              ? 'Counter operator has called your ticket. Please step forward.'
              : isServing
              ? 'Your service is currently in progress at the counter.'
              : 'Your queue is moving. We will notify you when your turn approaches.'}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      {onCancel && ticket.status === 'WAITING' && (
        <Button
          title="Cancel Queue"
          variant="outline"
          size="sm"
          onPress={onCancel}
          style={styles.actionBtn}
        />
      )}

      {onView && (
        <Button
          title="View Live Ticket →"
          variant="primary"
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
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    shadowColor: '#0A192F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bankIdentity: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.bankNavy,
    letterSpacing: 1.5,
  },
  branchName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  serviceName: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginTop: 1,
  },
  calledBanner: {
    backgroundColor: Colors.bankBlue,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  calledBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  calledPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#60A5FA',
    marginRight: 6,
  },
  calledHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  calledInstruction: {
    fontSize: 13,
    color: '#DBEAFE',
    marginTop: 2,
  },
  counterHighlight: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  numberBox: {
    alignItems: 'center',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 14,
    paddingVertical: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  numberBoxCalled: {
    backgroundColor: Colors.bankBlueLight,
    borderColor: '#BFDBFE',
  },
  numberLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  ticketNumber: {
    fontSize: 44,
    fontWeight: '900',
    color: Colors.bankNavy,
    letterSpacing: 0.5,
  },
  timestamp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 14,
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
    marginBottom: 3,
  },
  metricVal: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.borderLight,
  },
  liveNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  liveNoticeText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  actionBtn: {
    marginTop: 2,
  },
});
