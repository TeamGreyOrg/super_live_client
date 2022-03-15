import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
function getRandomColor() {
  return `rgb(${getRandomNumber(127, 255)},${getRandomNumber(0, 50)},${getRandomNumber(127, 255)})`;
}

const HeartShape = () => {
  return (
    <AntDesign name="heart" size={40}
      color={getRandomColor()}
    />
  );
};

export default HeartShape;
