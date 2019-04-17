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

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,DeckSwiper,Card,CardItem,Thumbnail, List, ListItem } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class CartScreen extends React.PureComponent {
  static navigationOptions = {
    header: null 
  };

  componentDidMount(){
    this.props.initiateCartDetailScreen()  
  }

  render() {
    this.props.cartSummary&&console.log(`cart summary : ${JSON.stringify(this.props.cartSummary)}`)
    this.props.products&&console.log(`products : ${JSON.stringify(this.props.products)}`)
    
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Cart</Title>
          </Body>
          <Right><Text>{this.props.cart_count}</Text></Right>
        </Header>       
        <Content>
         {/* <Text>Test</Text> 
         <Button info style={{height:30, width:70}} onPress={() => this.props.navigation.navigate('Orders')}>
                      <Text style={{fontSize:9}}>View Order</Text>
                    </Button>          */}
          <FlatList
            data={this.props.products}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            renderItem={({ item }) => (
              <Card transparent style={{margin:1, marginTop:0}}>
              <CardItem>
                <Thumbnail small source={require('../assets/images/shop.png') } />
                <Body style={{margin:3}}>
                    <Text note>{item.shop_name}</Text>
                    <Text note>{item.brand_name}</Text>
                </Body>
              </CardItem>
                <CardItem button onPress={()=>this.props.navigation.navigate('ProductDetail',{product_id:item.product_id})}>
                  <Image style={{ height: Layout.window.height / 10, width: null, flex: 1, margin:10 }} source={{ uri: item.image_url }} />
                  <Body>
                    <Text note style={{fontSize:11}}>{item.product_name}</Text>
                    <Text note style={{fontStyle:'italic',color:'cornflowerblue', fontSize:9}}>Only {item.selprod_stock} items(s) in stock</Text>
                    <Text note style={{color:'royalblue', fontWeight: 'bold'}}>RM{item.currency_theprice}</Text>
                    {/* <Text note style={{color: 'dodgerblue'}}>RM{item.currency_tax}</Text> */}
                  </Body>
                  <Left>
                    <Body>
                      <Text note style={{fontSize:10}}>Quantity : {item.quantity}</Text>
                      <Text note style={{fontWeight: 'bold'}}>RM{item.currency_total}</Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
            )}
          />
        </Content>
        <View style={{flexDirection:'row', bottom:0, left:0, right:0, backgroundColor:'white'}}>
              <View style={{flex:1, margin:5}}>
                <Text note>Total : RM {this.props.cartTotal}</Text>
                <Text note>Total with Tax :<Text style={{color:'royalblue', fontWeight: 'bold'}}> RM {this.props.orderNetAmount}</Text></Text>
              </View>
              <View style={{margin:7}}>
               <Button onPress={()=>this.props.navigation.navigate('Checkout')} style={{backgroundColor:"cornflowerblue", borderRadius:10}}>
                  <Text>Checkout</Text>
                  <Icon name="cart" />
              </Button>
              </View>
        </View>
        {/* <Card >
            <CardItem>
              <Body>
              <Text>RM {this.props.cartTotal}</Text>
              <Text>RM {this.props.orderNetAmount}</Text>
              </Body>
                <Button style={{backgroundColor:"cornflowerblue"}}><Text>Checkout</Text></Button>
            </CardItem>
          </Card> */}
        <Footer>
            <FooterTab>
              <Button  vertical active={(this.props.navigation.state.routeName==="Home")?true:false}  onPress={()=>this.props.navigation.navigate('Home')}>
                <Icon name="home"  active={(this.props.navigation.state.routeName==="Home")?true:false}   />             
              </Button>
              <Button vertical active={(this.props.navigation.state.routeName==="Cart")?true:false}  onPress={()=>this.props.navigation.navigate('Cart')} >
                <Icon name="cart"   active={(this.props.navigation.state.routeName==="Cart")?true:false} />          
              </Button>
              <Button vertical active={(this.props.navigation.state.routeName==="Notification")?true:false}  onPress={()=>this.props.navigation.navigate('Notification')} >
                <Icon name="text"  active={(this.props.navigation.state.routeName==="Notification")?true:false} />              
              </Button>           
              <Button vertical active={(this.props.navigation.state.routeName==="Account")?true:false}  onPress={()=>this.props.navigation.navigate('Account')} >
                <Icon name="person"  active={(this.props.navigation.state.routeName==="Account")?true:false} />
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
      products:state.cartDetailScreenReducer.products, 
      cartTotal:state.cartDetailScreenReducer.cartTotal,
      cartTaxTotal:state.cartDetailScreenReducer.cartTaxTotal,
      orderNetAmount:state.cartDetailScreenReducer.orderNetAmount,
      orderPaymentGatewayCharges:state.cartDetailScreenReducer.orderPaymentGatewayCharges,
      cart_selected_billing_address:state.cartDetailScreenReducer.cart_selected_billing_address,
      cart_selected_shipping_address:state.cartDetailScreenReducer.cart_selected_shipping_address,
  }
}

function mapDispatchToProps(dispatch) {
  return {     
    initiateCartDetailScreen: () => dispatch(actionCreator.initiateCartDetailScreen()),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)