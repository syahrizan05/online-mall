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
         <Text>Test</Text> 
         <Button info style={{height:30, width:70}} onPress={() => this.props.navigation.navigate('Orders')}>
                      <Text style={{fontSize:9}}>View Order</Text>
                    </Button>         
        </Content>
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
      cartSummary:state.cartDetailScreenReducer.cartSummary,
      products:state.cartDetailScreenReducer.products, 
  }
}

function mapDispatchToProps(dispatch) {
  return {     
    initiateCartDetailScreen: () => dispatch(actionCreator.initiateCartDetailScreen()),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)