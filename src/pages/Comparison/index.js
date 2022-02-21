import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Button } from 'react-native';
import styles from './styles';
import get from 'lodash/get';
import SocketManager from '../../socketManager';
import StreamCard from "./StreamCard";

var screenWidth = Dimensions.get('window').width;
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
        this.xOffset = 0;
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
                    <View style={styles.topContainer}>
                        <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
                            <Image
                                style={styles.icoClose}
                                source={require('../../assets/ico_goback.png')}
                                tintColor="white"
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.cardsContainer}  horizontal= {true} 
                                ref={(node) => this.scroll = node}
                                onScroll={event => {
                                    this.xOffset = event.nativeEvent.contentOffset.x
                                    // console.log(this.xOffset)
                                  }}
                                >
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
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>진행중인 다른 LIVE</Text>
                    </View>
                        <TouchableOpacity style={styles.buttonLeft} onPress={() => { this.scroll.scrollTo({ x: this.xOffset - screenWidth / 2 }) }}>
                            <Image
                                style={styles.icoLeft}
                                source={require('../../assets/left-arrow.png')}
                            />
                        </TouchableOpacity>
                        <Image
                                style={styles.icoCenter}
                                source={require('../../assets/scroll.png')}
                        />
                        <TouchableOpacity style={styles.buttonRight}  onPress={() => { this.scroll.scrollTo({ x: this.xOffset + screenWidth / 2 }) }}>
                            <Image
                                style={styles.icoRight}
                                source={require('../../assets/right-arrow.png')}
                            />
                        </TouchableOpacity>
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



