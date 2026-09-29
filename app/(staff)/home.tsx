import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Screen } from "../../components/Screen";
import { Button } from "../../components/Button";
import { Colors } from "../../constants/colors";

export default function StaffHomeScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Staff Control Room</Text>
          <Text style={styles.placeTitle}>Operator Dashboard</Text>
        </View>
        <TouchableOpacity
          style={styles.switchBadge}
          onPress={() => router.replace("/(customer)/home")}
        >
          <Text style={styles.switchBadgeText}>Customer View ⇄</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.overviewTitle}>Active Service Units</Text>

      {/* Barber Hub Staff Card */}
      <View style={styles.placeCard}>
        <View style={styles.placeHeader}>
          <View>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>✂️ BARBER</Text>
              </View>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>OPERATIONAL</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>Barber Hub</Text>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>TODAY'S TOTAL</Text>
            <Text style={styles.metricNum}>18</Text>
            <Text style={styles.metricSub}>customers</Text>
          </View>

          <View style={[styles.metricCard, styles.metricCardServing]}>
            <Text style={[styles.metricLabel, { color: Colors.primaryAccent }]}>
              NOW SERVING
            </Text>
            <Text style={[styles.metricNum, { color: Colors.primaryAccent }]}>
              #14
            </Text>
            <Text style={styles.metricSub}>in chair</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>NEXT IN LINE</Text>
            <Text style={styles.metricNum}>#15</Text>
            <Text style={styles.metricSub}>waiting</Text>
          </View>
        </View>

        <Button
          title="Manage Barber Queue →"
          variant="primary"
          size="md"
          onPress={() => router.push("/(staff)/queue")}
        />
      </View>

      {/* The Daily Bowl Staff Card */}
      <View style={styles.placeCard}>
        <View style={styles.placeHeader}>
          <View>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🍜 RESTAURANT</Text>
              </View>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>KITCHEN ACTIVE</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>The Daily Bowl</Text>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>ACTIVE ORDERS</Text>
            <Text style={styles.metricNum}>8</Text>
            <Text style={styles.metricSub}>in progress</Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: "#FEF3C7" }]}>
            <Text style={[styles.metricLabel, { color: "#92400E" }]}>
              PREPARING
            </Text>
            <Text style={[styles.metricNum, { color: "#92400E" }]}>4</Text>
            <Text style={[styles.metricSub, { color: "#92400E" }]}>
              cooking
            </Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: "#D1FAE5" }]}>
            <Text style={[styles.metricLabel, { color: "#065F46" }]}>
              READY
            </Text>
            <Text style={[styles.metricNum, { color: "#065F46" }]}>2</Text>
            <Text style={[styles.metricSub, { color: "#065F46" }]}>
              for pickup
            </Text>
          </View>
        </View>

        <Button
          title="Manage Kitchen Orders →"
          variant="outline"
          size="md"
          onPress={() => router.push("/(staff)/orders")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  placeTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
  },
  switchBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  switchBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primaryAccent,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 14,
  },
  placeCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 18,
  },
  placeHeader: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  badge: {
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#059669",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.text,
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  metricCardServing: {
    backgroundColor: Colors.primaryLight,
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metricNum: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
  },
  metricSub: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
