import React from 'react';
import { View, SafeAreaView, Image, Text } from 'react-native';
import styles from './styles';
import theme from '../Theme/theme';

export default function Header({ userName }) {
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
        }}
      >
        <View style={{ justifyContent: 'flex-start' }}>
          <Image
            source={require('../../assets/ico_logo.png')}
            style={{ width: 62, height: 36, margin: 5 }}
          />
        </View>
        <View style={{ justifyContent: 'flex-end', margin: 5 }}>
          <Text style={styles.welcomeText}>WelCome!! : {userName}</Text>
        </View>
      </View>
    </>
  );
}
