import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import bottomBookShelfNavigator from './bottomBookShelfNavigator.routes'
import BookDetailScreen from '../screens/BookDetailScreen';

const RootStack = createStackNavigator();

const Router = () => (
  <RootStack.Navigator>
    <RootStack.Screen 
      name={"BookShelf"}
      component={bottomBookShelfNavigator}
      options={{
        headerShown: false
      }}
    />
    <RootStack.Screen
      name={"BookDetail"}
      component={BookDetailScreen}
      options={{
        title: 'Book Information',
        headerShown: false,
      }}
    />
  </RootStack.Navigator>
)

export default Router
