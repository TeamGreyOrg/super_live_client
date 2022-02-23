import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Button, Container, FlatList} from 'react-native';
import styles from './styles';
import StreamCard from "./StreamCard";
import { HTTP } from '../../config';
import { NodePlayerView } from 'react-native-nodemediaclient';
import get from 'lodash/get';
import SocketManager from '../../socketManager';

var screenWidth = Dimensions.get('window').width;
class Comparison extends React.Component {
    constructor(props) {
        super(props);

        const { route } = props;
        const userName = get(route, 'params.userName', '');
        const roomName = get(route, 'params.roomName');

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };

        this.state = {
            orientation: isPortrait() ? 'portrait' : 'landscape',
            inputUrlFirst: null,
            inputUrlSecond: null,
            streamOneName: userName,
            streamTwoName: '',
            streamCards: [],
        };

        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
        this.roomName = roomName;
        this.userName = userName;
        console.log(props);
        // this.xOffset = 0;
        this.scrollOffset = 0;
    };

    componentDidMount() {
        SocketManager.instance.emitGetStreamCards();
        SocketManager.instance.listenGetStreamCards((data) => {
            console.log('data received:', data)
            this.setState({ streamCards: data });
        });

        this.setState({
            inputUrlFirst: `${HTTP}/live/${this.state.streamOneName}.flv`,
            // use HLS from trasporting in media server to Viewer
            // inputUrlSecond: `${HTTP}/live/${this.state.streamTwoName}.flv`,
          });
    }

    onPressClose = () => {
        const { navigation } = this.props;
        console.log('pressed close!')
        navigation.pop(2);
      };

    renderNodePlayerView = (inputUrl) => {
        console.log('stream cards:', this.state.streamCards[0]);
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

    goIndex = () => {
        this.refs.flatListRef.scrollToIndex({animated: true,index:3});
    };

    render() {
        if (this.state.orientation === 'portrait') {

            const { streamCards } = this.state;

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
                    {/* <ScrollView style={styles.cardsContainer}  horizontal= {true} 
                                ref={(node) => this.scroll = node}
                                onScroll={event => {
                                    this.xOffset = event.nativeEvent.contentOffset.x
                                    // console.log(this.xOffset)
                                  }}
                                >
                        <View>
                            <Text style={styles.cardText}>{streamCards.length && streamCards[0].userName}</Text>
                            <StreamCard />
                        </View>
                        <View>
                            <Text style={styles.cardText}>{streamCards.length && streamCards[1].userName}</Text>
                            <StreamCard />
                        </View>
                        <View>
                            <Text style={styles.cardText}>{streamCards.length && streamCards[3].userName}</Text>
                            <StreamCard />
                        </View>
                    </ScrollView> */}

                    <FlatList
                        style={styles.cardsContainer}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        ref={(ref) => { this.flatListRef = ref; }}
                        onScroll={e => {
                            this.scrollOffset = e.nativeEvent.contentOffset.x;
                        }}
                        data={streamCards}
                        renderItem={({ item }) => <StreamCard data={item} />}
                        keyExtractor={(item) => item._id}
                    />

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
                            <TouchableOpacity style={styles.buttonLeft} onPress={() => {this.flatListRef.scrollToOffset({animated: true, offset: this.scrollOffset - 134})}}>
                            <Image
                                style={styles.icoLeft}
                                source={require('../../assets/left-arrow.png')}
                            />
                        </TouchableOpacity>
                        <Image
                                style={styles.icoCenter}
                                source={require('../../assets/scroll.png')}
                        />
                        <TouchableOpacity style={styles.buttonRight}  onPress={() => {this.flatListRef.scrollToOffset({animated: true, offset: this.scrollOffset + 134})}}>
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



