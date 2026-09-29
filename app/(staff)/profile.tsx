import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
      <Text style={styles.screenHeading}>Operator Profile</Text>

      <View style={styles.infoCard}>
        <View style={styles.nameSection}>
          <Text style={styles.userName}>{MOCK_STAFF_PROFILE.fullName}</Text>
          <Text style={styles.userRole}>Branch Operator</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.itemRow}>
          <Text style={styles.itemLabel}>Employee ID</Text>
          <Text style={styles.itemValue}>NXL-EMP-4091</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemLabel}>Branch</Text>
          <Text style={styles.itemValue}>Depok Branch</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemLabel}>Assigned Counter</Text>
          <Text style={styles.itemValue}>Counter 03</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemLabel}>Email</Text>
          <Text style={styles.itemValue}>{MOCK_STAFF_PROFILE.email}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="Switch to Customer View"
          variant="outline"
          size="md"
          onPress={() => router.replace('/(customer)/home')}
          style={styles.switchBtn}
        />

        <Button
          title="Sign Out"
          variant="danger"
          size="md"
          onPress={handleSignOut}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  screenHeading: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 32,
  },
  nameSection: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  userRole: {
    fontSize: 14,
    color: Colors.bankBlue,
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  itemLabel: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  actions: {
    marginTop: 'auto',
    gap: 12,
  },
  switchBtn: {
    marginBottom: 4,
  },
});
