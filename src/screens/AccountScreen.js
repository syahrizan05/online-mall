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

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,DeckSwiper,Card,CardItem,Thumbnail,Badge } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class AccountScreen extends React.PureComponent {
  static navigationOptions = {
    header: null 
  };

  componentDidMount(){
    this.props.initiateAccountScreen()  
  }

  render() {    
    
    return (
        <Container style={styles.container}>
         <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>My Account</Title>
          </Body>
          <Right><Text>{this.props.cart_count}</Text></Right>
        </Header> 
        <Content>
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
              <Text>{this.props.email}</Text>
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
        <Footer>
            <FooterTab>
              <Button  vertical active={(this.props.navigation.state.routeName==="Home")?true:false}  onPress={()=>this.props.navigation.navigate('Home')}>
                <Icon name="home"  active={(this.props.navigation.state.routeName==="Home")?true:false}   />             
              </Button>
              <Button badge vertical active={(this.props.navigation.state.routeName==="Cart")?true:false}  onPress={()=>this.props.navigation.navigate('Cart')} >
              <Badge><Text>{this.props.cart_count}</Text></Badge>
                <Icon name="cart"   active={(this.props.navigation.state.routeName==="Cart")?true:false} />          
              </Button>              
              <Button badge vertical active={(this.props.navigation.state.routeName==="Notification")?true:false}  onPress={()=>this.props.navigation.navigate('Notification')} >
               <Badge><Text>{this.props.unread_notifications}</Text></Badge>
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
      name:state.accountScreenReducer.name,
      username:state.accountScreenReducer.username,
      email:state.accountScreenReducer.email,

      unread_notifications:state.accountScreenReducer.unread_notifications||0,
      unread_messages:state.accountScreenReducer.unread_messages||0,
  }
}

function mapDispatchToProps(dispatch) {
  return {     
    initiateAccountScreen: () => dispatch(actionCreator.initiateAccountScreen()),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)