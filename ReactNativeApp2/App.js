import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';


  
export default class App extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      randomNum: Math.floor(Math.random()*100) + 1, 
      inputText: '', 
      count: 0,
      result: 'Guess a number between 1-100'}
    this.compareGuess = this.compareGuess.bind(this);  
  }
    
  compareGuess = () => {
    this.setState({count: this.state.count + 1});   
    if(Number(this.state.inputText) < this.state.randomNum) {
      this.setState({result: 'Your value is too low'});
    } else if(Number(this.state.inputText) > this.state.randomNum) {
      this.setState({result: 'Your value is too high'});
    } else {
      this.setState({result: 'Your value is correct!'});
      Alert.alert('You guessed the number in ' + this.state.count + ' guesses');
    }   
    
  }
  render() {    
    return (
      <View style={styles.container}>
        <Text>{this.state.result}</Text>
        <TextInput style={{borderColor:'gray', borderWidth: 1, height: 30, width: 50, marginTop: 10, marginBottom: 10}}  onChangeText={(inputText) => this.setState({inputText})} value={this.state.inputText} />
        <Button onPress={this.compareGuess} title="MAKE GUESS"/>
        <Text>{this.state.randomNum}</Text>      
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


