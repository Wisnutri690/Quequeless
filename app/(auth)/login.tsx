import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleMode, setRoleMode] = useState<'CUSTOMER' | 'STAFF'>('CUSTOMER');

  const handleSignIn = () => {
    if (roleMode === 'STAFF') {
      router.replace('/(staff)/home');
    } else {
      router.replace('/(customer)/home');
    }
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.backButtonText}>← Back to NEXA Bank</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.brandTitle}>NEXA BANK</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to access your digital branch queues and real-time counter updates.
        </Text>
      </View>

      <View style={styles.roleSelector}>
        <TouchableOpacity
          style={[
            styles.roleOption,
            roleMode === 'CUSTOMER' && styles.roleOptionActive,
          ]}
          onPress={() => setRoleMode('CUSTOMER')}
        >
          <Text
            style={[
              styles.roleText,
              roleMode === 'CUSTOMER' && styles.roleTextActive,
            ]}
          >
            Nasabah (Customer)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleOption,
            roleMode === 'STAFF' && styles.roleOptionActive,
          ]}
          onPress={() => setRoleMode('STAFF')}
        >
          <Text
            style={[
              styles.roleText,
              roleMode === 'STAFF' && styles.roleTextActive,
            ]}
          >
            Staff Cabang
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder={
              roleMode === 'STAFF'
                ? 'rina.kusuma@nexabank.co.id'
                : 'wisnu@example.com'
            }
            placeholderTextColor={Colors.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={Colors.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Button
          title={`Sign In as ${roleMode === 'STAFF' ? 'Staff Cabang' : 'Nasabah'}`}
          onPress={handleSignIn}
          size="lg"
          style={styles.submitBtn}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.linkText}>Register Nasabah</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  backButton: {
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  header: {
    marginBottom: 24,
  },
  brandTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.bankBlue,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.bankNavy,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  roleSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  roleOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  roleOptionActive: {
    backgroundColor: Colors.surface,
    shadowColor: '#0A192F',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  roleTextActive: {
    color: Colors.bankNavy,
    fontWeight: '700',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: Colors.text,
  },
  submitBtn: {
    marginTop: 8,
    backgroundColor: Colors.bankNavy,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.bankBlue,
  },
});
