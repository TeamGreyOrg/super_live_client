import React from 'react';
import PropTypes from 'prop-types';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const REGEX = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/g;

export default class BannerButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onLinkPressed = () => {
    const { goodsUrl } = this.props;
    Linking.openURL(goodsUrl.match(REGEX)[0]);
  };

  renderFastImage = (imageLink, faviconLink) => {
    if (imageLink) {
      return (
        <FastImage
          style={styles.imageStyle}
          source={{ uri: imageLink, priority: FastImage.priority.normal }}
          resizeMode={FastImage.resizeMode.contain}
        />
      );
    }
    if (faviconLink) {
      return (
        <FastImage
          style={styles.faviconStyle}
          source={{ uri: faviconLink, priority: FastImage.priority.normal }}
          resizeMode={FastImage.resizeMode.contain}
        />
      );
    }
    return null;
  };

  renderText = (showTitle, showDescription, titleNumberOfLines, descriptionNumberOfLines) => {
    return (
      <View style={styles.textContainerStyle}>
        {showTitle && (
          <Text numberOfLines={titleNumberOfLines} style={styles.titleStyle}>
            {showTitle}
          </Text>
        )}
        {showDescription && (
          <Text numberOfLines={descriptionNumberOfLines} style={styles.descriptionStyle}>
            {showDescription}
          </Text>
        )}
      </View>
    );
  };

  renderLinkPreview = (
    // goodsUrl,
    imageLink,
    faviconLink,
    showTitle,
    showDescription,
    titleNumberOfLines,
    descriptionNumberOfLines
  ) => {
    return (
      <View style={styles.footerBarURL}>
        <TouchableOpacity
          style={[styles.linkContainerStyle]}
          activeOpacity={0.9}
          onPress={() => this._onLinkPressed()}
        >
          {this.renderFastImage(imageLink, faviconLink)}
          {this.renderText(
            showTitle,
            showDescription,
            titleNumberOfLines,
            descriptionNumberOfLines
          )}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      isUri,
      // goodsUrl,
      linkImg,
      linkFavicon,
      linkTitle,
      linkDesc,
      titleNumberOfLines,
      descriptionNumberOfLines,
      imageProps,
    } = this.props;
    return isUri
      ? this.renderLinkPreview(
          // goodsUrl,
          linkImg,
          linkFavicon,
          linkTitle,
          linkDesc,
          titleNumberOfLines,
          descriptionNumberOfLines,
          imageProps
        )
      : null;
  }
}

BannerButton.defaultProps = {
  goodsUrl: null,
  isUri: true,
  linkImg: '',
  linkFavicon: '',
  linkTitle: '',
  linkDesc: '',
  requestOptions: {},
  titleNumberOfLines: 2,
  descriptionNumberOfLines: 1,
  imageProps: { resizeMode: 'contain' },
};

BannerButton.propTypes = {
  goodsUrl: PropTypes.string,
  isUri: PropTypes.bool,
  linkImg: PropTypes.string,
  linkFavicon: PropTypes.string,
  linkTitle: PropTypes.string,
  linkDesc: PropTypes.string,
  titleNumberOfLines: Text.propTypes ? Text.propTypes.numberOfLines : PropTypes.number,
  descriptionNumberOfLines: Text.propTypes ? Text.propTypes.numberOfLines : PropTypes.number,
  requestOptions: PropTypes.shape({
    headers: PropTypes.objectOf(PropTypes.string),
    imagesPropertyType: PropTypes.string,
    proxyUrl: PropTypes.string,
  }),
  imageProps: Text.propTypes ? Text.propTypes.style : PropTypes.object,
};
