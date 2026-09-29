import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../components/Screen';
import { Button } from '../components/Button';
import { Colors } from '../constants/colors';

export default function LandingScreen() {
  const handleScanQr = () => {
    router.push('/scan');
  };

  const handleStaffLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.bankName}>NEXA BANK</Text>
        <Text style={styles.brandTitle}>QueueLess</Text>
        <Text style={styles.tagline}>
          Skip the waiting.{'\n'}Stay in control.
        </Text>
        <Text style={styles.description}>
          Get your digital queue ticket before waiting at the counter.
        </Text>
      </View>

      <View style={styles.actionSection}>
        <Button
          title="SCAN QR"
          onPress={handleScanQr}
          size="lg"
          style={styles.scanBtn}
        />

        <View style={styles.dividerRow}>
          <View style={styles.line} />
        </View>

        <View style={styles.staffSection}>
          <Text style={styles.staffLabel}>Staff access</Text>
          <Button
            title="STAFF LOGIN"
            variant="outline"
            size="md"
            onPress={handleStaffLogin}
            style={styles.staffBtn}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  topSection: {
    marginTop: 20,
  },
  bankName: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 2,
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: Colors.bankNavy,
    letterSpacing: -1,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.bankBlue,
    lineHeight: 32,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  actionSection: {
    marginTop: 'auto',
  },
  scanBtn: {
    marginBottom: 24,
  },
  dividerRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.border,
  },
  staffSection: {
    alignItems: 'center',
  },
  staffLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  staffBtn: {
    width: '100%',
  },
});
