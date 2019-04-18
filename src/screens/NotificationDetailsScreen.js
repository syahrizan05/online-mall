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

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail, Badge, List, ListItem } from 'native-base';
import styles from '../styles/styles'
import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class NotificationDetailsScreen extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        const { navigation } = this.props;
        const unotification_id = navigation.getParam('unotification_id', 'NO-ID');
        this.props.readNotificationScreen(unotification_id)
    }

    goBack(){
        this.props.initiateNotificationScreen()
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>App Notification</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Card transparent style={{ marginTop: 0 }}>
                        <CardItem>

                            <Body>
                                <Text style={{ fontWeight: 'bold' }}>App Notification</Text>
                                <Text note style={{ color: 'cornflowerblue' }}>{this.props.unotification_body}</Text>
                            </Body>
                            <Right>
                                <Text note style={{ fontStyle: 'italic' }}>{this.props.unotification_date}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}



function mapStateToProps(state) {
    return {
        unotification_body: state.notificationScreenReducer.unotification_body,
        unotification_date: state.notificationScreenReducer.unotification_date
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initiateNotificationScreen: () => dispatch(actionCreator.initiateNotificationScreen()),
        readNotificationScreen: (unotification_id) => dispatch(actionCreator.readNotificationScreen(unotification_id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDetailsScreen)