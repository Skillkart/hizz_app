import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Homepage from './Homepage';
import Inbox from './Inbox/Inbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Setting from './Setting/Setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stepintro from '../Steps/Stepintro';
import Steptwo from '../Steps/Steptwo';
import Stepthree from '../Steps/Stepthree';
import Feedback from './Feedback/Feedback';
import {useDispatch, useSelector} from 'react-redux';
import Friends from '../../UserFriends/Friends';
import Navigation from '../../Navigation/Navigation';
import Clipboard from '@react-native-clipboard/clipboard';
import axios from 'axios';

const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const [nav, setNav] = useState(1);
  const custom = useSelector(state => state.customtemplate);
  const customlink = useSelector(state => state.customlink);
  const [copied, setCopied] = useState(false);
  const user = useSelector(state => state.userdata);
  const showfeedback = useSelector(state => state.showfeedback);
  const usermessagese = useSelector(state => state.messages);
  const [newmessage, setNewmessage] = useState(false);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [introstate, setIntrostate] = useState(1);
  const [showintro, setShowintro] = useState(false);

  useEffect(() => {
    const backAction = () => {
      console.log(custom);
      if (custom) {
        dispatch({
          type: 'customtemplate',
          payload: false,
        });
        return true;
      } else {
        console.log(custom);
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [custom]);

  const getmessages = async () => {
    if (user) {
      // setLoading(true);
      console.log(user._id);
      const request = await axios
        .get(
          `https://www.hizz.live/backend/messages/Mess.php?username=${user.id}`,
        )
        .then(result => {
          console.log(result);
          if (result.data.data.filter(state => !state.seen).length) {
            setNewmessage(true);
          }
          if (result.data.data) {
            result.data.data.sort((a, b) => {
              return b.messageindex - a.messageindex;
            });

            // console.log(result.data);
            dispatch({
              type: 'messages',
              payload: result.data.data,
            });

            setMessage(result.data);
          } else {
            return;
          }
        })
        .catch(er => {
          console.log(er);
        });
      return request;
    }
  };
  const handlescreens = () => {
    switch (nav) {
      case 1:
        return <Homepage setShowintro={setShowintro} />;
      case 2:
        return (
          <Inbox
            navigation={navigation}
            // messages={usermessagese}
            loading={loading}
          />
        );
      case 3:
        return <Friends navigation={navigation} />;
      case 4:
        return <Setting />;
    }
  };

  const handleintrostream = () => {
    switch (introstate) {
      case 1:
        return (
          <Stepintro
            introstate={introstate}
            setIntrostate={setIntrostate}
            setShowintro={setShowintro}
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
            setShowintro={setShowintro}
            user={user}
          />
        );

      default:
        break;
    }
  };

  const handlefeedback = async () => {
    let feedbackindex = await AsyncStorage.getItem('feedbackidx');
    if (parseInt(feedbackindex)) {
      if (parseInt(feedbackindex) % 20 === 0) {
        dispatch({
          type: 'showfeedback',
          payload: true,
        });
        await AsyncStorage.setItem(
          'feedbackidx',
          `${parseInt(feedbackindex) + 1}`,
        );
      } else {
        dispatch({
          type: 'showfeedback',
          payload: false,
        });
        await AsyncStorage.setItem(
          'feedbackidx',
          `${parseInt(feedbackindex) + 1}`,
        );
      }
    } else {
      dispatch({
        type: 'showfeedback',
        payload: false,
      });
      await AsyncStorage.setItem('feedbackidx', '1');
    }
    console.log(feedbackindex);
  };

  useEffect(() => {
    getmessages();
    handlefeedback();
  }, []);
  return (
    <>
      {showfeedback && (
        <View>
          <Feedback />
        </View>
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(93, 173, 226,0.1)',
          // paddingHorizontal: 10,
          // paddingVertical: 10,
        }}>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            left: 0,
            height: '100%',
          }}>
          {showintro && handleintrostream()}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            width: '100%',
          }}>
          {handlescreens()}
        </ScrollView>

        {custom && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: 320,
              backgroundColor: 'white',
              bottom: 0,
              shadowColor: '#171717',
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              shadowOpacity: 0.2,
              paddingHorizontal: 10,
              shadowRadius: 3,
              left: 0,
              right: 0,
              zIndex: 1000000,
            }}>
            <View
              style={{
                width: '100%',
                marginTop: 15,
                borderRadius: 30,
                paddingVertical: 16,
                paddingHorizontal: 20,

                // backgroundColor: 'rgba(3, 169, 244,0.3)',
              }}>
              <Text
                style={{
                  color: 'black',

                  // fontWeight: '800',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                }}>
                Step 1: Please copy your link
              </Text>
              <Pressable
                style={{
                  marginTop: 12,
                  marginHorizontal: 0,
                  paddingHorizontal: 5,
                  // paddingVertical: 5,
                  borderRadius: 30,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    maxWidth: '60%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      paddingVertical: 20,
                      paddingHorizontal: 15,
                      overflow: 'hidden',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      fontSize: 18,
                      fontWeight: '500',
                      color: 'rgba(0,0,0,1)',
                    }}>
                    {customlink}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    // alignItems: 'flex-end',
                    marginHorizontal: 10,
                    marginTop: 10,
                    width: 110,
                  }}>
                  {copied ? (
                    <View
                      style={{
                        width: '100%',
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          // fontWeight: '800',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Copied
                      </Text>
                    </View>
                  ) : (
                    <Pressable
                      onPress={() => {
                        Clipboard.setString(customlink);
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 3000);
                      }}
                      style={{
                        width: '100%',

                        height: 40,
                        borderRadius: 30,
                        backgroundColor: 'rgba(0,0,0,1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 12,
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Copy Link
                      </Text>
                    </Pressable>
                  )}
                </View>
              </Pressable>
            </View>
            <View
              style={{
                width: '100%',
                marginTop: 15,
                borderRadius: 30,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  color: 'black',
                  // fontWeight: '800',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                }}>
                Step 2: Share the link on your instagram story
              </Text>
              <View
                style={{
                  marginTop: 12,
                  marginHorizontal: 0,
                  paddingHorizontal: 8,
                  borderRadius: 30,
                  backgroundColor: 'black',
                }}>
                <Pressable
                  onPress={() => {
                    dispatch({
                      type: 'customtemplate',
                      payload: false,
                    });
                    setShowintro(true);
                  }}
                  style={{
                    width: '100%',
                    height: 55,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    //   backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'white',
                      // fontWeight: '900',
                      fontFamily: 'Poppins-SemiBold',

                      marginRight: 10,
                    }}>
                    Share now
                  </Text>
                  <FontAwesome
                    name="send-o"
                    color={'black'}
                    style={{
                      fontSize: 22,
                    }}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        )}
        <Navigation
          setNav={setNav}
          nav={nav}
          newmessage={newmessage}
          setNewmessage={setNewmessage}
          navigation={navigation}
        />
      </View>
    </>
  );
};

export default Index;
