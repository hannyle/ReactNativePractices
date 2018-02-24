import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Picker, Image} from 'react-native';

export default class App extends React.Component {
  constructor(){ 
    super(); 
    this.state={ 
      PickerValueHolder: '', 
      moneyRates:[],
      inputValue: '',
      euroValue: ''
    }
  }

  componentDidMount = () => {
    const url = "https://api.fixer.io/latest";
    fetch(url)
      .then((response) =>  response.json())
      .then((responseJson) => {
        this.setState({
          moneyRates: responseJson.rates
        });
      });
  }
 
  GetSelectedPickerItem=()=>{
    const convertValue = (this.state.inputValue / this.state.PickerValueHolder).toFixed(2);
    this.setState({
      euroValue: convertValue
    });
  }
 
 render() {
   return (  
     <View style={styles.container}>
      <Image style={{width: 100, height: 60}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpJJqjk-pUdhQixRxqJ8OJYXl5pMBso4YzdJyb9y0-tLgV1Pzq'}}/>
      <Text style={{marginTop: 20}}>{this.state.euroValue} €</Text>
      <View style={{flexDirection:'row', marginTop: 20}}>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={(inputValue)=> this.setState({inputValue})}/>  
      <Picker style={{width: 100, borderWidth: 1}}
        selectedValue={this.state.PickerValueHolder} 
        onValueChange={(itemValue) => this.setState({PickerValueHolder: itemValue})} >
 
        <Picker.Item label="CAD" value={this.state.moneyRates.CAD} />
        <Picker.Item label="GBP" value={this.state.moneyRates.GBP} />
        <Picker.Item label="JPY" value={this.state.moneyRates.JPY} />
        <Picker.Item label="SGD" value={this.state.moneyRates.SGD} />
        <Picker.Item label="USD" value={this.state.moneyRates.USD} />        
      
      </Picker>
      </View>       
      <View style={{alignItems:'center'}}>
        <Button title="CONVERT" onPress={ this.GetSelectedPickerItem } /> 
      </View>
     </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  input: {
    width: 100,
    height: 30,
    borderWidth: 1
  }, 

});
