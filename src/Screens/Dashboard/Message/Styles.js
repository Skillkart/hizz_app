import {Dimensions, StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  Messages: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(93, 173, 226,0.1)',
    width: '100%',
    height: Dimensions.get('window').height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  Messagescontainer: {
    width: '80%',
    minHeight: 120,
    // backgroundColor: '#FBDA61',
    backgroundColor: 'black',
    borderRadius: 20,
  },
  Messagescontainerheader: {
    width: '100%',
    backgroundColor: 'red',
    // minHeight: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    paddingVertical: 30,
  },
  Messagescontainercontent: {
    width: '100%',
    minHeight: 10,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  Shareicon: {
    width: '100%',
    position: 'absolute',
    marginTop: 30,
    marginBottom: 20,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Shareiconcontainer: {
    width: 60,
    height: 60,
    backgroundColor: '#0000002e',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareiconbutton: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default Styles;
