import React, { Component } from 'react';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';
import Constants from 'expo-constants';
import styles from '../styles/styles';
import Layout from '../constants/Layout';
import { Image, View, Alert } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Badge, Form, Item as FormItem, Input, Label } from 'native-base';


import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = { user: null };

  async login() {
    this.props.login()
    this.props.navigation.navigate('Home')
  }

  state = { user: null, googleError: null };

  render() {
    this.props.status === 1 ? this.props.navigation.navigate('Home') : null
    return (
      <Container style={styles.authContainer}>
        <Content padder scrollEnabled={true}>
        <Text>test</Text>
          <View style={{ width: Layout.window.width, height: Layout.window.height / 4 }}>
            <Image source={require('../assets/images/icon.png')} resizeMode={'contain'} style={{ flex: 1, width: undefined, height: undefined }} />
          </View>
          <Form>
            <FormItem floatingLabel >
              <Label>Username</Label>
              <Input value={this.props.email} onChangeText={(email) => this.props.setLogin({ email })} />
            </FormItem>
            <FormItem floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry={true} value={this.props.password} onChangeText={(password) => this.props.setLogin({ password })} />
            </FormItem>
            <View style={{ margin: 10 }} />
            <Text note danger>{this.props.msg}</Text>
            <Button info full onPress={() => this.login()}>
              <Text>Login</Text>
            </Button>
            <Button transparent style={{ margin: 13, height: Layout.window.width / 14, width: Layout.window.width / 2, alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('Forgot')}>
              <Text note>Forgot Password ?</Text>
            </Button>
          </Form>
          <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 12 }}>Connect with other ways</Text>
          <View style={{ flexDirection: 'row', marginTop: 5, alignSelf: 'center' }}>
            <Button info iconLeft style={{ margin: 10, borderRadius: 10 }} onPress={() => this.props.fbLogin()}>
              <Icon name='logo-facebook' />
              <Text>Facebook</Text>
            </Button>
          </View>
          <Button full transparent style={{ margin: 13, height: Layout.window.width / 14, width: Layout.window.width / 2, alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={{ fontSize: 12 }}> Sign Up Now </Text>
          </Button>
          <Button full transparent style={{ margin: 13, height: Layout.window.width / 14, width: Layout.window.width / 2, alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={{ fontSize: 12 }}> Skip</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.userReducer,
    token: state.userReducer.token,
    email: state.loginReducer.email,
    password: state.loginReducer.password,
    msg: state.loginReducer.msg,
    cartSummary: state.cartDetailScreenReducer.cartSummary,
    products: state.cartDetailScreenReducer.products,
    unread_notifications: state.cartDetailScreenReducer.unread_notifications || 0,
    cart_count: state.cartDetailScreenReducer.cart_count || 0,
    google: state.loginReducer,
    status: state.userReducer.status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initiateCartDetailScreen: () => dispatch(actionCreator.initiateCartDetailScreen()),
    setLogin: (value) => dispatch({ type: 'SET_LOGIN', payload: { ...value } }),
    login: () => dispatch(actionCreator.login()),
    logout: () => dispatch(actionCreator.logout()),
    fbLogin: () => dispatch(actionCreator.fbLogin()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)