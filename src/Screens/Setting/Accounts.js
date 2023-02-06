import {View, Text, Dimensions, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Styles} from './Style';
import React from 'react';
import {useSelector} from 'react-redux';

const Accounts = ({navigation}) => {
  const user = useSelector(state => state.userdata);

  return (
    <View
      style={{
        width: '100%',
        height: Dimensions.get('window').height,
      }}>
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
          paddingHorizontal: 40,
          paddingVertical: 20,
        }}>
        <Text
          style={{
            fontSize: 23,
            fontFamily: 'OpenSans-SemiBold',
            color: 'black',
          }}>
          Account
        </Text>
        <View
          style={{
            paddingHorizontal: 0,
            paddingVertical: 30,
          }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'OpenSans-Bold',
                paddingVertical: 10,
                color: 'black',
              }}>
              Name
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'OpenSans-SemiBold',
                //   paddingVertical: 10,
                color: 'rgba(0,0,0,0.8)',
              }}>
              {user?.username}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'OpenSans-Bold',
                paddingVertical: 10,
                color: 'black',
              }}>
              Email
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'OpenSans-SemiBold',
                //   paddingVertical: 10,
                color: 'rgba(0,0,0,0.8)',
              }}>
              {user?.Email}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 60,
            backgroundColor: 'black',
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 19,
            }}>
            Close
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Accounts;
