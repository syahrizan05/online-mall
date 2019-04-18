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

import moment from 'moment'

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Badge, List, ListItem } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class FavoriteScreen extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.initiateFavoriteScreen()
  }

  render() {
 
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Favorite</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <FlatList
              data={this.props.products}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
              renderItem={({ item }) => (
                <Card transparent style={{ margin: 1, marginTop: 0 }}>
                  <CardItem>
                    <Thumbnail small source={require('../assets/images/shop.png')} />
                    <Body style={{ margin: 3 }}>
                      <Text note>{item.shop_name}</Text>
                      <Text note>{item.brand_name}</Text>
                    </Body>
                  </CardItem>
                  <CardItem button onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.product_id })}>
                    <Image style={{ height: Layout.window.height / 10, width: null, flex: 1, margin: 10 }} source={{ uri: item.product_image }} />
                    <Body>
                      <Text note style={{ fontSize: 11 }}>{item.product_name}</Text>
                      <Text note style={{ fontStyle: 'italic', color: 'cornflowerblue', fontSize: 9 }}>Only {item.selprod_stock} items(s) in stock</Text>
                      <Text note style={{ color: 'royalblue', fontWeight: 'bold' }}>RM{item.currency_theprice}</Text>
                      {/* <Text note style={{color: 'dodgerblue'}}>RM{item.currency_tax}</Text> */}
                    </Body>                  
                  </CardItem>
                </Card>
              )}
            />
        </Content>
        
      </Container>
    );
  }
}



function mapStateToProps(state) {
  return {
    products: state.favoriteScreenReducer.products,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initiateFavoriteScreen: () => dispatch(actionCreator.initiateFavoriteScreen()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen)