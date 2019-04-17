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

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Badge, List, ListItem } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class NotificationScreen extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.initiateNotificationScreen()
  }

  render() {
    this.props.records && console.log(`cart summary : ${JSON.stringify(this.props.records)}`)
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Notification</Title>
          </Body>
          <Right><Text>{this.props.cart_count}</Text></Right>
        </Header>
        <Content>
          <Card transparent style={{ marginTop: 0 }}>
            <CardItem>
              <FlatList
                data={this.props.records}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                renderItem={({ item }) => (
                  <List style={{ margin: 1 }}>
                    <ListItem>
                      <Body>
                        <Text style={{ fontWeight: 'bold' }}>App Notification</Text>
                        <Text note style={{ color: 'cornflowerblue' }}>{item.unotification_body.replace('App Notification', '')}</Text>
                      </Body>
                      <Right>
                        <Text note style={{ fontStyle: 'italic' }}>{item.unotification_date}</Text>
                      </Right>
                    </ListItem>
                  </List>
                )}
              />
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active={(this.props.navigation.state.routeName === "Home") ? true : false} onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="home" active={(this.props.navigation.state.routeName === "Home") ? true : false} />
            </Button>
            <Button badge vertical active={(this.props.navigation.state.routeName === "Cart") ? true : false} onPress={() => this.props.navigation.navigate('Cart')} >
              <Badge><Text>{this.props.cart_count}</Text></Badge>
              <Icon name="cart" active={(this.props.navigation.state.routeName === "Cart") ? true : false} />
            </Button>
            <Button badge vertical active={(this.props.navigation.state.routeName === "Notification") ? true : false} onPress={() => this.props.navigation.navigate('Notification')} >
              <Badge><Text>{this.props.unread_notifications}</Text></Badge>
              <Icon name="text" active={(this.props.navigation.state.routeName === "Notification") ? true : false} />
            </Button>
            <Button vertical active={(this.props.navigation.state.routeName === "Account") ? true : false} onPress={() => this.props.navigation.navigate('Account')} >
              <Icon name="person" active={(this.props.navigation.state.routeName === "Account") ? true : false} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}



function mapStateToProps(state) {
  return {
    records: state.notificationScreenReducer.records,
    cart_count: state.homeScreenReducer.cart_count,
    unread_notifications: state.homeScreenReducer.unread_notifications || 0,
    unread_messages: state.notificationScreenReducer.unread_messages || 0,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initiateNotificationScreen: () => dispatch(actionCreator.initiateNotificationScreen()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)