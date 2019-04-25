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
    Left,
    Right,
    Icon,
} from 'native-base';
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class ChangePasswordScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    async changePassword(){
       await this.props.changePassword()
       await this.props.navigation.goBack()
    }

    render() {
        return (
            <Container style={styles.authContainer}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Change Password</Title>
                    </Body>
                    <Right />
                </Header>
                <Card style={{ width: Layout.window.width / 1.5, alignSelf: 'center', borderRadius: 20, marginTop: 50 }}>
                    <Text style={{ padding: 10, fontSize: 13 }}>Change New Password</Text>
                    <Form>
                        <FormItem floatingLabel style={{ margin: 15 }}>
                            <Label>New Password</Label>
                            <Input secureTextEntry={true}  value={this.props.newPassword} onChangeText={(newPassword) => this.props.setPassword({ newPassword })} />
                        </FormItem>
                        <FormItem floatingLabel style={{ margin: 15 }}>
                            <Label>Confrim New Password</Label>
                            <Input secureTextEntry={true}  value={this.props.confirmPassword} onChangeText={(confirmPassword) => this.props.setPassword({ confirmPassword })} />
                        </FormItem>
                        <FormItem floatingLabel style={{ margin: 15 }}>
                            <Label>Password</Label>
                            <Input secureTextEntry={true}  value={this.props.oldPassword} onChangeText={(oldPassword) => this.props.setPassword({ oldPassword })} />
                        </FormItem>
                        <Button full primary style={{ margin: 13, borderRadius: 15 }} onPress={() => this.changePassword()}>
                            <Text>Change Password</Text>
                        </Button>
                    </Form>
                </Card>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPassword: (value) => dispatch({ type: 'SET_PASSWORD', payload: { ...value } }),
        changePassword: () => dispatch(actionCreator.changePassword())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)