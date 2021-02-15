import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchScreen from '../screens/SearchScreen';
import ScannerScreen from '../screens/ScannerScreen';
import BookShelfScreen from '../screens/BookShelfScreen';

const Tab = createBottomTabNavigator();

const bottomBookShelfNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        
        if (route.name === 'Search') {
          return <Feather name="search" size={size} color={color} />
        }
        if (route.name === 'Scanner') {
          return <MaterialCommunityIcons name="barcode-scan" size={size} color={color} />
        }
        if (route.name === 'BookShelf') {
          return <MaterialCommunityIcons name="bookshelf" size={size} color={color} />
        }

      },
    })}
    sceneContainerStyle={{ backgroundColor: '#e4e4e4' }}
    tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: '#000',
      inactiveTintColor: '#aaa',
      showLabel: true,
      labelStyle: {
        fontSize: 14,
        alignSelf: 'center',
        marginBottom: 10,
      },
      style: {
        height: 70,
        alignContent: 'center',
      }
    }}
  >
    <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Search Online' }} />
    <Tab.Screen name="Scanner" component={ScannerScreen} options={{ title: 'Scan ISBN' }} />
    <Tab.Screen name="BookShelf" component={BookShelfScreen} options={{ title: 'BookShelf' }} />
  </Tab.Navigator>
)

export default bottomBookShelfNavigator
