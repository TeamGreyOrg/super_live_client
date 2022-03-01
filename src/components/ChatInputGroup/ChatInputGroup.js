import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  // Image,
  Keyboard,
  Platform,
} from 'react-native';
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

export default class ChatInputGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  onPressSend = () => {
    const { message } = this.state;
    const { onPressSend } = this.props;
    onPressSend(message);
    Keyboard.dismiss();
    this.setState({ message: '' });
  };

  onPressHeart = () => {
    const { onPressHeart } = this.props;
    // console.log(imgArray[0]);
    onPressHeart();
  };

  onEndEditing = () => {
    Keyboard.dismiss();
    const { onEndEditing } = this.props;
    onEndEditing();
  };

  onFocus = () => {
    const { onFocus } = this.props;
    onFocus();
  };

  onChangeMessageText = (text) => [this.setState({ message: text })];

  renderContent() {
    const { message } = this.state;
    return (
      <>
        {/* <Image source={require('../../assets/001.png')} style={{width:200, height:50}} /> */}
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            placeholder="메시지를 입력해주세요"
            placeholderTextColor={'white'}
            backgroundColor='transparent'
            underlineColorAndroid="transparent"
            onChangeText={this.onChangeMessageText}
            value={message}
            autoCapitalize="none"
            autoCorrect={false}
            onEndEditing={this.onEndEditing}
            onFocus={this.onFocus}
            onSubmitEditing={this.onPressSend}
            multiline={false}
            returnKeyType="done"
          />
          {/* <TouchableOpacity
          style={styles.wrapIconSend}
          onPress={this.onPressSend}
          activeOpacity={0.6}
        >
          <Image source={require('../../assets/ico_send.png')} style={styles.iconSend} />
        </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.wrapIconHeart}
            onPress={this.onPressHeart}
            activeOpacity={0.6}
          >
            <AntDesign name="heart" size={40} color="#FF097D" />
          </TouchableOpacity>
        </View>
      </>
    );
  }

  render() {
    if (Platform.OS === 'android') {
      return <SafeAreaView style={styles.wrapper}>{this.renderContent()}</SafeAreaView>;
    }
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={{ flex: 1 }}>
          <KeyboardAccessory backgroundColor="transparent">
            {this.renderContent()}
          </KeyboardAccessory>
        </View>
      </SafeAreaView>
    );
  }
}

ChatInputGroup.propTypes = {
  onPressHeart: PropTypes.func,
  onPressSend: PropTypes.func,
  onFocus: PropTypes.func,
  onEndEditing: PropTypes.func,
};

ChatInputGroup.defaultProps = {
  onPressHeart: () => null,
  onPressSend: () => null,
  onFocus: () => null,
  onEndEditing: () => null,
};
