import {Dimensions, StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  LoginHome: {
    width: '100%',
    height: Dimensions.get('window').height,
    backgroundColor: 'red',
    display: 'flex',
    // alignItems:"center",
    // justifyContent:"center"
  },

  Loginheader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    minHeight: 40,
  },
  LoginHeadertitle: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems:"flex-start",
    paddingHorizontal: 30,
    width: '100%',
    paddingVertical: 20,
  },
  NameInput: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgb( 239, 239, 240 )',
    borderColor: 'rgba(0,0,0,0.3)',
    color: 'black',
    fontSize: 17,
  },
  Loginbutton: {
    height: 60,
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 30,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    color: 'white',
    marginBottom: 10,
  },
  Loading: {
    height: 60,
    position: 'relative',
    width: '100%',
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoadingContainer: {
    borderWidth: 4,
    borderRadius: 50,
    borderColor: '#faebd7',
    borderBottomColor: 'black',
    width: 40,
    height: 40,
  },
  // background-image: radial-gradient( circle 400px at 6.8% 8.3%,  rgba(255,244,169,1) 0%, rgba(255,244,234,1) 100.2% );
});

export {Styles};
