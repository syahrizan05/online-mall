import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotScreen from '../screens/ForgotScreen';
import IntroScreen from '../screens/IntroScreen';

const IntroStack = createStackNavigator({

  Intro:IntroScreen,
  
});
 

export default IntroStack