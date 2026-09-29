import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';
import { MOCK_BRANCHES } from '../../constants/mockData';
import { ServiceType } from '../../types';

export default function CustomerHomeScreen() {
  const params = useLocalSearchParams<{ branch?: string }>();

  // Determine branch from QR scan parameter (default to Depok Branch)
  const currentBranch =
    MOCK_BRANCHES.find(
      (b) =>
        b.id === params.branch ||
        b.id.toLowerCase().includes(params.branch?.toLowerCase() || '')
    ) || MOCK_BRANCHES[0];

  useEffect(() => {
    if (!params.branch) {
      router.replace('/scan');
    }
  }, [params.branch]);

  const [serviceModal, setServiceModal] = useState<null | 'SERVICE' | 'CONFIRM'>(null);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [activeTicket, setActiveTicket] = useState<{
    ticketNumber: string;
    serviceName: string;
    branchName: string;
    peopleAhead: number;
    wait: number;
  } | null>({
    ticketNumber: 'T-019',
    serviceName: 'Teller',
    branchName: currentBranch.shortName,
    peopleAhead: 4,
    wait: 20,
  });

  const handleSelectService = (service: ServiceType) => {
    setSelectedService(service);
    setServiceModal('CONFIRM');
  };

  const handleJoinQueue = () => {
    setServiceModal(null);
    setActiveTicket({
      ticketNumber: selectedService === 'CUSTOMER_SERVICE' ? 'CS-019' : 'T-019',
      serviceName:
        selectedService === 'CUSTOMER_SERVICE' ? 'Customer Service' : 'Teller',
      branchName: currentBranch.shortName,
      peopleAhead: 4,
      wait: selectedService === 'CUSTOMER_SERVICE' ? 20 : 15,
    });
    router.push('/(customer)/queue');
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      {/* Header with Detected Branch */}
      <View style={styles.header}>
        <Text style={styles.bankName}>NEXA BANK</Text>
        <Text style={styles.branchName}>{currentBranch.name}</Text>
        <Text style={styles.branchAddress}>{currentBranch.address}</Text>
      </View>

      {/* Active Ticket Banner (if active) */}
      {activeTicket && (
        <View style={styles.activeSection}>
          <Text style={styles.sectionLabel}>YOUR ACTIVE QUEUE</Text>
          <TouchableOpacity
            style={styles.activeCard}
            activeOpacity={0.8}
            onPress={() => router.push('/(customer)/queue')}
          >
            <View>
              <Text style={styles.activeTicketNum}>
                {activeTicket.ticketNumber}
              </Text>
              <Text style={styles.activeService}>
                {activeTicket.serviceName} • {activeTicket.branchName}
              </Text>
              <Text style={styles.activeWait}>
                {activeTicket.peopleAhead} people ahead • ~{activeTicket.wait} min
              </Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Primary Action Card */}
      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>Welcome to QueueLess</Text>
        <Text style={styles.ctaDesc}>
          Take a digital queue ticket and avoid unnecessary waiting at the counter.
        </Text>
        <Button
          title="TAKE A QUEUE TICKET"
          size="lg"
          onPress={() => setServiceModal('SERVICE')}
          style={styles.takeBtn}
        />
      </View>

      {/* Exit / Rescan QR link */}
      <View style={styles.bottomLinkArea}>
        <TouchableOpacity onPress={() => router.replace('/scan')}>
          <Text style={styles.rescanText}>Scan another branch QR</Text>
        </TouchableOpacity>
      </View>

      {/* Service Selection Modal (Branch is already detected) */}
      <Modal
        visible={serviceModal !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setServiceModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {serviceModal === 'SERVICE' && (
              <View>
                <View style={styles.modalHeader}>
                  <View>
                    <Text style={styles.modalBranchTag}>
                      {currentBranch.name}
                    </Text>
                    <Text style={styles.modalHeading}>Choose a service</Text>
                  </View>
                  <TouchableOpacity onPress={() => setServiceModal(null)}>
                    <Text style={styles.closeBtn}>Close</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.serviceList}>
                  <TouchableOpacity
                    style={styles.serviceOption}
                    onPress={() => handleSelectService('TELLER')}
                  >
                    <Text style={styles.serviceTitle}>Teller</Text>
                    <Text style={styles.serviceDesc}>
                      Cash deposits, withdrawals, and transfers.
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.serviceOption}
                    onPress={() => handleSelectService('CUSTOMER_SERVICE')}
                  >
                    <Text style={styles.serviceTitle}>Customer Service</Text>
                    <Text style={styles.serviceDesc}>
                      Account opening, ATM card, and mobile banking.
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {serviceModal === 'CONFIRM' && (
              <View>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setServiceModal('SERVICE')}>
                    <Text style={styles.backBtn}>← Services</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalHeading}>Ready to join?</Text>
                  <TouchableOpacity onPress={() => setServiceModal(null)}>
                    <Text style={styles.closeBtn}>Close</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.confirmBox}>
                  <Text style={styles.confirmBranch}>{currentBranch.name}</Text>
                  <Text style={styles.confirmService}>
                    {selectedService === 'CUSTOMER_SERVICE'
                      ? 'Customer Service'
                      : 'Teller'}
                  </Text>

                  <View style={styles.numberBox}>
                    <Text style={styles.numberBoxLabel}>YOUR QUEUE NUMBER</Text>
                    <Text style={styles.numberBoxValue}>
                      {selectedService === 'CUSTOMER_SERVICE' ? 'CS-019' : 'T-019'}
                    </Text>
                  </View>

                  <Button
                    title="JOIN QUEUE"
                    size="lg"
                    onPress={handleJoinQueue}
                    style={styles.confirmBtn}
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
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  header: {
    marginBottom: 24,
  },
  bankName: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  branchName: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  branchAddress: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  activeSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 10,
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
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeTicketNum: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  activeService: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
  },
  activeWait: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },
  arrowIcon: {
    fontSize: 22,
    color: Colors.textMuted,
  },
  ctaCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 28,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginBottom: 8,
  },
  ctaDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  takeBtn: {
    width: '100%',
  },
  bottomLinkArea: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 12,
  },
  rescanText: {
    fontSize: 13,
    color: Colors.bankBlue,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 25, 47, 0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalBranchTag: {
    fontSize: 11,
    color: Colors.bankBlue,
    fontWeight: '700',
    marginBottom: 2,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  closeBtn: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  backBtn: {
    fontSize: 14,
    color: Colors.bankBlue,
    fontWeight: '600',
  },
  serviceList: {
    gap: 12,
  },
  serviceOption: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.bankNavy,
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  confirmBox: {
    alignItems: 'center',
    paddingTop: 12,
  },
  confirmBranch: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  confirmService: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.bankNavy,
    marginTop: 2,
    marginBottom: 20,
  },
  numberBox: {
    backgroundColor: Colors.surface,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  numberBoxLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  numberBoxValue: {
    fontSize: 44,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  confirmBtn: {
    width: '100%',
  },
});
