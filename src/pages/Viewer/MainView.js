import React, {useState} from 'react';
import ChatInputGroup from '../../components/ChatInputGroup';
import MessagesList from '../../components/MessagesList/MessagesList';
import { NodePlayerView } from 'react-native-nodemediaclient';
import View from 'react-native';
import get from 'lodash/get';

const MainView = (props) => {
    const { route } = props;
    const data = get(route, 'params.data');
    const roomName = get(data, 'roomName');
    const userName = get(route, 'params.userName', '');
    const [isVisibleMessages, setVisibleMsg] = useState(false);
    const onPressHeart = () => {
        SocketManager.instance.emitSendHeart({
        roomName: roomName,
        });
    };
    const onPressSend = (message) => {
        SocketManager.instance.emitSendMessage({
        roomName: roomName,
        userName: userName,
        message,
        });
        setVisibleMsg(true);
    };
    const onEndEditing = () => {
        setVisibleMsg(true);
    };

    const onFocusChatGroup = () => {
        setVisibleMsg(false);
    };

        const renderNodePlayerView = () => {
            if (!props.inputUrl) return null;
            return (
            <NodePlayerView
            style={styles.playerView}
            ref={(vb) => {
              this.nodePlayerView = vb;
            }}
            inputUrl={props.inputUrl}
            scaleMode="ScaleAspectFit"
            bufferTime={300}
            maxBufferTime={1000}
            autoplay
          />
        );
      };
    
      const renderChatGroup = () => {
        return (
          <ChatInputGroup
            onPressHeart={onPressHeart}
            onPressSend={onPressSend}
            onFocus={onFocusChatGroup}
            onEndEditing={onEndEditing}
          />
        );
      };
    
      const renderListMessages = () => {
        if (!isVisibleMessages) return null;
        return <MessagesList messages={props.messages} />;
      };

      return (
        <View>
        {renderNodePlayerView()}
        {renderChatGroup()}
        {renderListMessages()}
        </View>
      );
}

export default MainView;