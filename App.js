import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Pressable,
  Image,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useState } from 'react';
import * as Updates from 'expo-updates';

export default function App() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [notifications, setNotifications] = useState([]);

  
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log(' Notification permission granted:', authStatus);
    }
  }

  
  async function checkAndUpdateApp() {
    try {
      setIsUpdating(true);
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      } else {
        Alert.alert(' Up to date', 'You are using the latest version.');
      }
    } catch (error) {
      Alert.alert(' Update Error', 'Could not fetch updates.');
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    requestUserPermission();

    messaging()
      .getToken()
      .then(token => console.log(' FCM Token:', token))
      .catch(error => console.error(' Token error:', error));

   
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const { title, body } = remoteMessage.notification;
          const newNotification = {
            id: Date.now().toString(),
            title: title || 'New Notification',
            date: new Date().toDateString(),
            message: body || '',
            read: false,
          };
          setNotifications(prev => [newNotification, ...prev]);
        }
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        const { title, body } = remoteMessage.notification;
        const newNotification = {
          id: Date.now().toString(),
          title: title || 'New Notification',
          date: new Date().toDateString(),
          message: body || '',
          read: false,
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    });

    // Foreground listener
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { title, body } = remoteMessage.notification;
      Alert.alert(title, body);
      const newNotification = {
        id: Date.now().toString(),
        title: title || 'New Notification',
        date: new Date().toDateString(),
        message: body || '',
        read: false,
      };
      setNotifications(prev => [newNotification, ...prev]);
    });

    return unsubscribe;
  }, []);

  const toggleReadStatus = id => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    );
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        item.read ? styles.readNotification : styles.unreadNotification,
      ]}
      onPress={() => toggleReadStatus(item.id)}
    >
      <View style={styles.notificationRow}>
        <Image
          source={{
            uri: 'https://cdn.shopify.com/app-store/listing_images/feff9c3170634c7eaa2dd838e20c9b5c/icon/CI_5_qS9wvsCEAE=.png',
          }}
          style={styles.notificationImage}
        />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85',
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>📥 Notifications</Text>

        {isUpdating ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Pressable style={styles.updateButton} onPress={checkAndUpdateApp}>
            <Text style={styles.updateButtonText}>🔄 Check for Update</Text>
          </Pressable>
        )}

        {notifications.length === 0 ? (
          <Text style={styles.emptyText}>No notifications yet</Text>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={item => item.id}
            renderItem={renderNotification}
            style={{ marginTop: 20 }}
          />
        )}
        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  header: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 50,
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationImage: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 12,
  },
  notificationContent: {
    flex: 1,
  },
  readNotification: {
    opacity: 0.6,
  },
  unreadNotification: {
    borderWidth: 1.5,
    borderColor: '#1E90FF',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#222',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#444',
  },
  notificationDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
    textAlign: 'right',
  },
});
