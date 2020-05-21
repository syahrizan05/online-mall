import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
    Text,
    Picker,
    FlatList
} from 'react-native';

import _ from 'lodash'

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import styles from '../styles/styles'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, List, ListItem } from 'native-base';

import countryStatelist from '../data/countrystate2'


import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import Version from '../constants/Version';



class CountryStateListScreen extends React.PureComponent {

    static navigationOptions = {
        header: null,
    };

    goBack(item) {
        const { state, country } = item.item
        this.props.setKyc2({ state })

        this.props.setKyc2({ country })
        this.props.navigation.goBack()
    }

    componentDidMount() {
        const countryStateli = countryStatelist


        this.props.setKyc2({ countryStateli })
    }

    filterState(val) {
        console.log(`key is ${JSON.stringify(val)}`)
        const newData = countryStatelist.filter(item => {
            const itemData = `${item.state.toString().toUpperCase()}`;
            const textData = val.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.props.setKyc2({ countryStateli: newData })
    }


    getState(val) {
        this.props.setKyc2(val)
        const { state } = val
        this.filterState(state)
    }

    render() {


        return (
            <View style={{ marginTop: Constants.statusBarHeight }}>
                <View style={{ height: Layout.window.height / 3 }}>
                    <LinearGradient
                        colors={['#4ba4ef', '#232fd0']}
                        start={[0, 1]}
                        end={[1, 0]}
                        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>

                    </LinearGradient>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        top: Constants.statusBarHeight,
                        height: Layout.window.height - (Layout.window.height / 5) - 20,
                        width: Layout.window.width,
                    }}>
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View>
                            <View style={{ backgroundColor: '#ffffff', borderRadius: 10, width: Layout.window.width * 0.9, alignSelf: 'center' }}>
                                <Card transparent>
                                    <CardItem>
                                        <Body>
                                            <View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
                                                    <Text style={styles.inputLabel}>State: </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                                                    <TextInput autoFocus={true} clearTextOnFocus={true} value={this.props.state} onChangeText={state => this.getState({ state })} style={[styles.textInput]} />
                                                </View>
                                                <View style={{ justifyContent: 'flex-start', padding: 10, paddingLeft: 5 }}>
                                                    <FlatList
                                                        data={this.props.countryStateli}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        renderItem={({ item }) =>
                                                            <ListItem button onPress={() => this.goBack({ item })}>
                                                                <Body>
                                                                    <Text style={[styles.textDefault, { color: 'grey', alignSelf: 'flex-start', textAlign: 'left' }]}>{item.state}</Text>


                                                                    <Text style={[styles.textSmall, { color: 'grey', alignSelf: 'flex-start', textAlign: 'left' }]}>{item.country}</Text>
                                                                </Body>
                                                            </ListItem>
                                                        } />
                                                </View>
                                            </View>
                                        </Body>
                                    </CardItem>
                                </Card>

                            </View>
                        </View>
                        <View >
                            <View>
                                <Card transparent>
                                    <CardItem style={{ backgroundColor: 'transparent' }}>
                                        <Body>
                                            <Button large block style={{ borderRadius: 5, backgroundColor: '#00DAA8' }} onPress={() => this.nextPage()} >
                                                <Text style={styles.textHeader}>Continue</Text>
                                            </Button>
                                        </Body>
                                    </CardItem>

                                </Card>
                            </View>
                        </View>
                    </View>
                </View>
                <Version />
            </View>
        );
    }

}
function mapStateToProps(state) {
    return {
        kyc1: state.kyc1ScreenReducer,
        phone: state.kyc1ScreenReducer.phone,
        country: state.kyc1ScreenReducer.country,
        countryLi: state.kyc1ScreenReducer.countryLi,
        countryStateli: state.kyc2ScreenReducer.countryStateli,
        nationality: state.kyc1ScreenReducer.nationality,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setKyc2: (val) => dispatch({ type: 'SET_KYC_2', payload: val }),
        //setKyc:(val) => dispatch({ type: 'SET_KYC', payload: {...val}}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CountryStateListScreen)