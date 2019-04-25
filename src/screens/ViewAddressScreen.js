import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
    FlatList,
    Alert
} from 'react-native';
import moment from 'moment'

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Badge, SwipeRow, } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'



class ViewAddressScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this.props.initiateAccountScreen()
        this.props.initiateUserAddress()
    }


    removeAddress(ua_id) {
        Alert.alert(
            'Delete Address',
            'Are you sure want to delete ?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                {
                    text: 'Delete',
                    onPress: () => { this.deleteAddress(ua_id) },
                    style: 'delete',
                },
            ],
            { cancelable: false },
        );
    }

    async deleteAddress(ua_id) {
        await this.props.deleteAddress(ua_id)
        await this.props.initiateUserAddress()
    }

    editAddress(ua_id, ua_name, ua_address1, ua_address2, ua_zip, ua_city, ua_phone, state_name, country_name) {
        this.props.navigation.navigate('EditAddress', { ua_id: ua_id })
        this.props.editAddress({ ua_name, ua_address1, ua_address2, ua_zip, ua_city, ua_phone, state_name, country_name })
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
                        <Title>My Address</Title>
                    </Body>
                    <Right>
                        <Button transparent><Text style={{ color: 'cornflowerblue', fontSize: 14 }} onPress={() => this.props.navigation.navigate('AddAddress')}>Add</Text></Button>
                    </Right>
                </Header>
                <Content>

                    <FlatList
                        data={this.props.address}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <Card transparent style={{ marginTop: 0, backgroundColor: 'white' }}>

                                <SwipeRow
                                    rightOpenValue={-65}
                                    body={
                                        <CardItem button style={{ paddingTop: 2, paddingBottom: 2, margin: 2 }} onPress={() => this.editAddress(item.ua_id, item.ua_name, item.ua_address1, item.ua_address2, item.ua_zip, item.ua_city, item.ua_phone, item.state_name, item.country_name)}>
                                            <Body>
                                                <Text>{item.ua_identifier}</Text>
                                                <Text>{item.ua_name}</Text>
                                                <Text>{item.ua_address1} {item.ua_address2}</Text>
                                                <Text>{item.ua_zip} {item.ua_city} {item.state_name} {item.country_name}</Text>
                                                <Text>{item.ua_phone}</Text>
                                            </Body>
                                        </CardItem>
                                    }
                                    right={
                                        <Button danger onPress={() => this.removeAddress(item.ua_id)}>
                                            <Icon active name="trash" />
                                        </Button>
                                    }
                                />

                            </Card>
                        )} />

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
        unread_notifications: state.notificationScreenReducer.unread_notifications,
        cart_count: state.accountScreenReducer.cart_count,
        fav_count: state.accountScreenReducer.fav_count,
        address: state.addressScreenReducer.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initiateAccountScreen: () => dispatch(actionCreator.initiateAccountScreen()),
        initiateUserAddress: () => dispatch(actionCreator.getAddress()),
        deleteAddress: (ua_id) => dispatch(actionCreator.deleteAddress(ua_id)),
        editAddress: (value) => dispatch({ type: 'EDIT_ADDRESS', payload: { ...value } }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewAddressScreen)