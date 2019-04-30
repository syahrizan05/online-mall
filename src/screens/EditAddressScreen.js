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
import moment from 'moment'

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Badge, SwipeRow, Item, Input } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'



class EditAddressScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            uid: null,
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const ua_id = navigation.getParam('ua_id', 'NO-ID');
        this.setState({ uid: ua_id })
    }

    async saveAddress() {
        const uid = this.state.uid
        await this.props.updateAddress(uid)
        await this.props.initiateUserAddress()
        alert("Successfully Updated")
        this.props.navigation.goBack()
    }

   async makeDefault(){
        const uid = this.state.uid
        await this.props.makeAddressPrimary(uid)
        await this.props.initiateUserAddress()
        this.props.navigation.goBack()
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
                        <Title>Edit Address</Title>
                    </Body>
                    <Right>
                        <Button transparent><Text style={{ color: 'cornflowerblue', fontSize: 14 }} onPress={() => this.saveAddress()}>Save</Text></Button>
                    </Right>
                </Header>
                <Content>
                    <Card transparent style={{ marginTop: 0, backgroundColor: 'white' }}>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Body>
                                <Text> Name :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10 }}>
                                    <Input value={this.props.name} onChangeText={(ua_name) => this.props.setAddress({ ua_name })} />
                                </Item>
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Body>
                                <Text> Address :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10, marginBottom: 5 }}>
                                    <Input value={this.props.address_1} onChangeText={(ua_address1) => this.props.setAddress({ ua_address1 })} />
                                </Item>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10, marginTop: 5 }}>
                                    <Input value={this.props.address_2} onChangeText={(ua_address2) => this.props.setAddress({ ua_address2 })} />
                                </Item>
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }} >
                            <Body>
                                <Text> Country :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10, marginTop: 5 }} onPress={() => this.props.navigation.navigate('Country')}>
                                    <Input disabled value={this.props.country}/>
                                </Item>
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Body>
                                <Text> States :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10, marginTop: 5 }} onPress={() => this.props.navigation.navigate('States')}>
                                    <Input disabled value={this.props.states}/>
                                </Item>
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Body>
                                <Text> City :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10 }}>
                                    <Input value={this.props.city} onChangeText={(ua_city) => this.props.setAddress({ ua_city })} />
                                </Item>
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Body>
                                <Text> Postal Code :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10 }}>
                                    <Input value={this.props.zip} onChangeText={(ua_zip) => this.props.setAddress({ ua_zip })} />
                                </Item>
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3 }}>
                            <Body>
                                <Text> Phone Number :</Text>
                                <Item rounded style={{ width: Layout.window.width / 1.2, height: Layout.window.height / 20, padding: 10 }}>
                                    <Input value={this.props.phone} onChangeText={(ua_phone) => this.props.setAddress({ ua_phone })} />
                                </Item>
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 5, margin: 3, backgroundColor: 'transparent' }}>
                            <Button full primary rounded style={{ flex: 1 }} onPress={() => this.makeDefault()}><Text>Make Default</Text></Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}



function mapStateToProps(state) {
    return {
        name: state.addressScreenReducer.ua_name,
        address_1: state.addressScreenReducer.ua_address1,
        address_2: state.addressScreenReducer.ua_address2,
        zip: state.addressScreenReducer.ua_zip,
        city: state.addressScreenReducer.ua_city,
        phone: state.addressScreenReducer.ua_phone,
        country: state.addressScreenReducer.country_name,
        states: state.addressScreenReducer.states_name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAddress: (value) => dispatch({ type: 'SET_ADDRESS', payload: { ...value } }),
        updateAddress: (uid) => dispatch(actionCreator.updateAddress(uid)),
        makeAddressPrimary: (uid) => dispatch(actionCreator.makeAddressPrimary(uid)),
        initiateUserAddress: () => dispatch(actionCreator.getAddress()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAddressScreen)