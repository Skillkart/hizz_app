import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Postnumber from './PostNumber/Postnumber';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
import Contact from './Contacts';

const Friends = ({navigation}) => {
  const user = useSelector(state => state.userdata);
  const [contactlist, setContactlist] = useState();
  const [loading, setLoading] = useState(false);
  // const contactlist = useSelector(state => state.contactlist);

  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };
  const renderItem = ({item, index}) => {
    return <Contact contact={item} />;
  };

  const handlecontact = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      .then(result => {
        console.log(result);
        Contacts.getAll()
          .then(contacts => {
            // contacts.sort((b, a) => {
            //   return a.displayName < b.displayName;
            // });
            setContactlist(contacts);

            // work with contacts
          })
          .catch(e => {
            console.log(e);
            //handle error })
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    handlecontact();
  }, []);
  //
  // if (loading) {
  //   return <ActivityIndicator />;
  // } else {
  return (
    <View
      style={{
        width: '100%',
        // paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: 'white',
        height: Dimensions.get('window').height - 79,
      }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 22,
            color: 'black',
            fontFamily: 'Poppins-SemiBold',
          }}>
          Contacts
        </Text>
      </View>
      <ScrollView>
        <FlatList
          scrollEnabled={false}
          data={contactlist}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.list}
        />
      </ScrollView>
      {/* <Postnumber navigation={navigation} /> */}
    </View>
  );
  // }
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default Friends;
