import Config from 'react-native-config';

export interface EnvConfig {
  ENV_NAME: string;
  API_BASE_URL: string;
  APP_DISPLAY_NAME: string;
  BUNDLE_ID_SUFFIX: string;
  FIREBASE_APP_ID_ANDROID: string;
  FIREBASE_APP_ID_IOS: string;
}

const env: EnvConfig = {
  ENV_NAME: Config.ENV_NAME || 'dev',
  API_BASE_URL: Config.API_BASE_URL || 'https://dev-api.sampleapp.com',
  APP_DISPLAY_NAME: Config.APP_DISPLAY_NAME || 'SampleApp Dev',
  BUNDLE_ID_SUFFIX: Config.BUNDLE_ID_SUFFIX || '.dev',
  FIREBASE_APP_ID_ANDROID: Config.FIREBASE_APP_ID_ANDROID || '',
  FIREBASE_APP_ID_IOS: Config.FIREBASE_APP_ID_IOS || '',
};

export default env;
