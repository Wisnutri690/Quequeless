import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';

export default function StaffHomeScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.bankName}>NEXA BANK</Text>
          <Text style={styles.branchTitle}>Depok Branch</Text>
        </View>
        <TouchableOpacity
          style={styles.switchPortalBtn}
          onPress={() => router.replace('/(customer)/home')}
        >
          <Text style={styles.switchPortalText}>Customer Portal ⇄</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.counterCard}>
        <Text style={styles.counterHeading}>Counter 03</Text>
        <Text style={styles.counterSub}>Teller Station</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>CURRENT</Text>
            <Text style={styles.statValueHighlight}>T-017</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>WAITING</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
        </View>

        <Button
          title="Open Counter"
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  bankName: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.5,
  },
  branchTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginTop: 2,
  },
  switchPortalBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.surfaceSubtle,
  },
  switchPortalText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
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
  },
  counterSub: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: 2,
    marginBottom: 28,
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
