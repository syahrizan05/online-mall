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

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,DeckSwiper,Card,CardItem,Thumbnail } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class CartDetailScreen extends React.Component {
  static navigationOptions = {
    header: null 
  };

  componentDidMount(){
    this.props.initiateCartDetailScreen()
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
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right><Text>{this.props.cart_count}</Text></Right>
        </Header>
        <View style={{ width: Layout.window.width, height: Layout.window.height / 9 }}>
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
                    height: Layout.window.height / 9,
                    width: Layout.window.width,
                  }} />
                </TouchableHighlight>
              </View>
            )}
          />
        </View>
        <Content>
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
                   <Text>{item.selprod_price}</Text>
                   </Left>
                  <Right>
                    <Button onPress={() => this.props.addToCart(item.selprod_id)}>
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
            <Button full>
              <Text>Footer</Text>
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
    initiateCartDetailScreen: () => dispatch(actionCreator.initiateCartDetailScreen()),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartDetailScreen)