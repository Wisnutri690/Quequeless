import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';
import { MOCK_USER_PROFILE } from '../../constants/mockData';

export default function CustomerProfileScreen() {
  const handleSignOut = () => {
    router.replace('/');
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Nasabah Profile</Text>

      {/* User Header Card */}
      <View style={styles.userCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>WT</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{MOCK_USER_PROFILE.fullName}</Text>
          <Text style={styles.userEmail}>{MOCK_USER_PROFILE.email}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>VERIFIED NASABAH</Text>
            </View>
            <Text style={styles.cifText}>CIF: {MOCK_USER_PROFILE.cifNumber}</Text>
          </View>
        </View>
      </View>

      {/* Banking & Branch Preferences */}
      <View style={styles.menuSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>PREFERENCES & SETTINGS</Text>
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemLabel}>Primary Branch</Text>
          <Text style={styles.menuItemValue}>Depok Branch ›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemLabel}>Queue Audio & Push Alerts</Text>
          <Text style={styles.menuItemValue}>Enabled ›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemLabel}>Accessibility Assistance</Text>
          <Text style={styles.menuItemValue}>Standard ›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.replace('/(staff)/home')}
        >
          <Text style={[styles.menuItemLabel, { color: Colors.bankBlue }]}>
            Switch to Branch Staff Portal
          </Text>
          <Text style={[styles.menuItemArrow, { color: Colors.bankBlue }]}>
            ⇄
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemLabel}>NEXA QueueLess Application</Text>
          <Text style={styles.menuItemValue}>v2.0 (NEXA Bank)</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Sign Out"
        variant="danger"
        size="md"
        onPress={handleSignOut}
        style={styles.signOutBtn}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginBottom: 20,
    paddingTop: 8,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.bankNavy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.bankNavy,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  roleBadge: {
    backgroundColor: Colors.bankBlueLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  roleBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 0.5,
  },
  cifText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  menuSection: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  sectionHeaderText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuItemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  menuItemArrow: {
    fontSize: 18,
    color: Colors.textLight,
  },
  menuItemValue: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  signOutBtn: {
    marginTop: 'auto',
  },
});
