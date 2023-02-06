import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assests/image/logo.png';
import validator from 'validator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState([]);

  const forsubmit = async () => {
    const emailverify = validator.isEmail(email);
    const phoneverification = validator.isMobilePhone(phone, ['en-IN']);
    if (!username || !email || !phone || !emailverify || !phoneverification) {
      if (!emailverify) {
        setError({
          error: true,
          errormess: 'Required valid Email',
        });
        setTimeout(() => {
          setError({
            error: false,
          });
        }, 3000);
        return;
      }
      if (!phoneverification) {
        setError({
          error: true,
          errormess: 'Required valid Phone No.',
        });
        setTimeout(() => {
          setError({
            error: false,
          });
        }, 3000);
        return;
      } else {
        setError({
          error: true,
          errormess: 'All field required',
        });
        setTimeout(() => {
          setError({
            error: false,
            errormess: 'All field required',
          });
        }, 3000);
        return;
      }
    } else {
      const ftoken = await AsyncStorage.getItem('fbtoken');
      // console.log(ftoken);
      setLoading(true);

      return fetch('https://www.skillbay.app/api/v1/secretacreataccount', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          ftoken: ftoken,
        }),
      })
        .then(response => response.json())
        .then(async result => {
          // console.log(result);
          setLoading(false);
          await AsyncStorage.setItem('user', JSON.stringify(result.data));
          await AsyncStorage.setItem('jwt', result.token);

          navigation.navigate('Dashboard');
          return result;
        })
        .catch(err => {
          setLoading(false);
          // console.log(err);
          return err;
        });
    }
    // }catch{
    //   console
    // }
  };
  return (
    <View>
      <View style={Styles.LoginHome}>
        <View style={Styles.Loginheader}>
          <Pressable
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'white',
                borderRadius: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign name="arrowleft" color="red" size={25} />
            </View>
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 40,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              width: 80,
              height: 10,
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 50,
              marginTop: 15,
              marginBottom: 10,
            }}></View>
          <View style={Styles.LoginHeadertitle}>
            {error?.error && (
              <Text
                style={{
                  color: 'red',
                  paddingHorizontal: 0,
                  fontSize: 18,
                }}>
                {error.errormess}
              </Text>
            )}
            <Text
              style={{
                fontWeight: '900',
                color: 'rgba(0 ,0 ,0 , 0.8)',
                fontSize: 20,
              }}>
              Name
            </Text>
            <View
              style={{
                width: '100%',
              }}>
              <TextInput
                placeholder="Ex: @James_Bond"
                style={Styles.NameInput}
                onChangeText={e => setUsername(e)}
              />
            </View>
            <Text
              style={{
                fontWeight: '600',
                color: 'rgba(0 ,0,0 , 0.8)',
                fontSize: 18,
              }}>
              Email Address
            </Text>
            <View
              style={{
                width: '100%',
              }}>
              <TextInput
                placeholder="Email Address"
                style={Styles.NameInput}
                onChangeText={e => setEmail(e)}
              />
            </View>
            <Text
              style={{
                fontWeight: '600',
                color: 'rgba(0 ,0,0 , 0.8)',
                fontSize: 18,
              }}>
              Phone Number
            </Text>
            <KeyboardAvoidingView behavior="position">
              <View
                style={{
                  width: '100%',
                }}>
                <TextInput
                  placeholder="Ex: +91 98765 43210"
                  style={Styles.NameInput}
                  onChangeText={e => setPhone(e)}
                />
              </View>
            </KeyboardAvoidingView>

            {loading ? (
              <View
                style={{
                  height: 60,
                  width: '100%',
                  backgroundColor: 'black',
                  borderRadius: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                  marginTop: 10,

                  // borderWidth: 1,
                }}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  forsubmit();
                }}>
                <View style={Styles.Loginbutton}>
                  <Text
                    style={{
                      fontWeight: '900',
                      fontSize: 20,
                      color: 'white',
                    }}>
                    Submit
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
