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
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>MVP FOUNDATION</Text>
        </View>

        <Text style={styles.brandTitle}>QueueLess</Text>
        <Text style={styles.tagline}>
          Join the queue.{'\n'}Leave the waiting.
        </Text>

        <Text style={styles.description}>
          Manage your waiting time without being stuck in physical lines. Check real-time queue position and return right when your turn is up.
        </Text>
      </View>

      <View style={styles.featureHighlights}>
        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>✂️</Text>
          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>Barber & Salon</Text>
            <Text style={styles.featureDesc}>Numbered turn queues with live estimation</Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🍜</Text>
          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>Restaurant Orders</Text>
            <Text style={styles.featureDesc}>Live order preparation progress tracking</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionSection}>
        <Button
          title="Continue to Login"
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
            title="Staff View"
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
    marginTop: 20,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: Colors.primaryAccent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  brandTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.primaryAccent,
    lineHeight: 32,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
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
    fontSize: 28,
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
    fontSize: 13,
    color: Colors.textMuted,
  },
  actionSection: {
    marginTop: 'auto',
    paddingTop: 16,
  },
  mainBtn: {
    marginBottom: 12,
  },
  quickExploreRow: {
    flexDirection: 'row',
  },
  halfBtn: {
    flex: 1,
  },
});
