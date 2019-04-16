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


class OrdersScreen extends React.PureComponent {
  static navigationOptions = {
    header: null 
  };

  componentDidMount(){
    this.props.initiateOrdersScreen()  
  }

  render() {
    this.props.orders&&console.log(`orders : ${JSON.stringify(this.props.orders)}`)
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Orders</Title>
                    </Body>
                    <Right><Text>{this.props.cart_count}</Text></Right>
                </Header>
                <Content>
                    <Text>Test</Text>
                    <Button info style={{height:30, width:70}} onPress={() => this.props.navigation.navigate('Checkout')}>
                      <Text style={{fontSize:9}}>View Order</Text>
                    </Button> 
                   
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
      orders:state.ordersScreenReducer.orders,
      
  }
}

function mapDispatchToProps(dispatch) {
  return {     
    initiateOrdersScreen: () => dispatch(actionCreator.initiateOrdersScreen()),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen)