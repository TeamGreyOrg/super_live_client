/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Text,
  TouchableHighlight,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground,
  View,
} from 'react-native';
import get from 'lodash/get';
import styles from './styles';

class Input extends React.Component {
  constructor(props) {
    super(props);
    const { route } = props;
    const userName = get(route, 'params.userName', '');
    this.state = {
      roomName: '',
      productLink: '',
      productPrice: 0,
    };
    this.userName = userName;
  }

  // Get all DB data

  onPressLiveStreamNow = () => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;

    // Lopp over livestreams
      // Alert if username or roomname is duplicated

    navigate('Streamer', { userName: userName, roomName: this.state.roomName, productLink: this.state.productLink, productPrice: this.state.productPrice });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignContent: 'center', width: '100%', marginLeft: 45 }}>
          <ImageBackground source={require('../../assets/ico_logo.png')} style={styles.bgimage} />
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.title}>나만의 방송을 시작해보세요</Text>
          <Text style={styles.inputHeader}>Room title</Text>

          <TextInput
            style={styles.input}
            placeholder="방제목을 입력 해주세요"
            onChangeText={(roomName) => this.setState({ roomName })}
            value={this.state.roomName}
          />
          <Text style={styles.inputHeader}>Product link</Text>
          <TextInput
            style={styles.input}
            placeholder="판매할 제품 링크를 입력 해주세요"
            onChangeText={(productLink) => this.setState({ productLink })}
            value={this.state.productLink}
          />
          <Text style={styles.inputHeader}>Product Price</Text>
          <TextInput
            style={styles.input}
            placeholder="#판매할 제품의 가격을 입력 해주세요"
            onChangeText={(productPrice) => this.setState({ productPrice })}
            value={this.state.productPrice}
          />
        </KeyboardAvoidingView>
        <TouchableHighlight
          style={styles.liveStreamButton}
          onPress={this.onPressLiveStreamNow}
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
