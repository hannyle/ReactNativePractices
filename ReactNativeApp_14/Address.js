import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {FormLabel, FormInput, Button, List, ListItem} from 'react-native-elements';
import {SQLite} from 'expo';

const db = SQLite.openDatabase('addressdb.db');

export default class AddressScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {address: '', addressList: []};
  }
  static navigationOptions = {title: 'My Places'};

  componentDidMount = () => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists addresses (address text);');
    });
    this.updateList();
  } 

  saveAddress = () => {
    db.transaction(tx => {
        tx.executeSql('insert into addresses (address) values (?)', [this.state.address]);    
      }, null, this.updateList)
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from addresses', [], (_, { rows }) =>
        this.setState({addressList: rows._array})
      ); 
    });
  }

  deleteAddress = (address) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from addresses where address = ?;`, [address]);
      }, null, this.updateList
    )    
  }

  showAddress = async (address)=> {
    const {navigate} = this.props.navigation;
    try {
        const responseAddress = await fetch( 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + "&key=AIzaSyCts3LWKvqoextOCtk1BYX8dXF7Jei-jsY"); 
        const responseAddressJson = await responseAddress.json();
        let lati= responseAddressJson.results[0].geometry.location.lat;
        let longi= responseAddressJson.results[0].geometry.location.lng;
        navigate('Map', {lati, longi})
    }
    catch(error){
        console.error(error);
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FormLabel>PLACEFINDER</FormLabel>
        <FormInput placeholder = "Type in address"
          value = {this.state.address} onChangeText = {(address) => this.setState({address})}
          inputStyle = {{paddingLeft: 5}}
        />
        <Button icon={{name: 'save'}} title="SAVE" backgroundColor="#0d7fc1" buttonStyle={{borderRadius: 5}}
          onPress={this.saveAddress}
        />
        <List containerStyle={{marginTop: 20, width: "90%", marginLeft: 20}}>
          <FlatList             
            keyExtractor={item => item.address} 
            data={this.state.addressList} 
            renderItem={({item}) => (
              <ListItem                
                title={item.address}               
                rightTitle="show on Map"
                onLongPress={() => this.deleteAddress(item.address)}
                onPress = {() => this.showAddress(item.address)}/>            
            )}           
          /> 
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  buttonStyle: {
    borderRadius: 10
  }
});