import React, {Component} from 'react';
import posed from 'react-native-pose';

const Box = posed.View({
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
});

export default ({ isVisible }) => (
  <Box
    style={{ width: 100, height: 100, backgroundColor: "red" }}
    pose={isVisible ? "visible" : "hidden"}
  />
);