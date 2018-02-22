import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './HomeScreen';
import HistoryScreen from './History';

const MyApp = StackNavigator({
    Home: {screen: HomeScreen},
    History: {screen: HistoryScreen}
});
export default class App extends React.Component {
    render() {
        return <MyApp/>
    }
}