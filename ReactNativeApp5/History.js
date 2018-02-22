import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class HistoryScreen extends React.Component {
    static navigationOptions = {title: 'HistoryScreen'};
    render() {
        const {params} = this.props.navigation.state;
        return (
            <View>
                <Text>History</Text>
                <FlatList data={params.data} renderItem={({item}) => <Text>{item.key}</Text> }/>
            </View>
        )
    }
}