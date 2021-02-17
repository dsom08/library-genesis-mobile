/**
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { default as mapping } from './mapping.json';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Router from './router';

const App: () => React$Node = () => {
  return (
    <ApplicationProvider
      {...eva}
      theme={{ ...eva.dark, ...theme }}
      customMapping={mapping}
    >
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Router />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
