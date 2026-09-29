import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../components/Screen';
import { Button } from '../components/Button';
import { Colors } from '../constants/colors';

export default function LandingScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.bankName}>NEXA BANK</Text>
        <Text style={styles.brandTitle}>QueueLess</Text>
        <Text style={styles.tagline}>
          Skip the waiting.{'\n'}Stay in control.
        </Text>
        <Text style={styles.description}>
          Digital queue tickets for Teller and Customer Service. Monitor your turn in real time and step forward when your counter is ready.
        </Text>
      </View>

      <View style={styles.featuresList}>
        <View style={styles.featureItem}>
          <Text style={styles.featureDot}>•</Text>
          <Text style={styles.featureText}>
            Take branch tickets before you arrive
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureDot}>•</Text>
          <Text style={styles.featureText}>
            Real-time people ahead & wait estimates
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureDot}>•</Text>
          <Text style={styles.featureText}>
            Clear counter call guidance
          </Text>
        </View>
      </View>

      <View style={styles.actionSection}>
        <Button
          title="Sign In"
          onPress={() => router.push('/(auth)/login')}
          size="lg"
          style={styles.mainBtn}
        />

        <View style={styles.rolePreviewRow}>
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
    paddingVertical: 32,
  },
  topSection: {
    marginTop: 24,
  },
  bankName: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 2,
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 40,
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
  featuresList: {
    marginVertical: 32,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    fontSize: 20,
    color: Colors.bankBlue,
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  actionSection: {
    marginTop: 'auto',
  },
  mainBtn: {
    marginBottom: 12,
  },
  rolePreviewRow: {
    flexDirection: 'row',
  },
  halfBtn: {
    flex: 1,
  },
});
