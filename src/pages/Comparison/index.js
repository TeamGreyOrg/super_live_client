import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Button } from 'react-native';
import styles from './styles';
import StreamCard from "./StreamCard";
import { HTTP } from '../../config';
import { NodePlayerView } from 'react-native-nodemediaclient';

var screenWidth = Dimensions.get('window').width;
class Comparison extends React.Component {
    constructor(props) {
        super(props);

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };

        this.state = {
            orientation: isPortrait() ? 'portrait' : 'landscape',
            inputUrlFirst: null,
            inputUrlSecond: null,
        };

        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
        this.roomName = props.roomName;
        this.userName = props.userName;
        console.log(props);
        this.xOffset = 0;
    };

    componentDidMount() {
        this.setState({
            inputUrlFirst: `${HTTP}/live/1.flv`,
            // use HLS from trasporting in media server to Viewer
            inputUrlSecond: `${HTTP}/live/2.flv`,
          });
    }

    onPressClose = () => {
        const { navigation } = this.props;
        console.log('pressed close!')
        navigation.pop(2);
      };

    renderNodePlayerView = (inputUrl) => {
        const { audioStatus } = this.props;
        console.log(inputUrl);
        console.log('inRender');
        if (!inputUrl) return null;
        return (
          <NodePlayerView
            style={styles.streamOnePortrait}
            ref={(vb) => {
              this.nodePlayerView = vb;
            }}
            inputUrl={inputUrl}
            scaleMode="ScaleAspectFit"
            bufferTime={300}
            maxBufferTime={1000}
            audioEnable={audioStatus}
            autoplay
          />
        );
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
                            <View>
                            {this.renderNodePlayerView(this.state.inputUrlFirst)}
                            </View>
                        </View>
                        <View style={styles.streamTwoPortrait}>
                            <View>
                            {this.renderNodePlayerView(this.state.inputUrlSecond)}
                            </View>
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



