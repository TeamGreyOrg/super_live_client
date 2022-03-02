import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapListMessages: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    height: screenWidth / 1.5,
    width: screenWidth,
    zIndex: 2,
  },
  chatItem: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  messageItem: {
    flexDirection: 'row',
  },
  avatar: {
    width: 45,
    height: 45,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'yellow',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  content: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default styles;
