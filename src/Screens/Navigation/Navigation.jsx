import {View, Text, Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const Navigation = ({setNav, nav, newmessage, setNewmessage, navigation}) => {
  const user = useSelector(state => state.userdata);
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 0,
        zIndex: 1,
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 0,
          paddingVertical: 10,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          bottom: 0,
          justifyContent: 'space-evenly',
          elevation: 10,
          shadowColor: 'rgba(0,0,0,0.3)',
        }}>
        <Pressable
          onPress={e => {
            setNav(1);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '20%',
            height: '100%',
            paddingVertical: 5,
            // backgroundColor: 'rgba(3, 169, 244,0.15)',
            borderRadius: 10,
          }}>
          <Entypo
            name="home"
            color={'rgb(0,0,0)'}
            style={{
              fontSize: 27,
            }}
          />
          <Text
            style={{
              color: 'rgba(0,0,0,0.5)',
              marginTop: 5,
              fontFamily: 'OpenSans-Bold',
              fontSize: 12,
            }}>
            Home
          </Text>
        </Pressable>
        <Pressable
          onPress={e => {
            setNewmessage(false);
            setNav(2);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '20%',
          }}>
          <View>
            {newmessage && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: 'red',
                  position: 'absolute',
                  right: 0,
                  borderRadius: 50,
                }}></View>
            )}

            <Feather
              name="inbox"
              color={'rgb(0,0,0)'}
              style={{
                fontSize: 30,
              }}
            />
          </View>
          <Text
            style={{
              color: 'rgba(0,0,0,0.5)',
              fontFamily: 'OpenSans-Bold',
              fontSize: 12,
              marginTop: 5,
            }}>
            Inbox
          </Text>
        </Pressable>
        {/* <Pressable
          onPress={() => {
            if (user?.phone) {
              setNav(3);
              return;
            } else {
              navigation.navigate('Phoneupdate');
              return;
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '20%',
          }}>
          <FontAwesome
            name="user-friends"
            color={'rgb(0,0,0)'}
            style={{
              fontSize: 27,
            }}
          />
          <Text
            style={{
              color: 'rgba(0,0,0,0.5)',
              // fontWeight: '400',
              marginTop: 5,
              fontFamily: 'OpenSans-Bold',
              fontSize: 12,
            }}>
            Friends
          </Text>
        </Pressable> */}
        <Pressable
          onPress={e => {
            navigation.navigate('setting');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '20%',
          }}>
          <Feather
            name="settings"
            color={'black'}
            style={{
              fontSize: 27,
            }}
          />
          <Text
            style={{
              color: 'rgba(0,0,0,0.5)',
              marginTop: 5,

              fontFamily: 'OpenSans-Bold',
              fontSize: 12,
            }}>
            Setting
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Navigation;
