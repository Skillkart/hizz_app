import {
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Alert,
  ScrollView,
  Platform,
  Linking,
  FlatList,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, {Component, useEffect, useState} from 'react';
import {Styles} from './Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import insta from '../../assests/image/Instagram_logo_2016.svg.png';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import {Backimages} from '../../Items/Images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Unlock from '../../assests/image/newmessage.png';
import Linear from 'react-native-linear-gradient';
import Messages from './Message/Messages';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Messagesjson from './Message/message.json';
import Items from './Items';
import Stepintro from './Steps/Stepintro';
import Steptwo from './Steps/Steptwo';
import Stepthree from './Steps/Stepthree';
import {useDispatch, useSelector} from 'react-redux';

function Dashboard({navigation}) {
  const dispatch = useDispatch();
  // const [user, setUser] = useState([]);
  const user = useSelector(state => state.userdata);
  // console.log(user);
  const [showmessage, setShowmessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [introstate, setIntrostate] = useState(1);

  // const handlestorage = async () => {
  //   let user = await AsyncStorage.getItem('user');
  //   if (user) {
  //     user = JSON.parse(user);
  //     setUser(user.data);
  //   }
  // };

  // useEffect(() => {
  //   handlestorage();
  // }, []);

  const handleshare = async () => {
    try {
      if (Platform.OS == 'android') {
        Share.isPackageInstalled('com.instagram.android').then(async result => {
          if (!result.isInstalled) {
            Linking.openURL(
              'http://play.google.com/store/apps/details?id=com.instagram.android',
            );
          } else {
            // console.log(result);
            Clipboard.setString(`https://www.hizz.live/${user.username}`);
            const result = await Share.shareSingle({
              backgroundImage: `${Backimages.Image3}`,
              // stickerImage: `data:image/png;base64,${Image2}`,
              backgroundBottomColor: '#fefefe',
              backgroundTopColor: '#906df4',
              attributionURL: 'https://www.skillkart.app', //in beta
              social: Share.Social.INSTAGRAM_STORIES,
            });
            return result;
          }
        });
      } else {
        Clipboard.setString(`https://www.hizz.live/${user.username}`);
        const result = await Share.shareSingle({
          backgroundImage: `${Backimages.Image3}`,
          stickerImage: `data:image/png;base64,${Backimages.Image}`,
          backgroundBottomColor: '#fefefe',
          backgroundTopColor: '#906df4',
          attributionURL: 'https://www.skillkart.app', //in beta
          social: Share.Social.INSTAGRAM_STORIES,
        });
        return result;
      }
    } catch {
      // console.log('yeap');
    }
  };
  const facebookshare = async () => {
    if (Platform.OS == 'android') {
      Share.isPackageInstalled('com.facebook.katana').then(async result => {
        if (!result.isInstalled) {
          Linking.openURL(
            'http://play.google.com/store/apps/details?id=com.facebook.katana',
          );
        } else {
          Clipboard.setString(`hizz.live/${user.username}`);

          const result = await Share.shareSingle({
            backgroundImage: `${Backimages.Image3}`,
            // url or an base64 string
            // stickerImage: `data:image/png;base64,${uri}`,
            //or you can use "data:" url
            backgroundBottomColor: '#fefefe',
            backgroundTopColor: '#906df4',
            appId: '219376304',
            social: Share.Social.FACEBOOK_STORIES,
          });
          return result;
        }
      });
    } else {
      Clipboard.setString(`hizz.live/${user.username}`);

      const result = await Share.shareSingle({
        backgroundImage: `${Backimages.Image3}`,
        // url or an base64 string
        // stickerImage: `data:image/png;base64,${uri}`,
        //or you can use "data:" url
        backgroundBottomColor: '#fefefe',
        backgroundTopColor: '#906df4',
        appId: '219376304',
        social: Share.Social.FACEBOOK_STORIES,
      });
      // console.log(result);
    }
  };

  const handleview = () => {
    switch (introstate) {
      case 1:
        return (
          <Stepintro
            introstate={introstate}
            setIntrostate={setIntrostate}
            showmessage={showmessage}
            setShowmessage={setShowmessage}
          />
        );
      case 2:
        return (
          <Steptwo introstate={introstate} setIntrostate={setIntrostate} />
        );
      case 3:
        return (
          <Stepthree
            introstate={introstate}
            setIntrostate={setIntrostate}
            setShowmessage={setShowmessage}
            user={user}
          />
        );

      default:
        return;
    }
  };
  return (
    <ScrollView>
      {showmessage && handleview()}
      <View style={Styles.Dashboardhome}>
        <View style={Styles.Dashboardheader}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                display: 'flex',
                // alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Text style={Styles.dashboardgreeting}>Welcome ,</Text>
              <Text style={Styles.dashboardUser}>{user?.username}</Text>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate('setting');
              }}>
              <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: '#262837',
                  borderRadius: 50,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign
                  name="setting"
                  style={{
                    fontSize: 27,
                  }}
                  color="#fdd835"
                />
              </View>
            </Pressable>
          </View>

          <View style={Styles.Userlink}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                opacity: 0.8,
              }}>
              {`hizz.live/${user?.username}`}
            </Text>
          </View>
          <View style={Styles.Socialshare}>
            <Pressable
              onPress={() => {
                setShowmessage(true);
              }}
              style={{
                width: '80%',
              }}>
              <LinearGradient
                start={{x: 0.0, y: 0.25}}
                end={{x: 0.75, y: 0.75}}
                colors={['#4158D0', '#C850C0', '#FFCC70']}
                style={{
                  width: '100%',
                  borderRadius: 15,
                }}>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 0,
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                    paddingVertical: 10,
                    height: 60,
                    borderRadius: 10,
                  }}>
                  <AntDesign
                    name="instagram"
                    color="black"
                    style={{
                      fontSize: 30,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 7,
                      fontSize: 18,
                      fontWeight: '600',
                      color: 'black',
                    }}>
                    Instagram Story
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
            <Pressable
              onPress={() => {
                Clipboard.setString(`https://www.hizz.live/${user?.username}`);
                alert('Link copied');
              }}>
              <View
                style={{
                  width: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  height: 60,
                  borderRadius: 50,
                  backgroundColor: 'white',
                }}>
                <Entypo
                  style={{
                    fontSize: 30,
                  }}
                  color="black"
                  name="link"
                />
              </View>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            height: '100%',
          }}>
          <View style={Styles.messagetitle}>
            <Text style={Styles.messagetitletext}>Messages</Text>
          </View>
          <View style={Styles.Messagecontainer}>
            <Items navigation={navigation} />
          </View>
          {/* {showmessage && <Messages />} */}
        </View>
      </View>
      {/* </LinearGradient> */}
    </ScrollView>
  );
}

export default Dashboard;
