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
  Modal
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,DeckSwiper,Card,CardItem,Thumbnail,Separator,List,ListItem,H3 } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class ProductDetailScreen extends React.PureComponent {

  constructor(props){
    super(props)
    this.state={addToCartView:false}
  }

  static navigationOptions = {
    header: null 
  };

  setModalVisible(visible) {
    this.setState({addToCartView: visible});
  } 

  componentDidMount(){
    const { navigation } = this.props;
    const product_id = navigation.getParam('product_id', 'NO-ID');
    this.props.initiateProductDetailScreen(product_id)  
  }

  render() {
    this.props.product&&console.log(`product detail : ${JSON.stringify(this.props.product)}`)
        return (
          <Container style={styles.container}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.addToCartView}
              onRequestClose={() => {
                this.setModalVisible(!this.state.addToCartView);
              }}>
              <View style={{ position: 'absolute', top: Layout.window.height / 2, left: 0, right: 0, bottom: 0, backgroundColor: '#ffffff' }}>
                <Card transparent >
                  <CardItem header><Left><H3>Quantity</H3></Left><Right><Text>1</Text></Right></CardItem>
                  <CardItem>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={{ flex: 1 }}>
                        <Button full onPress={() => { this.setModalVisible(!this.state.addToCartView) }}>
                          <Text>Confirm</Text>
                        </Button></View>
                      <View style={{ flex: 1 }}><Button full onPress={() => { this.setModalVisible(!this.state.addToCartView) }}><Text>Cancel</Text></Button>
                      </View>
                    </View>

                  </CardItem>
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
                <Title>{this.props.product_name}</Title>
              </Body>
              <Right><Text>{this.props.cart_count}</Text></Right>
            </Header>
            <Image source={{ uri: this.props.product_image }} style={{ height: Layout.window.height / 5, width: Layout.window.width }} />
            <Content>
              <Card>
                <CardItem>
                  <Icon active name="logo-googleplus" />
                  <Text>Google Plus</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </CardItem>
              </Card>
              <WebView source={{ html: this.props.product_description }} style={{ height: Layout.window.height - Layout.window.height / 5 }} />
            </Content>
            
            <View style={{position:'absolute',bottom:0,left:0,right:0}}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{flex:1}}>
               <Button full info iconRight onPress={() => this.setModalVisible()} >
                <Text>Add To Cart</Text>
                <Icon name="cart" />
              </Button>
              </View>
              <View style={{flex:1}}>
              <Button full danger iconRight >
                <Text>Buy now</Text>
                <Icon name="cart" />
              </Button>
              </View>
              </View>
            </View>          
            
          </Container>
        );
    }
}



function mapStateToProps(state) {
  return {
      user:state.userReducer,    
      product:state.productDetailScreenReducer.product,
      product_image:state.productDetailScreenReducer.product_image,
      product_name:state.productDetailScreenReducer.product_name,
      product_description:state.productDetailScreenReducer.product_description,
      
  }
}

function mapDispatchToProps(dispatch) {
  return {     
    initiateProductDetailScreen: (product_id) => dispatch(actionCreator.initiateProductDetailScreen(product_id)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen)