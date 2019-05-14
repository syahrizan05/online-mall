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


class MessageScreen extends React.PureComponent {

    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        this.props.getMessage()
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
                        <Title>Message</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Card transparent style={{ marginTop: 0 }}>
                        <CardItem>
                            <FlatList
                                data={this.props.messages}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={1}
                                renderItem={({ item }) => (
                                    <List style={{ margin: 0.5, backgroundColor: item.message_is_unread === 1 ? 'rgba(255,255,255, 0.8)' : 'rgba(135, 206, 235, 0.5)' }}>
                                        <ListItem style={{ backgroundColor: item.message_is_unread === 1 ? 'rgba(255,255,255, 0.8)' : 'rgba(255, 255, 255, 1)' }}>
                                            <Body>
                                                <Text style={{ fontWeight: 'bold' }}>{item.thread_subject}</Text>
                                                <Text note style={{ color: 'cornflowerblue' }}>{item.message_text}</Text>
                                                <Text note style={{ color: 'cornflowerblue' }}>By {item.message_from_name}</Text>
                                            </Body>
                                            <Right>
                                                <Text note style={{ fontStyle: 'italic' }}>{moment(item.thread_start_date).format('LL')}</Text>
                                            </Right>
                                        </ListItem>
                                    </List>
                                )}
                            />
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}



function mapStateToProps(state) {
    return {
        user: state.userReducer,
        token: state.userReducer.token,
        messages: state.shopDetailScreenReducer.messages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMessage: () => dispatch(actionCreator.getMessage()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen)