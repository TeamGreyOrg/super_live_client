import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';

export default function Header({ userName }) {
  return (
    <>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'black',
          height: 50,
        }}
      >
        <View style={{ justifyContent: 'flex-start' }}>
          <Image
            source={require('../../assets/ico_logo.png')}
            style={{ width: 62, height: 36, margin: 5 }}
          />
        </View>
        <View style={{ justifyContent: 'flex-end', margin: 5 }}>
          <Text style={styles.welcomeText}>{userName}</Text>
        </View>
      </View>
    </>
  );
}
