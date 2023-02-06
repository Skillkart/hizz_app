import {
  View,
  Text,
  Dimensions,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import validator from 'validator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch} from 'react-redux';

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usererror, setUsererror] = useState(false);
  const [emailerror, setEmailerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlesignup = async () => {
    if (!username || !email || !password) {
      if (!username) {
        setUsererror(true);
        setTimeout(() => {
          setUsererror(false);
        }, 3000);
      }
      if (!email) {
        setEmailerror(true);
        setTimeout(() => {
          setEmailerror(false);
        }, 3000);
      }
      if (!password) {
        setPassworderror(true);
        setTimeout(() => {
          setPassworderror(false);
        }, 3000);
        return;
      }
    } else {
      const emailverify = validator.isEmail(email);
      if (!emailverify) {
        setEmailerror(true);
        setTimeout(() => {
          setEmailerror(false);
        }, 3000);
        return;
      }
      if (
        !password.match(/[A-Z]/) ||
        !password.match(/[a-z]/) ||
        !password.match(/[0-9]/)
      ) {
        setPassworderror(true);
        setTimeout(() => {
          setPassworderror(false);
        }, 3000);
        return;
      } else {
        const ftoken = await AsyncStorage.getItem('fbtoken');
        setLoading(true);
        await axios
          .post(
            'https://www.hizz.live/backend/Auth/Signup.php',
            {
              user: username.split(' ').join(''),
              email: email.toLowerCase(),
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
          .then(result => {
            // console.log(result.data.data);
            dispatch({
              type: 'userdata',
              payload: result.data.data[0],
            });
            navigation.navigate('Dashboard');

            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);

            // console.log(err);
          });
        // const response = await fetch(
        //   'https://321a-2409-4065-e1e-3a42-31e7-7aa6-3c8e-2573.ngrok.io/api/v1/secretacreataccount',
        //   {
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       username,
        //       email,
        //       password,
        //       ftoken: ftoken,
        //     }),
        //   },
        // ).then(response => {
        //   return response.json();
        // });
        // setLoading(false);
        // console.log(response);
        // if (response.status == 'success') {
        //   console.log(response.data);
        // } else {
        //   setError(true);
        //   setTimeout(() => {
        //     setError(false);
        //   }, 3000);
        // }
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
            // fontWeight: '800',
            color: 'black',
            fontFamily: 'OpenSans-Bold',
          }}>
          Create a free account
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
              width: '95%',
              height: '40%',
              paddingTop: 25,
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
                *User already exist.
              </Text>
            )}
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                fontFamily: 'OpenSans-Bold',
              }}>
              Username
            </Text>
            <TextInput
              value={username}
              onChangeText={e => setUsername(e)}
              style={{
                height: 55,
                width: '100%',
                borderWidth: 2,
                paddingLeft: 15,
                marginVertical: 7,
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.02)',
                fontSize: 17,
                fontFamily: 'OpenSans-Regular',
                borderColor: 'rgba(0,0,0,0.2)',
                color: 'black',
              }}
              placeholder="Username"
            />
            {usererror && (
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  color: 'red',
                  fontSize: 13,
                  marginBottom: 4,
                }}>
                *please provide username.
              </Text>
            )}
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                marginTop: 10,
                fontFamily: 'OpenSans-Bold',
              }}>
              Email
            </Text>
            <TextInput
              onChangeText={e => setEmail(e)}
              value={email}
              style={{
                height: 55,
                width: '100%',
                borderWidth: 2,
                paddingLeft: 15,
                marginVertical: 7,
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.02)',
                fontSize: 17,
                fontFamily: 'OpenSans-Regular',
                borderColor: 'rgba(0,0,0,0.2)',
                color: 'black',
              }}
              placeholder="Email"
            />
            {emailerror && (
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  color: 'red',
                  fontSize: 13,
                  marginBottom: 4,
                }}>
                *please provide valid email.
              </Text>
            )}
            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                color: 'black',
                fontFamily: 'OpenSans-Bold',
              }}>
              Password
            </Text>
            <TextInput
              onChangeText={e => setPassword(e)}
              secureTextEntry={true}
              value={password}
              style={{
                height: 55,
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
              placeholder="Password"
            />
            {passworderror && (
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  color: 'red',
                  fontSize: 13,
                  marginBottom: 4,
                  textAlign: 'justify',
                }}>
                *please provide valid password whose length should to greater
                than 6 and contains one uppercase , one lowercase and one number
                .
              </Text>
            )}
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
                onPress={handlesignup}
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
                    fontSize: 18,
                    fontFamily: 'OpenSans-Bold',
                  }}>
                  Signup
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
                }}>
                Have an account?
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text
                  style={{
                    color: 'black',
                    marginHorizontal: 5,
                    fontSize: 16,
                    fontFamily: 'OpenSans-Bold',
                  }}>
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signup;
