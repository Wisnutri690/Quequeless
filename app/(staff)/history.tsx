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
  return (
    <Screen contentContainerStyle={styles.container}>
      <Text style={styles.screenHeading}>Daily Logs</Text>

      <View style={styles.list}>
        {LOGS.map((item, idx) => (
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
});
