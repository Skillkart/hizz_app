import {View, Text, Pressable, Linking, Platform} from 'react-native';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Styles from './Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useScreenshot } from 'use-react-screenshot';
import ViewShot from 'react-native-view-shot';
import ImgToBase64 from 'react-native-image-base64';
import Share from 'react-native-share';
import {Backimages, image1, Image2} from '../../../Items/Images';
import image from '../../../assests/image/background.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

const Messages = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const imagref = useRef(null);
  const [messa, setMessa] = useState('');
  const [pb, setPb] = useState(0);

  const colorgradient = [
    {a: '#0093E9', b: '#80D0C7'},
    {a: '#85FFBD', b: '#FFFB7D'},
    {a: '#FBAB7E', b: '#F7CE68'},
  ];

  const randomplate = () => {
    if (pb === colorgradient.length - 1) {
      setPb(0);
    } else {
      setPb(pb + 1);
    }
    // console.log(pb);
  };

  const storage = async () => {
    const mess = await AsyncStorage.getItem('m');
    setMessa(JSON.parse(mess));
  };

  const handleseenrqt = async () => {
    let mess = await AsyncStorage.getItem('m');
    mess = JSON.parse(mess);

    await axios
      .post(
        `https://www.hizz.live/backend/messages/Seener.php`,
        {
          id: mess.id,
          userid: user.id,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        },
      )
      .then(result => {
        console.log(result, 'result');
        if (result.data.data) {
          result.data.data.sort((a, b) => {
            return b.messageindex - a.messageindex;
          });

          // console.log(result.data);
          dispatch({
            type: 'messages',
            payload: result.data.data,
          });
        } else {
          return;
        }
      })
      .catch(err => {
        console.log(err, 'error');
      });
  };

  useEffect(() => {
    storage();
    handleseenrqt();
  }, []);

  const instashare = async uri => {
    const shareoption = {
      backgroundImage: `${Backimages.hizzbackground}`,
      stickerImage: `data:image/png;base64,${uri}`,
      attributionURL: 'https://www.hizz.live',
      social: Share.Social.INSTAGRAM_STORIES,
      appId: '493206372793303',
    };

    try {
      Share.isPackageInstalled('com.instagram.android')
        .then(async response => {
          if (response.isInstalled) {
            const result = await Share.shareSingle(shareoption);
            return result;
          } else {
            Linking.openURL(
              'http://play.google.com/store/apps/details?id=com.instagram.android',
            );
          }
        })
        .catch(error => {
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

  const instacustomshare = (uri, bimage) => {
    console.log(bimage);
    const shareoption = {
      backgroundImage: `data:image/jpeg;base64,${bimage}`,
      stickerImage: `data:image/png;base64,${uri}`,
      attributionURL: 'https://www.hizz.live',
      social: Share.Social.INSTAGRAM_STORIES,
      appId: '493206372793303',
    };

    try {
      Share.isPackageInstalled('com.instagram.android')
        .then(async response => {
          if (response.isInstalled) {
            const result = await Share.shareSingle(shareoption);
            return result;
          } else {
            Linking.openURL(
              'http://play.google.com/store/apps/details?id=com.instagram.android',
            );
          }
        })
        .catch(error => {
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

  const sharewithcustom = async bimage => {
    imagref.current.capture().then(async uri => {
      instacustomshare(uri, bimage);
    });
  };
  const instastorshare = async () => {
    imagref.current.capture().then(async uri => {
      instashare(uri);
    });
  };

  return (
    <View style={Styles.Messages}>
      <View
        style={{
          height: '30%',
          width: '85%',
          paddingVertical: 15,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={async () => {
            launchImageLibrary(
              {includeBase64: true, mediaType: 'photo'},
              response => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log(
                    'User tapped custom button: ',
                    response.customButton,
                  );
                } else {
                  sharewithcustom(response.assets[0].base64);
                }
              },
            );
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: 30,
          }}>
          <FontAwesome
            name="photo"
            style={{
              fontSize: 26,
              color: 'rgba(0,0,0,0.8)',
            }}
          />
          <Text
            style={{
              fontSize: 13,
              fontWeight: '800',
              color: 'black',
              marginTop: 5,
            }}>
            photo
          </Text>
        </Pressable>
        <Pressable
          onPress={randomplate}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Ionicons
            name="color-palette"
            style={{
              fontSize: 26,
              color: 'rgba(0,0,0,0.8)',
            }}
          />
          <Text
            style={{
              fontSize: 13,
              marginTop: 5,
              fontWeight: '800',
              color: 'black',
            }}>
            Colors
          </Text>
        </Pressable>
      </View>
      <ViewShot
        style={Styles.Messagescontainer}
        ref={imagref}
        options={{format: 'png', quality: 0.9, result: 'base64'}}>
        <LinearGradient
          colors={[`${colorgradient[pb].a}`, `${colorgradient[pb].b}`]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={Styles.Messagescontainerheader}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              // fontWeight: '700',
              fontFamily: 'Poppins-SemiBold',
            }}>
            I am hizzed
          </Text>
        </LinearGradient>
        <View style={Styles.Messagescontainercontent}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            {messa.message}
          </Text>
        </View>
      </ViewShot>

      <View style={Styles.Shareicon}>
        <Pressable
          onPress={instastorshare}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '80%',
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingHorizontal: 0,
                paddingVertical: 10,
                height: 60,
                borderRadius: 50,
              }}>
              <FontAwesome
                name="send-o"
                color={'white'}
                style={{
                  fontSize: 22,
                }}
              />
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'white',
                }}>
                Replay
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messages;
