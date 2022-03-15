import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import styles from './styles';
import theme from '../Theme/theme';

const Footer = ({ onPreviewON, onPreviewOFF, onPressLiveStreamNow, onPressLogout }) => {
  const [ani, setani] = useState('');
  const onClick = () => setani('bounceOut');

  return (
    <>
      <SafeAreaView style={{ backgroundColor: theme.color.Black }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          backgroundColor: theme.color.Black,
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity style={styles.liveStreamButton} onPress={() => {onPressLiveStreamNow(), onPreviewOFF()}}>
          <Text style={styles.textButton}>방송 시작</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            onClick();
            onPressLogout();
          }}
        >
          <Text style={styles.textButton}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

Footer.propTypes = {
  onPressLogout: PropTypes.func,
  onPressLiveStreamNow: PropTypes.func,
};

Footer.defaultProps = {
  onPressLogout: () => null,
  onPressLiveStreamNow: () => null,
};

export default Footer;
