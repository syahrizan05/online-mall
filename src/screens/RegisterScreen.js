import React, { Component } from 'react';
import {Constants} from 'expo'
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import {Image,Linking} from 'react-native'
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
        <Form>
        <FormItem floatingLabel style={{margin:7}} >
            <Label>Name</Label>
            <Input />
          </FormItem>
        <FormItem floatingLabel style={{margin:7}} >
            <Label>Username</Label>
            <Input />
          </FormItem>
          <FormItem floatingLabel style={{margin:7}}>
            <Label>Email</Label>
            <Input />
          </FormItem>
          <FormItem floatingLabel last style={{margin:7}}>
            <Label>Password</Label>
            <Input secureTextEntry={true} />
          </FormItem>
          <FormItem floatingLabel last style={{margin:7}}>
            <Label>Confirm Password</Label>
            <Input secureTextEntry={true} />
          </FormItem>
            <View style={{flexDirection:'row', marginTop:5}}>
            <CheckBox checked={true} style={{marginRight:15}}/>
              {/* <Text style={{fontSize:8, width:Layout.window.width/2}}>I agree to MayaMall Terms of Usage and for my personal data to be processed 
              accrording to MayaMall Privacy Policy</Text> */}
              <Text style={{fontSize:12}}>I agree to MayaMall  <Text style={{fontSize:12, color:'blue'}} onPress={() => Linking.openURL('https://www.mayamall.com/term-and-condition')}>Term {'&'} Conditions</Text></Text>
            </View>
          <Button full primary style={{ margin:13, borderRadius:15 }}>
            <Text> Sign Up </Text>
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