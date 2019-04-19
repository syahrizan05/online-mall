import React, { Component } from 'react';
import { Constants, Facebook, GoogleSignIn, LinearGradient } from 'expo';
import styles from '../styles/styles';
import Layout from '../constants/Layout';
import { Image, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Badge, Form, Item as FormItem, Input, Label } from 'native-base';
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class IntroScreen extends Component {
    static navigationOptions = {
        header: null

    };


    render() {
        const images = [
            { id: 1, title: 'Elegantly designed. Such a sight for sore eyes', screenshotUri: require('../assets/images/intro/Home.png') },
            { id: 1, title: 'Anything you have to know about products you are looking for ', screenshotUri: require('../assets/images/intro/ProductDetail.png') },
            { id: 1, title: 'Having a second thought? Check your cart before paying', screenshotUri: require('../assets/images/intro/Cart.png') },
            { id: 1, title: 'Get notified of any updates or information on the listed products and stores.', screenshotUri: require('../assets/images/intro/Notifications.png') },
            { id: 1, title: 'Your profile securedly stored yet easily accessible for your convenience', screenshotUri: require('../assets/images/intro/Profile.png') },
        ]

        return (
            <LinearGradient
                colors={['#5BB7D1', '#1B79AF']}
                start={[0, 1]}
                end={[1, 0]}
                style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, paddingTop: Constants.statusBarHeight }}>

                <ImageSlider
                    style={{ flex: 10, alignSelf: 'stretch', backgroundColor: 'transparent' }}
                    loopBothSides
                    autoPlayWithInterval={5000}
                    images={images}
                    customSlide={({ index, item, style }) => (
                        // It's important to put style here because it's got offset inside
                        item &&
                        <View key={index} style={[style, { backgroundColor: 'transparent' }]}>
                            <Text style={{ fontSize: 17, color: '#fff', alignSelf: 'center', textAlign: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, marginTop: 10 }}>
                                {item.title}
                            </Text>
                            <Image source={item.screenshotUri} resizeMode={'contain'} style={{
                                height: undefined,
                                width: undefined,
                                flex: 1, opacity: 0.6
                            }} />
                        </View>
                    )}
                    customButtons={(position, move) => (
                        <View style={[styles.buttons, { paddingTop: 50 }]}>
                            {images.map((image, index) => (
                                <TouchableHighlight
                                    key={index}
                                    underlayColor="#ccc"
                                    onPress={() => this._move(index)}
                                    style={[
                                        styles.button,
                                        position === index && styles.buttonSelected,
                                    ]}
                                >
                                    <View />
                                </TouchableHighlight>
                            ))}
                        </View>
                    )}
                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{ flex: 1, justifyContent: 'center' }}><Text style={{ color: '#fff', textAlign: 'center' }}>Enter Now!</Text></TouchableOpacity>

            </LinearGradient>
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
export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen)