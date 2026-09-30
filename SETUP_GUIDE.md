# SampleApp - CI/CD with CircleCI, Firebase & Bitbucket

A React Native app configured with **3 environments** (dev, uat, production), **CircleCI** for CI/CD, **Firebase App Distribution** for build distribution, and **Bitbucket** for source control.

---

## 📁 Project Structure

```
SampleApp/
├── .circleci/
│   └── config.yml                  # CircleCI pipeline configuration
├── .env.dev                        # Dev environment variables
├── .env.uat                        # UAT environment variables  
├── .env.production                 # Production environment variables
├── android/
│   ├── app/
│   │   ├── build.gradle            # Android build config with 3 product flavors
│   │   └── src/
│   │       ├── dev/                # Dev flavor resources
│   │       │   └── google-services.json
│   │       ├── uat/                # UAT flavor resources
│   │       │   └── google-services.json
│   │       └── production/         # Production flavor resources
│   │           └── google-services.json
│   ├── fastlane/
│   │   ├── Appfile
│   │   ├── Fastfile                # Android Fastlane lanes (3 envs)
│   │   └── Pluginfile
│   └── build.gradle                # Root build config with Firebase plugin
├── ios/
│   ├── fastlane/
│   │   ├── Appfile
│   │   ├── Fastfile                # iOS Fastlane lanes (3 envs)
│   │   └── Pluginfile
│   └── firebase/
│       ├── dev/                    # Dev Firebase iOS config
│       ├── uat/                    # UAT Firebase iOS config
│       └── production/             # Prod Firebase iOS config
├── src/
│   ├── config/
│   │   └── env.ts                  # Type-safe environment config
│   └── screens/
│       ├── HomeScreen.tsx           # Home screen with env info
│       └── SettingsScreen.tsx       # Settings screen with all details
├── App.tsx                         # Main app entry
├── Gemfile                         # Ruby dependencies (Fastlane)
└── package.json                    # Node dependencies & env scripts
```

---

## 🌍 Environments

| Environment | Branch Pattern | App ID Suffix | Badge Color |
|-------------|---------------|---------------|-------------|
| **Dev** | `develop`, `feature/*` | `.dev` | 🟢 Green |
| **UAT** | `release/*`, `staging` | `.uat` | 🟠 Orange |
| **Production** | `main`, `master` | _(none)_ | 🔴 Red |

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run dev environment
npm run android:dev    # Android
npm run ios:dev        # iOS

# Run UAT environment
npm run android:uat    # Android
npm run ios:uat        # iOS

