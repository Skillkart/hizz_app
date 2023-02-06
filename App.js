/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import messaging from '@react-native-firebase/messaging';
import {View, Text, Pressable, BackHandler, Linking, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Screens/Home/Home';
import Login from './src/Screens/Auth/Login';
import Dashboard from './src/Screens/Dashboard/Home/Index';
import Messages from './src/Screens/Dashboard/Message/Messages';
import Setting from './src/Screens/Setting/Setting';
import Loading from './src/Screens/Loading/Loading';
import {version} from './package.json';
import VersionCheck from 'react-native-version-check';
import {
  getnotification,
  getpermissions,
} from './src/Screens/notification/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, Alert, Dimensions} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/reducer/store';
import Signup from './src/Screens/Auth/Signup';
import Moviesuggestion from './src/Screens/Movie/Moviesuggestion';
import Moviedetail from './src/Screens/Movie/Moviedetail';
import Friends from './src/Screens/UserFriends/Friends';
import Numberdirectory from './src/Screens/UserFriends/PostNumber/Numberdirectory';
import Postnumber from './src/Screens/UserFriends/PostNumber/Postnumber';
import axios from 'axios';
import Forgetpassword from './src/Screens/Auth/Forgetpassword';
import Accounts from './src/Screens/Setting/Accounts';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [notloading, setNotloading] = useState(false);
  const initpath = useSelector(state => state.initialpath);
  const getuser = async () => {
    setNotloading(true);
    const token = await AsyncStorage.getItem('jwt');
    console.log(token, 'its token');
    if (token) {
      const request = await axios
        .get(`https://www.hizz.live/backend/Auth/isLoggin.php?token=${token}`)
        .then(async result => {
          console.log(result);
          let dash = 'Dashboard';
          dispatch({
            type: 'initialpath',
            payload: dash,
          });
          // dispatch({
          //   type: 'user',
          //   payload: true,
          // });
          console.log(result, 'its result');
          dispatch({
            type: 'userdata',
            payload: result.data.data[0],
          });
          // setUser(true);
          setNotloading(false);
          return;
        })
        .catch(err => {
          // console.log(err);
          dispatch({
            type: 'user',
            payload: false,
          });
          setNotloading(false);
          // setUser(false);
          // console.log(err);
        });
      return request;
    } else {
      setNotloading(false);

      // setUser(false);
    }
  };

  useEffect(() => {
    getpermissions();
    getnotification();
    getuser();
  }, []);

  if (notloading) {
    return (
      <View
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: Dimensions.get('window').height,
        }}>
        <Image
          source={{
            uri: `https://hizz.live/backend/image/logo.png`,
          }}
          style={{
            width: 200,
            height: 200,
            marginBottom: 50,
            resizeMode: 'contain',
            borderRadius: 10,
          }}
        />
        <ActivityIndicator color={'red'} size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initpath}
        screenOptions={{
          headerShown: false,
        }}>
        {/* {user ? (
          <> */}
        {/* <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="messages" component={Messages} />
        <Stack.Screen name="setting" component={Setting} />
        <Stack.Screen name="Movie" component={Moviesuggestion} />
        <Stack.Screen name="Moviedetail" component={Moviedetail} />
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="Phoneupdate" component={Postnumber} />
        <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
        <Stack.Screen name="Numberdirectory" component={Numberdirectory} />
        <Stack.Screen name="Account" component={Accounts} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} /> */}
        {/* </>
        ) : (
          <> */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="messages" component={Messages} />
        <Stack.Screen name="Forgetpassword" component={Forgetpassword} />

        <Stack.Screen name="setting" component={Setting} />
        <Stack.Screen name="Movie" component={Moviesuggestion} />
        <Stack.Screen name="Moviedetail" component={Moviedetail} />
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="Phoneupdate" component={Postnumber} />
        <Stack.Screen name="Numberdirectory" component={Numberdirectory} />
        {/* </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
