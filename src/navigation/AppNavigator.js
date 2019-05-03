import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthenticationNavigator from './AuthenticationNavigator';
import SplashNavigator from './SplashNavigator';
import IntroNavigator from './IntroNavigator';

export const Intro= createAppContainer(createSwitchNavigator({
  Main: MainTabNavigator,
  Authentication: AuthenticationNavigator,
  Splash: SplashNavigator,
  Intro:IntroNavigator
}, 

{
  initialRouteName:'Intro'   
}));

export const Main= createAppContainer(createSwitchNavigator({
  Main: MainTabNavigator,
  Authentication: AuthenticationNavigator,
  Splash: SplashNavigator,
  Intro:IntroNavigator
}, 

{
  initialRouteName:'Main'   
}));