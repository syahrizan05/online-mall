import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

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
import FavoriteScreen from '../screens/FavoriteScreen';
import EditEmailScreen from '../screens/EditEmailScreen';
import ViewAddressScreen from '../screens/ViewAddressScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import EditAddressScreen from '../screens/EditAddressScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import CountryScreen from '../screens/CountryScreen';
import StateScreen from '../screens/StateScreen';
import ShopDetailScreen from '../screens/ShopDetailScreen';
import HomeScreen1 from '../screens/HomeScreen1';
import HomeScreen2 from '../screens/HomeScreen2';
import ChatShopScreen from '../screens/ChatShopScreen';
import MessageScreen from '../screens/MessageScreen';

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
    ShopDetail: {
      screen: ShopDetailScreen,
    },
    ChatShop: {
      screen: ChatShopScreen,
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
    Home1: {
      screen:HomeScreen1,
    },
    Home2: {
      screen:HomeScreen2,
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

const CartStackWithModal = createStackNavigator(
  {
    Cart: {
      screen: CartStack,
    },
    CheckOutScreen: {
      screen: CheckoutScreenNew,
    },    
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

CartStackWithModal.navigationOptions = {
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
  Message: MessageScreen
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



const AcountWithModalStack = createStackNavigator(
  {
    Account: {
      screen: AccountStack,
    },
    Favorite: {
      screen: FavoriteScreen,
    },
    EditEmail:{
      screen: EditEmailScreen,
    },
    ViewAddress:{
      screen: ViewAddressScreen,
    },
    AddAddress:{
      screen: AddAddressScreen,
    },
    Country:{
      screen: CountryScreen,
    },
    States:{
      screen: StateScreen,
    },
    EditAddress:{
      screen: EditAddressScreen,
    },
    ChangePass:{
      screen: ChangePasswordScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

AcountWithModalStack.navigationOptions = {
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
  CartStackWithModal,
  NotificationStack,
  AcountWithModalStack
});
