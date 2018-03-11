import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', data: []};
    }
    addData = () => {
      this.setState({
        data: [...this.state.data, {key: this.state.text}]
      });
    }

    clearData = () => {
      this.setState({
        data: [], text:''
      });
    }
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput} onChangeText={(text) => this.setState({text})} value={this.state.text}/>
        <View style={styles.button}>
          <Button onPress={this.addData} title="Add"/>
          <Button onPress={this.clearData} title="Clear"/>
        </View>
        <Text style={{color: 'blue', fontWeight: 'bold'}}>Shopping List</Text>
        <FlatList data={this.state.data} renderItem={({item}) => 
          <Text>{item.key}</Text>}
        />
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
  textInput : {
    height: 30,
    width: 150,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 30
  },
  button: {
    flexDirection: "row",
    width: 150,
    justifyContent: "space-around",
    marginBottom: 30
  }
});
