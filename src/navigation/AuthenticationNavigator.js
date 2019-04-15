import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotScreen from '../screens/ForgotScreen';

const AuthenticationStack = createStackNavigator({

  Login:LoginScreen,
  Register:RegisterScreen,
  Forgot:ForgotScreen,
});
 

export default AuthenticationStack