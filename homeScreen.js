import * as React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image, } from 'react-native';
import { Header } from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import dictionary from './database';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = { 
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word: 'Loading...',
      lexicalCategory: '',
      definition: '',
    };
  }
  getWord = (text) => {
    var text = text.toLowerCase();
    try{
      var word = dictionary[text]['word'];
      var lexicalCategory = dictionary[text]['lexicalCategory'];
      var definition = dictionary[text]['definition'];
      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition,
      });
    } 
    catch (err) {
      alert("You're to smart for us! Pleaase try a different word.");
      this.setState({
        text: '',
        isSearchPressed: false,
      });
    }
  };

  render() {
    return (
      <SafeAreaProvider>
      <View>
        <Header
          backgroundColor={'#f8ff9c'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#ffd000', fontSize: 24},
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'Checking Answer Key...',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}>Search</Text>{' '}
        </TouchableOpacity>

        <Text style={{ color: 'white', textAlign: "center", fontSize: 20 }}>{this.state.word}</Text>
        <Text style={{ color: 'white', textAlign: "center", fontSize: 20 }}>{this.state.lexicalCategory}</Text>
        <Text style={{ color: 'white', textAlign: "center", fontSize: 20 }}>{this.state.definition}</Text>

      </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'purple',
    color: 'purple'
  },
  searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: 'purple',
    backgroundColor: '#ea9cff'
  },
  textIn: {
    textAlign: 'center',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'purple',
  },
});