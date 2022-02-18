import React from 'react';
import { Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
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
        <Text style={styles.title}>Input room title and product link</Text>
        <Text style={styles.inputHeader}>Room title</Text>
        <TextInput
          style={styles.input}
          onChangeText={(enteredRoomName) => this.setState({ enteredRoomName })}
          value={this.state.enteredRoomName}
        />
        <Text style={styles.inputHeader}>Product link</Text>
        <TextInput
          style={styles.input}
          onChangeText={(enteredProductLink) => this.setState({ enteredProductLink })}
          value={this.state.enteredProductLink}
        />
        <TouchableOpacity style={styles.liveStreamButton} onPress={this.onPressLiveStreamNow}>
          <Text style={styles.textButton}>LiveStream Now</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default Input;
