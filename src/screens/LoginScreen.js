import React, { Component } from 'react';
import {Constants, Facebook, GoogleSignIn} from 'expo';
import styles from '../styles/styles';
import Layout from '../constants/Layout';
import {Image} from 'react-native';
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
  View,
  Card,
  Icon,
  Left,
  Right,
} from 'native-base';

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null 
        
      };

      state = { user: null };

      async fbLogIn() {
        try {
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync('1985454545081156', {
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            alert('Logged in!', `Hi ${(await response.json()).name}!`);
            console.log('token FB'+token)
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

  render() {

    return (
      <Container style={styles.authContainer}>

      <Header style={[styles.statusBar,{height:Layout.window.height/3.5, borderBottomLeftRadius:225, borderBottomRightRadius:225}]}>
          <Image source={require('../assets/images/icon.png') } resizeMode={'contain'} style={{width:200, height:200, alignSelf:'center'}} />
      </Header>
     <Card style={{width:Layout.window.width/1.5, alignSelf:'center', borderRadius:20}}>
        <Form>
          <FormItem floatingLabel >
            <Label>Email</Label>
            <Input />
          </FormItem>
          <FormItem floatingLabel last>
            <Label>Password</Label>
            <Input secureTextEntry={true} />
          </FormItem>
          <Button full primary style={{ margin:13, borderRadius:15, width:Layout.window.width/2.5, alignSelf:'center' }}>
            <Text> Login </Text>
          </Button>
          <Button full transparent style={{margin:13, height:Layout.window.width/14, width:Layout.window.width/2, alignSelf:'center'}}  onPress={() => this.props.navigation.navigate('Forgot')}>
          <Text style={{fontSize:10}}> Forgot Password ?</Text>
          </Button>
        </Form>
     </Card>
     <Text style={{alignSelf:'center', marginTop:5, fontSize:12}}>Connect with other ways</Text>
     <View style={{flexDirection:'row', marginTop:5, alignSelf:'center'}}>
        <Button  iconLeft style={{margin:10, borderRadius:10}} onPress={this.fbLogIn}> 
        <Icon name='home'/>
          <Text> Facebook</Text>
        </Button>
        <Button  iconLeft style={{backgroundColor:'red', margin:10, borderRadius:10}} onPress={this.googleSignIn}>
        <Icon name='people'/>
          <Text> Google</Text>
        </Button>
    </View>
    <Button full transparent style={{margin:13, height:Layout.window.width/14, width:Layout.window.width/2, alignSelf:'center'}}  onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{fontSize:12}}> Sign Up Now </Text>
    </Button>
      </Container>
    );
  }
}