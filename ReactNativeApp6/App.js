import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Alert } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      inputNum: '',
      guessHeadline: 'Guess a number between 1-100',
      randomNum: Math.floor(Math.random()*100) + 1,
      guessCounter: 1,
      highscore: ''
    };
  }
  guessNumber = () => {
    this.setState({
      guessCounter: this.state.guessCounter + 1
    });
    if(parseInt(this.state.inputNum) < this.state.randomNum){
      this.setState({
        guessHeadline: 'Your guess ' + this.state.inputNum + ' is too low'
      });
    }
    else if (parseInt(this.state.inputNum) > this.state.randomNum){
      this.setState({
        guessHeadline: 'Your guess ' + this.state.inputNum + ' is too high'
      });
    }
    else {
      Alert.alert("You guessed the number in " + this.state.guessCounter + " guesses");
      this.setState({
        guessHeadline: "Your guess is correct!",
        randomNum: Math.floor(Math.random()*100) + 1,
        guessCounter: 1
      }); 
      this.compareHighscore();     
    }
   
  }

  setHighestData = async() => {
    try{
      //let str = JSON.stringify(this.state.highscore);
      await AsyncStorage.setItem('highscore', 'this.state.highscore');
    }
    catch(error) {
      Alert.alert('Error setting data');
    }
  }

  getHighestData = async() => {
    try {
      let value = await AsyncStorage.getItem('highscore');
      this.setState({
        value: this.state.highscore
      })
    }
    catch(error){
      Alert.alert('Error getting data');
    }
  }

  compareHighscore = () => {
    if(this.state.highscore == ""){
      this.setState({
        highscore: JSON.stringify(this.state.guessCounter)
      });
    }
    else if(this.state.guessCounter < parseInt(this.state.highscore)){
      this.setState({
        highscore: JSON.stringify(this.state.guessCounter)
      });   
    }
    this.setHighestData();
    this.getHighestData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.guessHeadline}</Text>
        <TextInput style={styles.inputNum} keyboardType="numeric"
          onChangeText={(inputNum) => this.setState({inputNum})} value={this.state.inputNum}
        />
        <Button style={styles.button} onPress={this.guessNumber} title="MAKE GUESS"/>
        <Text>Highscore: {this.state.highscore}</Text>
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
  inputNum: {
    width: 150,
    height: 30,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    marginBottom: 20
  }
});
