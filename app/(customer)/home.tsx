import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';
import {
  MOCK_BRANCHES,
  MOCK_ACTIVE_CUSTOMER_TICKET,
  MOCK_TICKET_HISTORY,
} from '../../constants/mockData';
import { Branch, ServiceType } from '../../types';

export default function CustomerHomeScreen() {
  const [modalStep, setModalStep] = useState<null | 'BRANCH' | 'SERVICE' | 'CONFIRM'>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [hasActiveTicket, setHasActiveTicket] = useState(true);

  const handleOpenBranchSelection = () => {
    setSelectedBranch(null);
    setSelectedService(null);
    setModalStep('BRANCH');
  };

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setModalStep('SERVICE');
  };

  const handleSelectService = (service: ServiceType) => {
    setSelectedService(service);
    setModalStep('CONFIRM');
  };

  const handleConfirmQueue = () => {
    setModalStep(null);
    setHasActiveTicket(true);
    router.push('/(customer)/queue');
  };

  const getEstimatedWait = () => {
    if (!selectedBranch || !selectedService) return '~15 min';
    const svc = selectedBranch.services.find((s) => s.type === selectedService);
    return svc ? `~${svc.waitingCount * svc.avgWaitMinutes} min` : '~15 min';
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.bankName}>NEXA BANK</Text>
          <Text style={styles.greeting}>Good morning, Wisnu</Text>
        </View>
        <TouchableOpacity
          style={styles.switchRoleBtn}
          onPress={() => router.replace('/(staff)/home')}
        >
          <Text style={styles.switchRoleText}>Staff Portal ⇄</Text>
        </TouchableOpacity>
      </View>

      {/* Active Ticket Banner (if active) */}
      {hasActiveTicket && (
        <View style={styles.activeSection}>
          <Text style={styles.sectionLabel}>YOUR ACTIVE QUEUE</Text>
          <TouchableOpacity
            style={styles.activeCard}
            activeOpacity={0.8}
            onPress={() => router.push('/(customer)/queue')}
          >
            <View style={styles.activeCardInfo}>
              <Text style={styles.activeTicketNumber}>
                {MOCK_ACTIVE_CUSTOMER_TICKET.ticketNumber}
              </Text>
              <Text style={styles.activeService}>
                {MOCK_ACTIVE_CUSTOMER_TICKET.serviceName} • {MOCK_ACTIVE_CUSTOMER_TICKET.branchName.replace('NEXA Bank — ', '')}
              </Text>
              <Text style={styles.activeWait}>
                {MOCK_ACTIVE_CUSTOMER_TICKET.peopleAhead} people ahead • ~{MOCK_ACTIVE_CUSTOMER_TICKET.estimatedWaitMinutes} min
              </Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Primary Next Step CTA */}
      <View style={styles.ctaBox}>
        <Text style={styles.ctaSubtitle}>YOUR NEXT STEP</Text>
        <Text style={styles.ctaTitle}>Take a queue ticket</Text>
        <Text style={styles.ctaDesc}>
          Join a branch queue digitally before your visit.
        </Text>
        <Button
          title="Choose Branch"
          size="lg"
          onPress={handleOpenBranchSelection}
          style={styles.chooseBranchBtn}
        />
      </View>

      {/* Recent Activity (short) */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionLabel}>RECENT ACTIVITY</Text>
        {MOCK_TICKET_HISTORY.slice(0, 2).map((item) => (
          <View key={item.id} style={styles.recentRow}>
            <View>
              <Text style={styles.recentTicket}>
                {item.ticketNumber} • {item.serviceName}
              </Text>
              <Text style={styles.recentBranch}>
                {item.branchName.replace('NEXA Bank — ', '')} • {item.completedAt}
              </Text>
            </View>
            <Text style={styles.recentStatus}>{item.status}</Text>
          </View>
        ))}
      </View>

      {/* Simplified Flow Modal */}
      <Modal
        visible={modalStep !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setModalStep(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Step 1: Choose Branch */}
            {modalStep === 'BRANCH' && (
              <View>
                <View style={styles.modalTop}>
                  <Text style={styles.modalHeading}>Choose a branch</Text>
                  <TouchableOpacity onPress={() => setModalStep(null)}>
                    <Text style={styles.closeText}>Cancel</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.branchList}>
                  {MOCK_BRANCHES.map((b) => (
                    <TouchableOpacity
                      key={b.id}
                      style={styles.branchRow}
                      onPress={() => handleSelectBranch(b)}
                    >
                      <View>
                        <Text style={styles.branchTitle}>{b.name}</Text>
                        <Text style={styles.branchAddress}>{b.address}</Text>
                      </View>
                      <Text style={styles.openTag}>Open</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Step 2: Choose Service */}
            {modalStep === 'SERVICE' && (
              <View>
                <View style={styles.modalTop}>
                  <TouchableOpacity onPress={() => setModalStep('BRANCH')}>
                    <Text style={styles.backText}>← Branches</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalHeading}>Choose a service</Text>
                  <TouchableOpacity onPress={() => setModalStep(null)}>
                    <Text style={styles.closeText}>Cancel</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.branchSelectedBanner}>
                  {selectedBranch?.name}
                </Text>

                <View style={styles.serviceList}>
                  <TouchableOpacity
                    style={styles.serviceRow}
                    onPress={() => handleSelectService('TELLER')}
                  >
                    <Text style={styles.serviceRowTitle}>Teller</Text>
                    <Text style={styles.serviceRowDesc}>
                      Cash, deposit, withdrawal, transfer
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.serviceRow}
                    onPress={() => handleSelectService('CUSTOMER_SERVICE')}
                  >
                    <Text style={styles.serviceRowTitle}>Customer Service</Text>
                    <Text style={styles.serviceRowDesc}>
                      Account, ATM card, mobile banking
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Step 3: Ready to Join Confirmation */}
            {modalStep === 'CONFIRM' && (
              <View>
                <View style={styles.modalTop}>
                  <TouchableOpacity onPress={() => setModalStep('SERVICE')}>
                    <Text style={styles.backText}>← Services</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalHeading}>Ready to join?</Text>
                  <TouchableOpacity onPress={() => setModalStep(null)}>
                    <Text style={styles.closeText}>Cancel</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.confirmContent}>
                  <View style={styles.confirmInfo}>
                    <Text style={styles.confirmBranch}>
                      {selectedBranch?.name}
                    </Text>
                    <Text style={styles.confirmService}>
                      {selectedService === 'CUSTOMER_SERVICE'
                        ? 'Customer Service'
                        : 'Teller'}
                    </Text>

                    <View style={styles.waitBox}>
                      <Text style={styles.waitLabel}>ESTIMATED WAIT</Text>
                      <Text style={styles.waitValue}>{getEstimatedWait()}</Text>
                    </View>
                  </View>

                  <Button
                    title="Take Queue Number"
                    size="lg"
                    onPress={handleConfirmQueue}
                    style={styles.takeQueueBtn}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  bankName: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.5,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginTop: 2,
  },
  switchRoleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.surfaceSubtle,
  },
  switchRoleText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  activeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeCardInfo: {
    flex: 1,
  },
  activeTicketNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  activeService: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
  },
  activeWait: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  arrowIcon: {
    fontSize: 22,
    color: Colors.textMuted,
    marginLeft: 8,
  },
  ctaBox: {
    backgroundColor: Colors.surface,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 28,
  },
  ctaSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1,
    marginBottom: 4,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginBottom: 6,
  },
  ctaDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  chooseBranchBtn: {
    width: '100%',
  },
  recentSection: {
    marginTop: 4,
  },
  recentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  recentTicket: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  recentBranch: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  recentStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 380,
  },
  modalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.bankNavy,
  },
  closeText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  backText: {
    fontSize: 14,
    color: Colors.bankBlue,
    fontWeight: '600',
  },
  branchList: {
    gap: 10,
    marginTop: 8,
  },
  branchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  branchTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.bankNavy,
  },
  branchAddress: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  openTag: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  branchSelectedBanner: {
    fontSize: 13,
    color: Colors.bankBlue,
    fontWeight: '700',
    marginBottom: 12,
  },
  serviceList: {
    gap: 12,
    marginTop: 8,
  },
  serviceRow: {
    backgroundColor: Colors.surface,
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceRowTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.bankNavy,
    marginBottom: 4,
  },
  serviceRowDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  confirmContent: {
    marginTop: 12,
  },
  confirmInfo: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmBranch: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  confirmService: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginTop: 4,
    marginBottom: 16,
  },
  waitBox: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 10,
    width: '100%',
  },
  waitLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  waitValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.bankNavy,
    marginTop: 2,
  },
  takeQueueBtn: {
    width: '100%',
  },
});
