import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { Colors } from '../constants/colors';
import { MOCK_BRANCHES } from '../constants/mockData';
import { Branch } from '../types';

type ScannerMode = 'SCANNING' | 'DETECTED' | 'INVALID' | 'PERMISSION_DENIED';

export default function QrScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<ScannerMode>('SCANNING');
  const [detectedBranch, setDetectedBranch] = useState<Branch | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (permission && !permission.granted && !permission.canAskAgain && Platform.OS !== 'web') {
      setMode('PERMISSION_DENIED');
    }
  }, [permission]);

  const resolveBranchFromPayload = (data: string): Branch | null => {
    const raw = data.trim().toLowerCase();
    return (
      MOCK_BRANCHES.find(
        (b) =>
          raw.includes(b.id.toLowerCase()) ||
          raw.includes(b.shortName.toLowerCase()) ||
          raw.includes(b.city.toLowerCase()) ||
          (raw.includes('depok') && b.id === 'branch-depok') ||
          (raw.includes('sudirman') && b.id === 'branch-sudirman') ||
          (raw.includes('bogor') && b.id === 'branch-bogor')
      ) || null
    );
  };

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (isProcessing || mode !== 'SCANNING') return;
    setIsProcessing(true);

    const branch = resolveBranchFromPayload(result.data);
    if (branch) {
      setDetectedBranch(branch);
      setMode('DETECTED');
    } else {
      setMode('INVALID');
    }
    setIsProcessing(false);
  };

  const handleTestQr = (payload: string) => {
    const branch = resolveBranchFromPayload(payload);
    if (branch) {
      setDetectedBranch(branch);
      setMode('DETECTED');
    } else {
      setMode('INVALID');
    }
  };

  const handleTryAgain = () => {
    setDetectedBranch(null);
    setMode('SCANNING');
    setIsProcessing(false);
  };

  const handleContinue = () => {
    if (!detectedBranch) return;
    router.replace({
      pathname: '/(customer)/home',
      params: { branch: detectedBranch.id },
    });
  };

  const handleCancel = () => {
    router.replace('/');
  };

  // 1. Permission Denied View
  if (mode === 'PERMISSION_DENIED') {
    return (
      <SafeAreaView style={styles.darkContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.errorContent}>
          <View style={styles.errorBadge}>
            <Text style={styles.errorBadgeText}>CAMERA ACCESS</Text>
          </View>
          <Text style={styles.errorTitle}>Camera access is required</Text>
          <Text style={styles.errorDescription}>
            Allow camera access to scan the QueueLess branch QR code.
          </Text>

          <View style={styles.buttonStack}>
            <TouchableOpacity
              style={styles.primaryActionButton}
              onPress={requestPermission}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryActionText}>TRY AGAIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryActionButton}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryActionText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 2. Invalid QR View
  if (mode === 'INVALID') {
    return (
      <SafeAreaView style={styles.darkContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.errorContent}>
          <View style={styles.warningBadge}>
            <Text style={styles.warningBadgeText}>UNRECOGNIZED QR</Text>
          </View>
          <Text style={styles.errorTitle}>Invalid QR code</Text>
          <Text style={styles.errorDescription}>
            This QR code isn't a QueueLess branch code.
          </Text>

          <View style={styles.buttonStack}>
            <TouchableOpacity
              style={styles.primaryActionButton}
              onPress={handleTryAgain}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryActionText}>TRY AGAIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryActionButton}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryActionText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 3. Branch Detected View
  if (mode === 'DETECTED' && detectedBranch) {
    return (
      <SafeAreaView style={styles.lightContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.detectedContent}>
          <View style={styles.detectedTop}>
            <Text style={styles.detectedTag}>QR CODE DETECTED</Text>
            <Text style={styles.detectedHeading}>Branch detected</Text>
          </View>

          <View style={styles.branchConfirmCard}>
            <Text style={styles.confirmBankName}>NEXA BANK</Text>
            <Text style={styles.confirmBranchTitle}>{detectedBranch.name}</Text>
            <Text style={styles.confirmBranchAddress}>
              {detectedBranch.address}
            </Text>

            <View style={styles.confirmStatusRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.confirmStatusText}>
                Active branch • Ready for digital queue
              </Text>
            </View>
          </View>

          <View style={styles.detectedActions}>
            <TouchableOpacity
              style={styles.primaryActionButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryActionText}>CONTINUE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryLightActionButton}
              onPress={handleTryAgain}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryLightActionText}>SCAN AGAIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 4. Scanner View (Camera + Viewfinder)
  return (
    <SafeAreaView style={styles.darkContainer}>
      <StatusBar barStyle="light-content" />

      {/* Screen Header */}
      <View style={styles.scannerHeader}>
        <Text style={styles.scannerBankTag}>NEXA BANK</Text>
        <Text style={styles.scannerTitle}>Scan QR</Text>
        <Text style={styles.scannerSubtitle}>
          Scan the QR code displayed at your NEXA Bank branch.
        </Text>
      </View>

      {/* Camera / Viewfinder Box */}
      <View style={styles.viewfinderContainer}>
        {permission?.granted ? (
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
            onBarcodeScanned={isProcessing ? undefined : handleBarcodeScanned}
          />
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraPlaceholderText}>
              Align camera with branch QR stand
            </Text>
          </View>
        )}

        {/* Viewfinder Reticle Frame */}
        <View style={styles.reticle}>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
        </View>
      </View>

      {/* Instructional Caption */}
      <Text style={styles.scanInstruction}>
        Point your camera at the QueueLess QR code.
      </Text>

      {/* Bottom Action Area */}
      <View style={styles.scannerBottom}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelButtonText}>CANCEL</Text>
        </TouchableOpacity>

        {/* Development / Web Fallback Trigger (Subtle, clearly labeled) */}
        {Platform.OS === 'web' && (
          <View style={styles.webFallbackContainer}>
            <Text style={styles.webFallbackLabel}>Web testing only</Text>
            <View style={styles.webFallbackRow}>
              <TouchableOpacity
                style={styles.testPill}
                onPress={() => handleTestQr('queue-less://branch/depok')}
              >
                <Text style={styles.testPillText}>TEST DEPOK QR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.testPill}
                onPress={() => handleTestQr('queue-less://branch/sudirman')}
              >
                <Text style={styles.testPillText}>TEST SUDIRMAN QR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.testPill}
                onPress={() => handleTestQr('queue-less://branch/bogor')}
              >
                <Text style={styles.testPillText}>TEST BOGOR QR</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: '#070D18',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  lightContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  scannerHeader: {
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 12,
  },
  scannerBankTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#60A5FA',
    letterSpacing: 2,
    marginBottom: 4,
  },
  scannerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  scannerSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 300,
  },
  viewfinderContainer: {
    width: '100%',
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    marginVertical: 12,
  },
  cameraPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A1220',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  cameraPlaceholderText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  reticle: {
    width: 220,
    height: 220,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#38BDF8',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  scanInstruction: {
    fontSize: 14,
    color: '#CBD5E1',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
  },
  scannerBottom: {
    gap: 16,
    marginBottom: 8,
  },
  cancelButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  webFallbackContainer: {
    alignItems: 'center',
    paddingTop: 4,
  },
  webFallbackLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  webFallbackRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  testPill: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  testPillText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '700',
  },
  detectedContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  detectedTop: {
    alignItems: 'center',
    marginTop: 16,
  },
  detectedTag: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  detectedHeading: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  branchConfirmCard: {
    backgroundColor: Colors.surface,
    padding: 28,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginVertical: 24,
  },
  confirmBankName: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  confirmBranchTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.bankNavy,
    textAlign: 'center',
    marginBottom: 8,
  },
  confirmBranchAddress: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  confirmStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  confirmStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  detectedActions: {
    gap: 12,
  },
  primaryActionButton: {
    backgroundColor: Colors.bankNavy,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  secondaryLightActionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryLightActionText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  errorBadge: {
    backgroundColor: '#7F1D1D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 16,
  },
  errorBadgeText: {
    color: '#FECACA',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  warningBadge: {
    backgroundColor: '#78350F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 16,
  },
  warningBadgeText: {
    color: '#FDE68A',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    maxWidth: 280,
  },
  buttonStack: {
    width: '100%',
    gap: 12,
  },
  secondaryActionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryActionText: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '700',
  },
});
