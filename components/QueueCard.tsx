import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QueueItem } from '../types';
import { Colors } from '../constants/colors';
import { StatusBadge } from './StatusBadge';
import { Button } from './Button';

interface QueueCardProps {
  queue: QueueItem;
  onCancel?: () => void;
  onView?: () => void;
  isCompact?: boolean;
}

export const QueueCard: React.FC<QueueCardProps> = ({
  queue,
  onCancel,
  onView,
  isCompact = false,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.placeName}>{queue.placeName}</Text>
          <Text style={styles.joinedAt}>Joined at {queue.joinedAt}</Text>
        </View>
        <StatusBadge status={queue.status} />
      </View>

      <View style={styles.mainNumberSection}>
        <Text style={styles.numberLabel}>YOUR NUMBER</Text>
        <Text style={styles.queueNumber}>#{queue.queueNumber}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>NOW SERVING</Text>
          <Text style={styles.statValue}>#{queue.nowServingNumber}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>AHEAD OF YOU</Text>
          <Text style={styles.statValue}>{queue.peopleAhead} people</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>ESTIMATED WAIT</Text>
          <Text style={styles.statValue}>~{queue.estimatedWaitMinutes} min</Text>
        </View>
      </View>

      {!isCompact && (
        <View style={styles.liveNoticeBox}>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Text style={styles.liveDescription}>
            {queue.status === 'CALLED'
              ? "You're next! Please proceed immediately to the barber."
              : "We'll notify you when your turn is close. Feel free to leave the line."}
          </Text>
        </View>
      )}

      {onCancel && queue.status === 'WAITING' && (
        <Button
          title="Leave Queue"
          variant="outline"
          size="sm"
          onPress={onCancel}
          style={styles.cancelBtn}
        />
      )}

      {onView && (
        <Button
          title="View Queue Status"
          variant="primary"
          size="sm"
          onPress={onView}
          style={styles.viewBtn}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  joinedAt: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  mainNumberSection: {
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 12,
    marginBottom: 16,
  },
  numberLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  queueNumber: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.borderLight,
  },
  liveNoticeBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryAccent,
    marginRight: 6,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryAccent,
    letterSpacing: 0.5,
  },
  liveDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  cancelBtn: {
    marginTop: 4,
  },
  viewBtn: {
    marginTop: 4,
  },
});
