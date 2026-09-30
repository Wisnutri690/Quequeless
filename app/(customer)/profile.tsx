import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';

export default function CustomerProfileScreen() {
  const handleExitSession = () => {
    router.replace('/');
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <Text style={styles.screenHeading}>Session Profile</Text>

      <View style={styles.sessionCard}>
        <View style={styles.sessionHeader}>
          <Text style={styles.bankTag}>NEXA BANK</Text>
          <Text style={styles.sessionTitle}>Guest Visitor</Text>
          <Text style={styles.sessionId}>Token: NXL-SES-9821</Text>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Connected Branch</Text>
          <Text style={styles.detailVal}>Depok Branch</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Connection Mode</Text>
          <Text style={styles.detailVal}>Branch QR Digital Session</Text>
        </View>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        <View style={styles.prefRow}>
          <Text style={styles.prefLabel}>Sound & Vibration Alert</Text>
          <Text style={styles.prefStatus}>Enabled</Text>
        </View>
        <View style={styles.prefRow}>
          <Text style={styles.prefLabel}>Language</Text>
          <Text style={styles.prefStatus}>Bahasa Indonesia / EN</Text>
        </View>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>BRANCH SUPPORT & PRIVACY</Text>
        <View style={styles.prefRow}>
          <Text style={styles.prefLabel}>Customer Care</Text>
          <Text style={styles.prefStatus}>1500-NEXA</Text>
        </View>
        <Text style={styles.privacyNote}>
          QueueLess does not store or access your banking credentials or account balance.
          Your session terminates automatically when you leave the branch.
        </Text>
      </View>

      <View style={styles.actionArea}>
        <Button
          title="Exit Session"
          variant="outline"
          size="md"
          onPress={handleExitSession}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
  },
  screenHeading: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginBottom: 20,
  },
  sessionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  sessionHeader: {
    marginBottom: 12,
  },
  bankTag: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  sessionId: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  detailVal: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  sectionBox: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 10,
  },
  prefRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  prefLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  prefStatus: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.bankNavy,
  },
  privacyNote: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 16,
    marginTop: 10,
  },
  actionArea: {
    marginTop: 'auto',
    paddingTop: 12,
  },
});
