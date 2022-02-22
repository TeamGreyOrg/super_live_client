import React, { Component } from "react";
import {
  StyleSheet,
  PanResponder,
  Animated,
} from "react-native";

export default class StreamCard extends Component {
  	constructor() {
    	super();

		this.state = {
			pan: new Animated.ValueXY(),
			showDraggable: true,
			dropAreaValues: null,
			opacity: new Animated.Value(1),
			display : 'flex',
		};
  	}

	normalPanResponder() {
		return PanResponder.create({
			onStartShouldSetPanResponder: (e, gesture) => true,
			onPanResponderGrant: (e, gesture) => {
				this.state.pan.setOffset({
					x: this._val.x,
					y: this._val.y
				})
				this.state.pan.setValue({ x:0, y:0})
			},
			onPanResponderMove: Animated.event([
					null, 
					{ dx: this.state.pan.x, dy: this.state.pan.y }
				],
				{useNativeDriver: true}
			),

			onPanResponderRelease: (e, gesture) => {
				console.log(gesture)
				// If drag to left stream
				if (gesture.moveX >= 75 && gesture.moveX <= 150 && gesture.moveY >= 110 && gesture.moveY <= 280) {
					Animated.timing(this.state.opacity, {
						toValue: 0,
						duration: 100, 
						useNativeDriver: true, 
					}).start(() =>
						this.setState({
							showDraggable: false,
							display: 'none'
						})
					);
				// If drag to right stream
				} else if (gesture.moveX >= 250 && gesture.moveX <= 350 && gesture.moveY >= 110 && gesture.moveY <= 280) {
					Animated.timing(this.state.opacity, {
						toValue: 0,
						duration: 100,
						useNativeDriver: true,
					}).start(() =>
						this.setState({
							 showDraggable: false,
							 display: 'none'
						})
					);
				} else {
					Animated.spring(this.state.pan, {
						toValue: { x: 0, y: 0 },
						friction: 5,
						useNativeDriver: true,
					}).start();
				}
				this.setState({panResponder: undefined})
			}
		});
	}

	componentWillMount() {
		this._val = { x:0, y:0 }
		this.state.pan.addListener((value) => this._val = value);

		this.panResponder = this.normalPanResponder();
	}

	render() {
		const panStyle = {
			transform: this.state.pan.getTranslateTransform()
		}
		return (
			<Animated.View
				{...this.panResponder.panHandlers}
				style={[panStyle, styles.streamCard, {opacity:this.state.opacity, display: this.state.display}]}
			/>
		);
  	}
}

let styles = StyleSheet.create({
  	streamCard: {
		width: 130,
    	height: 220,
    	backgroundColor: 'black',
		borderRadius: 10,
		marginRight: 15,
		marginTop: 2,
		marginTop: 400
  	}
});