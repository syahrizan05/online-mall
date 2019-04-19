//import {Google}
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
  FlatList,
  Alert
} from 'react-native';

import { Constants, Facebook, GoogleSignIn, Google } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Badge, Form, Item as FormItem, Input, Label, SwipeRow, Toast } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class CartScreen extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.initiateCartDetailScreen()
  }

  handleGoogleSignIn = async () => {
    const clientId = '32816482297-m2m1sqd3murmo97uor5srqef5ajkqdr6.apps.googleusercontent.com';
    const { type, accessToken, user } = await Google.logInAsync({ clientId });

    if (type === 'success') {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      console.log(user);
    }
  }

  beforeAnything = async () => {
    try {
      await GoogleSignIn.initAsync({ clientId: '258457727479-3iml03e9t3e5um9bvr81h8j9idabjsjq.apps.googleusercontent.com' });
    } catch ({ message }) {
      alert('GoogleSignIn.initAsync(): ' + message);
    }
  }

  //   // Example of using the Google REST API
  // async  getUserInfo(accessToken) {
  //   let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
  //     headers: { Authorization: `Bearer ${accessToken}` },
  //   });

  //   return await userInfoResponse.json();
  // }
  removeItem(key) {
    Alert.alert(
      'Delete item',
      'Are you sure want to delete ?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
        {
          text: 'Delete',
          onPress: () => { this.removeItems(key) },
          style: 'delete',
        },
      ],
      { cancelable: false },
    );
  }

  removeItems(key) {
    this.props.removeCartItem(key)
    this.props.initiateCartDetailScreen()
  }

  async updateQuantity(key, quantity) {
    await this.props.updateCartQty(key, quantity)
    await this.props.initiateCartDetailScreen()
  }

  removeMessage() {
    if (this.props.removeStatus == 1) {
      alert(this.props.removeMessage)
    } else {
      alert(this.props.removeMessage)
    }
  }

  render() {
    this.props.cartSummary && console.log(`cart summary : ${JSON.stringify(this.props.cartSummary)}`)
    this.props.products && console.log(`products : ${JSON.stringify(this.props.products)}`)

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='cart' style={{color:'dimgrey'}} />
            </Button>
          </Left>
          <Body>
            <Title>Cart</Title>
          </Body>
          <Right />
        </Header>

        {this.props.token ?
          <View style={{ flex: 1 }}>
            <Content>
              <FlatList
                data={this.props.products}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                renderItem={({ item }) => (
                  <Card transparent style={{ margin: 1, marginTop: 0 }}>
                    <CardItem>
                      <Thumbnail small source={require('../assets/images/shop.png')} />
                      <Body style={{ margin: 3 }}>
                        <Text note>{item.shop_name}</Text>
                        <Text note>{item.brand_name}</Text>
                      </Body>
                    </CardItem>
                    <SwipeRow
                      rightOpenValue={-65}
                      body={
                        <CardItem >
                          <TouchableOpacity style={{ flex:1}}  onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.selprod_id })}>
                            <Image style={{ height: Layout.window.height / 10, width: null, flex: 1, margin: 10 }} source={{ uri: item.image_url }} />
                          </TouchableOpacity>
                          <Body>
                            <Text note style={{ fontSize: 11 }}>{item.product_name}</Text>
                            <Text note style={{ fontStyle: 'italic', color: 'cornflowerblue', fontSize: 9 }}>Only {item.selprod_stock} items(s) in stock</Text>
                            <Text note style={{ color: 'royalblue', fontWeight: 'bold' }}>RM{item.currency_theprice}</Text>
                          </Body>
                          <Left>
                            <Body>
                              <Button small style={{ margin: 5, backgroundColor: 'cornflowerblue' }} onPress={()=>this.updateQuantity(item.key,item.quantity+1)}>
                                <Icon name="add" style={{ fontSize: 15 }} />
                              </Button>
                              <Text note style={{ fontSize: 10 }}>Quantity : {item.quantity}</Text>
                              <Button small style={{ margin: 5, backgroundColor: 'cornflowerblue' }} onPress={()=>this.updateQuantity(item.key,item.quantity-1)}>
                                <Icon name="remove" style={{ fontSize: 15 }} />
                              </Button>
                              <Text note style={{ fontWeight: 'bold' }}>RM{item.currency_total}</Text>
                            </Body>
                          </Left>
                        </CardItem>
                      }
                      right={
                        <Button danger onPress={() => this.removeItem(item.key)}>
                          <Icon active name="trash" />
                        </Button>
                      }
                    />
                  </Card>
                )}
              />
            </Content>
            <View style={{ flexDirection: 'row', bottom: 0, left: 0, right: 0, backgroundColor: 'white' }}>
              <View style={{ flex: 1, margin: 5 }}>
                <Text note>Total : RM {this.props.cartTotal}</Text>
                <Text note>Total with Tax :<Text style={{ color: 'royalblue', fontWeight: 'bold' }}> RM {this.props.orderNetAmount}</Text></Text>
              </View>
              <View style={{ margin: 7 }}>
                <Button onPress={() => this.props.navigation.navigate('Checkout')} style={{ backgroundColor: "cornflowerblue", borderRadius: 10 }}>
                  <Text>Checkout</Text>
                  <Icon name="cart" />
                </Button>
              </View>
            </View>
          </View>

          :
          <Content padder scrollEnabled={false}>
            <View style={{ width: Layout.window.width, height: Layout.window.height / 4 }}>
              <Image source={require('../assets/images/icon.png')} resizeMode={'contain'} style={{ flex: 1, width: undefined, height: undefined }} />
            </View>
            <Form>

              <FormItem floatingLabel >
                <Label>Email</Label>
                <Input value={this.props.email} onChangeText={(email) => this.props.setLogin({ email })} />
              </FormItem>
              <FormItem floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry={true} value={this.props.password} onChangeText={(password) => this.props.setLogin({ password })} />
              </FormItem>
              <View style={{ margin: 10 }} />
              <Text note danger>{this.props.msg}</Text>
              <Button info full onPress={() => this.props.login()}>
                <Text> Login </Text>
              </Button>
              <Button transparent style={{ margin: 13, height: Layout.window.width / 14, width: Layout.window.width / 2, alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('Forgot')}>
                <Text note> Forgot Password ?</Text>
              </Button>
            </Form>

            <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 12 }}>Connect with other ways</Text>
            <View style={{ flexDirection: 'row', marginTop: 5, alignSelf: 'center' }}>
              <Button info iconLeft style={{ margin: 10, borderRadius: 10 }} onPress={() => this.props.fbLogin()}>
                <Icon name='logo-facebook' />
                <Text> Facebook</Text>
              </Button>

            </View>
            <Button full transparent style={{ margin: 13, height: Layout.window.width / 14, width: Layout.window.width / 2, alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={{ fontSize: 12 }}> Sign Up Now </Text>
            </Button></Content>}
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
    user: state.userReducer,
    products: state.cartDetailScreenReducer.products,
    cartTotal: state.cartDetailScreenReducer.cartTotal,
    cartTaxTotal: state.cartDetailScreenReducer.cartTaxTotal,
    orderNetAmount: state.cartDetailScreenReducer.orderNetAmount,
    orderPaymentGatewayCharges: state.cartDetailScreenReducer.orderPaymentGatewayCharges,
    cart_selected_billing_address: state.cartDetailScreenReducer.cart_selected_billing_address,
    cart_selected_shipping_address: state.cartDetailScreenReducer.cart_selected_shipping_address,
    user: state.userReducer,
    token: state.userReducer.token,
    email: state.loginReducer.email,
    password: state.loginReducer.password,
    msg: state.loginReducer.msg,
    cartSummary: state.cartDetailScreenReducer.cartSummary,
    removeMessage: state.cartDetailScreenReducer.msg,
    removeStatus: state.cartDetailScreenReducer.status,
    unread_notifications: state.cartDetailScreenReducer.unread_notifications || 0,
    cart_count: state.cartDetailScreenReducer.cart_count || 0,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initiateCartDetailScreen: () => dispatch(actionCreator.initiateCartDetailScreen()),
    setLogin: (value) => dispatch({ type: 'SET_LOGIN', payload: { ...value } }),
    login: () => dispatch(actionCreator.login()),
    logout: () => dispatch(actionCreator.logout()),
    fbLogin: () => dispatch(actionCreator.fbLogin()),
    removeCartItem: (key) => dispatch(actionCreator.removeCartItem(key)),
    updateCartQty: (key,quantity) => dispatch(actionCreator.updateCartQty(key,quantity))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)