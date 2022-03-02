import React from 'react';
import { View, SafeAreaView, Image, Text, ImageBackground } from 'react-native';
import styles from './styles';
import theme from '../Theme/theme';

export default function Header({ userName }) {
  return (
    <>
      {/* <SafeAreaView style={{ backgroundColor: theme.color.Black }} /> */}
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
