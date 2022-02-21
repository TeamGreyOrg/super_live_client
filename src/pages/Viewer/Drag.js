import React from 'react';
import Draggable from 'react-native-draggable';

const Drag = () => {
    dragFlag = false;
    handler = () => {
        return !dragFlag;
    }
    return (
        <View>
            <Draggable disabled={dragFlag}/>
        </View>
    )
}

export default Drag;