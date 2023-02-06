import {
  View,
  Text,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const Moviedetail = ({navigation}) => {
  const movieid = useSelector(state => state.movieid);
  const [mdetail, setMdetail] = useState([]);

  const getmoviedetail = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieid}?api_key=f846fc88790620faca2a01aa8693e353&language=en-US`,
      )
      .then(result => {
        // console.log(result.data);
        setMdetail(result.data);
      })
      .catch(err => {
        console.error(err);
      });
  };
  // const getmovievideos = async () => {
  //   await axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=f846fc88790620faca2a01aa8693e353&language=en-US`,
  //     )
  //     .then(result => {
  //       // console.log(result.data);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // };

  useEffect(() => {
    // getmovievideos();
    getmoviedetail();
  }, []);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      }}>
      <View
        style={{
          width: '100%',
          height: '55%',
        }}>
        <ImageBackground
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/original/${mdetail.poster_path}`,
          }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
            style={{
              width: '100%',
              height: '100%',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Pressable
              onPress={() => {
                navigation.navigate('Movie');
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                display: 'flex',
                zIndex: 1000,
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
          </LinearGradient>
        </ImageBackground>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          width: '100%',
          // height: '50%',
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: 'black',
        }}>
        <View>
          <Text
            style={{
              paddingTop: 10,
              color: 'white',
              fontSize: 25,
              fontWeight: '800',
              // fontFamily: 'OpenSans-Bold',
            }}>
            {mdetail?.original_title || mdetail?.title} (
            {mdetail?.release_date?.split('-')[0]})
          </Text>
          <View
            style={{
              width: '100%',
              marginVertical: 15,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                paddingHorizontal: 20,
                // paddingVertical: 15,
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                borderColor: '#c99c00',
                borderWidth: 2,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  // paddingHorizontal: 20,
                  paddingVertical: 15,
                  // width: 140,
                  borderRadius: 30,
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'OpenSans-Bold',
                }}>
                TMDB
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  // width: 140,
                  borderRadius: 30,
                  color: '#c99c00',
                  fontSize: 15,
                  fontFamily: 'OpenSans-Bold',
                }}>
                {mdetail?.vote_average}
              </Text>
            </View>
            {/* <View
              style={{
                paddingHorizontal: 35,
                borderRadius: 30,
                paddingVertical: 15,

                marginHorizontal: 15,
                backgroundColor: 'rgba(255,255,255,0.7)',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontFamily: 'OpenSans-Bold',
                }}>
                Suggest Now
              </Text>
            </View> */}
          </View>
          <Text
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 16,
              marginVertical: 9,
              marginHorizontal: 5,
              //   fontFamily: 'OpenSans-Regular',
            }}>
            {mdetail?.overview}
          </Text>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginVertical: 8,
              marginHorizontal: 5,
            }}>
            {mdetail?.genres?.map((gen, index) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginHorizontal: 4,
                  marginVertical: 5,
                  backgroundColor: '#272727',
                  borderRadius: 40,
                }}>
                <Text
                  key={index}
                  style={{
                    color: 'white',
                    fontSize: 15,
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  {gen.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Moviedetail;
