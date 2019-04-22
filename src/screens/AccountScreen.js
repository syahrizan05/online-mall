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

  async rootLogout(){
    await this.props.rootLogout()
    await this.props.initiateHomeScreen()
    await this.props.navigation.navigate('Home')
  }

  componentDidMount() {
    this.props.initiateAccountScreen()
  }

 async Logout(){
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
              <Icon name='person' style={{color:'dimgrey'}} />
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
            <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Left></Left>
              <Body><Thumbnail large source={{ uri: this.props.user_image }} /><Text>{this.props.username}</Text></Body>
              <Right />
            </CardItem>
            <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="contact" />
              <Text> Name : {this.props.name}</Text>
              <Right>
              </Right>
            </CardItem>
            <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="mail" />
              <Text> Email : {this.props.email}</Text>
              <Right>
              </Right>
            </CardItem>
            <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="phone-portrait" />
              <Text> Phone No : {this.props.phone}</Text>
              <Right>
              </Right>
            </CardItem>
            <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="calendar" />
              <Text> Date of Birth : {moment(this.props.dob).format('L')}</Text>
              <Right>
              </Right>
            </CardItem>
            <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="business" />
              <Text> City : {this.props.city}</Text>
              <Right>
              </Right>
            </CardItem>
            <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Icon active name="home" />
              <Text> Address : {this.props.address_1} {this.props.address_2}</Text>
              <Right>
              </Right>
            </CardItem>
          </Card>

          <Card transparent style={{ backgroundColor: 'white' }}>
            <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }} button onPress={()=>this.props.navigation.navigate('Favorite')}>
              <Left>
                <Icon active name="heart" />
                <Text> My Favourite Item : {this.props.fav_count}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}  button onPress={()=>this.props.navigation.navigate('Cart')}>
              <Left>
                <Icon active name="cart" />
                <Text> My Cart : {this.props.cart_count}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}  button onPress={()=>this.props.navigation.navigate('Notification')}>
              <Left>
                <Icon active name="notifications" />
                <Text> Notification : {this.props.unread_notifications}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
              <Left>
                <Icon active name="chatboxes" />
                <Text> Message : {this.props.unread_messages}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem>
              <Button full danger style={{ flex: 1 }} onPress={()=>this.Logout()}><Text>Logout</Text></Button>
            </CardItem>
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
    fav_count: state.accountScreenReducer.fav_count
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initiateAccountScreen: () => dispatch(actionCreator.initiateAccountScreen()),
    initiateHomeScreen: () => dispatch(actionCreator.initiateHomeScreen()),
    logout:()=>dispatch(actionCreator.logout()),
    rootLogout:()=>dispatch({type:'ROOT_LOG_OUT'})

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)