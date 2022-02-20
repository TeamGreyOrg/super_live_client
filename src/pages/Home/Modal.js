import React from 'react';
import {View, Modal} from 'react-native'
import styles from './styles';
import { HTTP } from '../../config';
import { NodePlayerView } from 'react-native-nodemediaclient';
import Draggable from 'react-native-draggable';

const VideoModal = (props) => {
      const show = props.show;
      //const modalRef = React.useRef();
      
      let multiUrl = `${HTTP}/live/${props.roomName}.flv`;
      if (show){
        return (
          <Draggable
          renderSize={100}
          renderColor="black"
          >
          <View style={styles.PIPContainer} 
          >
              <NodePlayerView              
              style={styles.PIP}
              inputUrl={multiUrl}
              scaleMode="ScaleAspectFit"
              bufferTime={300}
              maxBufferTime={1000}
              autoplay
              />
          </View>
          </Draggable>
          
        );
      }
      return null;
  }



  export default VideoModal;
