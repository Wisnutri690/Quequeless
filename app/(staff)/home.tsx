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
          title="OPEN COUNTER"
          size="lg"
          onPress={() => router.push('/(staff)/queue')}
          style={styles.openBtn}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  header: {
    marginBottom: 40,
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
  counterCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginBottom: 'auto',
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
});
