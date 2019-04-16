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

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,DeckSwiper,Card,CardItem,Thumbnail,Item, Input, Subtitle,Badge,Drawer } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import Sidebar from './Sidebar'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class SearchScreen extends React.PureComponent {
  static navigationOptions = {
    header: null 
  };


  componentDidMount(){

    //this.props.getProducts()
  }

  render() {
   this.props.result&&console.log(`result : ${this.props.result}`)
  
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>  
             </Left>    
                
          <Item>
            
            <Input placeholder="Search" onChangeText={(val)=>this.props.searchProducts(val)} />
            <Icon name="ios-search" />
          </Item>
        
          
        </Header>
        <Content>
        <FlatList
                
                data={this.props.result?this.props.result:this.props.products}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                  <Card style={{ elevation: 3, width: Layout.window.width / 2-10, }}>
                    <CardItem header>
                      <Body>
                        <Text note>{item.prodcat_name}</Text>
                        <Text >{item.product_name}</Text>
                      </Body>
                    </CardItem>
                    <CardItem cardBody>
                      <Image style={{ height: Layout.window.height / 9, flex: 1 }} source={{ uri: item.image_url }} />
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text style={{ fontSize: 12 }}>{this.props.currencySymbol}{item.theprice}</Text>
                      </Body>
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
              <Icon name="cart" />
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

    

      products:state.productsReducer.products,
      result:state.searchReducer.result,
      
     
 
  }
}
function mapDispatchToProps(dispatch) {
  return {     
      initiateHomeScreen: () => dispatch(actionCreator.initiateHomeScreen()),
      searchProducts: (val) => dispatch(actionCreator.searchProducts(val)),
      addToCart: (selprod_id) => dispatch(actionCreator.addToCart(selprod_id)),

      setSideBar: (sidebar) => dispatch({type:'SET_SIDEBAR',payload:{sidebar}}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)