import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';
import { MOCK_BRANCHES } from '../../constants/mockData';
import { ServiceType } from '../../types';

import { QueueService } from '../../services/queueService';

export default function CustomerHomeScreen() {
  const params = useLocalSearchParams<{ branch?: string }>();

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
    id?: string;
    ticketNumber: string;
    serviceName: string;
    branchName: string;
    peopleAhead: number;
    wait: number;
  } | null>(null);

  const handleSelectService = (service: ServiceType) => {
    setSelectedService(service);
    setServiceModal('CONFIRM');
  };

  const handleJoinQueue = async () => {
    if (!selectedService) return;
    setServiceModal(null);
    const createdTicket = await QueueService.createTicket(
      currentBranch.id,
      selectedService,
      currentBranch.shortName
    );
    setActiveTicket({
      id: createdTicket.id,
      ticketNumber: createdTicket.ticketNumber,
      serviceName: createdTicket.serviceName,
      branchName: currentBranch.shortName,
      peopleAhead: createdTicket.peopleAhead,
      wait: createdTicket.estimatedWaitMinutes,
    });
    router.push({
      pathname: '/(customer)/queue',
      params: { ticketId: createdTicket.id },
    });
  };

  const tellerService = currentBranch.services?.find((s) => s.type === 'TELLER');
  const csService = currentBranch.services?.find(
    (s) => s.type === 'CUSTOMER_SERVICE'
  );

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bankName}>NEXA BANK</Text>
        <Text style={styles.branchName}>{currentBranch.name}</Text>
        <Text style={styles.branchAddress}>{currentBranch.address}</Text>

        <View style={styles.branchStatusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.branchStatusText}>
            Open • {currentBranch.operatingHours || '08:00 - 15:00 WIB'}
          </Text>
        </View>
      </View>

      {activeTicket && (
        <View style={styles.activeSection}>
          <Text style={styles.sectionLabel}>YOUR ACTIVE QUEUE</Text>
          <TouchableOpacity
            style={styles.activeCard}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: '/(customer)/queue',
                params: activeTicket.id ? { ticketId: activeTicket.id } : undefined,
              })
            }
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

      <View style={styles.liveStatusSection}>
        <Text style={styles.sectionLabel}>LIVE SERVICE STATUS</Text>
        <View style={styles.serviceCardsGrid}>
          <View style={styles.serviceMetricCard}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.serviceTypeName}>Teller</Text>
              <View style={styles.servingNumberBadge}>
                <Text style={styles.servingLabel}>Serving</Text>
                <Text style={styles.servingNumberVal}>
                  {tellerService?.currentServingNumber || '—'}
                </Text>
              </View>
            </View>
            <View style={styles.cardFooterRow}>
              <Text style={styles.metricText}>
                {tellerService?.waitingCount ?? 0} waiting • ~{tellerService?.avgWaitMinutes ?? 5} min
              </Text>
            </View>
          </View>

          <View style={styles.serviceMetricCard}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.serviceTypeName}>Customer Service</Text>
              <View style={styles.servingNumberBadge}>
                <Text style={styles.servingLabel}>Serving</Text>
                <Text style={styles.servingNumberVal}>
                  {csService?.currentServingNumber || '—'}
                </Text>
              </View>
            </View>
            <View style={styles.cardFooterRow}>
              <Text style={styles.metricText}>
                {csService?.waitingCount ?? 0} waiting • ~{csService?.avgWaitMinutes ?? 15} min
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.reminderCard}>
        <Text style={styles.reminderTag}>SERVICE PREPARATION</Text>
        <Text style={styles.reminderText}>
          Please have your e-KTP and transaction documents ready prior to being called.
        </Text>
      </View>

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

      <View style={styles.bottomLinkArea}>
        <TouchableOpacity onPress={() => router.replace('/scan')}>
          <Text style={styles.rescanText}>Scan another branch QR</Text>
        </TouchableOpacity>
      </View>

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
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
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
  branchStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  branchStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#166534',
  },
  activeSection: {
    marginBottom: 20,
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
  liveStatusSection: {
    marginBottom: 18,
  },
  serviceCardsGrid: {
    gap: 10,
  },
  serviceMetricCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  serviceTypeName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.bankNavy,
  },
  servingNumberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  servingLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  servingNumberVal: {
    fontSize: 13,
    fontWeight: '900',
    color: Colors.bankBlue,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  reminderCard: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 18,
  },
  reminderTag: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  reminderText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  ctaCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
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
