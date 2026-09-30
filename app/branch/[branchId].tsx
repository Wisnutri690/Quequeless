import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';
import { parseBranchQrPayload } from '../../constants/branchQr';

export default function BranchDeepLinkScreen() {
  const { branchId } = useLocalSearchParams<{ branchId: string }>();
  const branch = parseBranchQrPayload(branchId || '');

  useEffect(() => {
    if (branch) {
      const timer = setTimeout(() => {
        router.replace({
          pathname: '/(customer)/home',
          params: { branch: branch.id },
        });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [branch]);

  if (!branch) {
    return (
      <Screen contentContainerStyle={styles.container}>
        <View style={styles.errorCard}>
          <View style={styles.warningBadge}>
            <Text style={styles.warningBadgeText}>INVALID BRANCH QR</Text>
          </View>
          <Text style={styles.errorTitle}>Cabang Tidak Terdaftar</Text>
          <Text style={styles.errorDesc}>
            QR Code atau tautan cabang &quot;{branchId || 'Unknown'}&quot; tidak valid atau belum terdaftar dalam sistem NEXA Bank.
          </Text>
          <Button
            title="KEMBALI KE BERANDA"
            size="lg"
            onPress={() => router.replace('/')}
            style={styles.actionBtn}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.connectingCard}>
        <Text style={styles.bankTag}>NEXA BANK</Text>
        <Text style={styles.branchName}>{branch.name}</Text>
        <Text style={styles.branchAddress}>{branch.address}</Text>

        <View style={styles.loaderArea}>
          <ActivityIndicator size="small" color={Colors.bankBlue} />
          <Text style={styles.connectingText}>Menghubungkan ke layanan antrean...</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  connectingCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 28,
    alignItems: 'center',
  },
  bankTag: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 2,
    marginBottom: 8,
  },
  branchName: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
    textAlign: 'center',
    marginBottom: 6,
  },
  branchAddress: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  loaderArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  connectingText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  errorCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 28,
    alignItems: 'center',
  },
  warningBadge: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  warningBadgeText: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  actionBtn: {
    width: '100%',
  },
});
