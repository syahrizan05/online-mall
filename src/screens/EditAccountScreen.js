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

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Badge, Item, Input, Textarea } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class EditAccountScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            phone: "",
            dob: "",
            city: "",
            name: "",
        }
    }

    componentDidMount() {
        this.props.initiateAccountScreen()
    }

    async updateInfo() {
        await this.props.updateProfileInfo()
        await this.props.initiateAccountScreen()
        alert("Updated Successfully")
        this.props.navigation.goBack()
    }

    pickImage(){

    }

    

    render() {

        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Edit Account</Title>
                    </Body>
                    <Right>
                        <Button transparent><Text style={{ color: 'cornflowerblue', fontSize: 14 }} onPress={() => this.updateInfo()}>Save</Text></Button>
                    </Right>
                </Header>
                <Content>
                    <Card transparent style={{ marginTop: 0, backgroundColor: 'white' }}>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Left></Left>
                            <Body>
                                <TouchableHighlight style={{ flex:1}}  >
                                    <Thumbnail large source={{ uri: this.props.user_image }} />
                                </TouchableHighlight>
                                <Text>{this.props.username}</Text>
                            </Body>
                            <Right />
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Icon active name="contact" />
                            <Body>
                                <Text> Name :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10 }}>
                                    <Input value={this.props.name} onChangeText={(name) => this.props.setInfo({ name })} />
                                </Item>
                            </Body>
                            <Right />
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Icon active name="mail" />
                            <Body>
                                <Text> Email :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10 }}>
                                    <Input disabled value={this.props.email} />
                                </Item>
                            </Body>
                            <Right />
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Icon active name="phone-portrait" />
                            <Body>
                                <Text> Phone No :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10 }}>
                                    <Input value={this.props.phone} onChangeText={(phone) => this.props.setInfo({ phone })} />
                                </Item>
                            </Body>
                            <Right />
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Icon active name="calendar" />
                            <Body>
                                <Text> Date of Birth :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10 }}>
                                    <Input value={this.props.dob} onChangeText={(dob) => this.props.setInfo({ dob })} />
                                </Item>
                            </Body>
                            <Right />
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Icon active name="business" />
                            <Body>
                                <Text> City :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10 }}>
                                    <Input value={this.props.city} onChangeText={(city) => this.props.setInfo({ city })} />
                                </Item>
                            </Body>
                            <Right />
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Icon active name="home" />
                            <Body>
                                <Text> Address :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, padding: 10 }}>
                                    <Textarea value={this.props.address_1} rowSpan={3} placeholder="Address" />
                                </Item>
                            </Body>
                            <Right />
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
    
}



function mapStateToProps(state) {
    return {
        name: state.accountScreenReducer.name,
        username: state.accountScreenReducer.username,
        email: state.accountScreenReducer.email,
        user_image: state.accountScreenReducer.user_image,
        phone: state.accountScreenReducer.phone,
        dob: state.accountScreenReducer.dob,
        city: state.accountScreenReducer.city,
        address_1: state.accountScreenReducer.address_1,
        address_2: state.accountScreenReducer.address_2,
        unread_messages: state.accountScreenReducer.unread_messages,
        unread_notifications: state.accountScreenReducer.unread_notifications,
        cart_count: state.accountScreenReducer.cart_count,
        fav_count: state.accountScreenReducer.fav_count,
        msg: state.accountScreenReducer.msg
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initiateAccountScreen: () => dispatch(actionCreator.initiateAccountScreen()),
        setInfo: (value) => dispatch({ type: 'SET_PROFILE_INFO', payload: { ...value } }),
        updateProfileInfo: () => dispatch(actionCreator.updateProfileInfo()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAccountScreen)