import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';
import {
  MOCK_PLACES,
  MOCK_CUSTOMER_ACTIVE_QUEUE,
  MOCK_CUSTOMER_ACTIVE_ORDER,
} from '../../constants/mockData';

export default function CustomerHomeScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.userName}>Wisnu Tri</Text>
        </View>
        <TouchableOpacity
          style={styles.roleBadge}
          onPress={() => router.replace('/(staff)/home')}
        >
          <Text style={styles.roleBadgeText}>Switch to Staff ⇄</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>What are you waiting for?</Text>

      {/* Active Queue Card Preview */}
      <View style={styles.activeSection}>
        <View style={styles.activeHeader}>
          <Text style={styles.activeSectionTitle}>Your Active Queue</Text>
          <TouchableOpacity onPress={() => router.push('/(customer)/queue')}>
            <Text style={styles.seeAllText}>View details →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activeCard}>
          <View style={styles.activeCardRow}>
            <View>
              <Text style={styles.activePlaceName}>
                {MOCK_CUSTOMER_ACTIVE_QUEUE.placeName}
              </Text>
              <Text style={styles.activeSubtext}>
                {MOCK_CUSTOMER_ACTIVE_QUEUE.peopleAhead} people ahead • ~
                {MOCK_CUSTOMER_ACTIVE_QUEUE.estimatedWaitMinutes} min wait
              </Text>
            </View>
            <View style={styles.queueNumberBadge}>
              <Text style={styles.queueNumberLabel}>YOUR NO.</Text>
              <Text style={styles.queueNumberValue}>
                #{MOCK_CUSTOMER_ACTIVE_QUEUE.queueNumber}
              </Text>
            </View>
          </View>
          <Button
            title="Open Live Queue"
            size="sm"
            variant="primary"
            onPress={() => router.push('/(customer)/queue')}
            style={styles.openCardBtn}
          />
        </View>
      </View>

      {/* Active Order Card Preview */}
      <View style={styles.activeSection}>
        <View style={styles.activeHeader}>
          <Text style={styles.activeSectionTitle}>Your Active Order</Text>
          <TouchableOpacity onPress={() => router.push('/(customer)/order')}>
            <Text style={styles.seeAllText}>View details →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activeCard}>
          <View style={styles.activeCardRow}>
            <View>
              <Text style={styles.activePlaceName}>
                {MOCK_CUSTOMER_ACTIVE_ORDER.placeName}
              </Text>
              <Text style={styles.activeSubtext}>
                Order #{MOCK_CUSTOMER_ACTIVE_ORDER.orderNumber} • ~
                {MOCK_CUSTOMER_ACTIVE_ORDER.estimatedMinutes} min ready
              </Text>
            </View>
            <View style={styles.orderStatusBadge}>
              <Text style={styles.orderStatusText}>
                {MOCK_CUSTOMER_ACTIVE_ORDER.status}
              </Text>
            </View>
          </View>
          <Button
            title="Track Order Status"
            size="sm"
            variant="outline"
            onPress={() => router.push('/(customer)/order')}
            style={styles.openCardBtn}
          />
        </View>
      </View>

      {/* Nearby Places Section */}
      <View style={styles.placesSection}>
        <Text style={styles.sectionTitle}>Nearby Places</Text>
        <Text style={styles.sectionSubtitle}>
          Join a queue or order food before you arrive.
        </Text>

        {MOCK_PLACES.map((place) => (
          <View key={place.id} style={styles.placeCard}>
            <View style={styles.placeTopRow}>
              <View style={styles.placeInfo}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>
                    {place.category === 'BARBER' ? '✂️ BARBER' : '🍜 RESTAURANT'}
                  </Text>
                </View>
                <Text style={styles.placeTitle}>{place.name}</Text>
                <Text style={styles.placeAddress}>{place.address}</Text>
              </View>
            </View>

            <View style={styles.placeMetricsRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>
                  {place.category === 'BARBER' ? 'WAITING' : 'PREPARING'}
                </Text>
                <Text style={styles.metricValue}>
                  {place.currentWaitingCount}{' '}
                  {place.category === 'BARBER' ? 'people' : 'orders'}
                </Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>EST. WAIT TIME</Text>
                <Text style={styles.metricValue}>
                  ~
                  {(place.currentWaitingCount || 1) *
                    (place.averageServiceMinutes || 5)}{' '}
                  min
                </Text>
              </View>
            </View>

            <Button
              title={
                place.category === 'BARBER'
                  ? 'Join Barber Queue'
                  : 'Order Food from Restaurant'
              }
              variant={place.category === 'BARBER' ? 'primary' : 'outline'}
              size="sm"
              onPress={() => {
                if (place.category === 'BARBER') {
                  router.push('/(customer)/queue');
                } else {
                  router.push('/(customer)/order');
                }
              }}
              style={styles.placeActionBtn}
            />
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryAccent,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
    marginBottom: 18,
  },
  activeSection: {
    marginBottom: 18,
  },
  activeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  seeAllText: {
    fontSize: 13,
    color: Colors.primaryAccent,
    fontWeight: '600',
  },
  activeCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activePlaceName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  activeSubtext: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  queueNumberBadge: {
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  queueNumberLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primaryAccent,
  },
  queueNumberValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primaryAccent,
  },
  orderStatusBadge: {
    backgroundColor: Colors.serving.bg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  orderStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.serving.text,
  },
  openCardBtn: {
    marginTop: 4,
  },
  placesSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
    marginBottom: 14,
  },
  placeCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  placeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  placeInfo: {
    flex: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  placeAddress: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  placeMetricsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  placeActionBtn: {
    marginTop: 2,
  },
});
