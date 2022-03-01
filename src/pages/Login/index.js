import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import styles from './styles';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '1',
    };
  }

  onPressLogin = () => {
    const { userName } = this.state;
    if (userName === '') return Alert.alert('Please input userName');
    const {
      navigation: { navigate },
    } = this.props;
    return navigate('Home', { userName });
  };

  onChangeUserName = (userName) => this.setState({ userName });

  render() {
    const { userName } = this.state;
    return (
      <ImageBackground source={require('../../assets/login_bg.png')} style={styles.bgimage}>
        <StatusBar barStyle="light-content" animated backgroundColor="black" />
        <View style={styles.container}>
          <Image
            source={require('../../assets/splash_icon.png')}
            style={{ width: 200, height: 130, marginLeft: 10 }}
          />
          <Text style={styles.text}>WELCOME{'\n'}ON AIR SUPER LIVE</Text>
          <TextInput
            style={styles.input}
            placeholder="Please type any name"
            placeholderTextColor="gray"
            value={userName}
            onChangeText={this.onChangeUserName}
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.loginBtn} onPress={this.onPressLogin}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Login;
