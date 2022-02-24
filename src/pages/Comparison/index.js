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

        const streamTwoHandler = this.streamTwoHandler.bind(this)
        const streamOneHandler = this.streamOneHandler.bind(this)

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };

        this.state = {
            orientation: isPortrait() ? 'portrait' : 'landscape',
            inputUrlFirst: null,
            inputUrlSecond: null,
            streamOneName: roomName,
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
        // this.xOffset = 0;
        this.scrollOffset = 0;
    };

    streamTwoHandler(roomName) {
        console.log('Passed argument from Child to Parent: ' + roomName);
        // this.setState({streamTwoName: arg}) 
        this.setState({inputUrlSecond: null})
        this.setState({inputUrlSecond: `${HTTP}/live/${roomName}.flv`})
        console.log('stream two url:', this.state.inputUrlSecond);
    }

    streamOneHandler(roomName) {
        console.log('Passed argument from Child to Parent: ' + roomName);
        // this.setState({streamTwoName: arg}) 
        this.setState({inputUrlFirst: null})
        this.setState({inputUrlFirst: `${HTTP}/live/${roomName}.flv`})
        console.log('stream one url:', this.state.inputUrlFirst);
    }

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

    renderPortraitNodePlayerView = (inputUrl) => {
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

    renderLandscapeNodePlayerView = (inputUrl) => {
        const { audioStatus } = this.props;
        console.log(inputUrl);
        console.log('inRender');
        if (!inputUrl) return null;
        return (
          <NodePlayerView
            style={styles.streamOneLandscape}
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

        const streamTwoHandler = this.streamTwoHandler;
        const streamOneHandler = this.streamOneHandler;

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
                        renderItem={({ item }) => <StreamCard data={item} streamTwoHandler = {streamTwoHandler.bind(this)} streamOneHandler = {streamOneHandler.bind(this)}/>}
                        keyExtractor={(item) => item._id}
                    />

                    <View style={styles.streamContainer}>
                        <View style={styles.streamOnePortrait}>
                            <View>
                            {this.renderPortraitNodePlayerView(this.state.inputUrlFirst)}
                            </View>
                        </View>
                        <View style={styles.streamTwoPortrait}>
                            <View>
                            {this.renderPortraitNodePlayerView(this.state.inputUrlSecond)}
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
                <View>
                    {this.renderLandscapeNodePlayerView(this.state.inputUrlFirst)}
                </View>
                <View>
                    {this.renderLandscapeNodePlayerView(this.state.inputUrlSecond)}
                </View>
            </View>
        </View>
        }

    }
}

export default Comparison;



