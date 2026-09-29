import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen } from '../../components/Screen';
import { StatusBadge } from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { QueueTicket } from '../../types';

const INITIAL_SERVED_LOGS: QueueTicket[] = [
  {
    id: 'log-1',
    ticketNumber: 'CS-013',
    serviceType: 'CUSTOMER_SERVICE',
    serviceName: 'Customer Service',
    branchId: 'branch-depok',
    branchName: 'NEXA Bank — Depok Branch',
    customerId: 'c-901',
    customerName: 'Hendra Gunawan',
    status: 'SERVED',
    counterName: 'Counter 02',
    nowServingNumber: 'CS-014',
    peopleAhead: 0,
    estimatedWaitMinutes: 0,
    createdAt: '09:10 AM',
    servedAt: '09:22 AM',
    completedAt: '09:37 AM',
  },
  {
    id: 'log-2',
    ticketNumber: 'T-013',
    serviceType: 'TELLER',
    serviceName: 'Teller Services',
    branchId: 'branch-depok',
    branchName: 'NEXA Bank — Depok Branch',
    customerId: 'c-902',
    customerName: 'Mega Utami',
    status: 'SERVED',
    counterName: 'Teller 01',
    nowServingNumber: 'T-014',
    peopleAhead: 0,
    estimatedWaitMinutes: 0,
    createdAt: '09:18 AM',
    servedAt: '09:25 AM',
    completedAt: '09:32 AM',
  },
  {
    id: 'log-3',
    ticketNumber: 'CS-012',
    serviceType: 'CUSTOMER_SERVICE',
    serviceName: 'Customer Service',
    branchId: 'branch-depok',
    branchName: 'NEXA Bank — Depok Branch',
    customerId: 'c-903',
    customerName: 'Fajar Nugraha',
    status: 'SERVED',
    counterName: 'Counter 02',
    nowServingNumber: 'CS-014',
    peopleAhead: 0,
    estimatedWaitMinutes: 0,
    createdAt: '08:50 AM',
    servedAt: '09:05 AM',
    completedAt: '09:21 AM',
  },
];

export default function StaffHistoryScreen() {
  const [filterType, setFilterType] = useState<'ALL' | 'TELLER' | 'CS'>('ALL');

  const filteredLogs = INITIAL_SERVED_LOGS.filter((log) => {
    if (filterType === 'TELLER') return log.serviceType === 'TELLER';
    if (filterType === 'CS') return log.serviceType === 'CUSTOMER_SERVICE';
    return true;
  });

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandTitle}>NEXA BANK OPERATIONS</Text>
        <Text style={styles.title}>Branch Service Logs</Text>
        <Text style={styles.subtitle}>
          Depok Branch • Completed tickets today
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filterType === 'ALL' && styles.filterBtnActive,
          ]}
          onPress={() => setFilterType('ALL')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'ALL' && styles.filterTextActive,
            ]}
          >
            All Services
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            filterType === 'CS' && styles.filterBtnActive,
          ]}
          onPress={() => setFilterType('CS')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'CS' && styles.filterTextActive,
            ]}
          >
            Customer Service
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            filterType === 'TELLER' && styles.filterBtnActive,
          ]}
          onPress={() => setFilterType('TELLER')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'TELLER' && styles.filterTextActive,
            ]}
          >
            Teller
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logs List */}
      <View style={styles.logsList}>
        {filteredLogs.map((log) => (
          <View key={log.id} style={styles.logCard}>
            <View style={styles.logHeader}>
              <View style={styles.ticketMeta}>
                <Text style={styles.ticketNumber}>{log.ticketNumber}</Text>
                <Text style={styles.serviceName}>{log.serviceName}</Text>
              </View>
              <StatusBadge status={log.status} showDot={false} />
            </View>

            <View style={styles.logDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nasabah</Text>
                <Text style={styles.detailVal}>{log.customerName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Served At</Text>
                <Text style={styles.detailVal}>{log.counterName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Completed</Text>
                <Text style={styles.detailVal}>{log.completedAt}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  header: {
    marginBottom: 18,
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
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterBtnActive: {
    backgroundColor: Colors.bankNavy,
    borderColor: Colors.bankNavy,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  logsList: {
    gap: 12,
  },
  logCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  ticketMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ticketNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  serviceName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.bankBlue,
  },
  logDetails: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  detailVal: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
});
