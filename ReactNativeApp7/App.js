import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, FlatList, Alert, KeyboardAvoidingView} from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {ingredient: '', recipes: []};
  }

  findRecipes = () => {
    const url = " http://www.recipepuppy.com/api/?i=" + this.state.ingredient;
    fetch(url)
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          recipes: responseJSON.results
        });
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  listSeparator = () => {
    return (
      <View style={{
        height: 1,
        width: "90%",
        backgroundColor: "#42bff4"
      }}/>     
    );
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
         <FlatList keyExtractor={item => item.title}
        renderItem={({item}) => 
          <View>
            <Text key={item.id}>{item.title}</Text>
            <Image style={{width: 50, height: 50}} source={{uri: item.thumbnail}}/>
          </View>
          }
            data={this.state.recipes}
            ItemSeparatorComponent={this.listSeparator}
        />  
        <TextInput style={styles.textInput} onChangeText={(ingredient) => this.setState({ingredient})} value={this.state.ingredient} />
        <Button title="FIND" onPress={this.findRecipes}/>
        <View style={{ height: 30 }}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  textInput: {
    width: 200,
    height: 30,
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5
  }
});
