import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ReversedFlatList from 'react-native-reversed-flat-list';
import styles from './styles';
import MessageItem from './MessageItem';

export default class MessagesList extends Component {
  renderItem = ({ item }) => <MessageItem data={item} />;

  onContentSizeChange = () => {
    this.scrollToEnd({ animated: false });
  };

  render() {
    const { messages } = this.props;
    return (
      <View style={styles.wrapListMessages}>
        <ReversedFlatList data={messages} renderItem={this.renderItem} />
      </View>
    );
  }
}

MessagesList.propTypes = {
  /* eslint-disable */
  messages: PropTypes.array,
};

MessagesList.defaultProps = {
  messages: [],
};
