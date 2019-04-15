import React, { Component } from 'react';
import {Constants} from 'expo'
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import {Image} from 'react-native'
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
  CheckBox,
  Title,
  View,
  Card,
} from 'native-base';

export default class RegisterScreen extends Component {
    static navigationOptions = {
        header: null 
      };

  render() {
    return (
      <Container style={styles.authContainer}>
      <Header style={{height:Layout.window.height/3.5, borderBottomLeftRadius:225, borderBottomRightRadius:225}}>
          <Image source={require('../assets/images/icon.png') } resizeMode={'contain'} style={{width:200, height:200, alignSelf:'center'}} />
      </Header>
     <Card style={{width:Layout.window.width/1.5, alignSelf:'center', borderRadius:20}}>
     <Text style={{padding:10, fontSize:13}}>Please enter the account that you want to reset the password</Text>
        <Form>
          <FormItem floatingLabel style={{margin:15}}>
            <Label>Email</Label>
            <Input />
          </FormItem>
          <Button full primary style={{ margin:13, borderRadius:15 }}>
            <Text> Reset Password</Text>
          </Button>
          <Button full transparent style={{margin:13, borderRadius:15, height:Layout.window.width/14, width:Layout.window.width/2, alignSelf:'center'}} onPress={() => this.props.navigation.goBack()}>
          <Text style={{fontSize:12}}> Back </Text>
          </Button>
        </Form>
     </Card>
      </Container>
    );
  }
}