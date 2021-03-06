import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
  FlatList, Transforms, AsyncStorage, ActivityIndicator
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Item, Input, Subtitle, Badge, Drawer, H1, H2, H3, Picker } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import Sidebar from './Sidebar'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { bold } from 'ansi-colors';



class HomeScreen extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = { keyword: null }
  }

  static navigationOptions = {
    header: null
  };



  closeDrawer = () => {
    this.drawer._root.close()
  }
  openDrawer = (sidebar) => {
    this.props.setSideBar(sidebar)
    this.drawer._root.open()
  }


  setNotFirstTime = async () => {
    AsyncStorage.setItem('notFirstTime', '1');
  }


  async componentDidMount() {
    await this.setNotFirstTime()
    await this.props.checkLogin()
    await this.props.initiateHomeScreen()
    await this.props.getProducts()
  }

  handleSearch(val) {
    this.setState({ keyword: val })
    this.props.searchProducts(val)
  }

  clearKeyword() {
    this.setState({ keyword: null })
    this.props.clearResult()
  }

  async setFavorite(selprod_id) {

    await this.props.setFavorite(selprod_id)
    await this.props.initiateHomeScreen()
    await this.props.getProducts()
  }

  onValueChange(value) {
    console.log(`value is ${value}`)
    if (value == "1") {
      this.props.navigation.navigate('Home1')
    } else if (value == "2") {
      this.props.navigation.navigate('Home2')
    }
  }

  render() {
    const images = []
    this.props.slides && this.props.slides.map(image => images.push({
      id: image.slide_id,
      title: image.slide_title,
      screenshotUri: image.image_url
    }))

    return (
      <Drawer side='right' ref={(ref) => { this.drawer = ref; }} content={<Sidebar navigator={this.navigator} />} onClose={() => this.closeDrawer()} >
        <Container style={styles.container}>
          <Header searchBar rounded>
            <View style={{ width: 20 }}>
              <Picker
                note
                mode="dropdown"
                style={{ width: 20 }}
                selectedValue='0'
                onValueChange={(value) => this.onValueChange(value)}
              >
              <Picker.Item label="0" value="0" />
                <Picker.Item label="1" value="2" />
                <Picker.Item label="2" value="1" />
              </Picker>
            </View>

            <Item style={{ borderBottomWidth: 2, borderColor: 'dimgrey' }}>
              <Input placeholder="Search MayaMall" value={this.state.keyword} onChangeText={(val) => this.handleSearch(val)} />
            </Item>
            {this.state.keyword ? <View style={{ flexDirection: 'row' }}><Button transparent onPress={() => this.clearKeyword()}><Icon name="close" /></Button><Button transparent onPress={() => this.openDrawer('search')}><Icon name="options" /></Button></View> : <Button transparent><Icon name="ios-search" /></Button>}
          </Header>

          {this.props.result ?
            <Content>

              <FlatList
                data={this.props.result}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                  <Card style={{ flex: 1, marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                    <CardItem>
                      <Left><Text note>{item.prodcat_name}</Text></Left>
                    </CardItem>
                    <CardItem cardBody button onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.product_id })}>
                      <Image style={{ height: Layout.window.height / 9, width: null, flex: 1 }} source={{ uri: item.product_image }} />
                      <View style={{ position: 'absolute', top: 0, right: 10 }}>
                        <Text>{this.props.currencySymbol}{item.theprice}</Text>
                      </View>
                    </CardItem>
                    <CardItem footer>
                      <Left>
                        <Text note>{item.product_name}</Text>
                      </Left>
                    </CardItem>
                  </Card>
                )}
              />
            </Content>
            :
            <Content>

              <View style={{ width: Layout.window.width, height: Layout.window.height / 4 }}>
                <ImageSlider
                  loopBothSides
                  autoPlayWithInterval={3000}
                  images={images}
                  customSlide={({ index, item, style, width }) => (
                    // It's important to put style here because it's got offset inside
                    item &&
                    <View key={index} style={[style, styles.customSlide]}>
                      <TouchableHighlight onPress={() => this.props.navigation.navigate('Promo')}>
                        <Image source={{ uri: item.screenshotUri }} resizeMode={'cover'} style={{
                          height: Layout.window.height / 4,
                          width: Layout.window.width,
                        }} />
                      </TouchableHighlight>
                    </View>
                  )}
                />
              </View>
              <Card transparent>
                <CardItem header style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                  <Left>
                    <H2>New Collections</H2>
                  </Left>
                  <Right>
                    <Icon name='fastforward' style={{ color: 'dimgrey' }} />
                  </Right>
                </CardItem>
                {this.props.newCollectionItems ?
                  <CardItem>
                    <FlatList
                      horizontal
                      data={this.props.newCollectionItems}
                      keyExtractor={(item, index) => index.toString()}
                      //numColumns={2}
                      renderItem={({ item }) => (
                        <View style={{ width: Layout.window.width / 2 }}>
                          <Card transparent style={{ marginLeft: 10, marginRight: 10 }}>
                            <CardItem style={{ flex: 1, paddingRight: 0, paddingLeft: 0 }} cardBody button onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.selprod_id })}>
                              <Image style={{ flex: 1, height: Layout.window.height / 9, width: Layout.window.width - 20, }} source={{ uri: item.image_url }} resizeMode='stretch' />
                              <View style={{ position: 'absolute', top: 0, right: 10, backgroundColor: 'rgba(0,0,102,0.5)', paddingTop: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }}><Text note style={{ color: '#fff', textAlignVertical: 'center', textAlign: 'center', marginTop: 0 }}>{this.props.currencySymbol}{item.theprice}</Text></View>
                            </CardItem>
                            <CardItem footer>
                              <View style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}>
                                <Text note style={{ flex: 3, fontSize: 12 }} numberOfLines={1} ellipsizeMode='tail'>{item.product_name}</Text>
                                {this.props.token && <TouchableHighlight style={{ flex: 1, }} transparent onPress={() => this.setFavorite(item.selprod_id)}>
                                  <Icon name='heart' style={{ fontSize: 18, paddingRight: 3, textAlign: 'right', color: item.isfavorite == 1 ? 'red' : 'lightgrey' }} />
                                </TouchableHighlight>}
                              </View>
                            </CardItem>
                          </Card>
                        </View>
                      )}
                    />
                  </CardItem> : <CardItem style={{ padding: 10 }}><Left /><Body><ActivityIndicator size="small" color="#37beef" /><Right /></Body></CardItem>}
              </Card>
              <Card transparent>
                <CardItem header style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                  <Left>
                    <H2>Featured Products</H2></Left>
                  <Right>
                    <Icon name='fastforward' style={{ color: 'dimgrey', transform: [{ rotate: '90deg' }] }} />
                  </Right>
                </CardItem>
                {this.props.featuredProduct ? <CardItem>
                  <FlatList
                    data={this.props.featuredProduct}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <Card transparent style={{ flex: 1, marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                        <CardItem>
                          <Left>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate('ShopDetail', { shop_id: item.shop_id })} >
                              <Thumbnail style={{ borderWidth: 1, borderColor: 'rgba(0,0,102,0.5)' }} small source={{ uri: item.shop_logo }} />
                            </TouchableHighlight>
                            <Text note>{item.shop_name}</Text>
                          </Left>
                        </CardItem>
                        <CardItem cardBody button onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.selprod_id })}>
                          <Image style={{ height: Layout.window.height / 9, width: null, flex: 1 }} source={{ uri: item.image_url }} />
                          <View style={{ position: 'absolute', top: 0, right: 10, backgroundColor: 'rgba(0,0,102,0.5)', paddingTop: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <Text note style={{ color: '#fff', textAlignVertical: 'center', textAlign: 'center', marginTop: 0 }}>{this.props.currencySymbol}{item.theprice}</Text></View>
                        </CardItem>
                        <CardItem footer>
                          <View style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}>
                            <Text note style={{ flex: 3, fontSize: 12 }} numberOfLines={1} ellipsizeMode='tail'>{item.product_name}</Text>

                            {this.props.token && <TouchableHighlight style={{ flex: 1, }} transparent onPress={() => this.setFavorite(item.selprod_id)}>
                              <Icon name='heart' style={{ fontSize: 18, paddingRight: 3, textAlign: 'right', color: item.isfavorite == 1 ? 'red' : 'lightgrey' }} />
                            </TouchableHighlight>}

                          </View>
                        </CardItem>
                      </Card>
                    )}
                  />
                </CardItem> : <CardItem style={{ padding: 10 }}><Left /><Body><ActivityIndicator size="small" color="#37beef" /><Right /></Body></CardItem>}
              </Card>
              {this.props.token && <Card transparent>
                <CardItem header style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                  <Left>
                    <H2>All Products</H2></Left>
                  <Right>
                    <Icon name='fastforward' style={{ color: 'dimgrey', transform: [{ rotate: '90deg' }] }} />
                  </Right>
                </CardItem>
                {this.props.products ? <CardItem>
                  <FlatList
                    data={this.props.products}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <Card transparent style={{ flex: 1, marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                        <CardItem>
                          <Left><Text note>{item.prodcat_name}</Text></Left>
                        </CardItem>
                        <CardItem cardBody button onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.selprod_id })}>
                          <Image style={{ height: Layout.window.height / 9, width: null, flex: 1 }} source={{ uri: item.product_image }} />
                          <View style={{ position: 'absolute', top: 0, right: 10, backgroundColor: 'rgba(0,0,102,0.5)', paddingTop: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <Text note style={{ color: '#fff', textAlignVertical: 'center', textAlign: 'center', marginTop: 0 }}>{this.props.currencySymbol}{item.theprice}</Text></View>
                        </CardItem>
                        <CardItem footer>
                          <View style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}>
                            <Text note style={{ flex: 3, fontSize: 12 }} numberOfLines={1} ellipsizeMode='tail'>{item.product_name}</Text>
                            <TouchableHighlight style={{ flex: 1, }} transparent onPress={() => this.setFavorite(item.selprod_id)}>
                              <Icon name='heart' style={{ fontSize: 18, paddingRight: 3, textAlign: 'right', color: item.isfavorite == 1 ? 'red' : 'lightgrey' }} />
                            </TouchableHighlight>
                          </View>
                        </CardItem>
                      </Card>
                    )}
                  />
                </CardItem> : <CardItem style={{ padding: 10 }}><Left /><Body><ActivityIndicator size="small" color="#37beef" /><Right /></Body></CardItem>}
              </Card>}
            </Content>
          }
          {!this.props.token && <View style={{ backgroundColor: 'rgba(255,153,51,0.2)', padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}><Text note style={{ textAlignVertical: 'center' }}>Please login to access more features</Text><Button small rounded info onPress={() => this.props.navigation.navigate('Login')}><Text>Login</Text></Button></View>}
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
      </Drawer>
    );
  }
}



