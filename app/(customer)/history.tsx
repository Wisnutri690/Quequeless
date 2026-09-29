import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../../components/Screen';
import { StatusBadge } from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { MOCK_TICKET_HISTORY } from '../../constants/mockData';

export default function CustomerHistoryScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandTitle}>NEXA BANK</Text>
        <Text style={styles.title}>Branch Visit History</Text>
        <Text style={styles.subtitle}>
          Record of your completed and past branch services
        </Text>
      </View>

      {MOCK_TICKET_HISTORY.length > 0 ? (
        <View style={styles.historyList}>
          {MOCK_TICKET_HISTORY.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.cardHeader}>
                <View style={styles.ticketBadge}>
                  <Text style={styles.ticketNum}>{item.ticketNumber}</Text>
                  <Text style={styles.serviceName}>{item.serviceName}</Text>
                </View>
                <StatusBadge status={item.status} showDot={false} />
              </View>

              <View style={styles.cardDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Branch</Text>
                  <Text style={styles.detailValue}>{item.branchName}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Served At</Text>
                  <Text style={styles.detailValue}>{item.counterName || 'Counter 01'}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Completed</Text>
                  <Text style={styles.detailValue}>{item.completedAt}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📜</Text>
          <Text style={styles.emptyTitle}>No Visit History</Text>
          <Text style={styles.emptySubtitle}>
            Your completed queue tickets will appear here for future reference.
          </Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  header: {
    marginBottom: 20,
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
  historyList: {
    gap: 12,
  },
  historyCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  ticketBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ticketNum: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  serviceName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.bankBlue,
  },
  cardDetails: {
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
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 4,
  },
});
