import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../../components/Screen';
import { Colors } from '../../constants/colors';

interface HistoryItem {
  id: string;
  ticketNumber: string;
  service: string;
  branch: string;
  status: string;
  time: string;
}

const HISTORY_DATA: HistoryItem[] = [
  {
    id: 'h-1',
    ticketNumber: 'T-014',
    service: 'Teller',
    branch: 'Depok Branch',
    status: 'Served',
    time: '09:21',
  },
  {
    id: 'h-2',
    ticketNumber: 'CS-008',
    service: 'Customer Service',
    branch: 'Depok Branch',
    status: 'Served',
    time: '10:04',
  },
];

export default function CustomerHistoryScreen() {
  const [filter, setFilter] = React.useState<'ALL' | 'TELLER' | 'CS'>('ALL');

  const filteredData = HISTORY_DATA.filter((item) => {
    if (filter === 'TELLER') return item.service.toLowerCase().includes('teller');
    if (filter === 'CS') return item.service.toLowerCase().includes('customer');
    return true;
  });

  return (
    <Screen contentContainerStyle={styles.container}>
      <Text style={styles.screenHeading}>History</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>VISITS</Text>
          <Text style={styles.statValue}>2</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>AVG WAIT</Text>
          <Text style={styles.statValue}>12 min</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>COMPLETED</Text>
          <Text style={styles.statValue}>100%</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        <Text
          style={[styles.filterChip, filter === 'ALL' && styles.filterChipActive]}
          onPress={() => setFilter('ALL')}
        >
          All (2)
        </Text>
        <Text
          style={[styles.filterChip, filter === 'TELLER' && styles.filterChipActive]}
          onPress={() => setFilter('TELLER')}
        >
          Teller (1)
        </Text>
        <Text
          style={[styles.filterChip, filter === 'CS' && styles.filterChipActive]}
          onPress={() => setFilter('CS')}
        >
          Customer Service (1)
        </Text>
      </View>

      <View style={styles.list}>
        {filteredData.map((item) => (
          <View key={item.id} style={styles.historyRow}>
            <View style={styles.infoLeft}>
              <Text style={styles.ticketNum}>{item.ticketNumber}</Text>
              <Text style={styles.serviceText}>{item.service}</Text>
              <Text style={styles.branchText}>{item.branch}</Text>
            </View>

            <View style={styles.statusRight}>
              <Text style={styles.statusText}>
                {item.status} · {item.time}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.retentionNotice}>
        Queue history is preserved for your active session.
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
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
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
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  infoLeft: {
    gap: 2,
  },
  ticketNum: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  serviceText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  branchText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  statusRight: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
  retentionNotice: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
});
