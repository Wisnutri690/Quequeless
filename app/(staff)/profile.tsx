import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';

export default function StaffProfileScreen() {
  const handleSignOut = () => {
    router.replace('/');
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Staff Profile</Text>

      {/* Staff User Header Card */}
      <View style={styles.userCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>OP</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Staff Operator</Text>
          <Text style={styles.userEmail}>staff@queueless.app</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>STAFF / OPERATOR</Text>
          </View>
        </View>
      </View>

      {/* Assigned Place Info */}
      <View style={styles.placeInfoCard}>
        <Text style={styles.placeInfoLabel}>ASSIGNED WORKPLACE</Text>
        <Text style={styles.placeInfoName}>Barber Hub & The Daily Bowl</Text>
        <Text style={styles.placeInfoDesc}>
          Operator with permission to manage queue turns and process kitchen food orders.
        </Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemLabel}>Operator Settings</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemLabel}>Counter Sound & Alerts</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.replace('/(customer)/home')}
        >
          <Text style={[styles.menuItemLabel, { color: Colors.primaryAccent }]}>
            Switch to Customer View
          </Text>
          <Text style={[styles.menuItemArrow, { color: Colors.primaryAccent }]}>
            ⇄
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemLabel}>About QueueLess</Text>
          <Text style={styles.menuItemValue}>v1.0.0 (MVP)</Text>
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
    fontWeight: '800',
    color: Colors.text,
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
    marginBottom: 16,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.primary,
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
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
    marginBottom: 6,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  placeInfoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  placeInfoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  placeInfoName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  placeInfoDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  menuSection: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
    overflow: 'hidden',
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
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
  },
  menuItemArrow: {
    fontSize: 20,
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
