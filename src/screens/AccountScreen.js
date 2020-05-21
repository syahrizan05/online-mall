import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
  FlatList
} from 'react-native';
import moment from 'moment'

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Badge } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'



class AccountScreen extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

  async rootLogout() {
    await this.props.logout()
    await this.props.rootLogout()
    await this.props.initiateHomeScreen()
    // await this.props.navigation.navigate('Home')
  }

  componentDidMount() {
    this.props.initiateAccountScreen()
    this.props.initiateUserAddress()
  }

  async Logout() {
    await this.props.logout()
    await this.props.initiateAccountScreen()
    this.props.navigation.navigate('Home')
  }

  render() {

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='person' style={{ color: 'dimgrey' }} />
            </Button>
          </Left>
          <Body>
            <Title>My Account</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('EditAccount')}>
              <Text style={{ color: 'cornflowerblue', fontSize: 14 }}>Edit</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Card transparent style={{ marginTop: 0, backgroundColor: 'white' }}>
            <View style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Left></Left>
              <Body><Thumbnail large source={{ uri: this.props.user_image }} />
                {/* <Text>{this.props.username}</Text> */}
              </Body>
              <Right />
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="contact" style={{ color: 'cornflowerblue' }} />
              <Text> Name : {this.props.name}</Text>
              <Right>
              </Right>
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="mail" style={{ color: 'cornflowerblue' }} />
              <Text> Email : {this.props.email}</Text>
              <Right>
              </Right>
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="phone-portrait" style={{ color: 'cornflowerblue' }} />
              <Text> Phone No : {this.props.phone}</Text>
              <Right>
              </Right>
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="calendar" style={{ color: 'cornflowerblue' }} />
              <Text> Date of Birth : {moment(this.props.dob).format('L')}</Text>
              <Right>
              </Right>
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="business" style={{ color: 'cornflowerblue' }} />
              <Text> City : {this.props.city}</Text>
              <Right>
              </Right>
            </View>
            {/* <View style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="home" />
              <Text> Address : {this.props.address_1} {this.props.address_2}</Text>
              <Right>
              </Right>
            </View> */}
          </Card>

          <Card transparent style={{ backgroundColor: 'white' }}>
            <View style={{ paddingTop: 2, paddingBottom: 2, margin: 2 }}>
              <Text> Shipping Address</Text>
              <Body />
              <Right>
                <Button transparent onPress={() => this.props.navigation.navigate('ViewAddress')}>
                  <Text style={{ color: 'cornflowerblue', fontSize: 13 }}>View</Text>
                </Button>
              </Right>
            </View>
            <Card transparent style={{ backgroundColor: 'white' }}>
              <View style={{ paddingTop: 2, paddingBottom: 2, margin: 2 }}>
                <Body>
                  <Text>{this.props.ua_name}</Text>
                  <Text>{this.props.ua_address1} {this.props.ua_address2}</Text>
                  <Text>{this.props.ua_zip} {this.props.ua_city} {this.props.state_name} {this.props.country_name}</Text>
                  <Text>{this.props.ua_phone}</Text>
                </Body>
              </View>
            </Card>
          </Card>

          <Card transparent style={{ backgroundColor: 'white' }}>
            <View style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }} button onPress={() => this.props.navigation.navigate('Favorite')}>
              <Left>
                <Icon active name="heart" style={{ color: 'cornflowerblue' }} />
                <Text> My Favourite Item : {this.props.fav_count}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" style={{ color: 'cornflowerblue' }} />
              </Right>
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }} button onPress={() => this.props.navigation.navigate('Cart')}>
              <Left>
                <Icon active name="cart" style={{ color: 'cornflowerblue' }} />
                <Text> My Cart : {this.props.cart_count}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" style={{ color: 'cornflowerblue' }} />
              </Right>
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }} button onPress={() => this.props.navigation.navigate('Notification')}>
              <Left>
                <Icon active name="notifications" style={{ color: 'cornflowerblue' }} />
                <Text> Notification : {this.props.unread_notifications}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" style={{ color: 'cornflowerblue' }} />
              </Right>
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Left>
                <Icon active name="chatboxes" style={{ color: 'cornflowerblue' }} />
                <Text> Message : {this.props.unread_messages}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" style={{ color: 'cornflowerblue' }} />
              </Right>
            </View>
          </Card>
          <Card transparent>
            <View>
              <Button full danger style={{ flex: 1 }} onPress={() => this.Logout()}><Text>Logout</Text></Button>
            </View>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active={(this.props.navigation.state.routeName === "Home") ? true : false} onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="home" active={(this.props.navigation.state.routeName === "Home") ? true : false} />
            </Button>
            <Button badge vertical active={(this.props.navigation.state.routeName === "Cart") ? true : false} onPress={() => this.props.navigation.navigate('Cart')} >
              <Badge><Text>{this.props.cart_count}</Text></Badge>
              <Icon name="cart" active={(this.props.navigation.state.routeName === "Cart") ? true : false} />
            </Button>
            <Button badge vertical active={(this.props.navigation.state.routeName === "Notification") ? true : false} onPress={() => this.props.navigation.navigate('Notification')} >
              <Badge><Text>{this.props.unread_notifications}</Text></Badge>
              <Icon name="text" active={(this.props.navigation.state.routeName === "Notification") ? true : false} />
            </Button>
            <Button vertical active={(this.props.navigation.state.routeName === "Account") ? true : false} onPress={() => this.props.navigation.navigate('Account')} >
              <Icon name="person" active={(this.props.navigation.state.routeName === "Account") ? true : false} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}



function mapStateToProps(state) {
  return {
    name: state.accountScreenReducer.name,
    username: state.accountScreenReducer.username,
    email: state.accountScreenReducer.email,
    user_image: state.accountScreenReducer.user_image,
    phone: state.accountScreenReducer.phone,
    dob: state.accountScreenReducer.dob,
    city: state.accountScreenReducer.city,
    address_1: state.accountScreenReducer.address_1,
    address_2: state.accountScreenReducer.address_2,
    unread_messages: state.accountScreenReducer.unread_messages,
    unread_notifications: state.notificationScreenReducer.unread_notifications,
    cart_count: state.accountScreenReducer.cart_count,
    fav_count: state.accountScreenReducer.fav_count,
    address: state.addressScreenReducer.dataAddress,

    ua_name: state.addressScreenReducer.ua_name,
    ua_address1: state.addressScreenReducer.ua_address1,
    ua_address2: state.addressScreenReducer.ua_address2,
    ua_zip: state.addressScreenReducer.ua_zip,
    ua_city: state.addressScreenReducer.ua_city,
    state_name: state.addressScreenReducer.state_name,
    country_name: state.addressScreenReducer.country_name,
    ua_phone: state.addressScreenReducer.ua_phone,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initiateAccountScreen: () => dispatch(actionCreator.initiateAccountScreen()),
    initiateHomeScreen: () => dispatch(actionCreator.initiateHomeScreen()),
    logout: () => dispatch(actionCreator.logout()),
    rootLogout: () => dispatch({ type: 'ROOT_LOG_OUT' }),
    initiateUserAddress: () => dispatch(actionCreator.getAddress()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)