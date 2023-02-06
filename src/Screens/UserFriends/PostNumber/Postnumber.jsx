import {
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {phonedirectory} from '../../../phonelocales/Ismobilenumbers';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Numberdirectory from './Numberdirectory';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import validator from 'validator';

const Postnumber = ({navigation}) => {
  const user = useSelector(state => state.userdata);
  const [phone, setPhone] = useState('');
  const countrylist = useSelector(state => state.countrylist);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const handleupdate = async () => {
    const pverification = await validator.isMobilePhone(phone, [
      countrylist.localeid,
    ]);
    if (pverification) {
      setLoading(true);
      await axios
        .post(
          'https://321a-2409-4065-e1e-3a42-31e7-7aa6-3c8e-2573.ngrok.io/api/v1/secretaphoneupdate',
          {
            userid: user._id,
            phone: `${countrylist.isdcode}${phone}`,
          },
        )
        .then(result => {
          // navigation.goBack();
          setLoading(false);

          dispatch({
            type: 'userdata',
            payload: result.data.data,
          });
          navigation.goBack();
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
      setLoading(false);
    } else {
      setError({
        error: true,
        errmessage: 'Invalid phone number.',
      });
      setTimeout(() => {
        setError({
          error: false,
          errmessage: 'Invalid phone number.',
        });
      }, 3000);
      return;
    }
    console.log(pverification);
  };

  useEffect(() => {
    dispatch({
      type: 'countrylist',
      payload: phonedirectory[0],
    });
  }, []);
  return (
    <View
      style={{
        width: '100%',
        height: Dimensions.get('window').height,
        position: 'relative',
      }}>
      {/* <Numberdirectory /> */}
      <View
        style={{
          width: '100%',
          paddingTop: 15,
          paddingHorizontal: 15,
          paddingBottom: 40,
          // backgroundColor: 'white',
          height: '100%',
          borderBottomColor: 'rgba(0,0,0,0.12)',
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            paddingRight: 10,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            style={{
              width: 60,
              height: 40,
              resizeMode: 'contain',
            }}
            source={require('../../../assests/image/logo6.png')}
          />
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderColor: 'rgba(0,0,0,0.2)',
                borderRadius: 30,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Fontisto name="world-o" color={'black'} />
              <Text
                style={{
                  marginHorizontal: 8,
                }}>
                English
              </Text>
            </View>
            <Feather
              name="more-vertical"
              style={{
                marginHorizontal: 4,
                paddingVertical: 3,
                paddingHorizontal: 4,
                fontSize: 20,
              }}
            />
          </View>
        </View>
        <View
          style={{
            paddingTop: 40,
            paddingBottom: 10,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 18,
              color: 'black',
            }}>
            Update your phone number
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 13,
              // color: 'black',
            }}>
            Please update you phone number
          </Text>

          <View
            style={{
              width: '100%',
              minHeight: 60,
              display: 'flex',
              flexDirection: 'row',
              paddingTop: 20,
              paddingBottom: 10,
            }}>
            <Pressable
              onPress={() => {
                navigation.navigate('Numberdirectory');
              }}
              style={{
                padding: 10,
                width: '25%',
                fontSize: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 60,
                borderColor: 'rgba(0,0,0,0.25)',
                borderRadius: 10,
                marginHorizontal: 2,
                borderWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 23,
                  color: 'black',
                  fontFamily: 'OpenSans-SemiBold',
                }}>
                {countrylist?.isdcode}
              </Text>
            </Pressable>
            <TextInput
              value={phone}
              onChangeText={e => setPhone(e)}
              keyboardType="number-pad"
              style={{
                // padding: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 23,
                fontFamily: 'OpenSans-SemiBold',
                paddingHorizontal: 20,
                height: 60,
                borderWidth: 1,
                borderRadius: 10,
                marginHorizontal: 2,
                borderColor: 'rgba(0,0,0,0.25)',
                width: '75%',
              }}
            />
          </View>
          {error.error && (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: 'red',
                paddingHorizontal: 8,
              }}>
              {error.errmessage}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'absolute',
          bottom: 10,
        }}>
        {loading ? (
          <View
            style={{
              width: '80%',
              height: 60,
              borderRadius: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // borderColor: 'royalblue',
              // borderWidth: 3,
            }}>
            <ActivityIndicator size={'large'} color="red" />
          </View>
        ) : (
          <Pressable
            onPress={handleupdate}
            style={{
              width: '80%',
              height: 60,
              borderRadius: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'royalblue',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 19,
                // fontFamily: 'OpenSans-SemiBold',
              }}>
              Update
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Postnumber;
