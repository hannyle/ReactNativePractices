import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions} from 'react-native';
import { Constants, Location, Permissions, MapView, Marker} from 'expo';

let {width, height} = Dimensions.get('window');
export default class App extends Component {  
  state = {
    locationResult: null,
    errorMessage: null,
    mapRegion: null,
    mapCoordinate: {
      latitude: 0,
      longitude: 0
    }
  } 

  componentDidMount() {    
      this.getLocation();    
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    else{
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: location});         
      this.setState({
          mapRegion: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
         },
          mapCoordinate: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
         }
      });     
    }
  }

  render() {
   let text1 = 'Getting location...'; 
     let text2;  

    if (this.state.errorMessage) {
      text1 = this.state.errorMessage;
    } 
    else if (this.state.locationResult) {
      text1 = '';
      text2 = (
        <MapView style={styles.map}
          region={this.state.mapRegion}
        >
          <MapView.Marker
            coordinate={this.state.mapCoordinate}
            description = "Your location"
          />
        </MapView>
      )
    }  
    
    return (
      <View style={styles.container}>
       <Text>{text1}</Text>
        {text2}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    flex: 1,
    width,
    height
  }
});