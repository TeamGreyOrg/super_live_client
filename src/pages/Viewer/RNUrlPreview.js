import React from 'react';
import { getLinkPreview } from 'link-preview-js';
import PropTypes from 'prop-types';
import { Image, Linking, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const REGEX = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/g;

export default class RNUrlPreview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isUri: false,
      linkTitle: undefined,
      linkDesc: undefined,
      linkFavicon: undefined,
      linkImg: undefined,
    };
    this.getPreview(props.text, props.requestOptions);
  }

  getPreview = (text, options) => {
    const { onError, onLoad } = this.props;
    getLinkPreview(text, options)
      .then((data) => {
        onLoad(data);
        this.setState({
          isUri: true,
          linkTitle: data.title ? data.title : undefined,
          linkDesc: data.description ? data.description : undefined,
          linkImg:
            data.images && data.images.length > 0
              ? data.images.find((element) => {
                  return (
                    element.includes('.png') ||
                    element.includes('.jpg') ||
                    element.includes('.jpeg')
                  );
                })
              : undefined,
          linkFavicon:
            data.favicons && data.favicons.length > 0
              ? data.favicons[data.favicons.length - 1]
              : undefined,
        });
      })
      .catch((error) => {
        onError(error);
        this.setState({ isUri: false });
      });
  };

  _onLinkPressed = () => {
    const { text } = this.props;
    Linking.openURL(text.match(REGEX)[0]);
  };

  renderImage = (imageLink, faviconLink) => {
    if (imageLink) {
      return <Image style={styles.imageStyle} source={{ uri: imageLink }} {...styles.imageProps} />;
    }
    if (faviconLink) {
      return (
        <Image style={styles.faviconStyle} source={{ uri: faviconLink }} {...styles.imageProps} />
      );
    }
    return null;
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

  renderText = (
    showTitle,
    showDescription,
    title,
    description,
    // textContainerStyle,
    // titleStyle,
    descriptionStyle,
    titleNumberOfLines,
    descriptionNumberOfLines
  ) => {
    return (
      <View style={styles.textContainerStyle}>
        {showTitle && (
          <Text numberOfLines={titleNumberOfLines} style={styles.titleStyle}>
            {title}
          </Text>
        )}
        {showDescription && (
          <Text numberOfLines={descriptionNumberOfLines} style={styles.descriptionStyle}>
            {description}
          </Text>
        )}
      </View>
    );
  };

  renderLinkPreview = (
    linkContainerStyle,
    imageLink,
    faviconLink,
    imageStyle,
    faviconStyle,
    showTitle,
    showDescription,
    title,
    description,
    // textContainerStyle,
    // titleStyle,
    descriptionStyle,
    titleNumberOfLines,
    descriptionNumberOfLines,
    imageProps
  ) => {
    return (
      <View style={styles.footerBarURL}>
        <TouchableOpacity
          style={[styles.linkContainerStyle]}
          activeOpacity={0.9}
          onPress={() => this._onLinkPressed()}
        >
          {/* {this.renderImage(imageLink, faviconLink, imageStyle, faviconStyle, imageProps)} */}
          {this.renderFastImage(imageLink, faviconLink, imageStyle, faviconStyle)}
          {this.renderText(
            showTitle,
            showDescription,
            title,
            description,
            // textContainerStyle,
            // titleStyle,
            descriptionStyle,
            titleNumberOfLines,
            descriptionNumberOfLines
          )}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      text,
      linkContainerStyle,
      imageStyle,
      faviconStyle,
      // textContainerStyle,
      title,
      description,
      // titleStyle,
      titleNumberOfLines,
      descriptionStyle,
      descriptionNumberOfLines,
      imageProps,
    } = this.props;
    const { isUri, linkImg, linkFavicon, linkTitle, linkDesc } = this.state;
    return isUri
      ? this.renderLinkPreview(
          linkContainerStyle,
          linkImg,
          linkFavicon,
          imageStyle,
          faviconStyle,
          title,
          description,
          linkTitle,
          linkDesc,
          // textContainerStyle,
          // titleStyle,
          descriptionStyle,
          titleNumberOfLines,
          descriptionNumberOfLines,
          imageProps
        )
      : null;
  }
}

RNUrlPreview.defaultProps = {
  onLoad: () => {},
  onError: () => {},
  text: null,
  requestOptions: {},
  linkContainerStyle: {
    backgroundColor: 'rgba(239, 239, 244, 0.5)',
    alignItems: 'center',
  },
  faviconStyle: {
    width: 40,
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
  },
  textContainerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  title: true,
  description: true,
  titleStyle: {
    fontSize: 17,
    color: '#000',
    marginRight: 10,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  titleNumberOfLines: 2,
  descriptionStyle: {
    fontSize: 14,
    color: '#81848A',
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  descriptionNumberOfLines: 1,
  imageProps: { resizeMode: 'contain' },
};

RNUrlPreview.propTypes = {
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  text: PropTypes.string,
  linkContainerStyle: ViewPropTypes ? ViewPropTypes.style : PropTypes.object,
  faviconStyle: ViewPropTypes ? ViewPropTypes.style : PropTypes.object,
  textContainerStyle: ViewPropTypes ? ViewPropTypes.style : PropTypes.object,
  title: PropTypes.bool,
  description: PropTypes.bool,
  titleStyle: Text.propTypes ? Text.propTypes.style : PropTypes.object,
  titleNumberOfLines: Text.propTypes ? Text.propTypes.numberOfLines : PropTypes.number,
  descriptionStyle: Text.propTypes ? Text.propTypes.style : PropTypes.object,
  descriptionNumberOfLines: Text.propTypes ? Text.propTypes.numberOfLines : PropTypes.number,
  requestOptions: PropTypes.shape({
    headers: PropTypes.objectOf(PropTypes.string),
    imagesPropertyType: PropTypes.string,
    proxyUrl: PropTypes.string,
  }),
  imageProps: Text.propTypes ? Text.propTypes.style : PropTypes.object,
};
