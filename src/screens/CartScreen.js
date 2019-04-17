//import {Google}
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

import {Constants, Facebook, GoogleSignIn,Google} from 'expo';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,DeckSwiper,Card,CardItem,Thumbnail,Badge,Form,Item as FormItem,Input,Label } from 'native-base';
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

  handleGoogleSignIn=async ()=>{
    const clientId = '32816482297-m2m1sqd3murmo97uor5srqef5ajkqdr6.apps.googleusercontent.com';
const { type, accessToken, user } = await Google.logInAsync({ clientId });

if (type === 'success') {
  /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
  console.log(user);
}
  }

  beforeAnything=async ()=>{
    try {
      await GoogleSignIn.initAsync({ clientId: '258457727479-3iml03e9t3e5um9bvr81h8j9idabjsjq.apps.googleusercontent.com' });
    } catch ({ message }) {
      alert('GoogleSignIn.initAsync(): ' + message);
    }
  }

//   // Example of using the Google REST API
// async  getUserInfo(accessToken) {
//   let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   return await userInfoResponse.json();
// }

  

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
        {this.props.token?     
        <Content scrollEnabled={false}>
       
         <Button info style={{height:30, width:70}} onPress={() => this.props.navigation.navigate('Orders')}>
                      <Text style={{fontSize:9}}>View Order</Text>
                    </Button>     
                    <Button onPress={()=>this.props.logout()}><Text>Logout</Text></Button>    
        </Content>:
        <Content padder scrollEnabled={false}> 
        <View style={{width:Layout.window.width,height:Layout.window.height/4}}>
        <Image source={require('../assets/images/icon.png')} resizeMode={'contain'} style={{flex:1,width:undefined,height:undefined}} />
        </View>
       <Form>
        
          <FormItem floatingLabel >
            <Label>Email</Label>
            <Input value={this.props.email} onChangeText={(email)=>this.props.setLogin({email})} />
          </FormItem>
          <FormItem floatingLabel>
            <Label>Password</Label>
            <Input secureTextEntry={true} value={this.props.password} onChangeText={(password)=>this.props.setLogin({password})} />
          </FormItem>
          <View style={{margin:10}} />
          <Text note danger>{this.props.msg}</Text>
          <Button info full onPress={()=>this.props.login()}>
            <Text> Login </Text>
          </Button>       
          <Button  transparent style={{margin:13, height:Layout.window.width/14, width:Layout.window.width/2, alignSelf:'center'}}  onPress={() => this.props.navigation.navigate('Forgot')}>
          <Text note> Forgot Password ?</Text>
          </Button>
        </Form>
        
     <Text style={{alignSelf:'center', marginTop:5, fontSize:12}}>Connect with other ways</Text>
     <View style={{flexDirection:'row', marginTop:5, alignSelf:'center'}}>
        <Button info  iconLeft style={{margin:10, borderRadius:10}} onPress={()=>this.props.fbLogin()}> 
        <Icon name='logo-facebook' />
          <Text> Facebook</Text>
        </Button>      
 
    </View>
    <Button full transparent style={{margin:13, height:Layout.window.width/14, width:Layout.window.width/2, alignSelf:'center'}}  onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{fontSize:12}}> Sign Up Now </Text>
    </Button></Content>}
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
      user:state.userReducer, 
      
      token:state.userReducer.token, 
      
      email:state.loginReducer.email,
      password:state.loginReducer.password,
      msg:state.loginReducer.msg,
      
      cartSummary:state.cartDetailScreenReducer.cartSummary,
      products:state.cartDetailScreenReducer.products, 

      unread_notifications:state.cartDetailScreenReducer.unread_notifications||0,
      cart_count:state.cartDetailScreenReducer.cart_count||0,
  
  }
}

function mapDispatchToProps(dispatch) {
  return {     
    initiateCartDetailScreen: () => dispatch(actionCreator.initiateCartDetailScreen()),
    setLogin: (value) => dispatch({type:'SET_LOGIN',payload:{...value}}),
    login: () => dispatch(actionCreator.login()),
    logout: () => dispatch(actionCreator.logout()),
    fbLogin:()=>dispatch(actionCreator.fbLogin())

    

  

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)