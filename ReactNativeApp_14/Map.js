import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions} from 'react-native';
import {MapView, Marker} from 'expo';

let {height, width} = Dimensions.get('window');

export default class MapScreen extends React.Component {
    static navigationOptions = {title: 'Map'};
    render() {
        const {params} = this.props.navigation.state;
        return (
            <MapView style={mapStyle}
                region={{
                    latitude: params.lati,
                    longitude: params.longi,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221
                }}>
                <MapView.Marker
                    coordinate={{
                        latitude: params.lati,
                        longitude: params.longi,
                    }}
                />
            </MapView>
        );
    }
}

const mapStyle = {
    flex: 0.8,
    width,
    height
}