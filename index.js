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
  ScrollView,
  Button,
  ListView,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';


import Analytics from 'mobile-center-analytics';
import Crashes from 'mobile-center-crashes';
import CodePush from 'react-native-code-push';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Pratham extends Component {
  sendEvent() {
    Analytics.trackEvent('My Custom Event', {
      prop1: 'Custom Property',
      timeStamp: new Date().toISOString()
    });
  }

  nativeCrash() {
    Crashes.generateTestCrash();
  }

  jsCrash() {
    this.fun1();
  }

  fun1() {
    this.fun2();
  }

  fun2() {
    this.fun3();
  }

  fun3() {
    throw new Error('My Custom Exception');
  }

  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      refreshing: false,
      dataSource: ds.cloneWithRows([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]),
    };
  }

  codePushSync() {
    this.setState({ logs: ['Sync started at ' + new Date()] });
    CodePush.sync({
      installMode: CodePush.InstallMode.IMMEDIATE,
      updateDialog: true
    }, (status) => {
      for (var key in CodePush.SyncStatus) {
        if (status === CodePush.SyncStatus[key]) {
          this.setState({ logs: [...this.state.logs, key.replace(/_/g, '')] });
          break;
        }
      }
    });
  }

  // <Text style={styles.welcome}>
  //   Welcome to React Native!
  // </Text>
  // <Button title="Send Event" onPress={() => this.sendEvent()} />
  // <Button title="Native Crash" onPress={() => this.nativeCrash()} />
  // <Button title="JS Crash" onPress={() => this.jsCrash()} />
  // <Button title="Codepush Sync" onPress={() => this.codePushSync()} />
  // {this.state.logs.map((log, i) => <Text key={i}>{log}</Text>)}
  // <ScrollView>
  //   <ListView
  //     enableEmptySections
  //     dataSource={this.state.dataSource}
  //     renderRow={item => <Text style={{margin: 10, padding: 20, backgroundColor: 'red'}}>pkg</Text>}
  //     onEndReached={() => console.log(111)}
  //     renderScrollComponent={props => <ScrollView {...props} />}
  //
  //   />
  // </ScrollView>


  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <ParallaxScrollView
              backgroundColor="blue"
              contentBackgroundColor="pink"
              parallaxHeaderHeight={100}
              renderStickyHeader={() => (
                <View key="sticky-header" style={styles.stickySection}>
                  <Text style={styles.stickySectionText}>Rich Hickey Talks</Text>
                </View>
              )}
              parallaxHeaderHeight={ 320 }

              renderForeground={() => (
               <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Hello World!</Text>
                </View>
              )}>
              <View style={{ height: 500 }}>
                <Button title="Codepush Sync" onPress={() => this.codePushSync()} />

                <ListView
                  enableEmptySections
                  pageSize={4}
                  onEndReachedThreshold={10}
                  dataSource={this.state.dataSource}
                  renderRow={item => <Text style={{margin: 10, padding: 20, backgroundColor: 'red'}}>pkg</Text>}
                  onEndReached={() => console.log(111)}
                  renderScrollComponent={props => <ScrollView {...props} />}

                />
              </View>
            </ParallaxScrollView>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('Pratham', () => Pratham);
