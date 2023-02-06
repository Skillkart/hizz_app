import {View, Text, ActivityIndicator, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Linear from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const Inbox = ({navigation, loading}) => {
  const user = useSelector(state => state.user);
  const messages = useSelector(state => state.messages);
  const [nomessage, setNomessage] = useState(false);

  console.log(messages);
  useEffect(() => {
    messages.sort((b, a) => {
      return a.messageindex - b.messageindex;
    });

    if (messages.length) {
      setNomessage(true);
    }
  }, []);

  const handledispatch = async m => {
    await AsyncStorage.setItem('m', JSON.stringify(m));
    console.log(m)
    if (m.contenttype === 'movie') {
      navigation.navigate('Movie');
    } else {
      navigation.navigate('messages');
    }
    return;
  };

  return (
    <>
      {loading ? (
        <View
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            size={'large'}
            style={{
              width: 60,
              height: 60,
            }}
          />
        </View>
      ) : (
        <>
          {!nomessage ? (
            <View
              style={{
                width: Dimensions.get('window').width,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: Dimensions.get('window').height,
                marginBottom: 40,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  color: 'red',
                  fontWeight: '900',
                  fontSize: 28,
                  marginBottom: 5,
                }}>
                No message found
              </Text>
              <Text
                style={{
                  color: 'rgba(0,0,0,0.4)',
                  fontWeight: '400',
                  fontSize: 18,
                  marginBottom: 5,
                }}
                s>
                Maybe you didnot share your link yet
              </Text>
              <Image
                style={{
                  width: '100%',
                  height: '60%',
                }}
                source={{
                  uri: 'https://hizz.live/backend/image/nodata.png',
                }}
              />
            </View>
          ) : (
            <View
              style={{
                maxWidth: '100%',
                marginHorizontal: 10,
                marginVertical: 10,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                marginBottom: 90,
              }}>
              {messages.map((m, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => handledispatch(m)}
                    // title="Press Me"
                    style={{
                      width: '22%',
                      height: 85,
                      shadowColor: 'black',
                      // shadowOffset: {width: -2, height: 4},
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      borderRadius: 10,
                      marginLeft: 8,
                      marginBottom: 6,
                    }}>
                    <View
                      // colors={['#fccb90', '#d57eeb']}
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        // margin: 5,
                      }}>
                      {m.seen ? (
                        <Image
                          style={{
                            width: '95%',
                            height: '95%',
                            resizeMode: 'contain',
                          }}
                          source={require('../../../../assests/image/Opened.png')}
                        />
                      ) : (
                        // <MaterialIcons
                        //   name="mark-email-read"
                        //   style={{
                        //     fontSize: 60,
                        //     color: 'rgba(0,0,0,0.8)',
                        //   }}
                        // />
                        <Image
                          style={{
                            width: '75%',
                            height: '75%',
                            resizeMode: 'contain',
                          }}
                          source={require('../../../../assests/image/newmessage.png')}
                        />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}
        </>
      )}
    </>
  );
};

export default Inbox;
