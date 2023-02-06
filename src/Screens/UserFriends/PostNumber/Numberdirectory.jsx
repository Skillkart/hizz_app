import {Dimensions, Pressable, ScrollView, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {phonedirectory} from '../../../phonelocales/Ismobilenumbers';

const Numberdirectory = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <ScrollView
      style={{
        position: 'absolute',
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'white',
        left: 0,
        bottom: 0,
        zIndex: 1000,
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 40,
      }}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
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
      </Pressable>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 22,
            color: 'black',
          }}>
          Select Country
        </Text>
        {phonedirectory.map((location, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                dispatch({
                  type: 'countrylist',
                  payload: location,
                });
                navigation.goBack();
              }}
              style={{
                paddingVertical: 10,
                marginTop: 10,
                marginBottom: 5,
                paddingHorizontal: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 50,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'black',
                  fontSize: 17,
                }}>
                {location?.countryname}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'black',
                  fontSize: 17,
                }}>
                {location?.isdcode}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};
export default Numberdirectory;
