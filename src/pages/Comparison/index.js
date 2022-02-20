import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import get from 'lodash/get';
import SocketManager from '../../socketManager';
import StreamCard from "./StreamCard";

class Comparison extends React.Component {
    constructor(props) {
        super(props);

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };

        this.state = {
            orientation: isPortrait() ? 'portrait' : 'landscape'
        };

        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
    };

    onPressClose = () => {
        const { navigation } = this.props;
        console.log('pressed close!')
        navigation.pop(2);
      };

    render() {
        if (this.state.orientation === 'portrait') {
            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
                        <Image
                            style={styles.icoClose}
                            source={require('../../assets/ico_goback.png')}
                            tintColor="white"
                        />
                    </TouchableOpacity>
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
                    <View style={styles.streamContainer}>
                        <View style={styles.streamOnePortrait}>
                            <Text style={styles.title}>Current livestream</Text>
                        </View>
                        <View style={styles.streamTwoPortrait}>
                            <Text style={styles.title}>Drag livestream here</Text>
                        </View>
                    </View>
                    <Text style={styles.header}>진행중인 다른 LIVE</Text>
                </View>
            );
        } else {
            return <View style={styles.container}>
            <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
            <Image
                style={styles.icoClose}
                source={require('../../assets/ico_goback.png')}
                tintColor="white"
            />
            </TouchableOpacity>
            <View style={styles.streamContainer}>
                <View style={styles.streamOneLandscape}>
                    <Text style={styles.title}>Current livestream</Text>
                </View>
                <View style={styles.streamTwoLandscape}>
                    <Text style={styles.title}>Drag livestream here</Text>
                </View>
            </View>
        </View>
        }

    }
}

export default Comparison;



