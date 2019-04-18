import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CartDetailScreen from '../screens/CartDetailScreen';
import OrderScreen from '../screens/OrderScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CheckOutScreen from '../screens/CheckoutScreen';
import CheckoutScreenNew from '../screens/CheckoutScreenNew';
import SearchScreen from '../screens/SearchScreen';
import AddToCartScreen from '../screens/AddToCartScreen';
import CartScreen from '../screens/CartScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AccountScreen from '../screens/AccountScreen';
import EditAccountScreen from '../screens/EditAccountScreen';
import NotificationDetailsScreen from '../screens/NotificationDetailsScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});


const RootStack = createStackNavigator(
  {
    Main: {
      screen: HomeStack,
    },
    CartDetail: {
      screen: CartDetailScreen,
    },
    Order: {
      screen: OrderScreen,
    },
    Orders: {
      screen:OrdersScreen,
    },
    ProductDetail: {
      screen: ProductDetailScreen,
    },
    AddToCart: {
      screen:AddToCartScreen,
    },
    Checkout: {
      screen:CheckoutScreenNew,
    },
    Search: {
      screen:SearchScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

RootStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarVisible:false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const CartStack = createStackNavigator({
  Cart: CartScreen,
});

CartStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarVisible:false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const NotificationStack = createStackNavigator({
  Notification: NotificationScreen,
  NotificationDetail: NotificationDetailsScreen,
});

NotificationStack.navigationOptions = {
  tabBarVisible:false,
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const AccountStack = createStackNavigator({
  Account: AccountScreen,
  EditAccount :EditAccountScreen,
});

AccountStack.navigationOptions = {
  tabBarVisible:false,
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  RootStack,
  CartStack,
  NotificationStack,
  AccountStack
});
