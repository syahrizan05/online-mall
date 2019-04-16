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


class AddToCartScreen extends React.PureComponent {
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
      <View style={{position:'absolute',top:Layout.window.height/2}}>      
    <Card>
        <CardItem>
            
        </CardItem>
    </Card>
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddToCartScreen)