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
  WebView
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,DeckSwiper,Card,CardItem,Thumbnail } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class CheckoutScreen extends React.PureComponent {
  static navigationOptions = {
    header: null 
  };

  componentDidMount(){
    this.props.initiateOrderScreen()  
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
                <View style={{flex:1}} >
                    <WebView source={{uri: 'https://www.mayamall.com/'}} style={{flex:1}}  />                   
                </View>
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
      orders:state.orderScreenReducer.orders,
      
  }
}

function mapDispatchToProps(dispatch) {
  return {     
    initiateOrderScreen: () => dispatch(actionCreator.initiateOrderScreen()),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen)