import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../../components/Screen';
import { StatusBadge } from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { MOCK_TICKET_HISTORY } from '../../constants/mockData';

export default function CustomerHistoryScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <Text style={styles.screenHeading}>History</Text>

      {MOCK_TICKET_HISTORY.length > 0 ? (
        <View style={styles.list}>
          {MOCK_TICKET_HISTORY.map((item) => (
            <View key={item.id} style={styles.historyRow}>
              <View style={styles.leftInfo}>
                <Text style={styles.ticketNum}>{item.ticketNumber}</Text>
                <Text style={styles.serviceText}>{item.serviceName}</Text>
                <Text style={styles.branchText}>
                  {item.branchName.replace('NEXA Bank — ', '')}
                </Text>
              </View>

              <View style={styles.rightInfo}>
                <StatusBadge status={item.status} showDot={false} />
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyTitle}>No past tickets</Text>
        </View>
      )}
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
  leftInfo: {
    gap: 2,
  },
  ticketNum: {
    fontSize: 18,
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
  rightInfo: {
    alignItems: 'flex-end',
  },
  emptyView: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    color: Colors.textMuted,
  },
});
