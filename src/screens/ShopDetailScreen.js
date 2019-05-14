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


class ShopDetailScreen extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = { shopID: null }
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        const { navigation } = this.props;
        const shop_id = navigation.getParam('shop_id', 'NO-ID');
        this.props.getShopDetail(shop_id)
        this.props.getProductShop(shop_id)
        this.setState({ shopID: shop_id })
    }

    async setFavorite(selprod_id) {
        await this.props.setFavorite(selprod_id)
        await this.props.getProductShop(this.state.shopID)
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
                                <Image source={{ uri: this.props.shop.banner }} resizeMode={'cover'} style={{
                                    height: Layout.window.height / 6,
                                    width: Layout.window.width,
                                }} />
                            </CardItem>
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
                                    <Text style={{ margin: 5 }}>
                                        {this.props.shop.shop_description}
                                    </Text>
                                    <Text note style={{ margin: 5 }}>
                                        {this.props.shop.shop_city}, {this.props.shop.shop_state_name}
                                    </Text>
                                    <Text note style={{ margin: 5 }}>
                                        {this.props.shop.shop_country_name}
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={{ margin: 5 }}>Rating : {this.props.shop_rating}</Text>
                                </Left>
                            </CardItem>
                        </Card>
                    }

                    <Card transparent>
                        <CardItem header style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                            <Left>
                                <H2>Featured Products</H2></Left>
                            <Right>
                                <Icon name='fastforward' style={{ color: 'dimgrey', transform: [{ rotate: '90deg' }] }} />
                            </Right>
                        </CardItem>
                        {this.props.products ? <CardItem>
                            <FlatList
                                data={this.props.products}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={2}
                                renderItem={({ item }) => (
                                    <Card transparent style={{ flex: 1, marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                                        <CardItem cardBody button onPress={() => this.props.navigation.navigate('ProductDetail', { product_id: item.selprod_id })}>
                                            <Image style={{ height: Layout.window.height / 9, width: null, flex: 1 }} source={{ uri: item.product_image }} />
                                            <View style={{ position: 'absolute', top: 0, right: 10, backgroundColor: 'rgba(0,0,102,0.5)', paddingTop: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                <Text note style={{ color: '#fff', textAlignVertical: 'center', textAlign: 'center', marginTop: 0 }}>{this.props.currencySymbol}{item.theprice}</Text></View>
                                        </CardItem>
                                        <CardItem footer>
                                            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}>
                                                <Text note style={{ flex: 3, fontSize: 12 }} numberOfLines={1} ellipsizeMode='tail'>{item.product_name}</Text>
                                                {this.props.token && <TouchableHighlight style={{ flex: 1, }} transparent onPress={() => this.setFavorite(item.selprod_id)}>
                                                    <Icon name='heart' style={{ fontSize: 18, paddingRight: 3, textAlign: 'right', color: item.isfavorite == 1 ? 'red' : 'lightgrey' }} />
                                                </TouchableHighlight>}
                                            </View>
                                        </CardItem>
                                    </Card>
                                )}
                            />
                        </CardItem> : <CardItem style={{ padding: 10 }}><Left /><Body><ActivityIndicator size="small" color="#37beef" /><Right /></Body></CardItem>}
                    </Card>
                </Content>
                <Footer>
                    <FooterTab style={{ backgroundColor: 'cornflowerblue' }}>
                        <Button active vertical style={{ borderRightWidth: 1, backgroundColor: 'cornflowerblue' }} >
                            <Icon name="list-box" active style={{ color: 'white' }} />
                            <Text style={{ color: 'white' }}>Categories</Text>
                        </Button>
                        <Button active vertical style={{ borderRightWidth: 1, backgroundColor: 'cornflowerblue' }}>
                            <Icon name="basket" active style={{ color: 'white' }} />
                            <Text style={{ color: 'white' }}>Profile</Text>
                        </Button>
                        <Button active vertical onPress={() => this.props.navigation.navigate('ChatShop', { shop_id: this.state.shopID })} style={{ backgroundColor: 'cornflowerblue' }}>
                            <Icon name="chatbubbles" active style={{ color: 'white' }} />
                            <Text style={{ color: 'white' }} >Chat Now</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}



function mapStateToProps(state) {
    return {
        user: state.userReducer,
        shop_rating: state.productDetailScreenReducer.shop_rating,
        shop: state.shopDetailScreenReducer.shop,
        products: state.shopDetailScreenReducer.products,
        currencySymbol: state.shopDetailScreenReducer.currencySymbol,
        cart_count: state.homeScreenReducer.cart_count,
        token: state.userReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initiateProductDetailScreen: (product_id) => dispatch(actionCreator.initiateProductDetailScreen(product_id)),
        getShopDetail: (shop_id) => dispatch(actionCreator.getShopDetail(shop_id)),
        getProductShop: (shop_id) => dispatch(actionCreator.getProductShop(shop_id)),
        setFavorite: (selprod_id) => dispatch(actionCreator.setFavorite(selprod_id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailScreen)