import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { QueueTicket } from '../../components/QueueTicket';
import { Colors } from '../../constants/colors';
import { MOCK_ACTIVE_CUSTOMER_TICKET } from '../../constants/mockData';
import { QueueTicket as QueueTicketType } from '../../types';

export default function CustomerQueueScreen() {
  const [activeTicket, setActiveTicket] = useState<QueueTicketType | null>(
    MOCK_ACTIVE_CUSTOMER_TICKET
  );

  const handleCancelTicket = () => {
    setActiveTicket(null);
  };

  const handleSimulateCalled = () => {
    if (!activeTicket) return;
    setActiveTicket({
      ...activeTicket,
      status: 'CALLED',
      counterName: 'COUNTER 02',
      peopleAhead: 0,
      estimatedWaitMinutes: 0,
    });
  };

  const handleSimulateServing = () => {
    if (!activeTicket) return;
    setActiveTicket({
      ...activeTicket,
      status: 'SERVING',
      counterName: 'COUNTER 02',
      peopleAhead: 0,
      estimatedWaitMinutes: 0,
    });
  };

  const handleResetWaiting = () => {
    setActiveTicket(MOCK_ACTIVE_CUSTOMER_TICKET);
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brandTitle}>NEXA BANK</Text>
          <Text style={styles.screenTitle}>My Branch Queue</Text>
          <Text style={styles.screenSubtitle}>
            Real-time counter call and position tracking
          </Text>
        </View>

        <TouchableOpacity
          style={styles.demoToggle}
          onPress={() =>
            activeTicket ? handleCancelTicket() : handleResetWaiting()
          }
        >
          <Text style={styles.demoToggleText}>
            {activeTicket ? 'Simulate Empty' : 'Restore Ticket'}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTicket ? (
        <View style={styles.activeContainer}>
          <QueueTicket
            ticket={activeTicket}
            onCancel={handleCancelTicket}
          />

          {/* Interactive Simulation Panel for Demo */}
          <View style={styles.simulationCard}>
            <Text style={styles.simTitle}>⚡ TEST COUNTER TRANSITION</Text>
            <View style={styles.simButtonsRow}>
              <Button
                title="Simulate Called"
                variant={activeTicket.status === 'CALLED' ? 'primary' : 'outline'}
                size="sm"
                onPress={handleSimulateCalled}
                style={styles.simBtn}
              />
              <Button
                title="In Service"
                variant={activeTicket.status === 'SERVING' ? 'primary' : 'outline'}
                size="sm"
                onPress={handleSimulateServing}
                style={styles.simBtn}
              />
              <Button
                title="Reset Waiting"
                variant="secondary"
                size="sm"
                onPress={handleResetWaiting}
                style={styles.simBtn}
              />
            </View>
          </View>

          {/* Guidance Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>🏛️ Branch Visit Guidance</Text>
            <Text style={styles.infoText}>
              • Keep your ticket screen ready upon entering the branch.{'\n'}
              • When your status turns to <Text style={{ fontWeight: '700', color: Colors.bankBlue }}>CALLED</Text>, immediately walk to your assigned counter.{'\n'}
              • Please have your ID (KTP/Passport) and account details ready.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Text style={styles.emptyIcon}>🎫</Text>
          </View>
          <Text style={styles.emptyTitle}>No active branch queue</Text>
          <Text style={styles.emptySubtitle}>
            You currently do not have any active tickets. Select a NEXA Bank branch and join the queue before leaving home.
          </Text>
          <Button
            title="Browse Branches"
            variant="primary"
            onPress={() => router.push('/(customer)/home')}
            style={styles.findBranchBtn}
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
    alignItems: 'flex-start',
    marginBottom: 18,
    paddingTop: 8,
  },
  brandTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.5,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginTop: 2,
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
  simulationCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  simTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 10,
  },
  simButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  simBtn: {
    flex: 1,
  },
  infoCard: {
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
    backgroundColor: Colors.bankBlueLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyIcon: {
    fontSize: 28,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.bankNavy,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  findBranchBtn: {
    minWidth: 180,
    backgroundColor: Colors.bankNavy,
  },
});
