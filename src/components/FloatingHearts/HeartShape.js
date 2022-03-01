import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
function getRandomColor() {
  return `rgb(${getRandomNumber(127, 255)},${getRandomNumber(0, 50)},${getRandomNumber(127, 255)})`;
}

const HeartShape = () => {
  return (
    // <Image
    //   source={require('../../assets/ico_heart.png')}
    //   style={{
    //     width: 40,
    //     height: 40,
    //   }}
    // />
    <AntDesign name="heart" size={40}
      // color="#FF097D"
      color={getRandomColor()}
    />
  );
};

export default HeartShape;
