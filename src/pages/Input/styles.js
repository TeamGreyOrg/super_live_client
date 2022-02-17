import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 25,
    fontSize: 23,
    fontWeight: '600',
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: '700',
    marginLeft: 20,
    marginVertical: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  liveStreamButton: {
    backgroundColor: '#34495e',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 25,
    marginBottom: 15,
  },
  textButton: {
    color: 'white',
    fontSize: 25,
  },
  inputHeader: {
      fontSize: 20,
      color: 'white',
      marginLeft: 20,
  }
});

export default styles;
