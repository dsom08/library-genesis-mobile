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
import { ThemeContext } from './theme-context';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Router from './router';

const App: () => React.ReactNode = () => {

  const [theme, setTheme] = React.useState('dark');

  const darkTheme = () => {
    setTheme('dark')
  }

  const lightTheme = () => {
    setTheme('light')
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, lightTheme, darkTheme }}>
        <ApplicationProvider
          {...eva}
          theme={eva[theme]}
        >
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Router />
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
