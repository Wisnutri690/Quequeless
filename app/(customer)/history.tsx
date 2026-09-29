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
  return (
    <Screen contentContainerStyle={styles.container}>
      <Text style={styles.screenHeading}>History</Text>

      <View style={styles.list}>
        {HISTORY_DATA.map((item) => (
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
    marginBottom: 24,
  },
  list: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
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
});
