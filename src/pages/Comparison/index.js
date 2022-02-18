import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './styles';
import get from 'lodash/get';
import SocketManager from '../../socketManager';
import StreamCard from "./StreamCard";

class Comparison extends React.Component {
    constructor(props) {
        super(props);
    };

    onPressClose = () => {
        const { navigation } = this.props;
        navigation.pop(2);
      };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.cardsContainer}  horizontal= {true}>
                    <StreamCard />
                    <StreamCard />
                    <StreamCard />
                    <StreamCard />
                    <StreamCard />
                    <StreamCard />
                    <StreamCard />
                    <StreamCard />
                </ScrollView>
                <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
                <Image
                    style={styles.icoClose}
                    source={require('../../assets/close.png')}
                    tintColor="white"
                />
                </TouchableOpacity>
                <View style={styles.streamContainer}>
                    <View style={styles.streamOne}>
                        <Text style={styles.title}>Current livestream</Text>
                    </View>
                    <View style={styles.streamTwo}>
                        <Text style={styles.title}>Drag livestream here</Text>
                    </View>
                </View>
                <Text style={styles.header}>진행중인 다른 LIVE</Text>
            </View>
        );
    }
}

export default Comparison;



