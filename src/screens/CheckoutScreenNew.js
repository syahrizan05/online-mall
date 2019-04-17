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
    WebView
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Radio, List, ListItem } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class CheckoutScreenNew extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this.props.initiateOrderScreen()
    }

    render() {
        this.props.orders && console.log(`orders : ${JSON.stringify(this.props.orders)}`)
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Checkout</Title>
                    </Body>
                    <Right><Text>{this.props.cart_count}</Text></Right>
                </Header>
                <Card transparent style={{ marginTop: 0 }}>
                    <CardItem style={{ backgroundColor: 'cornflowerblue' }}>
                        <Body style={{ margin: 5 }}>
                            <Text style={{ color: 'white' }}>MOHD ADLAN SHAH BIN SHAHJEHAN</Text>
                            <Text style={{ color: 'white' }}>NO 3, PERSIARAN BAHAGIA 1, 28000 TEMERLOH, PAHANG DARUL MAKMUR</Text>
                            <Text style={{ color: 'white' }}>019-9276494</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Content>
                <Card transparent style={{margin:1}}>
                    <CardItem>
                        <Thumbnail small source={require('../assets/images/shop.png') } />
                        <Body style={{margin:3}}>
                            <Text note>Midvalley Mall</Text>
                            <Text note>Dr Martens</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Image style={{ height: Layout.window.height / 10, width: null, flex: 1, margin:10 }} source={require('../assets/images/shop.png')} />
                        <Body>
                            <Text note style={{fontSize:11}}>Dr. Martens 1461 (Black)</Text>
                            <Text note style={{fontStyle:'italic',color:'cornflowerblue', fontSize:9}}>Only 7 items(s) in stock</Text>
                            <Text note style={{color:'royalblue', fontWeight: 'bold'}}>RM 450</Text>
                        </Body>
                        <Left>
                            <Body>
                            <Text note style={{fontSize:10}}>Quantity : 2</Text>
                            <Text note style={{fontWeight: 'bold'}}>RM 900</Text>
                            </Body>
                        </Left>
                    </CardItem>
                 </Card>
                <Card transparent style={{backgroundColor:'white'}}>
                        <CardItem><Text style={{fontWeight:'bold'}}>Shipping Option :</Text></CardItem>
                        <CardItem button bordered style={{margin:5}}>
                            <Left>
                                <Icon active name="train" />
                                <Text>Pos Laju</Text>
                            </Left>
                            <Right>
                                <Radio selected={false} />
                            </Right>
                        </CardItem>
                        <CardItem button bordered style={{margin:5}}>
                            <Left>
                                <Icon active name="airplane" />
                                <Text>Gdex</Text>
                            </Left>
                            <Right>
                                <Radio selected={true} />
                            </Right>
                        </CardItem>
                    </Card>
                    <Card transparent style={{backgroundColor:'white'}}>
                        <CardItem><Text style={{fontWeight:'bold'}}>Payment Option :</Text></CardItem>
                        <CardItem button bordered style={{margin:5}}>
                            <Left>
                                <Icon active name="logo-google" />
                                <Text>LunaPay</Text>
                            </Left>
                            <Right>
                                <Radio selected={true} />
                            </Right>
                        </CardItem>
                        <CardItem button bordered style={{margin:5}}>
                            <Left>
                                <Icon active name="logo-android" />
                                <Text>Bilpliz</Text>
                            </Left>
                            <Right>
                                <Radio selected={false} />
                            </Right>
                        </CardItem>
                        <CardItem button bordered style={{margin:5}}>
                            <Left>
                                <Icon active name="logo-apple" />
                                <Text>Maybank</Text>
                            </Left>
                            <Right>
                                <Radio selected={false} />
                            </Right>
                        </CardItem>
                        <CardItem button bordered style={{margin:5}}>
                            <Left>
                                <Icon active name="cash" />
                                <Text>Bank Nagara</Text>
                            </Left>
                            <Right>
                                <Radio selected={false} />
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
                <View style={{ flexDirection: 'row', bottom: 0, left: 0, right: 0, backgroundColor: 'white' }}>
                    <View style={{ flex: 1, margin: 5 }}>
                        <Text note>Total : RM 6000</Text>
                        <Text note>Total with Tax :<Text style={{ color: 'royalblue', fontWeight: 'bold' }}> RM 7000</Text></Text>
                    </View>
                    <View style={{ margin: 7 }}>
                        <Button style={{ backgroundColor: "cornflowerblue", borderRadius: 10 }}>
                            <Text>Place Order</Text>
                            <Icon name="cart" />
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }
}



function mapStateToProps(state) {
    return {
        user: state.userReducer,
        orders: state.orderScreenReducer.orders,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        initiateOrderScreen: () => dispatch(actionCreator.initiateOrderScreen()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreenNew)