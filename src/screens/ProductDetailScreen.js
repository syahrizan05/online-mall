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
  WebView,
  Modal,
  TextInput
} from 'react-native';

import moment from 'moment'

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Input, Card, CardItem, Thumbnail, Separator, List, ListItem, H3, H2, Item } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class ProductDetailScreen extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = { addToCartView: false, quantity: 1 }
  }

  static navigationOptions = {
    header: null
  };



  setModalVisible(visible) {
    this.setState({ addToCartView: visible });
  }

  add() {
    let quantity = this.state.quantity
    quantity += 1
    this.setState({ quantity })
  }

  minus() {
    let quantity = this.state.quantity
    quantity -= 1
    this.setState({ quantity })
  }

  componentDidMount() {
    const { navigation } = this.props;
    const product_id = navigation.getParam('product_id', 'NO-ID');
    this.props.initiateProductDetailScreen(product_id)
  }

  async addToCart() {
    console.log(`ditekan`)
    this.setModalVisible(!this.state.addToCartView)
    const quantity = await this.state.quantity

    await this.props.addToCart(this.props.product.selprod_id, quantity)

    await this.props.initiateHomeScreen()
    await this.props.initiateProductDetailScreen(this.props.product.selprod_id)
  }

  render() {
    this.props.productImagesArr && console.log(`product image detail : ${JSON.stringify(this.props.productImagesArr)}`)

    const images = []
    this.props.productImagesArr && this.props.productImagesArr.map(image => images.push({
      id: image.slide_id,
      title: image.slide_title,
      screenshotUri: image.image_url
    }))

    return (
      <Container style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addToCartView}
          onRequestClose={() => {
            this.setModalVisible(!this.state.addToCartView);
          }}>
          <View style={{ position: 'absolute', top: Layout.window.height - Layout.window.height / 4, left: 0, right: 0, bottom: 0, backgroundColor: '#ffffff', borderTopColor: 'aliceblue', borderTopWidth: 2 }}>


            <Card transparent >
              <View header style={{ flexDirection: 'row' }} >
                <Left />
                <Body><H2>Add To Cart</H2></Body>
                <Right>
                  <Button transparent onPress={() => this.setModalVisible(!this.state.addToCartView)} style={{ marginRight: 10 }}>
                    <Icon name='close' />
                  </Button>
                </Right>
              </View>
              <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row' }} >
                <Left><H3>Quantity</H3></Left>
                <Right>
                  <View style={{ flexDirection: 'row', width: Layout.window.width / 4, height: Layout.window.width / 12, marginRight: 10 }}>
                    <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'cornflowerblue', backgroundColor: 'cornflowerblue', justifyContent: 'center' }} onPress={() => this.minus()}>
                      <Icon name='remove' style={{ textAlign: 'center', color: '#fff', }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, borderColor: 'cornflowerblue', borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'center' }}>
                      <H2 style={{ textAlign: 'center' }}>{this.state.quantity}</H2>
                    </View>
                    <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'cornflowerblue', backgroundColor: 'cornflowerblue', justifyContent: 'center' }} onPress={() => this.add()}>
                      <Icon name='add' style={{ textAlign: 'center', color: '#fff', }} />
                    </TouchableOpacity>
                  </View>
                </Right>
              </View>
              <View>
                <TouchableOpacity onPress={() => this.addToCart()} style={{ borderWidth: 1, paddingTop: 5, paddingBottom: 5, borderColor: 'cornflowerblue', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'cornflowerblue' }}>Confirm</Text>
                </TouchableOpacity>
              </View>
              <View>
              </View>
            </Card>
          </View>
        </Modal>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.product && this.props.product.product_name}</Title>
          </Body>
          <Right><Icon name='cart' /><Text note>{this.props.cart_count}</Text></Right>
        </Header>
        {this.props.productImagesArr && <View style={{ width: Layout.window.width, height: Layout.window.height / 4 }}>
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
        </View>}
        <Content>
          {this.props.product &&
            <List style={{ backgroundColor: '#ffffff' }} >
              <ListItem >
                <Body>
                  <Text style={{ marginLeft: -15, color: 'cornflowerblue', fontSize: 20 }}> RM {this.props.product.theprice}</Text>
                  <Text style={{ marginLeft: -15, color: 'black', fontSize: 16 }}> {this.props.product.product_name}</Text>
                </Body>
              </ListItem>
            </List>
          }
          {this.props.product && <Card transparent style={{ flex: 0, backgroundColor: '#ffffff' }}>
            <View >
              <Body>
                <Text style={{ margin: 5, fontSize: 14, color: 'black' }}>Product Details</Text>
              </Body>
            </View>
            <View style={{ marginTop: 15 }}>
              <Body>
                <Text> Model : {this.props.product.product_model}</Text>
              </Body>
              <Left>
                <Text> Category : {this.props.product.prodcat_name}</Text>
              </Left>
            </View>
            <View style={{ marginTop: 10 }}>
              <Body>
                <Text> Type : {this.props.product.product_type}</Text>
              </Body>
              <Left>
                <Text> Condition : {this.props.product.selprod_condition == 0 ? 'New' : this.props.product.selprod_condition == 1 ? 'Refurbished' : 'Used'}</Text>
              </Left>
            </View>
            <View style={{ marginTop: 10 }}>
              <Body>
                <Text> In Stock : {this.props.product.selprod_stock}</Text>
              </Body>
              <Left>
                <Text> Product Rating : {this.props.product.prod_rating}</Text>
              </Left>
            </View>
            <View style={{ marginTop: 10 }}>
              <Body>
                <Text> Favorite : {this.props.product.isfavorite}</Text>
              </Body>
              <Left>
                <Text> Review : {this.props.product.totReviews}</Text>
              </Left>
            </View>
            <View style={{ marginTop: 10 }}>
              <Body>
                <Text> Description : {this.props.product.product_short_description}</Text>
              </Body>
            </View>
          </Card>
          }


          {this.props.shop && <Card transparent style={{ flex: 0 }}>
            <View>
              <Left>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('ShopDetail', { shop_id: this.props.shop.shop_id })} >
                  <Thumbnail style={{ borderWidth: 1, borderColor: 'rgba(0,0,102,0.5)', margin: 5 }} source={{ uri: this.props.shop.shop_logo }} />
                </TouchableHighlight>
                <Body>
                  <Text>{this.props.shop.shop_name}</Text>
                  <Text note>Open since {moment(this.props.shop.shop_created_on).format('L')}</Text>
                </Body>
              </Left>
            </View>
            <View>
              <Body>
                <Text style={{ margin: 5 }}>
                  {this.props.shop.shop_description}
                </Text>
                <Text note style={{ margin: 5 }}>
                  {this.props.shop.shop_state_name}, {this.props.shop.shop_country_name}
                </Text>
              </Body>
            </View>
            <View>
              <Left>
                <Text style={{ margin: 5 }}>Rating : {this.props.shop_rating}</Text>
              </Left>
            </View>
          </Card>
          }

          {this.props.relatedProductsRs && <Card transparent>
            <View header style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
              <Left>
                <H2>Related Products</H2>
              </Left>
              <Right>
                <Icon name='fastforward' style={{ color: '#000' }} />
              </Right>
            </View>
            <View>
              <FlatList
                horizontal
                data={this.props.relatedProductsRs}
                keyExtractor={(item, index) => index.toString()}
                //numColumns={2}
                renderItem={({ item }) => (
                  <View style={{ width: Layout.window.width / 2 }}>
                    <Card transparent>

                      <View cardBody button onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.selprod_id })}>
                        <Image style={{ height: Layout.window.height / 9, width: null, flex: 1 }} source={{ uri: item.image_url }} />
                        <View style={{ position: 'absolute', top: 0, right: 10, backgroundColor: 'rgba(0,0,102,0.5)', paddingTop: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }}><Text note style={{ color: '#fff', textAlignVertical: 'center', textAlign: 'center', marginTop: 0 }}>{this.props.currencySymbol}{item.theprice}</Text></View>
                      </View>
                      <View footer>
                        <Left>
                          <Text note>{item.product_name}</Text>
                        </Left>
                      </View>
                    </Card>
                  </View>
                )}
              />
            </View>
          </Card>}


          {this.props.recommendedProducts && <Card transparent>
            <View header style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
              <Left>
                <H2>Recommendation</H2>
              </Left>
              <Right>
                <Icon name='fastforward' style={{ color: '#000' }} />
              </Right>
            </View>
            <View>
              <FlatList
                horizontal
                data={this.props.recommendedProducts}
                keyExtractor={(item, index) => index.toString()}
                //numColumns={2}
                renderItem={({ item }) => (
                  <View style={{ width: Layout.window.width / 2 }}>
                    <Card transparent>

                      <View cardBody button onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.selprod_id })}>
                        <Image style={{ height: Layout.window.height / 9, width: null, flex: 1 }} source={{ uri: item.image_url }} />
                        <View style={{ position: 'absolute', top: 0, right: 10, backgroundColor: 'rgba(0,0,102,0.5)', paddingTop: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }}><Text note style={{ color: '#fff', textAlignVertical: 'center', textAlign: 'center', marginTop: 0 }}>{this.props.currencySymbol}{item.theprice}</Text></View>
                      </View>
                      <View footer>
                        <Left>
                          <Text note>{item.product_name}</Text>
                        </Left>
                      </View>
                    </Card>
                  </View>
                )}
              />
            </View>
          </Card>}
          <View style={{ margin: 15 }} />
        </Content>
        <Footer>
          <FooterTab style={{ backgroundColor: 'cornflowerblue' }}>
            <Button active vertical style={{ borderRightWidth: 1, backgroundColor: 'cornflowerblue' }} >
              <Icon name="text" active style={{ color: 'white' }} />
              <Text style={{ color: 'white' }}>Message Seller</Text>
            </Button>
            <Button active vertical onPress={() => this.setModalVisible()} style={{ borderRightWidth: 1, backgroundColor: 'cornflowerblue' }}>
              <Icon name="cart" active style={{ color: 'white' }} />
              <Text style={{ color: 'white' }}>Add to Cart</Text>
            </Button>
            <Button active vertical onPress={() => this.props.navigation.navigate('Cart')} style={{ backgroundColor: 'cornflowerblue' }}>
              <Text style={{ fontSize: 16, color: 'white' }} >Buy Now</Text>
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

    product: state.productDetailScreenReducer.product,
    productSpecifications: state.productDetailScreenReducer.productSpecifications,
    shippingRates: state.productDetailScreenReducer.shippingRates,
    shippingDetails: state.productDetailScreenReducer.shippingDetails,
    recommendedProducts: state.productDetailScreenReducer.recommendedProducts,
    relatedProductsRs: state.productDetailScreenReducer.relatedProductsRs,
    productImagesArr: state.productDetailScreenReducer.productImagesArr,
    shop_rating: state.productDetailScreenReducer.shop_rating,
    shop: state.productDetailScreenReducer.shop,
    cart_count: state.homeScreenReducer.cart_count

  }
}

function mapDispatchToProps(dispatch) {
  return {
    initiateProductDetailScreen: (product_id) => dispatch(actionCreator.initiateProductDetailScreen(product_id)),
    initiateHomeScreen: () => dispatch(actionCreator.initiateHomeScreen()),
    addToCart: (selprod_id, quantity) => dispatch(actionCreator.addToCart(selprod_id, quantity)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen)