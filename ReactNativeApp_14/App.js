import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import AddressScreen from './Address';
import MapScreen from './Map';

const MyApp = StackNavigator({
  Address: {screen: AddressScreen},
  Map: {screen: MapScreen} 
});

export default class App extends React.Component {
  render() {
    return <MyApp/>;
  }
}