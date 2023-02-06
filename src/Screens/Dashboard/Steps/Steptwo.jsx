import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {Styles} from '../Style';

const Steptwo = ({introstate, setIntrostate}) => {
  return (
    <View style={Styles.Intructions}>
      <View style={Styles.instructionscontainer}>
        {/* <Text
          style={{
            paddingHorizontal: 30,
            paddingTop: 15,
            color: 'black',
            fontFamily: 'Poppins-Bold',
            fontSize: 22,
          }}>
          Processing..
        </Text> */}
        <Text
          style={{
            paddingHorizontal: 30,
            paddingTop: 20,
            paddingBottom: 5,
            color: 'rgba(0,0,0,1)',
            fontFamily: 'Poppins-Bold',
            fontSize: 22,
            // textAlign: 'center',
          }}>
          Click Link button.
        </Text>
        <View
          style={{
            width: '100%',
            height: '60%',
            paddingHorizontal: 25,
            // paddingVertical: 15,
            // backgroundColor: 'red',
          }}>
          <Image
            source={require('../../../assests/image/intro2.png')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              borderRadius: 5,
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: '22%',
            display: 'flex',
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            paddingHorizontal: 30,
          }}>
          <Pressable
            onPress={() => {
              setIntrostate(introstate - 1);
            }}
            style={{
              width: '50%',
              height: 50,
              borderRadius: 10,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              borderColor: 'black',
              borderWidth: 1.5,
              justifyContent: 'center',
              flexDirection: 'row',
              marginHorizontal: 5,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Previous
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setIntrostate(introstate + 1);
            }}
            style={{
              width: '50%',
              height: 50,
              borderRadius: 10,
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Next
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Steptwo;
