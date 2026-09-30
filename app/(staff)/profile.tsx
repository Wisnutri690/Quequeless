import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';
import { MOCK_STAFF_PROFILE } from '../../constants/mockData';

export default function StaffProfileScreen() {
  const [dutyStatus, setDutyStatus] = React.useState<'ACTIVE' | 'BREAK'>('ACTIVE');

  const handleSignOut = () => {
    router.replace('/');
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <Text style={styles.screenHeading}>Operator Profile</Text>

      <View style={styles.operatorCard}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarLargeText}>RK</Text>
        </View>
        <View style={styles.operatorMeta}>
          <Text style={styles.userName}>{MOCK_STAFF_PROFILE.fullName}</Text>
          <Text style={styles.userRole}>Teller Operations Officer</Text>
          <View style={styles.dutyPill}>
            <View
              style={[
                styles.dutyDot,
                { backgroundColor: dutyStatus === 'ACTIVE' ? '#10B981' : '#F59E0B' },
              ]}
            />
            <Text style={styles.dutyPillText}>
              {dutyStatus === 'ACTIVE' ? 'Active on Counter 03' : 'On Break'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statusToggleBox}>
        <Text style={styles.toggleBoxLabel}>COUNTER AVAILABILITY</Text>
        <View style={styles.toggleRow}>
          <Text
            style={[
              styles.toggleBtn,
              dutyStatus === 'ACTIVE' && styles.toggleBtnActive,
            ]}
            onPress={() => setDutyStatus('ACTIVE')}
          >
            Active Serving
          </Text>
          <Text
            style={[
              styles.toggleBtn,
              dutyStatus === 'BREAK' && styles.toggleBtnBreak,
            ]}
            onPress={() => setDutyStatus('BREAK')}
          >
            Away / Break
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardSectionLabel}>ASSIGNMENT DETAILS</Text>

        <View style={styles.itemRow}>
          <Text style={styles.itemLabel}>Employee ID</Text>
          <Text style={styles.itemValue}>NXL-EMP-4091</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemLabel}>Branch Office</Text>
          <Text style={styles.itemValue}>Depok Branch</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemLabel}>Assigned Counter</Text>
          <Text style={styles.itemValue}>Counter 03</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemLabel}>Working Shift</Text>
          <Text style={styles.itemValue}>08:00 – 16:30 WIB</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemLabel}>Official Email</Text>
          <Text style={styles.itemValue}>{MOCK_STAFF_PROFILE.email}</Text>
        </View>
      </View>

      <View style={styles.footerNote}>
        <Text style={styles.versionText}>NEXA QueueLess Staff App • v1.0.0</Text>
      </View>

      <View style={styles.actions}>
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
    flexGrow: 1,
  },
  screenHeading: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginBottom: 20,
  },
  operatorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  avatarLarge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.bankBlueLight,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLargeText: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.bankBlue,
  },
  operatorMeta: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.bankNavy,
  },
  userRole: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginTop: 1,
    marginBottom: 4,
  },
  dutyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dutyDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  dutyPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  statusToggleBox: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  toggleBoxLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleBtn: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.surfaceSubtle,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  toggleBtnActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    color: '#166534',
  },
  toggleBtnBreak: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
    color: '#92400E',
  },
  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  cardSectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 10,
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
  footerNote: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  versionText: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  actions: {
    marginTop: 'auto',
    gap: 12,
  },
});
