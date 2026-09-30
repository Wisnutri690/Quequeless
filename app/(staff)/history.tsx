import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../../components/Screen';
import { Colors } from '../../constants/colors';

interface DailyLogItem {
  ticket: string;
  service: string;
  status: 'Served' | 'Skipped' | 'Serving';
  time: string;
}

const LOGS: DailyLogItem[] = [
  { ticket: 'T-014', service: 'Teller', status: 'Served', time: '09:25 AM' },
  { ticket: 'T-015', service: 'Teller', status: 'Served', time: '09:35 AM' },
  { ticket: 'T-016', service: 'Teller', status: 'Skipped', time: '09:42 AM' },
  { ticket: 'T-017', service: 'Teller', status: 'Serving', time: '09:48 AM' },
];

export default function StaffHistoryScreen() {
  const [filter, setFilter] = React.useState<'ALL' | 'SERVED' | 'SKIPPED'>('ALL');

  const filteredLogs = LOGS.filter((item) => {
    if (filter === 'SERVED') return item.status === 'Served';
    if (filter === 'SKIPPED') return item.status === 'Skipped';
    return true;
  });

  return (
    <Screen contentContainerStyle={styles.container}>
      <Text style={styles.screenHeading}>Daily Activity Logs</Text>

      <View style={styles.kpiGrid}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>TOTAL</Text>
          <Text style={styles.kpiValue}>4</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>SERVED</Text>
          <Text style={[styles.kpiValue, { color: '#059669' }]}>2</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>SKIPPED</Text>
          <Text style={[styles.kpiValue, { color: '#DC2626' }]}>1</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        <Text
          style={[styles.filterChip, filter === 'ALL' && styles.filterChipActive]}
          onPress={() => setFilter('ALL')}
        >
          All (4)
        </Text>
        <Text
          style={[styles.filterChip, filter === 'SERVED' && styles.filterChipActive]}
          onPress={() => setFilter('SERVED')}
        >
          Served (2)
        </Text>
        <Text
          style={[styles.filterChip, filter === 'SKIPPED' && styles.filterChipActive]}
          onPress={() => setFilter('SKIPPED')}
        >
          Skipped (1)
        </Text>
      </View>

      <View style={styles.list}>
        {filteredLogs.map((item, idx) => (
          <View key={idx} style={styles.logRow}>
            <View style={styles.left}>
              <Text style={styles.ticketText}>{item.ticket}</Text>
              <Text style={styles.serviceText}>{item.service}</Text>
            </View>

            <View style={styles.right}>
              <Text
                style={[
                  styles.statusText,
                  item.status === 'Served' && styles.statusServed,
                  item.status === 'Serving' && styles.statusServing,
                  item.status === 'Skipped' && styles.statusSkipped,
                ]}
              >
                {item.status}
              </Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.auditNotice}>
        End-of-day synchronization automatically logs to branch records at 16:30 WIB.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  screenHeading: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginBottom: 20,
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  kpiLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.bankNavy,
    borderColor: Colors.bankNavy,
    color: '#FFFFFF',
  },
  list: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginBottom: 16,
  },
  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  left: {
    gap: 2,
  },
  ticketText: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  serviceText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  right: {
    alignItems: 'flex-end',
    gap: 2,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusServed: {
    color: '#059669',
  },
  statusServing: {
    color: Colors.bankBlue,
  },
  statusSkipped: {
    color: '#DC2626',
  },
  timeText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  auditNotice: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 8,
  },
});
