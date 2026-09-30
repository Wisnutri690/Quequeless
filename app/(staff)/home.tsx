import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';

export default function StaffHomeScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bankName}>NEXA BANK</Text>
        <Text style={styles.branchTitle}>Depok Branch</Text>
      </View>

      <View style={styles.operatorBar}>
        <View style={styles.operatorAvatar}>
          <Text style={styles.avatarText}>RK</Text>
        </View>
        <View style={styles.operatorInfo}>
          <Text style={styles.operatorName}>Rina Kusuma</Text>
          <Text style={styles.operatorRole}>Teller Officer • Counter 03 (Active)</Text>
        </View>
      </View>

      <View style={styles.counterCard}>
        <Text style={styles.counterHeading}>Counter 03</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>NOW SERVING</Text>
            <Text style={styles.statValueHighlight}>T-017</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>WAITING</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
        </View>

        <Button
          title="OPEN COUNTER CONSOLE"
          size="lg"
          onPress={() => router.push('/(staff)/queue')}
          style={styles.openBtn}
        />
      </View>

      <View style={styles.metricsCard}>
        <Text style={styles.sectionTitle}>TODAY'S COUNTER SUMMARY</Text>
        <View style={styles.metricRow}>
          <View style={styles.metricCol}>
            <Text style={styles.metricNum}>14</Text>
            <Text style={styles.metricDesc}>Served</Text>
          </View>
          <View style={styles.metricCol}>
            <Text style={styles.metricNum}>4.8m</Text>
            <Text style={styles.metricDesc}>Avg Time</Text>
          </View>
          <View style={styles.metricCol}>
            <Text style={styles.metricNum}>1</Text>
            <Text style={styles.metricDesc}>Skipped</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
  },
  header: {
    marginBottom: 16,
  },
  bankName: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  branchTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  operatorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  operatorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.bankBlueLight,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.bankBlue,
  },
  operatorInfo: {
    flex: 1,
  },
  operatorName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.bankNavy,
  },
  operatorRole: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 1,
  },
  counterCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginBottom: 16,
  },
  counterHeading: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 28,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 6,
  },
  statValueHighlight: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.bankBlue,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  openBtn: {
    width: '100%',
  },
  metricsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  metricCol: {
    alignItems: 'center',
  },
  metricNum: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  metricDesc: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
