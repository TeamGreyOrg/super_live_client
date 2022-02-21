import { StyleSheet } from 'react-native';
import theme from '../Theme/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'ChangaOne-Regular',
    marginBottom: 30,
    textAlign: 'center',
    color: 'white',
  },
  loginBtn: {
    backgroundColor: '#34495e',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 25,
  },
  textButton: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'ChangaOne-Regular',
  },
  input: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 25,
    fontSize: 23,
    fontWeight: '600',
  },
  bgimage: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
