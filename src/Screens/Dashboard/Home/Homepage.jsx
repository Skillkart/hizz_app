import {View, Text, ScrollView, Image, BackHandler, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import Stepintro from '../Steps/Stepintro';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Backimages} from '../../../Items/Images';
import Feedback from './Feedback/Feedback';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const Homepage = ({setShowintro}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userdata);
  const custom = useSelector(state => state.customtemplate);
  const customlink = useSelector(state => state.customlink);

  const [copied, setCopied] = useState(false);
  const [template, setTemplate] = useState([]);
  const [page, setPage] = useState([]);

  const gettemplate = async () => {
    const request = await axios
      .get('https://www.hizz.live/backend/template/Tem.php')
      .then(result => {
        console.log(result.data.data);
        setTemplate(result.data.data);
      })
      .catch(err => {
        console.log(err);
      });
    return request;
  };

  useEffect(() => {
    gettemplate();
  }, []);

  const handleshare = async () => {
    try {
      if (Platform.OS == 'android') {
        Clipboard.setString(`https://www.hizz.live/${user.username}`);
        const result = await Share.shareSingle({
          backgroundImage: `${Backimages.Image3}`,
          backgroundBottomColor: '#fefefe',
          backgroundTopColor: '#906df4',
          attributionURL: 'https://www.hizz.live',
          social: Share.Social.INSTAGRAM_STORIES,
        });
        return result;
      }
    } catch (err) {
      Linking.openURL(
        'http://play.google.com/store/apps/details?id=com.instagram.android',
      );
    }
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
            maxWidth: '100%',
            marginHorizontal: 10,
            marginVertical: 10,
            paddingVertical: 18,
            backgroundColor: 'rgba(3, 169, 244,0.15)',
            borderRadius: 30,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 19,
              // fontWeight: '800',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Welcome {user?.username},
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: 'rgba(0,0,0,0.6)',
              marginTop: 6,
              fontFamily: 'Poppins-Regular',
            }}>
            Get anonymous messages from your crush and Friends.
          </Text>
          <View
            style={{
              width: '100%',
              marginTop: 15,
              borderRadius: 30,
              paddingVertical: 16,
              paddingHorizontal: 20,
              backgroundColor: 'rgba(3, 169, 244,0.3)',
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
                paddingHorizontal: 8,
                borderRadius: 30,
                backgroundColor: 'rgba(255, 255, 244,0.5)',
              }}>
              <Text
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  fontSize: 18,
                  fontWeight: '500',
                  color: 'rgba(0,0,0,0.9)',
                }}>
                {`hizz.live/${user?.username}`}
              </Text>
            </Pressable>
            <View
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              {copied ? (
                <View
                  style={{
                    width: 110,
                    height: 35,
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
                    Clipboard.setString(
                      `https://www.hizz.live/${user.username}`,
                    );
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 3000);
                  }}
                  style={{
                    width: 110,
                    height: 35,
                    borderRadius: 30,
                    backgroundColor: 'rgba(0,0,0,0.7)',
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
          </View>
          <View
            style={{
              width: '100%',
              marginTop: 15,
              borderRadius: 30,
              paddingVertical: 16,
              paddingHorizontal: 20,
              backgroundColor: 'rgba(3, 169, 244,0.3)',
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
                backgroundColor: 'white',
              }}>
              <Pressable
                // onPress={handleshare}
                onPress={() => {
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
                    color: 'black',
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
        <View
          style={{
            width: '100%',
            marginBottom: 90,
            marginHorizontal: 15,
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: 'black',
            }}>
            Custom template
          </Text>
          <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={320} //your element width
            snapToAlignment={'start'}
            showsHorizontalScrollIndicator={false}
            style={{
              marginRight: 15,
            }}>
            {template?.map((temp, index) => (
              <Pressable
                onPress={() => {
                  dispatch({
                    type: 'customtemplate',
                    payload: true,
                  });
                  dispatch({
                    type: 'customlink',
                    payload: `hizz.live/${temp?.type}/${user?.username}`,
                  });
                }}
                key={index}
                style={{
                  width: 320,
                  height: 130,
                  shadowColor: 'black',
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  padding: 5,
                  marginVertical: 10,
                  marginHorizontal: 5,
                  backgroundColor: 'white',
                  borderRadius: 15,
                }}>
                <View
                  style={{
                    width: '100%',

                    position: 'relative',
                    height: '60%',
                    backgroundColor: `${temp?.bgcolor}`,
                    borderRadius: 10,
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      color: 'white',
                      zIndex: 100,
                      fontFamily: 'Poppins-Bold',
                      fontSize: 18,
                    }}>
                    {temp?.title}
                  </Text>
                  <Image
                    source={{
                      uri: `https://www.hizz.live/backend/image/${temp?.image}`,
                    }}
                    style={{
                      width: '60%',
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      height: '100%',
                      resizeMode: 'contain',
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View
                  // onPress={() => {
                  //   console.log(temp, index);
                  //   console.log(custom);
                  //   dispatch({
                  //     type: 'customtemplate',
                  //     payload: true,
                  //   });
                  // }}
                  style={{
                    width: '100%',
                    height: '40%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      color: 'black',
                    }}>
                    Tap to share
                  </Text>
                </View>
              </Pressable>
            ))}

            {/* </View> */}
          </ScrollView>
        </View>
      </ScrollView>
      {/* {!custom && (
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
      )} */}
    </>
  );
};

export default Homepage;
