import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';
import { MOCK_BRANCHES } from '../../constants/mockData';
import { generateBranchQrPayload } from '../../constants/branchQr';
import { Branch } from '../../types';

export default function BranchQrScreen() {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(MOCK_BRANCHES[0]);
  const [qrFormat, setQrFormat] = useState<'url' | 'deeplink'>('url');

  const currentPayload = generateBranchQrPayload(selectedBranch.id, qrFormat);

  const handlePrint = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.print();
    } else {
      Alert.alert(
        'Print QR Stand',
        `Ready to print official QR Stand for ${selectedBranch.name}.\n\nURL: ${currentPayload}`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bankTag}>NEXA BANK OPERATIONS</Text>
        <Text style={styles.title}>Branch QR Stand</Text>
        <Text style={styles.subtitle}>
          Official QR codes for lobby stand, customer kiosk, and print materials.
        </Text>
      </View>

      <View style={styles.branchSelector}>
        {MOCK_BRANCHES.map((b) => (
          <TouchableOpacity
            key={b.id}
            style={[
              styles.branchTab,
              selectedBranch.id === b.id && styles.branchTabActive,
            ]}
            onPress={() => setSelectedBranch(b)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.branchTabText,
                selectedBranch.id === b.id && styles.branchTabTextActive,
              ]}
            >
              {b.shortName.replace(' Branch', '')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.standFrame}>
        <View style={styles.standHeader}>
          <Text style={styles.standBankTitle}>NEXA BANK</Text>
          <Text style={styles.standSubtitle}>DIGITAL QUEUE ACCESS</Text>
        </View>

        <View style={styles.standBranchInfo}>
          <Text style={styles.standBranchName}>{selectedBranch.name}</Text>
          <Text style={styles.standBranchAddress}>{selectedBranch.address}</Text>
          <View style={styles.hoursBadge}>
            <Text style={styles.hoursBadgeText}>
              Operasional: {selectedBranch.operatingHours}
            </Text>
          </View>
        </View>

        <View style={styles.qrContainer}>
          <View style={styles.qrWrapper}>
            <QRCode
              value={currentPayload}
              size={210}
              color={Colors.bankNavy}
              backgroundColor="#FFFFFF"
            />
          </View>
          <Text style={styles.scanInstruction}>
            Scan with your phone camera or QueueLess App to take a queue ticket.
          </Text>
        </View>

        <View style={styles.payloadBox}>
          <Text style={styles.payloadLabel}>ENCODED IDENTIFIER</Text>
          <Text style={styles.payloadText} numberOfLines={1} ellipsizeMode="middle">
            {currentPayload}
          </Text>
        </View>

        <View style={styles.standFooter}>
          <Text style={styles.standFooterText}>
            QueueLess • Skip the waiting. Stay in control.
          </Text>
        </View>
      </View>

      <View style={styles.actionSection}>
        <View style={styles.formatToggleRow}>
          <Text style={styles.formatLabel}>QR Target Format:</Text>
          <TouchableOpacity
            style={[
              styles.formatPill,
              qrFormat === 'url' && styles.formatPillActive,
            ]}
            onPress={() => setQrFormat('url')}
          >
            <Text
              style={[
                styles.formatPillText,
                qrFormat === 'url' && styles.formatPillTextActive,
              ]}
            >
              Web URL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.formatPill,
              qrFormat === 'deeplink' && styles.formatPillActive,
            ]}
            onPress={() => setQrFormat('deeplink')}
          >
            <Text
              style={[
                styles.formatPillText,
                qrFormat === 'deeplink' && styles.formatPillTextActive,
              ]}
            >
              Deep Link
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonStack}>
          <Button
            title="PRINT BRANCH STAND"
            size="lg"
            onPress={handlePrint}
            style={styles.printBtn}
          />
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
    marginBottom: 20,
  },
  bankTag: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  branchSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  branchTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  branchTabActive: {
    backgroundColor: Colors.bankNavy,
    borderColor: Colors.bankNavy,
  },
  branchTabText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  branchTabTextActive: {
    color: '#FFFFFF',
  },
  standFrame: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 24,
  },
  standHeader: {
    backgroundColor: Colors.bankNavy,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  standBankTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  standSubtitle: {
    fontSize: 9,
    fontWeight: '800',
    color: '#93C5FD',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  standBranchInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },
  standBranchName: {
    fontSize: 17,
    fontWeight: '900',
    color: Colors.bankNavy,
    textAlign: 'center',
    marginBottom: 4,
  },
  standBranchAddress: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 8,
  },
  hoursBadge: {
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  hoursBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  qrContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  qrWrapper: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 12,
  },
  scanInstruction: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 240,
  },
  payloadBox: {
    backgroundColor: Colors.surfaceSubtle,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  payloadLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  payloadText: {
    fontSize: 11,
    color: Colors.bankBlue,
    fontWeight: '600',
  },
  standFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  standFooterText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  actionSection: {
    marginTop: 'auto',
    gap: 16,
  },
  formatToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  formatLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  formatPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  formatPillActive: {
    backgroundColor: Colors.bankBlue,
    borderColor: Colors.bankBlue,
  },
  formatPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  formatPillTextActive: {
    color: '#FFFFFF',
  },
  buttonStack: {
    gap: 10,
  },
  printBtn: {
    width: '100%',
  },
});
