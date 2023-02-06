import {Dimensions, StyleSheet} from 'react-native';

export const Style = StyleSheet.create({
  feedbackcontainer: {
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('window').height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100000,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  feedback: {
    width: '90%',
    height: 180,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  heading: {
    fontWeight: '800',
    color: 'black',
    fontSize: 20,
  },
  ratingbutton: {
    width: '100%',
    height: '65%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
