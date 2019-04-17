//import {Google}
import React from 'react';
import {
  Image,  
  View,  
  Animated
} from 'react-native';


import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class AnimatedSplashScreen extends React.PureComponent {
  static navigationOptions = {
    header: null 
  };

  state = {
    fadeAnim: new Animated.Value(1),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 0,                   // Animate to opacity: 1 (opaque)
        duration: 20000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }


  render() {
    let { fadeAnim } = this.state;
    
    return (
        <View style={{flex:1}}>
        <Animated.Image source={require('../assets/images/splash.png')} resizeMode={'cover'} style={{flex:1,width:undefined,height:undefined,opacity:fadeAnim}} />
            </View>
      
    );
  }
}

function mapStateToProps(state) {
  return {  
  }
}

function mapDispatchToProps(dispatch) {
  return {    
 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AnimatedSplashScreen)