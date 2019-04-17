import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthenticationNavigator from './AuthenticationNavigator';
import SplashNavigator from './SplashNavigator';

export default createAppContainer(createSwitchNavigator({
<<<<<<< HEAD
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
=======
  Main: MainTabNavigator,
  Authentication: AuthenticationNavigator,
  Splash: SplashNavigator,
}, {
  initialRouteName:'Main'   
>>>>>>> origin/april16
}));