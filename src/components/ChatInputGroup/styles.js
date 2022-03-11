import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize:18,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    borderColor: 'white',
    borderWidth: 1,
  },
  wrapIconHeart: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    zIndex: 2,
  },
  iconHeart: {
    width: 45,
    height: 45,
    zIndex: 2,
  },
  wrapIconSend: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconSend: {
    width: 33,
    height: 33,
  },
  iconCancel: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});

export default styles;
