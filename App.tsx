/**
 * SampleApp - CI/CD Test Application
 * Supports 3 environments: dev, uat, production
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

type Screen = 'home' | 'settings';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'home' ? (
        <HomeScreen onNavigateToSettings={() => setCurrentScreen('settings')} />
      ) : (
        <SettingsScreen onGoBack={() => setCurrentScreen('home')} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});

export default App;
