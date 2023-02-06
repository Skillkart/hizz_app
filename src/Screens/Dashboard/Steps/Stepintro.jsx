import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {Styles} from '../Style';

const Stepintro = ({
  introstate,
  setIntrostate,
  setShowintro,
  setShowmessage,
}) => {
  return (
    <View style={Styles.Intructions}>
      <View style={Styles.instructionscontainer}>
        <Text
          style={{
            paddingHorizontal: 30,
            paddingTop: 20,
            paddingBottom: 2,
            color: 'black',
            fontFamily: 'Poppins-Bold',
            fontSize: 24,
            textAlign: 'left',
          }}>
          How to use our app ?
        </Text>
        <View
          style={{
            width: '100%',
            height: '60%',
            paddingHorizontal: 25,
            // paddingVertical: 15,
          }}>
          <Text
            style={{
              color: 'rgba(0,0,0,0.9)',
              // fontWeight: '900',
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
              textAlign: 'left',
              paddingHorizontal: 7,
            }}>
            Press the sticker icon at the top of the insta story
          </Text>
          <Image
            source={require('../../../assests/image/intro1.png')}
            resizeMode="contain"
            resizeMethod="resize"
            style={{
              width: '100%',
              height: '90%',

              // resizeMode: 'cover',
              borderRadius: 10,
              marginTop: 10,
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: '35%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingHorizontal: 20,
            // marginVertical: 20,
          }}>
          <Pressable
            onPress={() => {
              setShowintro(false);
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
                fontSize: 18,
                color: 'black',
                // fontWeight: '800',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Cancel
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
                fontSize: 18,
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

export default Stepintro;
