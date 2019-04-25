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


class StateScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this.props.initiateStates(this.props.cid)
        // this.props.initiateStates()
    }

    goBack(states_id, states_name) {
        this.props.setStates({ states_id, states_name })
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
                        <Title>Select State</Title>
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
                                                    <Text style={styles.inputLabel}>State: </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                                                    <TextInput autoFocus={true} clearTextOnFocus={true} style={[styles.textInput]} />
                                                    {/* value={this.props.state} onChangeText={state => this.getState({ state })} */}
                                                </View>
                                                <View style={{ justifyContent: 'flex-start', padding: 10, paddingLeft: 5 }}>
                                                    <FlatList
                                                        data={this.props.states}
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
        cid: state.addressScreenReducer.country_id,
        states: state.addressScreenReducer.states
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initiateCountries: () => dispatch(actionCreator.getCountries()),
        initiateStates: (country_id) => dispatch(actionCreator.getStates(country_id)),
        setStates: (value) => dispatch({ type: 'SET_STATES', payload: { ...value } }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StateScreen)