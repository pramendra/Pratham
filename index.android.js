/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import CodePush from 'react-native-code-push';

export default class Pratham extends Component {

  constructor(props){
    super(props);
    this.state = {logs: []};
  }


  codePushSync(){
    CodePush.sync({
      installMode: CodePush.InstallMode.IMMEDIATE,
      updateDialog: true,
    }, (status) => {
      for (var key in CodePush.SyncStatus){
        if (status === CodePush.SyncStatus[key]){
          this.setState({logs: [...this.state.logs, key.replace(/_/g, '')]})
          break;
        }
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Button title="test1"/>
        <Button title="test"/>
        <Button title={"code push"} onPress={() => this.codePushSync}/>
        {this.state.logs.map((log, i) => <Text key={i}>{log}</Text>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Pratham', () => Pratham);
