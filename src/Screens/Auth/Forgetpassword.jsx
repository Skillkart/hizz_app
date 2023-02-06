import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import validator from 'validator';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useState} from 'react';
import axios from 'axios';

const Forgetpassword = ({navigation}) => {
  const [userinput, setUserinput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sucess, setSucess] = useState(false);

  const handleforgotpass = async () => {
    const emailvalidator = validator.isEmail(userinput);
    setLoading(true);

    if (emailvalidator) {
      await axios
        .post(
          'https://www.hizz.live/backend/Auth/Forgetpass.php',
          {
            email: userinput,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
            },
          },
        )
        .then(result => {
          console.log(result);
          setLoading(false);

          setSucess(true);
        })
        .catch(err => {
          console.log(err);
          setError(true);
          setLoading(false);
          setTimeout(() => {
            setError(false);
          }, 2000);
        });
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);

    }
  };
  return (
    <View
      style={{
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: 'white',
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'flex-end',
      }}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          width: 50,
          display: 'flex',
          height: 50,
          marginVertical: 20,
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}>
        <AntDesign
          name="back"
          style={{
            fontSize: 25,
            color: 'black',
          }}
        />
      </Pressable>
      {sucess ? (
        <View
          style={{
            paddingHorizontal: 25,
            paddingVertical: 20,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Poppins-Bold',
              color: 'black',
            }}>
            Check Your Mail Box
          </Text>

          <Text
            style={{
              fontSize: 17,
              // fontFamily: 'Poppins-Bold',
              // color: 'black',
            }}>
            We send at email with instructions .
          </Text>

          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              height: 60,
              width: '100%',
              // backgroundColor: 'black',
              borderRadius: 10,
              marginVertical: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: '100%',
                width: '90%',
                backgroundColor: 'black',
                borderRadius: 10,
                marginVertical: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'OpenSans-Bold',

                  // fontWeight: '800',
                }}>
                Go back
              </Text>
            </View>
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            paddingHorizontal: 25,
            // paddingVertical: 20,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Poppins-Bold',
              color: 'black',
            }}>
            Reset Password
          </Text>

          <Text
            style={{
              fontSize: 17,
              // fontFamily: 'Poppins-Bold',
              // color: 'black',
            }}>
            Enter your registered email address. We will send an email with
            instructions .
          </Text>
          {error && (
            <Text
              style={{
                fontSize: 17,
                // fontFamily: 'Poppins-Bold',
                color: 'red',
              }}>
              Your email doesnot exist or Please time after sometimes.
            </Text>
          )}
          <TextInput
            style={{
              marginTop: 20,
              height: 60,
              width: '100%',
              borderWidth: 2,
              paddingLeft: 15,
              marginVertical: 7,
              borderRadius: 10,
              backgroundColor: 'rgba(0,0,0,0.02)',
              fontSize: 16,
              borderColor: 'rgba(0,0,0,0.2)',
              color: 'black',
              fontFamily: 'OpenSans-Regular',
            }}
            onChangeText={e => setUserinput(e)}
            placeholder="Email Address"
          />
          {loading ? (
            <View
              style={{
                height: 60,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'black',
                borderWidth: 2,
                marginVertical: 8,
                borderRadius: 20,
              }}>
              <ActivityIndicator size={'large'} color="black" />
            </View>
          ) : (
            <Pressable
              onPress={handleforgotpass}
              style={{
                height: 60,
                width: '100%',
                backgroundColor: 'black',
                borderRadius: 10,
                marginVertical: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'OpenSans-Bold',

                  // fontWeight: '800',
                }}>
                Submit
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};

export default Forgetpassword;
