import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const getpermissions = async () => {
  const authstate = await messaging().requestPermission();
  const enabled =
    authstate === messaging.AuthorizationStatus.AUTHORIZED ||
    authstate == messaging.AuthorizationStatus.PROVISIONAL;

  // console.log(enabled, 'enabled');
  if (enabled) {
    console.log('authorization status', authstate);
    await ftoken();
  } else {
    // console.log('not enabled');
  }
};

const ftoken = async () => {
  // await messaging().registerDeviceForRemoteMessages();
  // const token = await messaging().getToken();
  // console.log(token);
  const gtoken = await AsyncStorage.getItem('fbtoken');
  if (!gtoken) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      if (token) {
        // console.log('new token ', token);
        await AsyncStorage.setItem('fbtoken', token);
      }
    } catch (err) {
      console.log(err, 'error in gtoken');
    }
  }
  // else {
  // console.log('token', gtoken);
  // }
};

const getnotification = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remoteMessage => {
    console.log('notification on froground state', remoteMessage);
  });
};

export {getpermissions, getnotification};
