import React, { Component } from 'react';
import { Animated, FlatList, Platform, View } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

export default class Test extends React.Component {
  // translateX and translateY are not calculated for LongPressGestureHandler
  // This variables are used to get them
  x0 = null;
  y0 = null;

  listItemRefs = {};

  listItemMeasurements = {};

  measureTimeouts = {};

  // stores the position of our dragged element
  translate = new Animated.ValueXY({ x: 0, y: 0 });

  state = {
    dragging: null,
  };

  onGestureEvent = (event) => {
    const { x, y } = event.nativeEvent;
    // calculate and set translationXY variables while dragging
    const translateX = x - this.x0;
    const translateY = y - this.y0;
    this.translate.setValue({ x: translateX, y: translateY });
  };

  onHandlerStateChange = (event) => {
    const { state } = event.nativeEvent;
    if (state === State.ACTIVE) {
      this.onDragStart(event);
    }
    if (state === State.END || state === State.CANCELLED) {
      this.onDragEnd(event);
    }
  };

  onDragStart = (event) => {
    const { dragging } = this.state;
    const { x, y } = event.nativeEvent;
    // Finds the dragged list item
    // and renders it's copy over the FlatList
    const itemKey = this.findTouchedItemKey(x, y);
    if (itemKey && dragging !== itemKey) {
      this.x0 = x;
      this.y0 = y;
      this.setState({ dragging: itemKey });
    }
  };

  onDragEnd = (event) => {
    // Handle a momement when user drop the item somewhere

    // Clear initial touch gesture coordinates
    this.x0 = null;
    this.y0 = null;
  };

  removeHoverComponent = () => {
    this.setState({ dragging: null });
  };

  findTouchedItemKey = (touchX, touchY) => {
    const itemKeys = Object.keys(this.listItemRefs);
    const touchedItemKey = itemKeys.find((itemKey) => {
      const shape = this.listItemMeasurements[itemKey];
      if (!shape) {
        return false;
      }
      return checkPointBoxIntersection(touchX, touchY, shape);
    });
    return touchedItemKey;
  };

  measureAll = () => {
    // Coordinates are recalculated once their position
    // on the viewport changes. Otherwise, it's impossible
    // to find and highlight the touched item
    const itemKeys = Object.keys(this.listItemRefs);
    itemKeys.forEach(this.measureListItem);
  };

  measureListItem = (key) => {
    // setTimeout is required, otherwise all measurements will be 0
    if (this.measureTimeouts[key]) {
      clearTimeout(this.measureTimeouts[key]);
    }
    this.measureTimeouts[key] = setTimeout(this._measureListItem(key), MEASURE_TIMEOUT);
  };

  _measureListItem = (key) => () => {
    const { dragging } = this.state;
    const element = this.listItemRefs[key];
    if (!element || dragging) {
      return;
    }
    element.measureInWindow(this._onItemMeasured(key));
  };

  _onItemMeasured = (key) => (x, y, width, height) => {
    this.listItemMeasurements[key] = { x, y, width, height };
  };

  setListItemRef = (key) => (ref) => {
    this.listItemRefs[key] = ref;
    // Each item is measured, so it's possible
    // to calculate which list item is actually dragged
    // In my case I have a multicolumn FlatList, so
    // I use x, y, width and height
    this.measureListItem(key);
  };

  renderItem = ({ item, index }) => {
    const { draggedItemStyle, renderItem, keyExtractor } = this.props;
    const { dragging } = this.state;
    const itemKey = keyExtractor(item);
    const active = itemKey === dragging;
    const ListItem = renderItem({ item, index, active });
    const wrapperStyle = [];
    if (active) {
      // style your dragged item
      wrapperStyle.push(draggedItemStyle);
    }
    // `collapsable` prop is a must for Android
    // without it the measureInWindow won't work
    // as the View can be removed from the UI tree
    // as an optimization
    return (
      <View collapsable={false} style={wrapperStyle} ref={this.setListItemRef(itemKey)}>
        {ListItem}
      </View>
    );
  };

  renderHoverDraggingElement = () => {
    const { data, renderItem } = this.props;
    const { dragging } = this.state;

    // That's a hack for my particular case
    const index = data.findIndex((i) => i.id === dragging);
    const item = data[index];

    const ListItem = renderItem({ item, index, active: true });
    const { x, y } = this.listItemMeasurements[dragging];

    const style = {
      position: 'absolute',
      left: x,
      top: y,
      transform: [...this.translate.getTranslateTransform()],
    };
    return <Animated.View style={style}>{ListItem}</Animated.View>;
  };

  render() {
    const { dragging } = this.state;

    // For Android maxDist is set to Number.MAX_SAFE_INTEGER
    // with default value, the drag gesture will be canceled
    // https://kmagiera.github.io/react-native-gesture-handler/docs/handler-longpress.html#maxdist

    return (
      <>
        <LongPressGestureHandler
          shouldCancelWhenOutside={false}
          maxDist={Number.MAX_SAFE_INTEGER}
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onHandlerStateChange}
        >
          <FlatList
            {...this.props}
            onMomentumScrollEnd={this.measureAll}
            renderItem={this.renderItem}
            style={{ backgroundColor: 'grey' }}
          />
        </LongPressGestureHandler>
        <Modal
          isVisible={Boolean(dragging)}
          animationIn="fadeIn"
          animationOut="fadeOut"
          hasBackdrop={false}
          style={{ backgroundColor: 'grey' }}
        >
          {dragging ? this.renderHoverDraggingElement() : <View />}
        </Modal>
      </>
    );
  }
}
