import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {text1:'', text2:'', sum: 0}
    this.calculateSum = this.calculateSum.bind(this);
    this.calculateLess = this.calculateLess.bind(this);
  }
  
  calculateSum = () => {
    
    this.setState({
      sum: Number(this.state.text1) + Number(this.state.text2)
    });
  }
  calculateLess = () => {
      this.setState({
      sum: Number(this.state.text1) - Number(this.state.text2)
    });
  }
  render() {
    return (
      <View style={{height: 100, width: 200, alignItems: 'center', alignSelf:'center', flexDirection: 'column', justifyContent: 'center', flex: 1}}>
        <Text style={{fontSize: 18, width: 'auto', flexDirection: 'row'}}>Result: {this.state.sum}</Text>
        <View>
        <TextInput style={{width: 200, borderColor: 'gray',  borderWidth: 1}}
        onChangeText={(text1)=>this.setState({text1})}
        value={this.state.text1}        
        />
        <TextInput style={{width: 200, borderColor:'brown', borderWidth: 1}}
        onChangeText={(text2)=>this.setState({text2})}
        value={this.state.text2}
        />
        </View>
        <View style={{ flexDirection: 'row', marginTop:'10%', paddingLeft: 50, paddingRight: 50, width: 200, alignItems: 'center', justifyContent: 'space-between'}}>
          <Button onPress={this.calculateSum} title="+"/>
          <Button onPress={this.calculateLess} title="-"/>          
        </View>
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
});