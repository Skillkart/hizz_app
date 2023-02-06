import {View, Text, Pressable, Linking, BackHandler} from 'react-native';
import React from 'react';
import {Styles} from './Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={Styles.Setting}>
      <View style={Styles.settingHeader}>
        <Pressable
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          <View
            style={{
              width: 45,
              height: 45,
              backgroundColor: 'white',
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // borderWidth: 1,
              // borderColor: 'rgba(0,0,0,0.2)',
            }}>
            <AntDesign name="arrowleft" color="black" size={25} />
          </View>
        </Pressable>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: 40,
        }}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 38,
            fontWeight: '700',
            paddingHorizontal: 25,
          }}>
          Settings
        </Text>
      </View>
      <View style={Styles.settingcontainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('Account');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingVertical: 20,
            flexDirection: 'row',
            marginHorizontal: 10,
            borderTopColor: 'rgba(0,0,0,0.12)',
            borderTopWidth: 1,
          }}>
          <View
            style={{
              width: 45,
              height: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              marginRight: 15,

              // backgroundColor: 'rgba(0,0,0,0.2)',
            }}>
            <AntDesign name="user" size={25} color="black" />
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Account
          </Text>
        </Pressable>
        {/* <View
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingVertical: 20,
            flexDirection: 'row',
            marginHorizontal: 10,
            borderTopColor: 'rgba(0,0,0,0.12)',
            borderTopWidth: 1,
          }}>
          <View
            style={{
              width: 45,
              height: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              marginRight: 15,

              // backgroundColor: 'rgba(0,0,0,0.2)',
            }}>
            <Ionicons name="lock-closed-outline" size={25} color="black" />
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Change Password
          </Text>
        </View> */}
        <Pressable
          onPress={() => {
            Linking.openURL('https://www.hizz.live/Privacypolicy');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingVertical: 20,
            flexDirection: 'row',
            marginHorizontal: 10,
            borderTopColor: 'rgba(0,0,0,0.12)',
            borderTopWidth: 1,
          }}>
          <View
            style={{
              width: 45,
              height: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              marginRight: 15,

              // backgroundColor: 'rgba(0,0,0,0.2)',
            }}>
            <MaterialIcons name="privacy-tip" size={25} color="black" />
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Privacy & Policy
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            Linking.openURL('https://www.hizz.live/');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingVertical: 20,
            flexDirection: 'row',
            marginHorizontal: 10,
            borderTopColor: 'rgba(0,0,0,0.12)',
            borderTopWidth: 1,
          }}>
          <View
            style={{
              width: 45,
              height: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              marginRight: 15,

              // backgroundColor: 'rgba(0,0,0,0.2)',
            }}>
            <Entypo name="help" size={25} color="black" />
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Faq
          </Text>
        </Pressable>
        <Pressable
          onPress={async () => {
            await AsyncStorage.removeItem('jwt');
            dispatch({
              type: 'user',
              payload: false,
            });
            BackHandler.exitApp();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingVertical: 20,
            flexDirection: 'row',
            marginHorizontal: 10,
            borderTopColor: 'rgba(0,0,0,0.12)',
            borderTopWidth: 1,
          }}>
          <View
            style={{
              width: 45,
              height: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              marginRight: 15,

              // backgroundColor: 'rgba(0,0,0,0.2)',
            }}>
            <AntDesign name="poweroff" size={25} color="black" />
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Log Out
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 20,
          }}>
          Made with ❤️ in India
        </Text>
      </View>
    </View>
  );
};

export default Setting;
