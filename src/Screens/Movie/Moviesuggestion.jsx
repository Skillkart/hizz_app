import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Pressable,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Loading/Loading';
import ViewShot from 'react-native-view-shot';
import {Backimages, image1, Image2} from '../../Items/Images';

const api_key = 'f846fc88790620faca2a01aa8693e353';
const Moviesuggestion = ({navigation}) => {
  const imagref = useRef(null);
  const stickref = useRef(null);
  const dispatch = useDispatch();
  const [getmessage, setGetmessage] = useState([]);
  const [pb, setPb] = useState(0);
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colorcode, setColorcode] = useState({
    a: 'rgba(0,0,0,0.4)',
    b: 'rgba(0,0,0,0.4)',
    c: 'rgba(0,0,0,1)',
  });

  const colorgradient = [
    // {a: '#4158D0', b: '#C850C0', c: '#FFCC70'},
    {a: '#0F2027', b: '#203A43', c: '#2C5364'},
    {a: '#12c2e9', b: '#c471ed', c: '#f64f59'},
    {a: '#2980B9', b: '#6DD5FA', c: '#FFFFFF'},
    {a: '#7F7FD5', b: '#86A8E7', c: '#91EAE4'},
    {
      a: 'black',
      b: 'black',
      c: 'black',
    },
  ];
  const randomplate = () => {
    if (pb === colorgradient.length - 1) {
      setPb(0);
      setColorcode(colorgradient[0]);
    } else {
      setPb(pb + 1);
      setColorcode(colorgradient[pb + 1]);
    }
    // console.log(colorcode);
    // const ran = Math.floor(Math.random() * colorgradient.length - 1);
    // console.log(ran);
  };

  const handleseenrqt = async () => {
    let mess = await AsyncStorage.getItem('m');
    mess = JSON.parse(mess);
    return fetch(`https://www.skillbay.app/api/v1/seenrqt?id=${mess._id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => console.log(result));
  };

  const fetchmovie = async movie => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movie}&language=en-US&page=1&include_adult=false`,
        )
        .then(result => {
          setLoading(false);

          return resolve(
            result.data.results
              .filter(
                state =>
                  state.original_title.toLowerCase() === movie.toLowerCase(),
              )
              .filter(state => state.original_language == 'en'),
          );
        })
        .catch(() => {
          setLoading(false);
          return reject(true);
        });
    });
  };

  const instashare = async (uri, image) => {
    const shareoption = {
      backgroundImage: `data:image/png;base64,${uri}`,
      stickerImage: `data:image/png;base64,${image}`,
      attributionURL: 'https://www.hizz.live',
      social: Share.Social.INSTAGRAM_STORIES,
      appId: '493206372793303',
    };

    try {
      Share.isPackageInstalled('com.instagram.android')
        .then(async response => {
          console.log(response);
          if (response.isInstalled) {
            await Share.shareSingle(shareoption)
              .then(result => {
                console.log(result);
              })
              .catch(err => {
                console.log(err);
              });
            // console.log(result);
            // return result;
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

  const handlemovie = async () => {
    imagref.current.capture().then(result => {
      stickref.current.capture().then(uri => {
        instashare(result, uri);
      });
    });

    // const stickerimage = console.log(stickerimage, image);
    // if (image && stickerimage) {
    //   instashare(image.uri, stickerimage.uri);
    // } else {
    //   console.log(image, stickerimage);
    // }
  };

  const getrightmovie = async () => {
    let moviename = await AsyncStorage.getItem('m');
    let movejson = JSON.parse(moviename);

    setGetmessage(movejson);
    console.log(movejson);
    const movieid = await fetchmovie(movejson.message);
    if (movieid) {
      if (movieid.length) {
        setMovie(movieid);
        setColorcode({
          a: 'rgba(0,0,0,0.4)',
          b: 'rgba(0,0,0,0.4)',
          c: 'rgba(0,0,0,1)',
        });
      } else {
        setColorcode({
          a: 'black',
          b: 'black',
          c: 'black',
        });
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    handleseenrqt();
    getrightmovie();
  }, []);

  useEffect(() => {
    console.log(movie.length);
  }, [movie]);
  if (loading) {
    return (
      <View
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          // paddingBottom: 20,
          height: '100%',
          justifyContent: 'center',
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
        <View
          style={{
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            marginTop: 40,
            borderRadius: 50,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.12)',
          }}>
          <ActivityIndicator color={'red'} size={'large'} />
        </View>
      </View>
    );
  }

  return (
    <>
      <ImageBackground
        resizeMode="cover"
        style={{
          height: Dimensions.get('window').height,
          width: '100%',
          backgroundColor: colorcode.a,
        }}
        source={{
          uri: `${
            movie
              ? `https://image.tmdb.org/t/p/original/${movie[0]?.poster_path}`
              : null
          }`,
        }}>
        <LinearGradient
          colors={[`${colorcode.a}`, `${colorcode.b}`, `${colorcode.c}`]}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              paddingBottom: 20,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 10,
                height: '60%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  zIndex: 10000,
                  justifyContent: 'space-between',
                }}>
                <Pressable
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                  }}>
                  <AntDesign
                    name="back"
                    style={{
                      fontSize: 25,
                      color: 'black',
                    }}
                  />
                </Pressable>
                <Pressable
                  onPress={randomplate}
                  style={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="color-palette"
                    style={{
                      fontSize: 26,
                      color: 'white',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      marginTop: 5,
                      fontWeight: '800',
                      color: 'white',
                    }}>
                    Colors
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  height: '90%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ViewShot
                  ref={stickref}
                  options={{format: 'png', quality: 0.9, result: 'base64'}}
                  style={{
                    width: '80%',
                    minHeight: 100,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 80,

                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        position: 'relative',
                        height: '100%',
                        backgroundColor: `black`,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
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
                        Suggested movie
                      </Text>
                      <Image
                        source={{
                          uri: `https://www.hizz.live/backend/image/movie.jpg`,
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
                  </View>
                  <View
                    style={{
                      width: '100%',
                      // minHeight: 100,
                      backgroundColor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      paddingVertical: 30,

                      position: 'relative',
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 19,
                        fontFamily: 'OpenSans-Bold',
                      }}>
                      {getmessage?.message}
                    </Text>
                  </View>
                </ViewShot>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: '40%',
                display: 'flex',
                alignItems: 'center',

                justifyContent: 'flex-end',
              }}>
              <Pressable
                onPress={handlemovie}
                style={{
                  width: '90%',
                  height: 70,
                  display: 'flex',
                  marginVertical: 5,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: 40,
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-SemiBold',
                    color: 'black',
                    fontSize: 19,
                    marginRight: 10,
                  }}>
                  Replay
                </Text>
                <Ionicons
                  name="ios-send"
                  color={'black'}
                  style={{
                    fontSize: 22,
                  }}
                />
              </Pressable>

              {movie.length ? (
                <Pressable
                  onPress={() => {
                    dispatch({
                      type: 'movieid',
                      payload: movie[0].id,
                    });
                    navigation.navigate('Moviedetail');
                  }}
                  style={{
                    width: '90%',
                    height: 70,
                    display: 'flex',
                    marginVertical: 5,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderColor: 'red',
                    borderWidth: 3,
                    borderRadius: 40,
                    backgroundColor: 'black',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-Bold',
                      color: 'white',
                      fontSize: 19,
                    }}>
                    🍿 Get Movie Detail
                  </Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <ViewShot
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          zIndex: -100,
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
        ref={imagref}
        options={{format: 'png', quality: 0.9, result: 'base64'}}>
        <ImageBackground
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: colorcode,
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/original/${movie[0]?.poster_path}`,
          }}>
          <LinearGradient
            colors={[`${colorcode.a}`, `${colorcode.b}`, `${colorcode.c}`]}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingBottom: 50,
            }}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.6)',
                paddingHorizontal: 12,
                paddingVertical: 7,
                marginVertical: 15,
                marginHorizontal: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: 'black',
                  fontSize: 12,
                }}>
                Powered By Hizz.live
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </ViewShot>
    </>
  );
};

export default Moviesuggestion;
