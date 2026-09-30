import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import env from '../config/env';

interface HomeScreenProps {
  onNavigateToSettings: () => void;
}

const getEnvColor = (envName: string) => {
  switch (envName.toLowerCase()) {
    case 'dev':
      return '#4CAF50';
    case 'uat':
      return '#FF9800';
    case 'production':
      return '#F44336';
    default:
      return '#2196F3';
  }
};

const HomeScreen: React.FC<HomeScreenProps> = ({onNavigateToSettings}) => {
  const envColor = getEnvColor(env.ENV_NAME);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{env.APP_DISPLAY_NAME}</Text>
        <View style={[styles.envBadge, {backgroundColor: envColor}]}>
          <Text style={styles.envBadgeText}>{env.ENV_NAME.toUpperCase()}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚀 Environment Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Environment</Text>
            <Text style={[styles.infoValue, {color: envColor}]}>
              {env.ENV_NAME}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>API URL</Text>
            <Text style={styles.infoValue} numberOfLines={1}>
              {env.API_BASE_URL}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Platform</Text>
            <Text style={styles.infoValue}>
              {Platform.OS} ({Platform.Version})
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Bundle Suffix</Text>
            <Text style={styles.infoValue}>
              {env.BUNDLE_ID_SUFFIX || 'None (Production)'}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📱 App Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Name</Text>
            <Text style={styles.infoValue}>{env.APP_DISPLAY_NAME}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Firebase App ID</Text>
            <Text style={styles.infoValue} numberOfLines={1}>
              {Platform.OS === 'android'
                ? env.FIREBASE_APP_ID_ANDROID
                : env.FIREBASE_APP_ID_IOS}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.settingsButton, {backgroundColor: envColor}]}
          onPress={onNavigateToSettings}
          activeOpacity={0.8}>
          <Text style={styles.settingsButtonText}>⚙️ Go to Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    backgroundColor: '#16213e',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e0e0e0',
  },
  envBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  envBadgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e0e0e0',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8892b0',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#ccd6f6',
    fontWeight: '600',
    maxWidth: '55%',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#233554',
  },
  settingsButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default HomeScreen;
