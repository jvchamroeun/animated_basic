import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { 
  Platform, StyleSheet, 
  Text, View, TouchableOpacity, 
  Animated, Easing, Dimensions,
  Image,
} from 'react-native';

import StaggerComponent from './component/StaggerComponent';


var { width, height } = Dimensions.get('window');


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      fadeValue: new Animated.Value(0),
      xValue: new Animated.Value(0),
      yValue: new Animated.Value(0),
      zValue: new Animated.Value(0),
      springValue: new Animated.Value(0.3),
      rotateValue: new Animated.Value(0),
    }
  }

  _fadeAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000,
      }),
      Animated.timing(this.state.fadeValue, {
      toValue: 0,
      duration: 1000,
      }),
    ]).start(() => {
      // this/0.lkkKK._fadeAnimation();
    });
  }

  _moveAnimation = () => {
    Animated.timing(this.state.xValue, {
      toValue: width - 100,
      duration: 1000,
      // easing: Easing.linear,
      easing: Easing.back(),
    }).start(() => {
      Animated.timing(this.state.xValue, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
      }).start(() => {
        this._moveAnimation();
      });
    });
  }

  _springAnimation = () => {
    Animated.spring(this.state.springValue, {
      toValue: 1,
      friction: 1,
    }).start();
  }

  _rotateAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.rotateValue, {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear,
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 0,
        duration: 0,
      }),
    ]).start(() => {
      this._rotateAnimation();
    });
  }

  _moveAndRotateAnimation = () => {
    Animated.parallel([
      this._moveAnimation(),
      this._rotateAnimation()
    ]).start();
  }

  render() {

    const interpolateRotateAnimation = this.state.rotateValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.container}>
        <Animated.View 
          style={[styles.animationView, 
          {opacity: this.state.fadeValue},
          {left: this.state.yValue},
          {alignSelf: 'center'}
          ]}> 
        
        </Animated.View> 

        <TouchableOpacity style={styles.button}
          onPress={this._fadeAnimation}
        >
          <Text style={styles.buttonText}> Fade</Text>
        </TouchableOpacity>

        <Animated.Image
          source={require('./assets/atom.png')}
          style={[styles.imageView,
            {left: this.state.xValue},
            // {transform: [{ scale: this.state.springValue }], alignSelf: 'center'}
            { transform: [{ rotate: interpolateRotateAnimation}] }
          ]}>
        </Animated.Image>
        <TouchableOpacity style={styles.button}
          onPress={this._moveAndRotateAnimation}
        >
          <Text style={styles.buttonText}>Move and Rotate</Text>
        </TouchableOpacity>  

        <Animated.Image
          source={require('./assets/atom.png')}
          style={[styles.imageView,
            {left: this.state.zValue},
            {transform: [{ scale: this.state.springValue }], alignSelf: 'center'}
          ]}>
        </Animated.Image>
        <TouchableOpacity style={styles.button}
          onPress={this._springAnimation}
        >
          <Text style={styles.buttonText}>Spring</Text>
        </TouchableOpacity>  
        { /* <StaggerComponent/> */ }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  animationView: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
  },
  button: {
    backgroundColor: 'steelblue',
    height: 45,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    padding: 12,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  imageView: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
  },
});
