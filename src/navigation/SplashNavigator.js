import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import AnimatedSplashScreen from '../screens/AnimatedSplashScreen';


const SplashStack = createStackNavigator({
  AnimatedSplash:AnimatedSplashScreen,

});
 

export default SplashStack