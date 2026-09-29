import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../components/Screen';
import { Button } from '../components/Button';
import { Colors } from '../constants/colors';
import { MOCK_BRANCHES } from '../constants/mockData';

export default function LandingScreen() {
  const [showScanner, setShowScanner] = useState(false);

  const handleScanBranch = (branchId: string) => {
    setShowScanner(false);
    router.push({
      pathname: '/(customer)/home',
      params: { branch: branchId },
    });
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
          onPress={() => setShowScanner(true)}
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
            onPress={() => router.push('/(auth)/login')}
            style={styles.staffBtn}
          />
        </View>
      </View>

      {/* QR Scanner Entry Modal */}
      <Modal
        visible={showScanner}
        transparent
        animationType="slide"
        onRequestClose={() => setShowScanner(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.scannerCard}>
            <View style={styles.modalTop}>
              <Text style={styles.modalTitle}>Scan Branch QR</Text>
              <TouchableOpacity onPress={() => setShowScanner(false)}>
                <Text style={styles.closeBtn}>Close</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.viewfinder}>
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />
              <Text style={styles.viewfinderText}>
                Point camera at branch QR stand
              </Text>
            </View>

            <Text style={styles.scanInstruction}>
              Select branch QR code to scan:
            </Text>

            <View style={styles.branchQrButtons}>
              {MOCK_BRANCHES.map((b) => (
                <TouchableOpacity
                  key={b.id}
                  style={styles.branchQrItem}
                  onPress={() => handleScanBranch(b.id)}
                >
                  <Text style={styles.branchQrTitle}>{b.name}</Text>
                  <Text style={styles.branchQrSub}>{b.address}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 25, 47, 0.6)',
    justifyContent: 'flex-end',
  },
  scannerCard: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 460,
  },
  modalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.bankNavy,
  },
  closeBtn: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  viewfinder: {
    height: 150,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: Colors.bankBlue,
  },
  cornerTR: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: Colors.bankBlue,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: Colors.bankBlue,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: Colors.bankBlue,
  },
  viewfinderText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  scanInstruction: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  branchQrButtons: {
    gap: 10,
  },
  branchQrItem: {
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  branchQrTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.bankNavy,
  },
  branchQrSub: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