function mapStateToProps(state) {
  return {

    user: state.userReducer,

    collections: state.homeScreenReducer.collections,
    slides: state.homeScreenReducer.slides,

    newCollection: state.homeScreenReducer.newCollection,
    newCollectionItems: state.homeScreenReducer.newCollectionItems,

    products: state.productsReducer.products,
    cart_count: state.homeScreenReducer.cart_count,
    currencySymbol: state.homeScreenReducer.currencySymbol,
    unread_notifications: state.notificationScreenReducer.unread_notifications || 0,
    unread_messages: state.homeScreenReducer.unread_messages || 0,
    fav_count: state.homeScreenReducer.fav_count,

    featuredShopDetail: state.homeScreenReducer.featuredShopDetail,
    featuredProduct: state.homeScreenReducer.featuredProduct,

    result: state.searchReducer.result,

    token: state.userReducer.token,

    cacat: state.loginReducer.cacat

  }
}
function mapDispatchToProps(dispatch) {
  return {
    initiateApp: () => dispatch(actionCreator.initiateApp()),
    initiateHomeScreen: () => dispatch(actionCreator.initiateHomeScreen()),
    getProducts: () => dispatch(actionCreator.getProducts()),

    searchProducts: (val) => dispatch(actionCreator.searchProducts(val)),

    addToCart: (selprod_id) => dispatch(actionCreator.addToCart(selprod_id)),

    setSideBar: (sidebar) => dispatch({ type: 'SET_SIDEBAR', payload: { sidebar } }),

    clearResult: () => dispatch({ type: 'CLEAR_RESULT' }),

    checkLogin: () => dispatch(actionCreator.checkLogin()),

    setFavorite: (selprod_id) => dispatch(actionCreator.setFavorite(selprod_id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
