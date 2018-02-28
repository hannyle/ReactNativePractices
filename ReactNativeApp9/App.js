import React from 'react';
import {Dimensions, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {MapView, Marker} from 'expo';

let {height, width} = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      inputAddress: '',
      region: {
          latitude: 60.200690,
          longitude: 24.934302,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0321
      },
      coordinate: {
        latitude: 0,
        longitude: 0
      }    
    }
  };    
 
  onRegionChange(region) {
    console.log('onRegionChange', region);
  }
  

  showAddress = () => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.inputAddress + "&key=AIzaSyCVMCGVSpla-xYZDoeJ1sn3MKHVOE40Onk";
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let lati = responseJson.results[0].geometry.location.lat;
        let longi = responseJson.results[0].geometry.location.lng;
        this.setState({          
          region: {
            latitude: lati,
            longitude: longi,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0321
          },
          coordinate: {
            latitude: lati,
            longitude: longi
          }
        });
      })
      .catch((error) => {
        Alert.alert(JSON.stringify(error));
      });

      return 
  }   
  render() {
    
    return (
      <View style={styles.container}>
      <View style={styles.subcontainer}>
          <TextInput style={styles.input} value={this.state.inputAddress} onChangeText={(inputAddress) => this.setState({inputAddress})}/>
          <Button title="Show" onPress={this.showAddress}/>
        </View>
        <MapView          
          style={styles.map}
          region={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta
          }}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={(region)=>this.setState({region})}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.coordinate.latitude,
              longitude: this.state.coordinate.longitude
            }}
          />
        </MapView>       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 0.9,
    width,
    height
  },
  subcontainer: {
    flex: 0.1, 
    flexDirection:"row", 
    justifyContent: "center", 
    alignItems: 'center'
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 10,
    padding: 5,
    fontSize: 20
  }
});
