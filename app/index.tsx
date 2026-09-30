import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../components/Screen';
import { Button } from '../components/Button';
import { Colors } from '../constants/colors';
import { MOCK_BRANCHES } from '../constants/mockData';

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

      <View style={styles.guideCard}>
        <Text style={styles.guideHeading}>HOW IT WORKS</Text>
        <View style={styles.stepsList}>
          <View style={styles.stepItem}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeNumber}>1</Text>
            </View>
            <View style={styles.stepDetails}>
              <Text style={styles.stepTitle}>Scan QR</Text>
              <Text style={styles.stepDesc}>Scan QR stand at branch lobby</Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeNumber}>2</Text>
            </View>
            <View style={styles.stepDetails}>
              <Text style={styles.stepTitle}>Pilih Layanan</Text>
              <Text style={styles.stepDesc}>Choose Teller or Customer Service</Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeNumber}>3</Text>
            </View>
            <View style={styles.stepDetails}>
              <Text style={styles.stepTitle}>Pantau Tiket</Text>
              <Text style={styles.stepDesc}>Track queue & get called to counter</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.hoursPill}>
        <View style={styles.hoursDot} />
        <Text style={styles.hoursText}>
          Branch Service Hours: Mon – Fri, {MOCK_BRANCHES[0].operatingHours || '08:00 - 15:00 WIB'}
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
    paddingVertical: 28,
  },
  topSection: {
    marginTop: 8,
    marginBottom: 20,
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
    marginBottom: 14,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  guideCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  guideHeading: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 12,
  },
  stepsList: {
    gap: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeNumber: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.bankBlue,
  },
  stepDetails: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.bankNavy,
  },
  stepDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  hoursPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.surfaceSubtle,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  hoursDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  hoursText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
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

