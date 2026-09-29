import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Branch, ServiceType } from '../types';
import { Colors } from '../constants/colors';
import { Button } from './Button';

interface BranchCardProps {
  branch: Branch;
  onSelectService?: (branch: Branch, serviceType: ServiceType) => void;
  onSelectBranch?: (branch: Branch) => void;
}

export const BranchCard: React.FC<BranchCardProps> = ({
  branch,
  onSelectService,
  onSelectBranch,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleInfo}>
          <Text style={styles.bankTag}>NEXA BRANCH</Text>
          <Text style={styles.branchName}>{branch.name}</Text>
          <Text style={styles.address}>{branch.address}</Text>
          <Text style={styles.hours}>🕒 {branch.operatingHours}</Text>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        {branch.services.map((svc) => (
          <View key={svc.type} style={styles.serviceRow}>
            <View style={styles.serviceMeta}>
              <Text style={styles.serviceTitle}>{svc.name}</Text>
              <Text style={styles.serviceStats}>
                {svc.waitingCount} waiting • ~{svc.waitingCount * svc.avgWaitMinutes} min est.
              </Text>
            </View>

            {onSelectService && (
              <Button
                title="Take Ticket"
                variant="outline"
                size="sm"
                onPress={() => onSelectService(branch, svc.type)}
              />
            )}
          </View>
        ))}
      </View>

      {onSelectBranch && (
        <Button
          title="Select This Branch →"
          variant="primary"
          size="sm"
          onPress={() => onSelectBranch(branch)}
          style={styles.selectBranchBtn}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  header: {
    marginBottom: 14,
  },
  titleInfo: {
    gap: 3,
  },
  bankTag: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1,
  },
  branchName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  address: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  hours: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  servicesContainer: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  serviceMeta: {
    flex: 1,
    marginRight: 10,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  serviceStats: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  selectBranchBtn: {
    marginTop: 12,
  },
});
