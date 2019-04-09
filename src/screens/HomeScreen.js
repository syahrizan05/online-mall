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

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,DeckSwiper,Card,CardItem,Thumbnail,Item, Input } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { bold } from 'ansi-colors';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null 
  };

  componentDidMount(){
    this.props.initiateHomeScreen()
    this.props.getProducts()
  }

  render() {
    const images = []
    this.props.slides && this.props.slides.map(image => images.push({
      id: image.slide_id,
      title: image.slide_title,
      screenshotUri: image.image_url
    }))
  
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name='cart' />
            <Button transparent onPress={()=>this.props.navigation.navigate('CartDetail')}><Text>{this.props.cart_count}</Text></Button>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
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
        <Text style={{fontSize:16, paddingLeft:10}}>New Collections</Text>  
          <FlatList
            horizontal
            data={this.props.products}
            keyExtractor={ (item, index) => index.toString()}
            //numColumns={2}
            renderItem={({ item }) => (   
              <Card style={{ elevation: 3, width: Layout.window.width /2, height: Layout.window.height /4}}>
                <CardItem>
                  <Left>
                    <Thumbnail  source={{uri:item.product_image}} />
                    <Body>
                      <Text style={{fontSize:12}}>{item.product_name}</Text>
                      <Text note>{item.product_short_description}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>                
                <Image style={{ height: Layout.window.height/9, flex: 1 }} source={{uri:item.product_image}} />
                </CardItem>
              </Card>
            )}
          />
          <Text style={{fontSize:16, paddingLeft:10}}>Featured Products</Text>  
          <FlatList
            horizontal
            data={this.props.products}
            keyExtractor={ (item, index) => index.toString()}
            //numColumns={2}
            renderItem={({ item }) => (   
              <Card style={{ elevation: 3, width: Layout.window.width /2, height: Layout.window.height /4}}>
                <CardItem>
                  <Left>
                    <Thumbnail  source={{uri:item.product_image}} />
                    <Body>
                      <Text style={{fontSize:12}}>{item.product_name}</Text>
                      <Text note>{item.product_short_description}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                <Left>
                   <Text>RM{item.selprod_price}</Text>
                   </Left>
                <Right>
                    <Button info style={{height:30, width:70}} onPress={() => this.props.addToCart(item.selprod_id)}>
                      <Text style={{fontSize:9}}>Shop More</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            )}
          />
          <Text style={{fontSize:16, paddingLeft:10}}>All Products</Text>  
          <FlatList
            data={this.props.products}
            keyExtractor={ (item, index) => index.toString()}
            //numColumns={2}
            renderItem={({ item }) => (             
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail  source={{uri:item.product_image}} />
                    <Body>
                      <Text>{item.product_name}</Text>
                      <Text note>{item.product_short_description}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: Layout.window.height/9, flex: 1 }} source={{uri:item.product_image}} />
                </CardItem>
                <CardItem>                
                 <Left>
                   <Text>RM{item.selprod_price}</Text>
                   </Left>
                  <Right>
                    <Button info onPress={() => this.props.addToCart(item.selprod_id)}>
                      <Text>Add To Cart</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            )}
          />
          
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon active name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon name="text" />
              <Text>Message</Text>
            </Button>
            <Button vertical >
              <Icon  name="cart" />
              <Text>Cart</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}



function mapStateToProps(state) {
  return {

      user:state.userReducer,
    
      collections:state.homeScreenReducer.collections,
      slides:state.homeScreenReducer.slides,

      products:state.productsReducer.products,
      cart_count:state.productsReducer.cart_count,
 
  }
}
function mapDispatchToProps(dispatch) {
  return {     
      initiateHomeScreen: () => dispatch(actionCreator.initiateHomeScreen()),
      getProducts: () => dispatch(actionCreator.getProducts()),
      addToCart: (selprod_id) => dispatch(actionCreator.addToCart(selprod_id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)