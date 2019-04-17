import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthenticationNavigator from './AuthenticationNavigator';
import SplashNavigator from './SplashNavigator';

export default createAppContainer(createSwitchNavigator({
  Main: MainTabNavigator,
  Authentication: AuthenticationNavigator,
  Splash: SplashNavigator,
}, {
  initialRouteName:'Main'   
}));