import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage, Alert } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';

import { initiateApp } from './src/store/actions/action'

import material from './native-base-theme/variables/material';
import variables from './native-base-theme/variables/variables';
import commonColor from './native-base-theme/variables/commonColor';
import platform from './native-base-theme/variables/platform';
import minimal from './native-base-theme/variables/minimal';

import AppNavigator from './src/navigation/AppNavigator';
import { Main, Intro } from './src/navigation/AppNavigator';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './src/store/reducers/Reducer';

const store = createStore(rootReducer, applyMiddleware(thunk))

export default class App extends React.PureComponent {
  state = {
    isLoadingComplete: false,
    notFirstTime: false
  };

  checkFirstTime = async () => {
    try {
      //const personalToken = await AsyncStorage.getItem('personalToken');
      const notFirstTime = await AsyncStorage.getItem('notFirstTime')
      if (notFirstTime !== null) {
        this.setState({ notFirstTime: true })
      }
    } catch (error) {
      console.log(`personalToken error ${error}`)
      return 'takde'
    }
  }

  async checkUpdate() {
    try {
      const update = await Expo.Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Expo.Updates.fetchUpdateAsync();
        Alert.alert(
          //title
          'Hello',
          //body
          'I am two option alert. Do you want to cancel me ?',
          [
            { text: 'Yes', onPress: () => console.log('Yes Pressed') },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
        Expo.Updates.reloadFromCache();
      }
    } catch (e) {
      // handle or log error
    }
  }

  componentDidMount() {
    this.checkUpdate()
    this.checkFirstTime()
    //store.dispatch(initiateApp())
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {

      return (
        <Provider store={store}>
          {/* minimal will produce error on CardItem */}
          <StyleProvider style={getTheme(material)}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

              {this.state.notFirstTime ? <Intro /> : <Intro />}
            </View>
          </StyleProvider>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./src/assets/images/splash.png'),
        require('./src/assets/images/robot-dev.png'),
        require('./src/assets/images/robot-prod.png'),
        require('./src/assets/images/mm_white.png'),
        require('./src/assets/images/icon.png'),

        require('./src/assets/images/intro/Home.png'),
        require('./src/assets/images/intro/Cart.png'),
        require('./src/assets/images/intro/Notifications.png'),
        require('./src/assets/images/intro/ProductDetail.png'),
        require('./src/assets/images/intro/Profile.png'),

        require('./src/assets/images/homeTop/topRated.png'),

        require('./src/assets/images/homeTop/beauty.png'),
        require('./src/assets/images/homeTop/bestSelling.png'),
        require('./src/assets/images/homeTop/freeShipping.png'),
        require('./src/assets/images/homeTop/furniture.png'),
        require('./src/assets/images/homeTop/gadgets.png'),
        require('./src/assets/images/homeTop/homeAppliances.png'),
        require('./src/assets/images/homeTop/men.png'),
        require('./src/assets/images/homeTop/new.png'),
        require('./src/assets/images/homeTop/others.png'),
        require('./src/assets/images/homeTop/sales.png'),
        require('./src/assets/images/homeTop/sports.png'),
        require('./src/assets/images/homeTop/woman.png'),

        require('./src/assets/images/adBiru.png'),
        require('./src/assets/images/adOren.png'),
        require('./src/assets/images/bannerOren.png'),
        require('./src/assets/images/rfqBgOren.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
        'Roboto_medium': require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
        'Montserrat_medium': require('./src/assets/fonts/Montserrat/Montserrat-Medium.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