# Run production environment
npm run android:prod   # Android
npm run ios:prod       # iOS
```

---

## 🔧 Setup Steps

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create **3 Firebase projects** (or 1 project with 3 apps):
   - `sampleapp-dev`
   - `sampleapp-uat`
   - `sampleapp-prod`
3. For each project, register:
   - **Android app** with the correct package name (`com.sampleapp.dev`, `.uat`, `com.sampleapp`)
   - **iOS app** with the correct bundle ID
4. Download `google-services.json` and place in the corresponding `android/app/src/<env>/` directory
5. Download `GoogleService-Info.plist` and place in `ios/firebase/<env>/`
6. Get your **Firebase CLI token**: `firebase login:ci` and save it

### 2. Bitbucket Setup

1. Create a new repository on Bitbucket
2. Push this project:
   ```bash
   cd SampleApp
   git remote add origin git@bitbucket.org:<your-team>/SampleApp.git
   git push -u origin main
   ```
3. Set up branch permissions:
   - `main` → Production builds
   - `staging` or `release/*` → UAT builds
   - `develop` or `feature/*` → Dev builds

### 3. CircleCI Setup

1. Go to [CircleCI](https://app.circleci.com)
2. **Connect Bitbucket**: Settings → VCS → Connect Bitbucket
3. **Set up project**: Click "Set Up Project" for SampleApp
4. **Add environment variables** in CircleCI Project Settings → Environment Variables:

   | Variable | Description |
   |----------|-------------|
   | `FIREBASE_TOKEN` | Firebase CLI token from `firebase login:ci` |
   | `FIREBASE_APP_ID_ANDROID` | Firebase App ID for Android |
   | `FIREBASE_APP_ID_IOS` | Firebase App ID for iOS |
   | `ANDROID_KEYSTORE_BASE64` | Base64-encoded release keystore |
   | `ANDROID_KEYSTORE_PASSWORD` | Keystore password |
   | `ANDROID_KEY_ALIAS` | Key alias |
   | `ANDROID_KEY_PASSWORD` | Key password |
   | `MATCH_GIT_URL` | Git URL for iOS cert repo (Fastlane match) |
   | `MATCH_PASSWORD` | Match encryption password |
   | `APPLE_ID` | Apple Developer account email |
   | `TEAM_ID` | Apple Developer Team ID |

5. **Create CircleCI Contexts** for environment isolation:
   - `firebase-dev` — Dev Firebase credentials
   - `firebase-uat` — UAT Firebase credentials
   - `firebase-production` — Production Firebase credentials

### 4. Android Code Signing

```bash
# Generate a release keystore
keytool -genkeypair -v -storetype PKCS12 \
  -keystore release.keystore \
  -alias sampleapp \
  -keyalg RSA -keysize 2048 \
  -validity 10000

# Base64 encode it for CircleCI
base64 release.keystore > release.keystore.base64
# Copy contents to ANDROID_KEYSTORE_BASE64 env var in CircleCI
```

### 5. iOS Code Signing (Fastlane Match)

```bash
# Initialize match (one-time setup)
cd ios
bundle exec fastlane match init

# Generate certificates
bundle exec fastlane match adhoc --app_identifier "com.sampleapp.dev"
bundle exec fastlane match adhoc --app_identifier "com.sampleapp.uat"
bundle exec fastlane match adhoc --app_identifier "com.sampleapp"
```

---

## ⚙️ CI/CD Pipeline Flow

```
┌─────────────┐    ┌──────────────┐    ┌────────────────────┐    ┌──────────────────────┐
│  Push to     │───▶│  CircleCI    │───▶│  Build Android +   │───▶│  Firebase App         │
│  Bitbucket   │    │  Triggers    │    │  iOS via Fastlane  │    │  Distribution         │
└─────────────┘    └──────────────┘    └────────────────────┘    └──────────────────────┘
                         │
                         ▼
                   ┌──────────────┐
                   │  Lint + Test │
                   │  (Jest)      │
                   └──────────────┘
```

### Workflow Triggers

| Push to Branch | Workflow | Environment | Testers Group |
|---------------|----------|-------------|---------------|
| `develop` / `feature/*` | `dev-build` | Dev | `dev-testers` |
| `staging` / `release/*` | `uat-build` | UAT | `uat-testers` |
| `main` / `master` | `production-build` | Production | `production-testers` |

---

## 📝 CircleCI Environment Variables Quick Reference

You can also trigger builds with a specific environment via the CircleCI API:

```bash
# Trigger a UAT build manually
curl -X POST https://circleci.com/api/v2/project/bitbucket/<org>/<repo>/pipeline \
  -H "Circle-Token: $CIRCLE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"parameters": {"environment": "uat"}}'
```

---

## 🧪 Testing Locally

```bash
# Run tests
npm test

# Run linter
npm run lint
```

---

## 📦 Manual Build (without CI)

```bash
# Android APK (dev)
cd android
ENVFILE=../.env.dev ./gradlew assembleDevRelease

# Android APK (uat)
ENVFILE=../.env.uat ./gradlew assembleUatRelease

# Android APK (production)
ENVFILE=../.env.production ./gradlew assembleProductionRelease
```

---

## ⚠️ Important Notes

1. **Replace all placeholder values** in:
   - `.env.*` files (Firebase App IDs)
   - `google-services.json` files (download from Firebase)
   - `GoogleService-Info.plist` files (download from Firebase)
   - `ios/fastlane/Appfile` (Apple credentials)
   - `android/fastlane/Appfile` (Google Play key path)

2. **Never commit** `.env`, `release.keystore`, or real Firebase tokens to source control

3. **CircleCI Contexts** provide environment isolation — each context holds credentials for one environment only

4. **Fastlane Match** stores iOS signing certs in a separate private Git repo — create one on Bitbucket and set `MATCH_GIT_URL`
