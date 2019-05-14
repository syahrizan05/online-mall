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
    WebView,
    Modal,
    TextInput,
    ActivityIndicator
} from 'react-native';

import moment from 'moment'

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Input, Card, CardItem, Thumbnail, Separator, List, ListItem, H3, H2, Item } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class ChatShopScreen extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            shopID: null,
            subject: null,
            message: null,
        }
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        const { navigation } = this.props;
        const shop_id = navigation.getParam('shop_id', 'NO-ID');
        this.props.getShopDetail(shop_id)
        this.setState({ shop_id: shop_id })
    }

    async sendMessage() {
        await this.props.sendTextShop(this.state.subject, this.state.shop_id, this.state.message)
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
                        {this.props.shop &&
                            <Title>{this.props.shop.shop_name}</Title>
                        }
                    </Body>
                    <Right><Icon name='cart' /><Text note>{this.props.cart_count}</Text></Right>
                </Header>
                <Content>
                    {this.props.shop &&
                        <Card transparent style={{ flex: 0, marginTop: 0 }}>
                            <CardItem>
                                <Left>
                                    <Thumbnail style={{ borderWidth: 1, borderColor: 'rgba(0,0,102,0.5)', margin: 5 }} source={{ uri: this.props.shop.logo }} />
                                    <Body>
                                        <Text>{this.props.shop.shop_name}</Text>
                                        <Text note>Open since {moment(this.props.shop.shop_created_on).format('L')}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Input placeholder="Subject" value={this.state.subject} onChangeText={(subject) => this.setState({ subject })} />
                                </Body>
                            </CardItem>
                        </Card>
                    }
                </Content>
                <Footer>
                    <Input placeholder="Send Message" value={this.state.message} onChangeText={(message) => this.setState({ message })} />
                    <Button onPress={() => this.sendMessage()}>
                        <Icon name='send' />
                    </Button>
                </Footer>
            </Container>
        );
    }
}



function mapStateToProps(state) {
    return {
        user: state.userReducer,
        shop: state.shopDetailScreenReducer.shop,
        cart_count: state.homeScreenReducer.cart_count,
        token: state.userReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getShopDetail: (shop_id) => dispatch(actionCreator.getShopDetail(shop_id)),
        sendTextShop: (subject, shop_id, message) => dispatch(actionCreator.sendTextShop(subject, shop_id, message))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatShopScreen)