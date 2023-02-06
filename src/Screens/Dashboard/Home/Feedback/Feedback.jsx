import {View, Text, Pressable, Linking} from 'react-native';
import React from 'react';
import {Style} from './Feedbackstyle';
import {useDispatch} from 'react-redux';

export default function Feedback() {
  const dispatch = useDispatch();
  return (
    <View style={Style.feedbackcontainer}>
      <View style={Style.feedback}>
        <Text style={Style.heading}>Loving our app 😊!</Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
          }}>
          Rate Us Now
        </Text>
        <View style={Style.ratingbutton}>
          <Pressable
            onPress={() => {
              dispatch({
                type: 'showfeedback',
                payload: false,
              });
            }}
            style={{
              width: '50%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: '700',
              }}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL(`market://details?id=com.hizz`);
            }}
            style={{
              width: '50%',
              backgroundColor: 'black',
              height: 50,
              borderRadius: 30,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              Rate us
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
