/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  TextInput,
  ImageBackground,
  View,
} from 'react-native';
import get from 'lodash/get';
import styles from './styles';
import SocketManager from '../../socketManager';

class Input extends React.Component {
  constructor(props) {
    super(props);
    const { route } = props;
    const roomName = get(route, 'params.roomName');
    const userName = get(route, 'params.userName', '');
    this.state = {
      enteredRoomName: '',
      enteredProductLink: '',
    };
    this.roomName = roomName;
    this.userName = userName;
  }

  onPressLiveStreamNow = () => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    const { enteredRoomName } = this.state;
    const { enteredProductLink } = this.state;

    navigate('Streamer', { userName, roomName: userName, enteredRoomName, enteredProductLink });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignContent: 'center', width: '100%', marginLeft: 45 }}>
          <ImageBackground source={require('../../assets/ico_logo.png')} style={styles.bgimage} />
        </View>
        <Text style={styles.title}>나만의 방송을 시작해보세요</Text>
        <Text style={styles.inputHeader}>Room title</Text>
        <TextInput
          style={styles.input}
          placeholder="방제목을 입력 해주세요"
          onChangeText={(enteredRoomName) => this.setState({ enteredRoomName })}
          value={this.state.enteredRoomName}
        />
        <Text style={styles.inputHeader}>Product link</Text>
        <TextInput
          style={styles.input}
          placeholder="판매할 제품 링크를 입력 해주세요"
          onChangeText={(enteredProductLink) => this.setState({ enteredProductLink })}
          value={this.state.enteredProductLink}
        />
        <TouchableHighlight style={styles.liveStreamButton} onPress={this.onPressLiveStreamNow}
          activeOpacity={0.6}
          underlayColor="yellow"
        >
          <Text style={styles.textButton}>Super Live Now</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}

export default Input;
