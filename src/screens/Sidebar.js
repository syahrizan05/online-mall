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
import Constants from 'expo-constants';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,DeckSwiper,Card,CardItem,Thumbnail,Form,Item,Label,Input,Picker } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class Sidebar extends React.PureComponent {
  static navigationOptions = {
    header: null 
   
  };
  state={selected2:undefined}

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  render() {

    return (
      <Container style={{ paddingTop: Constants.statusBarHeight, backgroundColor: '#fff' }}>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Keyword</Label>
              <Input />
            </Item>
            <Item stackedLabel picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Condition" value="" />
                <Picker.Item label="New" value="0" />
                <Picker.Item label="Refurbished" value="1" />
                <Picker.Item label="Used" value="2" />
               
              </Picker>
            </Item>
            <Item stackedLabel>
              <Label>Minimum Price</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Maximum</Label>
              <Input />
            </Item>
          </Form>
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