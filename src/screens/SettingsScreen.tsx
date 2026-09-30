import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import env from '../config/env';

interface SettingsScreenProps {
  onGoBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({onGoBack}) => {
  const allEnvVars = [
    {key: 'ENV_NAME', value: env.ENV_NAME},
    {key: 'API_BASE_URL', value: env.API_BASE_URL},
    {key: 'APP_DISPLAY_NAME', value: env.APP_DISPLAY_NAME},
    {key: 'BUNDLE_ID_SUFFIX', value: env.BUNDLE_ID_SUFFIX || '(empty)'},
    {key: 'FIREBASE_APP_ID_ANDROID', value: env.FIREBASE_APP_ID_ANDROID},
    {key: 'FIREBASE_APP_ID_IOS', value: env.FIREBASE_APP_ID_IOS},
  ];

  const deviceInfo = [
    {key: 'Platform', value: Platform.OS},
    {key: 'OS Version', value: String(Platform.Version)},
    {key: 'Is TV', value: String(Platform.isTV)},
    {key: 'Is Testing', value: String(Platform.isTesting)},
  ];

  const buildInfo = [
    {key: 'App Version', value: '1.0.0'},
    {key: 'Build Number', value: '1'},
    {key: 'React Native', value: '0.87.1'},
    {key: 'Hermes Enabled', value: typeof HermesInternal !== 'undefined' ? 'Yes' : 'No'},
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Environment Variables Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔧 Environment Variables</Text>
          {allEnvVars.map((item, index) => (
            <View key={item.key}>
              <View style={styles.settingRow}>
                <Text style={styles.settingKey}>{item.key}</Text>
                <Text style={styles.settingValue} numberOfLines={2}>
                  {item.value}
                </Text>
              </View>
              {index < allEnvVars.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Device Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Device Information</Text>
          {deviceInfo.map((item, index) => (
            <View key={item.key}>
              <View style={styles.settingRow}>
                <Text style={styles.settingKey}>{item.key}</Text>
                <Text style={styles.settingValue}>{item.value}</Text>
              </View>
              {index < deviceInfo.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Build Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏗️ Build Information</Text>
          {buildInfo.map((item, index) => (
            <View key={item.key}>
              <View style={styles.settingRow}>
                <Text style={styles.settingKey}>{item.key}</Text>
                <Text style={styles.settingValue}>{item.value}</Text>
              </View>
              {index < buildInfo.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ About</Text>
          <Text style={styles.aboutText}>
            This is a sample app built to test CI/CD pipelines with CircleCI,
            Firebase App Distribution, and Bitbucket integration.
          </Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() =>
              Linking.openURL('https://firebase.google.com/docs/app-distribution')
            }>
            <Text style={styles.linkText}>
              📚 Firebase App Distribution Docs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() =>
              Linking.openURL('https://circleci.com/docs/')
            }>
            <Text style={styles.linkText}>📚 CircleCI Documentation</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            SampleApp v1.0.0 • {env.ENV_NAME.toUpperCase()}
          </Text>
        </View>
      </ScrollView>
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
  backButton: {
    width: 80,
  },
  backButtonText: {
    fontSize: 16,
    color: '#64ffda',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e0e0e0',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  settingKey: {
    fontSize: 13,
    color: '#8892b0',
    fontWeight: '500',
    flex: 1,
  },
  settingValue: {
    fontSize: 13,
    color: '#ccd6f6',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#233554',
  },
  aboutText: {
    fontSize: 14,
    color: '#8892b0',
    lineHeight: 22,
    marginBottom: 16,
  },
  linkButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#233554',
    borderRadius: 10,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#64ffda',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#495670',
    fontWeight: '500',
  },
});

export default SettingsScreen;
