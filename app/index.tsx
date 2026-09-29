import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../components/Screen';
import { Button } from '../components/Button';
import { Colors } from '../constants/colors';

export default function LandingScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.heroSection}>
        <View style={styles.bankBadge}>
          <Text style={styles.bankBadgeText}>NEXA BANK DIGITAL SERVICES</Text>
        </View>

        <Text style={styles.brandTitle}>QueueLess</Text>
        <Text style={styles.tagline}>
          Skip the waiting.{'\n'}Stay in control.
        </Text>

        <Text style={styles.description}>
          Experience effortless branch banking. Take digital queue numbers for Teller and Customer Service from anywhere, track turns in real-time, and step forward right when your counter is ready.
        </Text>
      </View>

      <View style={styles.featureHighlights}>
        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>💵</Text>
          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>Teller Services (T-###)</Text>
            <Text style={styles.featureDesc}>
              Cash transactions, withdrawals, and interbank transfers
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>👤</Text>
          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>Customer Service (CS-###)</Text>
            <Text style={styles.featureDesc}>
              Account opening, cards, mobile banking, and consultations
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🏛️</Text>
          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>Multi-Branch Coverage</Text>
            <Text style={styles.featureDesc}>
              Depok, Sudirman, and Bogor branch operations
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionSection}>
        <Button
          title="Sign In to NEXA QueueLess"
          onPress={() => router.push('/(auth)/login')}
          size="lg"
          style={styles.mainBtn}
        />

        <View style={styles.quickExploreRow}>
          <Button
            title="Customer View"
            variant="outline"
            size="sm"
            onPress={() => router.push('/(customer)/home')}
            style={styles.halfBtn}
          />
          <View style={{ width: 10 }} />
          <Button
            title="Branch Staff View"
            variant="outline"
            size="sm"
            onPress={() => router.push('/(staff)/home')}
            style={styles.halfBtn}
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
    paddingVertical: 24,
  },
  heroSection: {
    marginTop: 16,
  },
  bankBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.bankBlueLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  bankBadgeText: {
    color: Colors.bankBlue,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  brandTitle: {
    fontSize: 38,
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
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  featureHighlights: {
    marginVertical: 24,
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureIcon: {
    fontSize: 26,
    marginRight: 14,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  actionSection: {
    marginTop: 'auto',
    paddingTop: 16,
  },
  mainBtn: {
    marginBottom: 12,
    backgroundColor: Colors.bankNavy,
  },
  quickExploreRow: {
    flexDirection: 'row',
  },
  halfBtn: {
    flex: 1,
  },
});
