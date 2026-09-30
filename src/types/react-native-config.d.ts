declare module 'react-native-config' {
  export interface NativeConfig {
    ENV_NAME?: string;
    API_BASE_URL?: string;
    APP_DISPLAY_NAME?: string;
    BUNDLE_ID_SUFFIX?: string;
    FIREBASE_APP_ID_ANDROID?: string;
    FIREBASE_APP_ID_IOS?: string;
    [key: string]: string | undefined;
  }

  export const Config: NativeConfig;
  export default Config;
}
