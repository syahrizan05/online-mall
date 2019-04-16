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


class Sidebar extends React.PureComponent {
  static navigationOptions = {
    header: null 
  };

  componentDidMount(){
    //this.props.initiateCartDetailScreen()  
  }

  render() {
    
    
    return (
      <Container style={{paddingTop:0}}>        
        <Content>
            <Text>{this.props.sidebar}</Text>
          <Card>
              <CardItem>
                  <Left /><Body>
                  <Icon name='person' style={{fontSize:48}} /></Body>
                  <Right />
              </CardItem>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
        </Content>
      </Container>
    );
  }
}



function mapStateToProps(state) {
  return {
      user:state.userReducer,    
      cartSummary:state.cartDetailScreenReducer.cartSummary,
      products:state.cartDetailScreenReducer.products, 

      sidebar:state.sidebarReducer.sidebar
  }
}

function mapDispatchToProps(dispatch) {
  return {     
    initiateCartDetailScreen: () => dispatch(actionCreator.initiateCartDetailScreen()),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)