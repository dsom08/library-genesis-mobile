/**
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './custom-theme.json';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Router from './router';

const App: () => React.ReactNode = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
      >
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Router />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
