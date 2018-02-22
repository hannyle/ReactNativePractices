import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class HomeScreen extends React.Component {
  static navigationOptions = {title: 'HomeScreen'};
  constructor(props){
    super(props);
    this.state = {
      text1: '',
      text2: '',
      sum: 0,
      data: []}
  }
  calculateSum = () => {
    const currentSum = parseInt(this.state.text1) + parseInt(this.state.text2);
    this.setState({
      sum: currentSum,
      data: [...this.state.data, {key: this.state.text1 + "+" + this.state.text2 + "=" + currentSum}]
    });
  }

  calculateLess = () => {
    const currentLess = parseInt(this.state.text1) - parseInt(this.state.text2);
    this.setState({
      sum: currentLess,
      data: [...this.state.data, {key: this.state.text1 + "-" + this.state.text2 + "=" + currentLess}]
    });
  }
  render() {
      const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Result {this.state.sum}</Text>
        <TextInput style={styles.inputText} onChangeText={(text1)=>this.setState({text1})} value={this.state.text1}
        />
        <TextInput style={styles.inputText} onChangeText={(text2)=>this.setState({text2})} value={this.state.text2}/>
        <View style={styles.button}>
          <Button onPress={this.calculateSum} title="+"
          />
          <Button onPress={this.calculateLess} title="-"/>
          <Button onPress={() => navigate('History', {data: this.state.data})} title="History"/>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100
    },
    inputText: {
      width: 150,
      height: 30,
      borderWidth: 1,
      borderColor: 'gray'
    },
    button: {
      marginTop: 20,
      marginBottom: 20,
      width: 150,
      flexDirection: "row",
      justifyContent: 'space-around',
      paddingLeft: 20,
      paddingRight: 20
    }
  });