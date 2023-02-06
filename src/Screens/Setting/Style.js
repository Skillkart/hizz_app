import {Dimensions, StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  Setting: {
    width: '100%',
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
    // paddingHorizontal: 10,
  },
  settingHeader: {
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
    // height: 50,
  },
  settingcontainer: {
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  settingcontaineroption: {
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  settingcontainerfollow: {
    width: '75%',
    height: 60,
    borderWidth: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: 20,
    borderColor: 'rgba(255, 255,255, 0.8)',
  },
  settingcontainerf: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {Styles};
