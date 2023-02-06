import {View, Text, Image, Pressable, Linking} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import Share from 'react-native-share';
import {Styles} from '../Style';
import {Backimages} from '../../../Items/Images';

const Stepthree = ({introstate, setIntrostate, setShowintro, user}) => {
  // console.log(user);

  const shareoption = {
    backgroundImage: `${Backimages.Image3}`,
    backgroundBottomColor: '#fefefe',
    backgroundTopColor: '#906df4',
    attributionURL: 'https://www.hizz.live',
    social: Share.Social.INSTAGRAM_STORIES,
    appId: '493206372793303',
  };

  const handleshare = async () => {
    try {
      Share.isPackageInstalled('com.instagram.android')
        .then(async response => {
          if (response.isInstalled) {
            // Clipboard.setString(`https://www.hizz.live/${user?.username}`);
            const result = await Share.shareSingle(shareoption);
            console.log(result);
            return result;
          } else {
            console.log('done');
            Linking.openURL(
              'http://play.google.com/store/apps/details?id=com.instagram.android',
            );
          }
        })
        .catch(error => {
          console.log(error);
          Linking.openURL(
            'http://play.google.com/store/apps/details?id=com.instagram.android',
          );
        });
    } catch (err) {
      Linking.openURL(
        'http://play.google.com/store/apps/details?id=com.instagram.android',
      );
    }
  };
  return (
    <View style={Styles.Intructions}>
      <View style={Styles.instructionscontainer}>
        <Text
          style={{
            paddingHorizontal: 30,
            paddingTop: 20,
            paddingBottom: 10,
            color: 'black',
            fontFamily: 'Poppins-Bold',
            fontSize: 20,
            textAlign: 'left',
          }}>
          Paste your copied link inside input bar.
        </Text>
        <View
          style={{
            width: '100%',
            height: '60%',
            paddingHorizontal: 15,
            // paddingVertical: 15,
          }}>
          <Image
            source={require('../../../assests/image/intro3.png')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'stretch',
              borderRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 90,
            // backgroundColor: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            paddingHorizontal: 20,
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
              borderWidth: 1,
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
              setShowintro(false);
              setIntrostate(1);
              handleshare();
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

export default Stepthree;
