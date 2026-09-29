import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';

export default function CustomerProfileScreen() {
  const handleExitSession = () => {
    router.replace('/');
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <Text style={styles.screenHeading}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.brandTitle}>QueueLess</Text>
        <Text style={styles.sessionNotice}>
          Your queue activity is stored for this session.
        </Text>
      </View>

      <View style={styles.actionArea}>
        <Button
          title="Exit Session"
          variant="outline"
          size="md"
          onPress={handleExitSession}
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
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginBottom: 'auto',
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.bankNavy,
    marginBottom: 10,
  },
  sessionNotice: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  actionArea: {
    marginTop: 'auto',
  },
});
