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

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Item, Input, Subtitle, Badge, Drawer, H1, H2, H3 } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import Sidebar from './Sidebar'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { bold } from 'ansi-colors';


class HomeOldScreen extends React.PureComponent {

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

  componentDidMount() {
    this.props.initiateHomeScreen()
    this.props.getProducts()

    const { navigation } = this.props;
    console.log(`navigation ialah : ${JSON.stringify(this.props.navigation.state.routeName)}`)
  }

  handleSearch(val) {
    this.setState({ keyword: val })
    this.props.searchProducts(val)
  }

  clearKeyword() {
    this.setState({ keyword: null })
    this.props.clearResult()
  }

  render() {
    const images = []
    this.props.slides && this.props.slides.map(image => images.push({
      id: image.slide_id,
      title: image.slide_title,
      screenshotUri: image.image_url
    }))

    this.props.products && console.log(`inilah  products: ${JSON.stringify(this.props.products)}`)

    return (

      <Drawer side='right' ref={(ref) => { this.drawer = ref; }} content={<Sidebar navigator={this.navigator} />} onClose={() => this.closeDrawer()} >
        <Container style={styles.container}>
          <Header transparent searchBar rounded style={{backgroundColor:'#214185', height:Layout.window.height/3, borderBottomLeftRadius:300, flexDirection:'column'}}>
            <Item style={{ borderBottomWidth: 2, borderColor: 'aliceblue', flexDirection:'row' }}>
              <Input placeholder="Search MayaMall" value={this.state.keyword} onChangeText={(val) => this.handleSearch(val)} />
            </Item>
            {this.state.keyword ? <Button transparent onPress={() => this.clearKeyword()}><Icon name="close" /></Button> : <Button transparent><Icon name="ios-search" /></Button>}
            <View style={{ width: Layout.window.width / 1.1, height: Layout.window.height / 4, margin: 15, alignSelf: 'center' }}>
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
          </Header>
          {this.props.result ?
            <Content >
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
                      <View style={{ position: 'absolute', top: 0, right: 10 }}><Text>{this.props.currencySymbol}{item.theprice}</Text></View>
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

              <Card transparent style={{marginTop:35}}>
                <CardItem header style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: '#214185'}}>
                  <Left>
                    <H2 style={{ color: 'white' }}>New Collections</H2>
                  </Left>
                  <Right>
                    <Icon name='fastforward' />
                  </Right>
                </CardItem>
                <CardItem style={{ backgroundColor: '#214185' }}>
                  <FlatList
                    horizontal
                    data={this.props.newCollectionItems}
                    keyExtractor={(item, index) => index.toString()}
                    //numColumns={2}
                    renderItem={({ item }) => (
                      <View style={{ width: Layout.window.width / 2 }}>
                        <Card transparent>
                          <CardItem cardBody button onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.product_id })}>
                            <Image style={{ height: Layout.window.height / 9, width: null, flex: 1 }} source={{ uri: item.image_url }} />
                            <View style={{ position: 'absolute', top: 0, right: 10 }}><Text note>{this.props.currencySymbol}{item.theprice}</Text></View>
                          </CardItem>
                          <CardItem footer>
                            <Left>
                              <Text note>{item.product_name}</Text>
                            </Left>
                          </CardItem>
                        </Card>
                      </View>
                    )}
                  />
                </CardItem>
              </Card>
              <Card transparent>
                <CardItem header style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <Left>
                    <H2>Featured Products</H2></Left>
                  <Right>
                    <Icon name='fastforward' />
                  </Right>
                </CardItem>
                <CardItem style={{ backgroundColor: '#37beef' }}>
                  <FlatList
                    data={this.props.featuredProduct}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <Card transparent style={{ flex: 1, marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                        <CardItem>
                          <Left>
                            <Thumbnail small source={{ uri: item.shop_logo }} />
                            <Text note>{item.shop_name}</Text>
                          </Left>

                        </CardItem>
                        <CardItem cardBody button style={{ height: Layout.window.height / 5 }} onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.product_id })}>
                          <Image style={{ height: Layout.window.height / 9, width: null, flex: 1 }} source={{ uri: item.image_url }} />
                          <View style={{ position: 'absolute', top: 0, right: 10 }}><Text>{this.props.currencySymbol}{item.theprice}</Text></View>
                        </CardItem>
                        <CardItem footer>
                          <Left>
                            <Text note>{item.product_name}</Text>
                          </Left>
                        </CardItem>
                      </Card>
                    )}
                  />
                </CardItem>

              </Card>
              <Card transparent>
                <CardItem header style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <Left>
                    <H2>All Products</H2></Left>
                  <Right>
                    <Icon name='fastforward' />
                  </Right>
                </CardItem>
                <CardItem style={{ backgroundColor: 'whitesmoke' }}>
                  <FlatList
                    data={this.props.products}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <Card transparent style={{ flex: 1, marginRight: 5, marginLeft: 5, marginTop: 5, marginBottom: 5 }}>
                        <CardItem >
                          <Left><Text note>{item.prodcat_name}</Text></Left>
                        </CardItem>
                        <CardItem cardBody button onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.product_id })}>
                          <Image style={{ height: Layout.window.height / 9, width: null, flex: 1 }} source={{ uri: item.product_image }} />
                          <View style={{ position: 'absolute', top: 0, right: 10 }}><Text>{this.props.currencySymbol}{item.theprice}</Text></View>
                        </CardItem>
                        <CardItem footer>
                          <Left>
                            <Text note>{item.product_name}</Text>
                          </Left>
                        </CardItem>
                      </Card>
                    )}
                  />
                </CardItem>

              </Card>


            </Content>
          }

          <Footer>
            <FooterTab>
              <Button vertical active={(this.props.navigation.state.routeName === "Home") ? true : false} onPress={() => this.props.navigation.navigate('Home')}>
                <Icon name="home" active={(this.props.navigation.state.routeName === "Home") ? true : false} />
              </Button>
              <Button vertical active={(this.props.navigation.state.routeName === "Cart") ? true : false} onPress={() => this.props.navigation.navigate('Cart')} >
                <Icon name="cart" active={(this.props.navigation.state.routeName === "Cart") ? true : false} />
              </Button>
              <Button vertical active={(this.props.navigation.state.routeName === "Notification") ? true : false} onPress={() => this.props.navigation.navigate('Notification')} >
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
    unread_notifications: state.homeScreenReducer.unread_notifications,
    unread_messages: state.homeScreenReducer.unread_messages,
    fav_count: state.homeScreenReducer.fav_count,

    featuredShopDetail: state.homeScreenReducer.featuredShopDetail,
    featuredProduct: state.homeScreenReducer.featuredProduct,

    result: state.searchReducer.result

  }
}
function mapDispatchToProps(dispatch) {
  return {
    initiateHomeScreen: () => dispatch(actionCreator.initiateHomeScreen()),
    getProducts: () => dispatch(actionCreator.getProducts()),

    searchProducts: (val) => dispatch(actionCreator.searchProducts(val)),

    addToCart: (selprod_id) => dispatch(actionCreator.addToCart(selprod_id)),

    setSideBar: (sidebar) => dispatch({ type: 'SET_SIDEBAR', payload: { sidebar } }),

    clearResult: () => dispatch({ type: 'CLEAR_RESULT' })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeOldScreen)