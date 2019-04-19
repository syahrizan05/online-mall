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

class EditEmailScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

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
                        <Title>Change Email Address</Title>
                    </Body>
                    <Right/>
                </Header>
                <Card style={{ width: Layout.window.width / 1.5, alignSelf: 'center', borderRadius: 20, marginTop:50 }}>
                    <Text style={{ padding: 10, fontSize: 13 }}>Change New Email Address</Text>
                    <Form>
                        <FormItem floatingLabel style={{ margin: 15 }}>
                            <Label>New Email</Label>
                            <Input />
                        </FormItem>
                        <FormItem floatingLabel style={{ margin: 15 }}>
                            <Label>Confrim New Email</Label>
                            <Input  />
                        </FormItem>
                        <FormItem floatingLabel style={{ margin: 15 }}>
                            <Label>Password</Label>
                            <Input />
                        </FormItem>
                        <Button full primary style={{ margin: 13, borderRadius: 15 }}>
                            <Text>Change Email</Text>
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
     
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditEmailScreen)