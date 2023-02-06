import {Dimensions, StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  Home: {
    width: '100%',
    height: Dimensions.get('window').height,
    // backgroundColor: 'red',
    // paddingHorizontal: 10,
    display: 'flex',
    // paddingVertical: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  backgroundimage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  Homecontainer: {
    width: '100%',
    height: '70%',
    display: 'flex',
    paddingHorizontal: 10,
    paddingVertical: 20,
    // backgroundColor: '#FBDA61',
    // backgroundImage: ` linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)`,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  Getstartedbutton: {
    height: 75,
    borderRadius: 45,
    width: '90%',
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 10,
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  GetStartedContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  GetstartedIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#222433',
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Styles};
