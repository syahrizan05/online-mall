import React, { Component } from 'react';
import { Constants } from 'expo'
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import { Image } from 'react-native'
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
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

 class ForgotScreen extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

   async forgotPass(){
      await this.props.forgotPassword()
      this.props.navigation.navigate('Login')
      }
    

  render() {
    return (
      <Container style={styles.authContainer}>
        <Header style={{ height: Layout.window.height / 3.5, borderBottomLeftRadius: 225, borderBottomRightRadius: 225 }}>
          <Image source={require('../assets/images/icon.png')} resizeMode={'contain'} style={{ width: 200, height: 200, alignSelf: 'center' }} />
        </Header>
        <Card style={{ width: Layout.window.width / 1.5, alignSelf: 'center', borderRadius: 20 }}>
          <Text style={{ padding: 10, fontSize: 13 }}>Please enter the account that you want to reset the password</Text>
          <Form>
            <FormItem floatingLabel style={{ margin: 15 }}>
              <Label>Email</Label>
              <Input onChangeText={(email) => this.props.setForgot({ email })}/>
            </FormItem>
            <Button full primary style={{ margin: 13, borderRadius: 15 }} onPress={() => this.forgotPass()}>
              <Text>Reset Password</Text>
            </Button>
            <Button full transparent style={{ margin: 13, borderRadius: 15, height: Layout.window.width / 14, width: Layout.window.width / 2, alignSelf: 'center' }} onPress={() => this.props.navigation.goBack()}>
              <Text style={{ fontSize: 12 }}>Back</Text>
            </Button>
          </Form>
        </Card>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    status :state.loginReducer.status,
    msg: state.loginReducer.msg
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setForgot: (value) => dispatch({ type: 'SET_FORGOT', payload: { ...value } }),
    forgotPassword: () => dispatch(actionCreator.forgotPassword())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotScreen)