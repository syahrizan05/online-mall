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
    Transforms,
    AsyncStorage,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { Constants, LinearGradient } from 'expo'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Item, Input, Subtitle, Badge, Drawer, H1, H2, H3 } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import Sidebar from './Sidebar'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'




class HomeScreen2 extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = { keyword: null }
    }

    static navigationOptions = {
        header: null
    };



    closeDrawer = () => {
        this.drawer._root.close()
    }
    openDrawer = (sidebar) => {
        this.props.setSideBar(sidebar)
        this.drawer._root.open()
    }


    setNotFirstTime = async () => {
        AsyncStorage.setItem('notFirstTime', '1');
    }


    async componentDidMount() {
        await this.setNotFirstTime()
        await this.props.checkLogin()
        await this.props.initiateHomeScreen()
        await this.props.getProducts()
    }

    handleSearch(val) {
        this.setState({ keyword: val })
        this.props.searchProducts(val)
    }

    clearKeyword() {
        this.setState({ keyword: null })
        this.props.clearResult()
    }

    async setFavorite(selprod_id) {

        await this.props.setFavorite(selprod_id)
        await this.props.initiateHomeScreen()
        await this.props.getProducts()
    }

    render() {
        const images = []
        this.props.slides && this.props.slides.map(image => images.push({
            id: image.slide_id,
            title: image.slide_title,
            screenshotUri: image.image_url
        }))

        const limitedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        const limitedArrayPair = limitedArray.reduce((result, value, index, array) => {
            if (index % 2 === 0)
                result.push(array.slice(index, index + 2));
            return result;
        }, []);
        console.log(` array ialah ${JSON.stringify(limitedArray)}`)
        console.log(`pair array ialah ${JSON.stringify(limitedArrayPair)}`)

        const collectionArray = [
            { title: 'Top Rated', img: <Image source={require('../assets/images/homeTop/topRated.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'Best Selling', img: <Image source={require('../assets/images/homeTop/bestSelling.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'New Products', img: <Image source={require('../assets/images/homeTop/new.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'Sale', img: <Image source={require('../assets/images/homeTop/sales.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'Free Shipping', img: <Image source={require('../assets/images/homeTop/freeShipping.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'Man Apparel', img: <Image source={require('../assets/images/homeTop/men.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'Woman Apparel', img: <Image source={require('../assets/images/homeTop/woman.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'Beauty', img: <Image source={require('../assets/images/homeTop/beauty.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'Furniture', img: <Image source={require('../assets/images/homeTop/furniture.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'Gadgets', img: <Image source={require('../assets/images/homeTop/gadgets.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'Home Appliances', img: <Image source={require('../assets/images/homeTop/homeAppliances.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'Sports', img: <Image source={require('../assets/images/homeTop/sports.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
            { title: 'Others', img: <Image source={require('../assets/images/homeTop/others.png')} resizeMode='contain' style={{ width: Layout.window.width / 8, height: undefined, flex: 1 }} /> },
        ]

        const test = [{ name: 'gambar1', age: 'text1' }, { name: 'gambar2', age: 'text2' }, { name: 'gambar3', age: 'text3' }, { name: 'gambar4', age: 'text4' }, { name: 'gambar5', age: 'text5' }]

        const collectionArrayPair = test.reduce((result, value, index, array) => {
            if (index % 2 === 0)
                result.push([array[index], array[index + 1]]);

            return result;
        }, []);

        console.log(`collectionArrayPair array ialah ${JSON.stringify(collectionArrayPair)}`)

        return (
            <Container style={[styles.container, { backgroundColor: '#E0F0FD' }]}>
                <View style={{ backgroundColor: '#0092FF', marginBottom: -5, paddingTop: Constants.statusBarHeight }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.props.navigation.goBack()}>
                            <Image source={require('../assets/images/mm_white.png')} resizeMode='contain' style={{ flex: 1, height: 30, width: 100 }} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 10, textAlignVertical: 'bottom', color: '#fff' }}>Hi Davidoff</Text></View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Icon name='search' style={{ color: '#fff', fontSize: 17, padding: 5 }} />
                            <Icon name='qr-scanner' style={{ color: '#fff', fontSize: 17, padding: 5 }} />
                            <Icon name='cart' style={{ color: '#fff', fontSize: 17, padding: 5 }} />
                            <Icon name='text' style={{ color: '#fff', fontSize: 17, padding: 5 }} />
                            <Icon name='notifications' style={{ color: '#fff', fontSize: 17, padding: 5 }} />
                        </View>
                    </View>
                    <View style={{ alignSelf: 'stretch', flexDirection: 'row', padding: 5 }}>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'row', flex: 1, borderWidth: 1, borderRightWidth: 0, borderColor: '#ccc', backgroundColor: '#fff', justifyContent: 'space-between' }}>
                            <TextInput style={{ borderWidth: 0, backgroundColor: 'transparent', flex: 9 }} placeholder='What are you looking for...' />
                            <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'flex-end' }}><Icon name='search' style={{ fontSize: 20, color: '#0092FF' }} /></View>
                        </View>

                    </View>
                    <View><Text style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 5, color: '#fff' }}>All Category</Text></View>
                </View>


                <ScrollView contentContainerStyle={{ marginTop: 0 }}>

                    <View style={{ width: Layout.window.width, height: Layout.window.height / 4, marginTop: 5, marginBottom: 5 }}>
                        <View style={{ position: 'absolute', top: 0, right: 0, bottom: Layout.window.height / 8, left: 0, backgroundColor: '#0092FF' }} />
                        <Image source={{ uri: 'https://picsum.photos/500' }} style={{ marginLeft: 10, marginRight: 10, flex: 1, width: undefined, height: undefined, borderRadius: 10 }} />
                        <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, }}>
                            <LinearGradient
                                colors={['rgba(0,146,255,0.4)', 'rgba(0,146,255,0.1)']}
                                start={[0, 1]}
                                end={[1, 0]}
                                style={{ marginLeft: 10, marginRight: 10, flex: 1, borderRadius: 10 }} />
                        </View>
                        <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, }}>
                            <View style={{ margin: 10, padding: 10, flexDirection: 'row' }}>
                                <View style={{ flex: 2 }}>
                                    <View>
                                        <H2 style={{ color: '#fff' }}>HARI RAYA IS AROUND THE CORNER</H2>
                                    </View>
                                    <View style={{ alignSelf: 'stretch', flexDirection: 'row' }}>
                                        <View style={{ flex: 2, marginTop: 10, marginBottom: 10, padding: 10, backgroundColor: '#FB7706', borderRadius: 5 }}>
                                            <Text style={{ color: '#fff' }}>Shop For Raya</Text>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ margin: 10, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }}>
                        <View><Text style={{ fontSize: 14, color: '#234186' }}>TIME LEFT</Text></View>
                        <View><Text style={{ fontSize: 10 }}>Days | Hours | Minutes | Seconds</Text></View>
                        <View><H2>3 : 40 : 13 :25</H2></View>
                    </View>

                    <View style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: 5 }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Icon name='home' style={{ color: '#FD7700', marginRight: 10, fontSize: 24 }} />
                                <H2 style={{ color: '#234186' }}>Hot Selling</H2>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ color: '#234186', alignSelf: 'flex-end', fontSize: 10 }}>View All</Text>
                            </View>

                        </View>
                        <FlatList
                            data={limitedArray}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            renderItem={({ item }) => (
                                <View style={[{ backgroundColor: '#fff', width: Layout.window.width / 1.5, height: Layout.window.height / 6, flex: 1, flexDirection: 'row', margin: 5, borderRadius: 10, borderWidth: 1, borderColor: '#ccc' }, styles.shadow]}>
                                    <View style={{ flex: 1, padding: 5 }}>
                                        <Image source={{ uri: 'https://picsum.photos/500' }} style={{ flex: 1, width: undefined, height: undefined, }} />
                                    </View>
                                    <View style={{ flex: 1, padding: 5 }}>
                                        <View><Text style={{ fontSize: 10, color: '#000' }} >Xiomi</Text></View>
                                        <View><Text style={{ fontSize: 10 }}>RM 100</Text></View>
                                        <View><Text style={{ fontSize: 10 }}>30 sold</Text></View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>

                    <View style={{ padding: 5, marginTop: 10 }}>
                        <LinearGradient
                            colors={['#E0F0FD', '#FFFFFF']}
                            start={[0, 1]}
                            end={[1, 0]}
                            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} />
                        <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Icon name='home' style={{ color: '#FD7700', marginRight: 10, fontSize: 24 }} />
                                <H2 style={{ color: '#234186' }}>Featured Offers</H2>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ color: '#234186', alignSelf: 'flex-end', fontSize: 10 }}>View All</Text>
                            </View>

                        </View>

                        <View style={{ width: Layout.window.width, height: Layout.window.height / 4, marginTop: 5, marginBottom: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 5, alignItems: 'center' }}>
                                    <View>
                                        <Icon name='cart' style={{ fontSize: 30, color: '#C3DAED' }} />
                                    </View>
                                    <View><Text style={{ color: '#234186' }}>Offers up to</Text></View>
                                    <View><H2 style={{ color: '#234186' }}>70%</H2></View>

                                </View>
                                <View style={{ flex: 2, padding: 10 }}>
                                    <FlatList
                                        data={limitedArray}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal
                                        renderItem={({ item }) => (
                                            <View style={[{ backgroundColor: '#fff', width: Layout.window.width / 3, height: undefined, flex: 1, margin: 5, borderRadius: 10, borderWidth: 1, borderColor: '#ccc' }, styles.shadow]}>
                                                <View style={{ flex: 1 }}>
                                                    <Image source={{ uri: 'https://picsum.photos/500' }} style={{ flex: 1, width: undefined, height: undefined, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                                                </View>
                                                <View style={{ flex: 1, padding: 5 }}>
                                                    <View><Text style={{ fontSize: 10, color: '#000' }} >Xiomi</Text></View>
                                                    <View><Text style={{ fontSize: 10 }}>RM 100</Text></View>
                                                    <View><Text style={{ fontSize: 10 }}>30 sold</Text></View>
                                                    <View style={{ margin: 5, padding: 5, borderRadius: 5, backgroundColor: '#FB7706' }}><Text style={{ fontSize: 10, color: '#fff' }}>Buy Now</Text></View>
                                                </View>
                                            </View>
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: 5 }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Icon name='home' style={{ color: '#FD7700', marginRight: 10, fontSize: 24 }} />
                                <H2 style={{ color: '#234186' }}>New Collections</H2>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ color: '#234186', alignSelf: 'flex-end', fontSize: 10 }}>View All</Text>
                            </View>

                        </View>
                        <FlatList
                            data={limitedArray}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            renderItem={({ item }) => (
                                <View style={[{ backgroundColor: '#fff', width: Layout.window.width / 1.5, height: Layout.window.height / 6, flex: 1, flexDirection: 'row', margin: 5, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', alignItems: 'center' }, styles.shadow]}>
                                    <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 10 }}>
                                        <Image source={{ uri: 'https://picsum.photos/500' }} style={{ flex: 1, width: undefined, height: undefined, borderRadius: 10 }} />
                                    </View>
                                    <View style={{ flex: 1, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <View><H2 style={{ color: '#fff' }}>Xiomi</H2></View>
                                        <View><Text style={{ fontSize: 12, color: '#fff' }}>RM 100</Text></View>
                                        <View style={{ margin: 5, padding: 5, borderRadius: 5, backgroundColor: '#FB7706' }}><Text style={{ fontSize: 10, color: '#fff' }}>Purchase Now!</Text></View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>

                    <View style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: 5 }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Icon name='home' style={{ color: '#FD7700', marginRight: 10, fontSize: 24 }} />
                                <H2 style={{ color: '#234186' }}>Daily Discover</H2>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ color: '#234186', alignSelf: 'flex-end', fontSize: 10 }}>View All</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={collectionArrayPair}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                renderItem={({ item }) => (
                                    <View style={{ backgroundColor: 'transparent', width: Layout.window.width / 3, height: Layout.window.height / 2, flex: 1, margin: 5, borderRadius: 10 }}>
                                        <View style={{ flex: 1, margin: 5, borderRadius: 10, padding: 5,backgroundColor:'#fff' }}>
                                            <Image source={{ uri: 'https://picsum.photos/500' }} style={{ flex: 1, width: undefined, height: undefined }} />
                                            <View style={{ flex: 2 }}>
                                                <Text style={{ fontSize: 10 }}>Test</Text>
                                                <View style={{ flexDirection: 'row', padding: 5, margin: 5, borderRadius: 5, backgroundColor: '#FB7706' }}><Icon name='cart' style={{ color: '#fff',fontSize:15 }} /><Text style={{ color: '#fff',fontSize:10 }}>Buy Now</Text></View>
                                            </View>

                                        </View>
                                        <View style={{ flex: 1, margin: 5, borderRadius: 10, padding: 5,backgroundColor:'#fff' }}>
                                            <Image source={{ uri: 'https://picsum.photos/500' }} style={{ flex: 1, width: undefined, height: undefined }} />
                                            <View style={{ flex: 2 }}>
                                                <Text style={{ fontSize: 10 }}>Test</Text>
                                                <View style={{ flexDirection: 'row', padding: 5, margin: 5, borderRadius: 5, backgroundColor: '#FB7706' }}><Icon name='cart' style={{ color: '#fff',fontSize:15 }} /><Text style={{ color: '#fff',fontSize:10 }}>Buy Now</Text></View>
                                            </View>

                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>

                </ScrollView>
                {!this.props.token && <View style={{ backgroundColor: 'rgba(255,153,51,0.2)', padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}><Text note style={{ textAlignVertical: 'center' }}>Please login to access more features</Text><Button small rounded info onPress={() => this.props.navigation.navigate('Login')}><Text>Login</Text></Button></View>}
                <Footer>
                    <FooterTab>
                        <Button vertical active={(this.props.navigation.state.routeName === "Home") ? true : false} onPress={() => this.props.navigation.navigate('Home')}>
                            <Icon name="home" active={(this.props.navigation.state.routeName === "Home") ? true : false} />
                        </Button>
                        <Button badge vertical active={(this.props.navigation.state.routeName === "Cart") ? true : false} onPress={() => this.props.navigation.navigate('Cart')} >
                            <Badge><Text>{this.props.cart_count}</Text></Badge>
                            <Icon name="cart" active={(this.props.navigation.state.routeName === "Cart") ? true : false} />
                        </Button>
                        <Button badge vertical active={(this.props.navigation.state.routeName === "Notification") ? true : false} onPress={() => this.props.navigation.navigate('Notification')} >
                            <Badge><Text>{this.props.unread_notifications}</Text></Badge>
                            <Icon name="text" active={(this.props.navigation.state.routeName === "Notification") ? true : false} />
                        </Button>
                        <Button vertical active={(this.props.navigation.state.routeName === "Account") ? true : false} onPress={() => this.props.navigation.navigate('Account')} >
                            <Icon name="person" active={(this.props.navigation.state.routeName === "Account") ? true : false} />
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

        collections: state.homeScreenReducer.collections,
        slides: state.homeScreenReducer.slides,

        newCollection: state.homeScreenReducer.newCollection,
        newCollectionItems: state.homeScreenReducer.newCollectionItems,

        products: state.productsReducer.products,


        cart_count: state.homeScreenReducer.cart_count,
        currencySymbol: state.homeScreenReducer.currencySymbol,
        unread_notifications: state.homeScreenReducer.unread_notifications || 0,
        unread_messages: state.homeScreenReducer.unread_messages || 0,
        fav_count: state.homeScreenReducer.fav_count,

        featuredShopDetail: state.homeScreenReducer.featuredShopDetail,
        featuredProduct: state.homeScreenReducer.featuredProduct,

        result: state.searchReducer.result,

        token: state.userReducer.token,

        cacat: state.loginReducer.cacat

    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateApp: () => dispatch(actionCreator.initiateApp()),
        initiateHomeScreen: () => dispatch(actionCreator.initiateHomeScreen()),
        getProducts: () => dispatch(actionCreator.getProducts()),

        searchProducts: (val) => dispatch(actionCreator.searchProducts(val)),

        addToCart: (selprod_id) => dispatch(actionCreator.addToCart(selprod_id)),

        setSideBar: (sidebar) => dispatch({ type: 'SET_SIDEBAR', payload: { sidebar } }),

        clearResult: () => dispatch({ type: 'CLEAR_RESULT' }),

        checkLogin: () => dispatch(actionCreator.checkLogin()),

        setFavorite: (selprod_id) => dispatch(actionCreator.setFavorite(selprod_id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen2)