import React from 'react';
import {StyleSheet, Text, TextInput, View, Button, FlatList, Alert} from 'react-native';
import Expo, { SQLite } from 'expo';
import { List, ListItem, FormLabel, FormInput, Header} from 'react-native-elements';

const db = SQLite.openDatabase('shoppingdb.db');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {product: '', amount:'', shoplist: []};
  }

  componentDidMount() {
    // Create course table
    db.transaction(tx => {
      tx.executeSql('create table if not exists shop (id integer primary key not null, product text, amount text);');
    });
    this.updateList();
  }

  // Save shop
  saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into shop (product, amount) values (?, ?)', [this.state.product, this.state.amount]);    
      }, null, this.updateList)
  }

  // Update courselist
  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shop', [], (_, { rows }) =>
        this.setState({shoplist: rows._array})
      ); 
    });
  }

  // Delete course
  deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shop where id = ?;`, [id]);
      }, null, this.updateList
    )    
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };
// <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => this.deleteItem(item.id)}>bought</Text>
  render() {
    return (  
      <View style={styles.container}>
        <Header outerContainerStyles={{width: "100%"}}
          centerComponent={{text: "SHOPPING LIST", style:{color: "#fff", fontSize: 18}}}          
          backgroundColor= "#912504"
      />
        <FormLabel labelStyle={{fontSize: 16}}>PRODUCT</FormLabel>
        <FormInput placeholder='products' inputStyle={{paddingLeft: 5}}
          onChangeText={(product) => this.setState({product})}
          value={this.state.product}/>  
        <FormLabel labelStyle={{fontSize: 16}}>AMOUNT</FormLabel>
        <FormInput placeholder='amounts' inputStyle={{paddingLeft: 5}}
          onChangeText={(amount) => this.setState({amount})}
          value={this.state.amount}/>      
        <Button onPress={this.saveItem} title="Save" />         
        <List containerStyle={{marginTop: 20, width: "90%"}}>
          <FlatList             
            keyExtractor={item => item.id} 
            data={this.state.shoplist} 
            ItemSeparatorComponent={this.listSeparator} 
            renderItem={({item}) => (
              <ListItem
                title={item.product}
                subtitle={item.amount}
                rightTitle="bought"
                onPress={() => this.deleteItem(item.id)} 
              />            
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
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  }  
});