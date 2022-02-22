/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import get from 'lodash/get';
import styles from './styles';
import SocketManager from '../../socketManager';
import StreamCard from './StreamCard';

class Comparison extends React.Component {
  constructor(props) {
    super(props);

    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };

    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  onPressClose = () => {
    const { navigation } = this.props;
    console.log('pressed close!');
    navigation.pop(2);
  };

  render() {
    if (this.state.orientation === 'portrait') {
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../../assets/com_back_2.gif')} style={{ flex: 1 }}>
            <Image
              source={require('../../assets/ico_logo.png')}
              style={{ width: 62, height: 36, margin: 10, position: 'absolute' }}
            />
            <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
              <Image
                style={styles.icoClose}
                source={require('../../assets/ico_goback.png')}
                tintColor="white"
              />
            </TouchableOpacity>
            <View style={styles.streamContainer}>
              <View style={styles.streamOnePortrait}>
                <Text style={styles.title}>Current livestream</Text>
              </View>
              <View style={styles.streamTwoPortrait}>
                <Text style={styles.title}>Drag livestream here</Text>
              </View>
            </View>
            <Text style={styles.header}>진행중인 다른 LIVE</Text>

            <ScrollView style={styles.cardsContainer} horizontal>
              <StreamCard />
              <StreamCard />
              <StreamCard />
              <StreamCard />
              <StreamCard />
              <StreamCard />
              <StreamCard />
              <StreamCard />
            </ScrollView>
          </ImageBackground>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
          <Image
            style={styles.icoClose}
            source={require('../../assets/ico_goback.png')}
            tintColor="white"
          />
        </TouchableOpacity>
        <View style={styles.streamContainer}>
          <View style={styles.streamOneLandscape}>
            <Text style={styles.title}>Current livestream</Text>
          </View>
          <View style={styles.streamTwoLandscape}>
            <Text style={styles.title}>Drag livestream here</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Comparison;
