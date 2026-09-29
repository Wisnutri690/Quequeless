import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { BranchCard } from '../../components/BranchCard';
import { ServiceCard } from '../../components/ServiceCard';
import { Colors } from '../../constants/colors';
import {
  MOCK_BRANCHES,
  MOCK_ACTIVE_CUSTOMER_TICKET,
} from '../../constants/mockData';
import { Branch, BranchServiceInfo } from '../../types';

export default function CustomerHomeScreen() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [hasActiveTicket, setHasActiveTicket] = useState(true);

  const handleJoinQueue = (service: BranchServiceInfo) => {
    // Navigate to queue ticket view
    setSelectedBranch(null);
    setHasActiveTicket(true);
    router.push('/(customer)/queue');
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>NEXA BANK</Text>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.userName}>Wisnu Tri</Text>
        </View>
        <TouchableOpacity
          style={styles.roleBadge}
          onPress={() => router.replace('/(staff)/home')}
        >
          <Text style={styles.roleBadgeText}>Staff Portal ⇄</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headline}>
        Manage your branch visit{'\n'}without waiting around.
      </Text>

      {/* Active Queue Card */}
      {hasActiveTicket && (
        <View style={styles.activeSection}>
          <View style={styles.activeSectionHeader}>
            <Text style={styles.sectionHeaderTitle}>YOUR ACTIVE QUEUE</Text>
            <TouchableOpacity onPress={() => router.push('/(customer)/queue')}>
              <Text style={styles.detailsLink}>Full Ticket →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activeTicketCard}>
            <View style={styles.activeCardRow}>
              <View style={styles.activeCardLeft}>
                <Text style={styles.activeBranchName}>
                  {MOCK_ACTIVE_CUSTOMER_TICKET.branchName}
                </Text>
                <Text style={styles.activeService}>
                  {MOCK_ACTIVE_CUSTOMER_TICKET.serviceName}
                </Text>
                <Text style={styles.activeMetrics}>
                  {MOCK_ACTIVE_CUSTOMER_TICKET.peopleAhead} people ahead • ~
                  {MOCK_ACTIVE_CUSTOMER_TICKET.estimatedWaitMinutes} min est.
                </Text>
              </View>

              <View style={styles.ticketBadge}>
                <Text style={styles.ticketBadgeLabel}>TICKET</Text>
                <Text style={styles.ticketBadgeValue}>
                  {MOCK_ACTIVE_CUSTOMER_TICKET.ticketNumber}
                </Text>
              </View>
            </View>

            <View style={styles.ticketActions}>
              <Button
                title="View Live Queue Status"
                variant="primary"
                size="sm"
                onPress={() => router.push('/(customer)/queue')}
                style={styles.openTicketBtn}
              />
            </View>
          </View>
        </View>
      )}

      {/* Nearby Branches Section */}
      <View style={styles.branchesSection}>
        <View style={styles.branchesHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>SELECT BRANCH</Text>
          <Text style={styles.branchesCount}>
            {MOCK_BRANCHES.length} branches available
          </Text>
        </View>

        {MOCK_BRANCHES.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            onSelectBranch={(b) => setSelectedBranch(b)}
            onSelectService={(b, svcType) => {
              const svc = b.services.find((s) => s.type === svcType);
              if (svc) handleJoinQueue(svc);
            }}
          />
        ))}
      </View>

      {/* Service Selection Modal */}
      <Modal
        visible={!!selectedBranch}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedBranch(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalBranchName}>
                  {selectedBranch?.shortName}
                </Text>
                <Text style={styles.modalSub}>Choose a counter service</Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setSelectedBranch(null)}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedBranch?.services.map((svc) => (
              <ServiceCard
                key={svc.type}
                service={svc}
                onJoinQueue={handleJoinQueue}
              />
            ))}
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingTop: 8,
  },
  brandTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  greeting: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  userName: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.bankBlueLight,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.bankBlue,
  },
  headline: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.bankNavy,
    lineHeight: 26,
    marginBottom: 20,
  },
  activeSection: {
    marginBottom: 24,
  },
  activeSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  detailsLink: {
    fontSize: 12,
    color: Colors.bankBlue,
    fontWeight: '700',
  },
  activeTicketCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#0A192F',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  activeCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  activeCardLeft: {
    flex: 1,
    marginRight: 10,
  },
  activeBranchName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  activeService: {
    fontSize: 13,
    color: Colors.bankBlue,
    fontWeight: '600',
    marginTop: 2,
  },
  activeMetrics: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },
  ticketBadge: {
    backgroundColor: Colors.bankNavy,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  ticketBadgeLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
  },
  ticketBadgeValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 1,
  },
  ticketActions: {
    marginTop: 2,
  },
  openTicketBtn: {
    backgroundColor: Colors.bankNavy,
  },
  branchesSection: {
    marginTop: 4,
  },
  branchesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  branchesCount: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 25, 47, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalBranchName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.bankNavy,
  },
  modalSub: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
});
