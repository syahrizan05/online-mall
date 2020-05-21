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
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Item, Input, Subtitle, Badge, Drawer, H1, H2, H3 } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import Sidebar from './Sidebar'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class HomeScreen1 extends React.PureComponent {

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

  render() {
    const images = []
    this.props.slides && this.props.slides.map(image => images.push({
      id: image.slide_id,
      title: image.slide_title,
      screenshotUri: image.image_url
    }))

    const limitedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const limitedArrayPair = limitedArray.reduce((result, value, index, array) => {
      if (index % 2 === 0)
        result.push(array.slice(index, index + 2));
      return result;
    }, []);
    console.log(` array ialah ${JSON.stringify(limitedArray)}`)
    console.log(`pair array ialah ${JSON.stringify(limitedArrayPair)}`)

    const collectionArray = [
      { title: 'Top Rated', img: <Image source={require('../assets/images/homeTop/topRated.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'Best Selling', img: <Image source={require('../assets/images/homeTop/bestSelling.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'New Products', img: <Image source={require('../assets/images/homeTop/new.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'Sale', img: <Image source={require('../assets/images/homeTop/sales.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'Free Shipping', img: <Image source={require('../assets/images/homeTop/freeShipping.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'Man Apparel', img: <Image source={require('../assets/images/homeTop/men.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'Woman Apparel', img: <Image source={require('../assets/images/homeTop/woman.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'Beauty', img: <Image source={require('../assets/images/homeTop/beauty.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'Furniture', img: <Image source={require('../assets/images/homeTop/furniture.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'Gadgets', img: <Image source={require('../assets/images/homeTop/gadgets.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'Home Appliances', img: <Image source={require('../assets/images/homeTop/homeAppliances.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'Sports', img: <Image source={require('../assets/images/homeTop/sports.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
      { title: 'Others', img: <Image source={require('../assets/images/homeTop/others.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
    ]

    const test = [{ name: 'gambar1', age: 'text1' }, { name: 'gambar2', age: 'text2' }, { name: 'gambar3', age: 'text3' }, { name: 'gambar4', age: 'text4' }, { name: 'gambar5', age: 'text5' }]

    const collectionArrayPair = test.reduce((result, value, index, array) => {
      if (index % 2 === 0)
        result.push([array[index], array[index + 1]]);

      return result;
    }, []);

    console.log(`collectionArrayPair array ialah ${JSON.stringify(collectionArrayPair)}`)

    return (
      <Drawer side='right' ref={(ref) => { this.drawer = ref; }} content={<Sidebar navigator={this.navigator} />} onClose={() => this.closeDrawer()} >
        <Container style={[styles.container, { backgroundColor: '#E8E8E8' }]}>
          <Header>
            <LinearGradient
              colors={['#5BB7D1', '#1B79AF']}
              start={[0, 1]}
              end={[1, 0]}
              style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} />
            <Left><TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <Image source={require('../assets/images/mm_white.png')} resizeMode='contain' style={{ flex: 1, height: 30, width: 100 }} />
            </TouchableOpacity>
              
            </Left>
            <Right>
              <Icon name='search' style={{ color: '#fff', fontSize: 17, padding: 5 }} />
              <Icon name='qr-scanner' style={{ color: '#fff', fontSize: 17, padding: 5 }} />
              <Icon name='cart' style={{ color: '#fff', fontSize: 17, padding: 5 }} />
              <Icon name='text' style={{ color: '#fff', fontSize: 17, padding: 5 }} />
              <Icon name='notifications' style={{ color: '#fff', fontSize: 17, padding: 5 }} />
            </Right>
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

              <View style={{ width: Layout.window.width, height: undefined, backgroundColor: '#fff', marginTop: 5, marginBottom: 5 }}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                  <FlatList
                    data={collectionArray}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    renderItem={({ item }) => (
                      <View style={{ width: Layout.window.width / 6, height: Layout.window.height / 8, flex: 1, margin: 5 }}>
                        <View style={{ flex: 2 }}>{item.img}</View>
                        <View style={{ flex: 1 }}><Text note style={{ fontSize: 10,color:'#1B79AF' }}>{item.title}</Text></View>
                      </View>
                    )}

                  />
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ alignSelf: 'stretch', flexDirection: 'row',justifyContent:'space-between' }}>
                  <H2 style={{color:'#1B79AF'}}>Featured Products</H2>
                  <Text style={{fontSize:10,color:'#1B79AF',textAlignVertical:'bottom'}}>See more</Text>
                </View>
                <View style={{ flex:1, width: undefined, height: Layout.window.height / 4 - 20,borderRadius:10}}>
                  <ImageSlider
                  style={{backgroundColor:'#fff',borderRadius:10,flex:1, width:undefined, borderRadius:10,margin:10}}
                    loopBothSides
                    autoPlayWithInterval={3000}
                    images={images}
                    customSlide={({ index, item, style, width }) => (
                      // It's important to put style here because it's got offset inside
                      item &&
                  
                        <TouchableHighlight key={index} style={[style]} onPress={() => this.props.navigation.navigate('Promo')}>
                          <Image source={{ uri: item.screenshotUri }} resizeMode={'cover'} style={{flex:1,  width: undefined, borderRadius:10,
                          }} />
                        </TouchableHighlight>
                   
                    )}
                  />
                </View>
              </View>

              <View style={{ width: Layout.window.width, height: Layout.window.height / 4, marginTop: 5, marginBottom: 5 }}>
                <LinearGradient
                  colors={['#F47E33', '#FCC230']}
                  start={[0, 1]}
                  end={[1, 0]}
                  style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1,padding:5 }}>
                    <View>
                      <H2 style={{ color: '#fff' }}>Limited Time Only</H2>
                    </View>
                    <View><Text style={{ color: '#fff' }}>Promotion will end in</Text></View>
                    <View><H2 style={{ color: '#fff' }}>07 : 20 : 30</H2></View>
                    <View style={{ margin: 10, padding: 5, backgroundColor: '#fff', borderRadius: 5 }}>
                      <Text style={{ color: '#1B79AF' }}>See More</Text>
                    </View>
                  </View>
                  <View style={{ flex: 2, padding: 10 }}>
                    <FlatList
                      data={limitedArray}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      renderItem={({ item }) => (
                        <View style={[{ backgroundColor: '#fff', width: Layout.window.width / 4, height: undefined, flex: 1, margin: 5, borderRadius: 10,borderWidth:1,borderColor:'#ccc' },styles.shadow]}>
                          <View style={{ flex: 1 }}>
                            <Image source={{ uri: 'https://picsum.photos/500' }} style={{ flex: 1, width: undefined, height: undefined, borderTopLeftRadius:10,borderTopRightRadius:10  }} />
                          </View>
                          <View style={{ flex: 1,padding:5 }}>
                            <View><Text style={{fontSize:10,color:'#000'}} >Xiomi</Text></View>
                            <View><Text style={{fontSize:10}}>RM 100</Text></View>
                            <View><Text style={{fontSize:10}}>30 sold</Text></View>
                          </View>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </View>

              <View style={{ width: Layout.window.width, height: Layout.window.height / 4, marginTop: 5, marginBottom: 5, flex: 1,borderTopRightRadius:10,borderTopLeftRadius:10 }}>
                <Image source={require('../assets/images/adBiru.png')} resizeMode='contain' style={{ flex: 1, width: undefined, height: undefined }} />
              </View>
              <View style={{ width: Layout.window.width, height: Layout.window.height / 4, marginTop: 5, marginBottom: 5, flex: 1 }}>
                <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,borderTopLeftRadius:20,borderTopRightRadius:20 }}>
                  <View style={{ flex: 2 }}>
                    <Image source={require('../assets/images/bannerOren.png')} resizeMode='cover' style={{ flex: 1, width: undefined, height: undefined,borderTopLeftRadius:20,borderTopRightRadius:20 }} />
                  </View>
                  <View style={{ flex: 1, backgroundColor: '#fff' }}>
                  </View>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flex: 1,padding:5 }}><H2 style={{color:'#fff'}}>End of April Sale</H2></View>
                  <View style={{ flex: 3 }}>
                    <FlatList
                      data={limitedArray}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      renderItem={({ item }) => (
                        <View style={[{ backgroundColor: '#fff', width: Layout.window.width / 4, height: undefined, flex: 1, margin: 5, borderRadius: 10,borderWidth:1,borderColor:'#ccc' },styles.shadow]}>
                          <View style={{ flex: 1, alignSelf: 'stretch' }}>
                            <Image source={{ uri: 'https://picsum.photos/500' }} style={{ flex: 1, width: undefined, height: undefined,borderTopLeftRadius:10,borderTopRightRadius:10 }} />
                          </View>
                          <View style={{ flex: 1,padding:5 }}>
                          <View><Text style={{fontSize:10,color:'#000'}} >Xiomi</Text></View>
                            <View><Text style={{fontSize:10}}>RM 100</Text></View>
                            <View><Text style={{fontSize:10}}>30 sold</Text></View>
                          </View>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </View>

              <View style={{ width: Layout.window.width, height: Layout.window.height / 3.5, marginTop: 5, marginBottom: 5, flex: 1, backgroundColor: '#fff' }}>
                <H2 style={{margin:5}}>Shop By Category</H2>


                <View style={{ flex: 1 }}>
                  <FlatList

                    data={collectionArrayPair}

                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    renderItem={({ item }) => (
                      <View style={{ backgroundColor: '#fff', width: Layout.window.width / 3, height: undefined, flex: 1, margin: 5, borderRadius: 10 }}>
                        <View style={{ flex: 1, margin: 5 }}>
                        <Image source={{ uri: 'https://picsum.photos/500' }} style={{ flex: 1, width: undefined, height: undefined }} />
                        <Text style={{fontSize:10}}>Test</Text>
                        </View>
                        <View style={{ flex: 1, margin: 5 }}>
                        <Image source={{ uri: 'https://picsum.photos/500' }} style={{ flex: 1, width: undefined, height: undefined }} />
                        <Text style={{fontSize:10}}>Test</Text>
                        </View>
                      </View>
                    )}
                  />
                </View>

              </View>
              <View style={{ width: Layout.window.width, height: Layout.window.height / 4, marginTop: 5, marginBottom: 5, flex: 1 }}>
                <Image source={require('../assets/images/rfqBgOren.png')} resizeMode='contain' style={{ flex: 1, width: undefined, height: undefined }} />
                <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
                  <View style={{ marginRight: Layout.window.width / 4, marginLeft: Layout.window.width / 4, justifyContent: 'center', alignItems: 'center', }}>
                    <View>
                      <View style={{ flex: 2,  justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{fontSize:10,color:'#fff'}}>Something something</Text>
                        <View style={{ backgroundColor: 'yellow', justifyContent: 'flex-start', padding: 5, borderRadius: 5, margin: 10 }}>
                          <Text style={{fontSize:10,color:'#1B79AF'}}>Button</Text>
                        </View>
                      </View>

                    </View>
                  </View>
                </View>
              </View>
              
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
    unread_notifications: state.homeScreenReducer.unread_notifications || 0,
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen1)