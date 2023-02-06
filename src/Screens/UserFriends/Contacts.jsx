import {View, Text} from 'react-native';
import React from 'react';

const Contacts = ({contact}) => {
  return (
    <View
      //   key={index}
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 2,
      }}>
      <View></View>
      <View>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins-SemiBold',

            fontSize: 16,
          }}>
          {contact?.displayName}
        </Text>
        <Text>{contact?.phoneNumbers[0]?.number}</Text>
      </View>
    </View>
  );
};

export default Contacts;
