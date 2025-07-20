---

## 📲 React Native Notification App

* 🔔 Push Notification handling (foreground, background, and killed states)
* 🆕 Manual OTA update checks via `expo-updates`
* 📥 Local stateful storage of notifications with **read/unread** logic
* 🔴 Dynamic app icon badge support on Android
* 🎨 Beautiful UI with background imagery and real-time badge counters

---

## 🚀 Features

| Feature                        | Description                                                               |
| ------------------------------ | ------------------------------------------------------------------------- |
| 🔔 FCM Integration             | Receive real-time push notifications from Firebase                        |
| 🟢 Foreground/Background Ready | Supports foreground, background, and killed-state notification handling   |
| 🔄 OTA Update Button           | Checks for latest JS bundle via `expo-updates` and reloads                |
| 🧠 Local Notification State    | Save notifications in memory with read/unread status toggling             |
| 🔴 Android Badge Count         | Dynamically displays badge count on app icon and header                   |
| 🎨 Responsive UI               | Uses `ImageBackground` with polished layout, shadows, and animation-ready |

---

## ⚙️ Tech Stack

* **React Native**
* **Firebase Cloud Messaging** (`@react-native-firebase/messaging`)
* **Push Notification Channel** (`react-native-push-notification`)
* **Expo OTA Updates** (`expo-updates`)
* **Android Badge Handling**
* **State Management:** `useState`, `FlatList`

---

## 🏗️ Installation & Setup

```bash
git clone https://github.com/your-username/react-native-notification-app.git
cd react-native-notification-app
npm install
```

---

### 📡 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Register your Android app and download `google-services.json`

3. Place it in:

   ```
   android/app/google-services.json
   ```

4. Enable **Cloud Messaging** from Firebase settings

---



To test push notifications:

* Use Firebase Console ➝ Cloud Messaging ➝ Send test message
* Ensure app is either open, backgrounded, or killed to test all states

---

## 📦 OTA Updates

To publish OTA updates (using Expo EAS):

```bash
npx expo install expo-updates
eas update
```

> Ensure your app is built via `eas build` for OTA updates to take effect.

---

## 📸 UI Preview

> Coming soon: Animated screenshots + demo walkthrough

---

## 📘 App Structure

```bash
App.js                     # Root component with notification handling
android/                  # Native Android config (for FCM & badge support)
firebase.js               # FCM token handling (optional separation)
assets/                   # UI background images
```

---

## 🛡️ Permissions

App requests the following permissions:

* `POST_NOTIFICATIONS`
* `RECEIVE_NOTIFICATIONS`
* `INSTALL_SHORTCUT` (for badge handling)

---

## 🔗 Dependencies

```json
{
  "@react-native-firebase/app": "^X.X.X",
  "@react-native-firebase/messaging": "^X.X.X",
  "react-native-push-notification": "^X.X.X",
  "expo-updates": "~X.X.X"
}
```

> Ensure compatibility with your current `React Native` or `Expo SDK` version.

---

## 💡 Future Enhancements

* 📂 Persistent Storage (AsyncStorage / SQLite)
* 📬 Notification categories & filters
* 📱 iOS badge integration
* 🧪 Unit + E2E testing (Jest + Detox)
