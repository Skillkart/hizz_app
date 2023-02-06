import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  Pressable,
  Linking,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

const Home = ({navigation}) => {
  const getpermission = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Allow',
      buttonNegative: 'Deny',
      buttonNeutral: 'Remind me later',
    }).then(() => {
      Contacts.getAll()
        .then(contacts => {
          console.log(contacts[0].phoneNumbers);
          // work with contacts
        })
        .catch(e => {
          //handle error })
        });
    });
  };
  useEffect(() => {
    // getpermission();
  }, []);
  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          height: Dimensions.get('window').height,
          paddingVertical: 10,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: '40%',
          }}>
          <Image
            style={{
              width: '70%',
              height: 100,
              resizeMode: 'contain',
            }}
            source={{
              uri: `https://hizz.live/backend/image/logo.png`,
            }}
          />
        </View>
        <View
          style={{
            width: '90%',
            display: 'flex',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={{
              width: '100%',
              height: 60,
              borderWidth: 2,
              borderColor: 'black',
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 40,
              marginVertical: 5,
              marginHorizontal: 5,
            }}>
            <Text
              style={{
                fontSize: 19,
                // fontWeight: '800',
                color: 'white',
                fontFamily: 'OpenSans-ExtraBold',
              }}>
              LogIn
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Signup');
            }}
            style={{
              width: '100%',
              height: 60,
              borderWidth: 2,
              borderColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 40,
              marginVertical: 5,
              marginHorizontal: 5,
            }}>
            <Text
              style={{
                fontSize: 19,
                // fontWeight: '800',
                color: 'black',
                fontFamily: 'OpenSans-ExtraBold',
              }}>
              SignIn
            </Text>
          </Pressable>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text
              style={{
                color: 'rgba(0,0,0,0.7)',
                opacity: 0.8,
                textAlign: 'center',
                fontFamily: 'OpenSans-Regular',
                marginTop: 10,
              }}>
              By continuing , you agree to our Terms of use and have read and
              agreed to our{' '}
              <Text
                onPress={() => {
                  Linking.openURL('https://www.hizz.live/Privacypolicy');
                }}
                style={{
                  color: 'black',
                  textDecorationColor: 'black',
                  textDecorationLine: 'underline',
                }}>
                privacy policy
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;
