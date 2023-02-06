import {
  View,
  Text,
  Dimensions,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [userinput, setUserinput] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordrequire, setPasswordrequire] = useState(false);
  const [userinputrequire, setUserinputrequire] = useState(false);
  const [error, setError] = useState(false);

  const request = async () => {
    if (userinput && password) {
      setLoading(true);
      const ftoken = await AsyncStorage.getItem('fbtoken');
      setLoading(true);
      await axios
        .post(
          'https://www.hizz.live/backend/Auth/Login.php',
          {
            user: userinput.toLowerCase(),
            password,
            ftoken: ftoken,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
            },
          },
        )
        .then(async result => {
          // console.log(result);
          // console.log(result);
          dispatch({
            type: 'userdata',
            payload: result.data.data[0],
          }),
            setLoading(false);

          await AsyncStorage.setItem('jwt', result.data.data[0].jwt);
          dispatch({
            type: 'user',
            payload: true,
          });
          // navigation.goBack()
          navigation.navigate('Dashboard');
        })
        .catch(err => {
          console.log(err);
          setLoading(false);

          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        });
      // const response = await fetch(
      //   'https://321a-2409-4065-e1e-3a42-31e7-7aa6-3c8e-2573.ngrok.io/api/v1/secretalogin',
      //   {
      //     method: 'POST',
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       user: userinput,
      //       password,
      //       ftoken: ftoken,
      //     }),
      //   },
      // )
      //   .then(response => {
      //     return response.json();
      //   })
      //   .catch(() => {
      //     setLoading(false);
      //   });
      // setLoading(false);
      // if (response.status == 'success') {
      //   await AsyncStorage.setItem('user', JSON.stringify(response.data));
      //   await AsyncStorage.setItem('jwt', response.token);
      //   navigation.navigate('Dashboard');
      // } else {
      //   setError(true);
      //   setTimeout(() => {
      //     setError(false);
      //   }, 3000);
      // }
      // const result = response.json();
    } else {
      if (!userinput || !password) {
        if (!userinput) {
          setUserinputrequire(true);
          setTimeout(() => {
            setUserinputrequire(false);
          }, 3000);
        }
        if (!password) {
          setPasswordrequire(true);
          setTimeout(() => {
            setPasswordrequire(false);
          }, 3000);
        }
      }
    }
  };

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingHorizontal: 18,
        paddingVertical: 10,
      }}>
      <View
        style={{
          width: 50,
          display: 'flex',
          height: 50,
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
      </View>
      <View
        style={{
          width: '100%',
          height: '90%',
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            paddingTop: 15,
            fontSize: 25,
            color: 'black',
            fontFamily: 'Nunito-VariableFont_wght',
          }}>
          Welcome Back ,
        </Text>
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '98%',
              height: '40%',
              paddingTop: 10,
              paddingBottom: 20,
            }}>
            {error && (
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  color: 'red',
                  fontSize: 15,
                  marginVertical: 5,
                }}>
                *Incorrect email or password.
              </Text>
            )}
            <TextInput
              style={{
                height: 60,
                width: '100%',
                borderWidth: 2,
                paddingLeft: 15,
                marginVertical: 7,
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.02)',
                fontSize: 17,
                borderColor: 'rgba(0,0,0,0.2)',
                color: 'black',
                fontFamily: 'OpenSans-Regular',
              }}
              onChangeText={e => setUserinput(e)}
              placeholder="Username or Email Address"
            />
            {userinputrequire && (
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  color: 'red',
                  fontSize: 13,
                  marginVertical: 5,
                }}>
                *please provide your email or phone or username.
              </Text>
            )}
            <TextInput
              style={{
                height: 60,
                width: '100%',
                borderWidth: 2,
                paddingLeft: 15,
                borderRadius: 10,
                marginVertical: 7,
                color: 'black',
                backgroundColor: 'rgba(0,0,0,0.02)',
                fontSize: 17,
                fontFamily: 'OpenSans-Regular',
                borderColor: 'rgba(0,0,0,0.2)',
              }}
              secureTextEntry={true}
              onChangeText={e => setPassword(e)}
              placeholder="Password"
            />
            {passwordrequire && (
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  color: 'red',
                  fontSize: 13,
                  marginVertical: 5,
                }}>
                *password required.
              </Text>
            )}
            <Pressable
              onPress={() => {
                navigation.navigate('Forgetpassword');
              }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-Bold',
                  color: 'black',
                  fontSize: 13,
                  marginVertical: 5,
                  marginHorizontal: 5,
                  textDecorationColor: 'black',
                  textDecorationLine: 'underline',
                }}>
                Forgot password
              </Text>
              <Text>?</Text>
            </Pressable>
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
                onPress={request}
                style={{
                  height: 60,
                  width: '100%',
                  backgroundColor: 'black',
                  borderRadius: 20,
                  marginVertical: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 19,
                    fontFamily: 'OpenSans-Bold',

                    // fontWeight: '800',
                  }}>
                  LogIn
                </Text>
              </Pressable>
            )}
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              height: '60%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 40,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'OpenSans-Regular',
                  //   marginBottom: 10,
                  //   color: 'black',
                }}>
                Don't Have an account?
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Bold',

                    color: 'black',
                    marginHorizontal: 5,
                    fontSize: 16,
                    // fontWeight: '800',
                  }}>
                  Signup
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
