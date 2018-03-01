import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Dimensions} from 'react-native';
import {MapView, Marker} from 'expo';

let {height, width} = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      region: {
        latitude: 60.200690,
        longitude: 24.934302,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0321
      }, 
      markers: [] 
    };
  }
  
  showNearby = async() => {
    try{
      const responseAddress = await fetch( 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.inputAddress + "&key=AIzaSyCts3LWKvqoextOCtk1BYX8dXF7Jei-jsY"); 
      const responseAddressJson = await responseAddress.json();
      let lati = responseAddressJson.results[0].geometry.location.lat;
      let longi = responseAddressJson.results[0].geometry.location.lng;
      this.setState({
        region: {
          latitude: lati,
          longitude: longi,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0321
        }
      })
        const responseNearby = await fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lati + "," + 
          longi + "&radius=500&type=restaurant&key=AIzaSyCts3LWKvqoextOCtk1BYX8dXF7Jei-jsY");
        const responseNearbyJson = await responseNearby.json();
        this.setState({
          markers: responseNearbyJson.results
        });
    }
    catch(error){
      console.error(error);
    }
  }

  onRegionChange(region) {
    console.log('onRegionChange', region);
  }

  render() {    
    return (
      <View style={styles.container}>
      <View style={styles.subcontainer}>
          <TextInput style={styles.input} value={this.state.inputAddress} onChangeText={(inputAddress) => this.setState({inputAddress})}/>
          <Button title="Show" onPress={this.showNearby}/>
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
        {this.state.markers.map((marker) => (
           <MapView.Marker key={marker["place_id"]}
           coordinate={{
             latitude: marker.geometry.location.lat,
             longitude: marker.geometry.location.lng
           }}
           title={marker.name}
           description={marker.vicinity}
         />          
        ))}         
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
