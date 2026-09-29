import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';
import { MOCK_STAFF_PROFILE } from '../../constants/mockData';

export default function StaffProfileScreen() {
  const handleSignOut = () => {
    router.replace('/');
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Staff Profile</Text>

      {/* Staff Operator Header */}
      <View style={styles.userCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>RK</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{MOCK_STAFF_PROFILE.fullName}</Text>
          <Text style={styles.userEmail}>{MOCK_STAFF_PROFILE.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>BRANCH OPERATOR</Text>
          </View>
        </View>
      </View>

      {/* Assigned Branch & Counter Card */}
      <View style={styles.assignmentCard}>
        <Text style={styles.assignmentLabel}>OFFICIAL ASSIGNMENT</Text>
        <Text style={styles.assignmentBranch}>
          {MOCK_STAFF_PROFILE.branchName}
        </Text>
        <View style={styles.counterRow}>
          <View style={styles.counterTag}>
            <Text style={styles.counterTagText}>
              Station: {MOCK_STAFF_PROFILE.assignedCounter}
            </Text>
          </View>
          <View style={styles.serviceTag}>
            <Text style={styles.serviceTagText}>Customer Service Desk</Text>
          </View>
        </View>
        <Text style={styles.employeeId}>
          Employee ID: {MOCK_STAFF_PROFILE.employeeId}
        </Text>
      </View>

      {/* Operational Settings */}
      <View style={styles.menuSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>COUNTER CONTROLS</Text>
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemLabel}>Station Number</Text>
          <Text style={styles.menuItemValue}>Counter 02 ›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemLabel}>Branch Chime & Announcer</Text>
          <Text style={styles.menuItemValue}>On (Vol 80%) ›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemLabel}>Auto-Advance Pace</Text>
          <Text style={styles.menuItemValue}>Manual Call ›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.replace('/(customer)/home')}
        >
          <Text style={[styles.menuItemLabel, { color: Colors.bankBlue }]}>
            Switch to Nasabah View
          </Text>
          <Text style={[styles.menuItemArrow, { color: Colors.bankBlue }]}>
            ⇄
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemLabel}>System Status</Text>
          <Text style={styles.menuItemValue}>NEXA Core Online 🟢</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Sign Out of Station"
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
    marginBottom: 16,
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
    marginBottom: 6,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.bankGoldLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  roleBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  assignmentCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  assignmentLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  assignmentBranch: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.bankNavy,
    marginBottom: 8,
  },
  counterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  counterTag: {
    backgroundColor: Colors.bankBlueLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  counterTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.bankBlue,
  },
  serviceTag: {
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  serviceTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  employeeId: {
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
