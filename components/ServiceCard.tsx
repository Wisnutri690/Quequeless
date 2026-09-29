import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BranchServiceInfo } from '../types';
import { Colors } from '../constants/colors';
import { Button } from './Button';

interface ServiceCardProps {
  service: BranchServiceInfo;
  onJoinQueue: (service: BranchServiceInfo) => void;
  isLoading?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onJoinQueue,
  isLoading = false,
}) => {
  const isCS = service.type === 'CUSTOMER_SERVICE';
  const prefix = isCS ? 'CS' : 'T';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>{isCS ? '👤' : '💵'}</Text>
        </View>
        <View style={styles.titleInfo}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.prefixTag}>Prefix: {prefix}-###</Text>
        </View>
      </View>

      <Text style={styles.description}>{service.description}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>NOW SERVING</Text>
          <Text style={styles.statValue}>{service.currentServingNumber}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>WAITING</Text>
          <Text style={styles.statValue}>{service.waitingCount} people</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>EST. WAIT</Text>
          <Text style={styles.statValue}>
            ~{service.waitingCount * service.avgWaitMinutes} min
          </Text>
        </View>
      </View>

      <Button
        title={`Join ${service.name} Queue`}
        variant={isCS ? 'primary' : 'secondary'}
        size="md"
        onPress={() => onJoinQueue(service)}
        loading={isLoading}
        style={styles.joinBtn}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 22,
  },
  titleInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  prefixTag: {
    fontSize: 12,
    color: Colors.bankBlue,
    fontWeight: '600',
    marginTop: 1,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 12,
    paddingVertical: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  statDivider: {
    width: 1,
    height: 22,
    backgroundColor: Colors.border,
  },
  joinBtn: {
    marginTop: 2,
  },
});
