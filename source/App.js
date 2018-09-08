import React, { Component } from 'react';
import { Navigator } from 'react-native';
import MoviesData from './MoviesData';

const RouteMapper = (route, navigator) => {
  if (route.name === 'movies') {
    return <MoviesData navigator={navigator} />;
  }
};

export default class App extends Component {
  render() {
    return (
      <Navigator
        
        initialRoute={{ name: 'movies' }}
        
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
        
        renderScene={RouteMapper}
      />
    );
  }
}