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
    TextInput
} from 'react-native';
import moment from 'moment'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Badge, SwipeRow, Item, Input, Picker, Form, List, ListItem } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'



class CountryScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this.props.initiateCountries()
    }

    goBack(country_id, country_name) {
        this.props.setCountry({ country_id, country_name })
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
                        <Title>Select Country</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View>
                            <View style={{ backgroundColor: '#ffffff', borderRadius: 10, width: Layout.window.width * 0.9, alignSelf: 'center' }}>
                                <Card transparent>
                                    <CardItem>
                                        <Body>
                                            <View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
                                                    <Text style={styles.inputLabel}>Country: </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                                                    <TextInput autoFocus={true} clearTextOnFocus={true} style={[styles.textInput]} />
                                                    {/* value={this.props.state} onChangeText={state => this.getState({ state })} */}
                                                </View>
                                                <View style={{ justifyContent: 'flex-start', padding: 10, paddingLeft: 5 }}>
                                                    <FlatList
                                                        data={this.props.countries}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        renderItem={({ item }) =>
                                                            <ListItem button onPress={() => this.goBack(item.id, item.name)}>
                                                                <Text style={[styles.textDefault, { color: 'grey', alignSelf: 'flex-start', textAlign: 'left' }]}>{item.name}</Text>
                                                            </ListItem>
                                                        } />
                                                </View>
                                            </View>
                                        </Body>
                                    </CardItem>
                                </Card>

                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}



function mapStateToProps(state) {
    return {
        countries: state.addressScreenReducer.countries,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initiateCountries: () => dispatch(actionCreator.getCountries()),
        initiateStates: () => dispatch(actionCreator.getStates()),
        setCountry: (value) => dispatch({ type: 'SET_COUNTRY', payload: { ...value } }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CountryScreen)