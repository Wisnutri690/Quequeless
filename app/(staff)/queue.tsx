import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import {
  MOCK_STAFF_CS_QUEUES,
  MOCK_STAFF_TELLER_QUEUES,
} from '../../constants/mockData';
import { QueueTicket, ServiceType } from '../../types';

export default function StaffQueueScreen() {
  const [activeTab, setActiveTab] = useState<ServiceType>('CUSTOMER_SERVICE');
  const [csQueues, setCsQueues] = useState<QueueTicket[]>(MOCK_STAFF_CS_QUEUES);
  const [tellerQueues, setTellerQueues] = useState<QueueTicket[]>(
    MOCK_STAFF_TELLER_QUEUES
  );

  const activeQueues = activeTab === 'CUSTOMER_SERVICE' ? csQueues : tellerQueues;
  const setActiveQueues =
    activeTab === 'CUSTOMER_SERVICE' ? setCsQueues : setTellerQueues;

  const currentServing = activeQueues.find((q) => q.status === 'SERVING');
  const currentCalled = activeQueues.find((q) => q.status === 'CALLED');
  const waitingList = activeQueues.filter((q) => q.status === 'WAITING');

  const counterLabel =
    activeTab === 'CUSTOMER_SERVICE' ? 'Counter 02' : 'Teller 01';

  // Staff queue operations
  const handleCallNext = () => {
    if (waitingList.length === 0) return;
    const nextTicket = waitingList[0];

    setActiveQueues((prev) =>
      prev.map((item) =>
        item.id === nextTicket.id
          ? {
              ...item,
              status: 'CALLED',
              counterName: counterLabel,
              calledAt: 'Just now',
            }
          : item
      )
    );
  };

  const handleStartService = () => {
    if (!currentCalled) return;

    setActiveQueues((prev) =>
      prev.map((item) => {
        if (item.status === 'SERVING') {
          return { ...item, status: 'SERVED', completedAt: 'Just now' };
        }
        if (item.id === currentCalled.id) {
          return {
            ...item,
            status: 'SERVING',
            servedAt: 'Just now',
          };
        }
        return item;
      })
    );
  };

  const handleMarkServed = () => {
    if (!currentServing) return;

    setActiveQueues((prev) =>
      prev.map((item) =>
        item.id === currentServing.id
          ? { ...item, status: 'SERVED', completedAt: 'Just now' }
          : item
      )
    );
  };

  const handleSkipCalled = () => {
    if (!currentCalled) return;

    setActiveQueues((prev) =>
      prev.map((item) =>
        item.id === currentCalled.id
          ? { ...item, status: 'SKIPPED' }
          : item
      )
    );
  };

  const handleResetList = () => {
    if (activeTab === 'CUSTOMER_SERVICE') {
      setCsQueues(MOCK_STAFF_CS_QUEUES);
    } else {
      setTellerQueues(MOCK_STAFF_TELLER_QUEUES);
    }
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>NEXA BANK OPERATIONS</Text>
          <Text style={styles.title}>Branch Queue Manager</Text>
          <Text style={styles.subtitle}>
            Depok Branch • Active Station: {counterLabel}
          </Text>
        </View>
        <TouchableOpacity style={styles.resetBtn} onPress={handleResetList}>
          <Text style={styles.resetText}>Reset List</Text>
        </TouchableOpacity>
      </View>

      {/* Service Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'CUSTOMER_SERVICE' && styles.tabItemActive,
          ]}
          onPress={() => setActiveTab('CUSTOMER_SERVICE')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'CUSTOMER_SERVICE' && styles.tabTextActive,
            ]}
          >
            Customer Service (CS)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'TELLER' && styles.tabItemActive,
          ]}
          onPress={() => setActiveTab('TELLER')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'TELLER' && styles.tabTextActive,
            ]}
          >
            Teller Counter (T)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Operator Action Panel */}
      <View style={styles.actionPanel}>
        <Text style={styles.panelTitle}>OPERATOR CALL CONTROLS</Text>
        <View style={styles.actionGrid}>
          <Button
            title="Call Next 📢"
            variant="primary"
            size="md"
            onPress={handleCallNext}
            disabled={waitingList.length === 0}
            style={styles.actionBtn}
          />
          <Button
            title="Start Service ⏱️"
            variant="secondary"
            size="md"
            onPress={handleStartService}
            disabled={!currentCalled}
            style={styles.actionBtn}
          />
        </View>

        <View style={styles.secondaryActionGrid}>
          <Button
            title="Mark Served ✓"
            variant="outline"
            size="sm"
            onPress={handleMarkServed}
            disabled={!currentServing}
            style={styles.actionBtn}
          />
          <Button
            title="Skip Ticket ✕"
            variant="danger"
            size="sm"
            onPress={handleSkipCalled}
            disabled={!currentCalled}
            style={styles.actionBtn}
          />
        </View>
      </View>

      {/* Counter Focus Grid */}
      <View style={styles.liveGrid}>
        <View style={[styles.statusBox, styles.servingBox]}>
          <Text style={styles.statusBoxLabel}>NOW SERVING</Text>
          <Text style={styles.statusBoxNumber}>
            {currentServing ? currentServing.ticketNumber : '—'}
          </Text>
          <Text style={styles.statusBoxName}>
            {currentServing ? currentServing.customerName : 'Counter Idle'}
          </Text>
          <Text style={styles.counterTag}>
            {currentServing?.counterName || counterLabel}
          </Text>
        </View>

        <View style={[styles.statusBox, styles.calledBox]}>
          <Text style={styles.statusBoxLabel}>CALLED (STEPPING UP)</Text>
          <Text style={styles.statusBoxNumber}>
            {currentCalled ? currentCalled.ticketNumber : '—'}
          </Text>
          <Text style={styles.statusBoxName}>
            {currentCalled ? currentCalled.customerName : 'No ticket called'}
          </Text>
          <Text style={styles.counterTag}>
            {currentCalled ? `Called at ${currentCalled.calledAt}` : 'Waiting call'}
          </Text>
        </View>
      </View>

      {/* Waiting Nasabah List */}
      <View style={styles.listSection}>
        <View style={styles.listHeaderRow}>
          <Text style={styles.listSectionTitle}>
            Waiting Nasabah ({waitingList.length})
          </Text>
          <Text style={styles.listSub}>
            {activeTab === 'CUSTOMER_SERVICE' ? '~15 min/ticket' : '~5 min/ticket'}
          </Text>
        </View>

        {waitingList.length > 0 ? (
          waitingList.map((ticket, idx) => (
            <View key={ticket.id} style={styles.waitingItem}>
              <View style={styles.waitingNumberBadge}>
                <Text style={styles.waitingNumberText}>
                  {ticket.ticketNumber}
                </Text>
              </View>

              <View style={styles.waitingInfo}>
                <Text style={styles.waitingCustomerName}>
                  {ticket.customerName}
                </Text>
                <Text style={styles.waitingMeta}>
                  Joined {ticket.createdAt} • {idx} ahead
                </Text>
              </View>

              <StatusBadge status={ticket.status} showDot={false} />
            </View>
          ))
        ) : (
          <View style={styles.emptyList}>
            <Text style={styles.emptyListText}>
              All nasabah in this queue have been served! 🏛️
            </Text>
          </View>
        )}
      </View>
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
    fontSize: 10,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  resetBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resetText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabItemActive: {
    backgroundColor: Colors.surface,
    shadowColor: '#0A192F',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: Colors.bankNavy,
    fontWeight: '700',
  },
  actionPanel: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  panelTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 10,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  secondaryActionGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
  },
  liveGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statusBox: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  servingBox: {
    backgroundColor: Colors.bankBlueLight,
    borderColor: '#BFDBFE',
  },
  calledBox: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  statusBoxLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statusBoxNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  statusBoxName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  counterTag: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 4,
    fontWeight: '600',
  },
  listSection: {
    marginTop: 4,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.bankNavy,
  },
  listSub: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  waitingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
  },
  waitingNumberBadge: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  waitingNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.bankNavy,
  },
  waitingInfo: {
    flex: 1,
  },
  waitingCustomerName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  waitingMeta: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  emptyList: {
    padding: 24,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyListText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
});
