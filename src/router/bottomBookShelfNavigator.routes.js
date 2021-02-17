import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

import SearchScreen from '../screens/SearchScreen';
import ScannerScreen from '../screens/ScannerScreen';
import BookShelfScreen from '../screens/BookShelfScreen';

const Tab = createBottomTabNavigator();

const SearchIcon = (props) => (
  <Icon {...props} name='search-outline' />
);

const CameraIcon = (props) => (
  <Icon {...props} name='camera-outline' />
);

const DownloadIcon = (props) => (
  <Icon {...props} name='download-outline' />
);

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='SEARCH' icon={SearchIcon} />
    <BottomNavigationTab title='SCANNER' icon={CameraIcon} />
    <BottomNavigationTab title='BOOKSHELF' icon={DownloadIcon} />
  </BottomNavigation>
)

const bottomBookShelfNavigator = () => (
  <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Search Online' }} />
    <Tab.Screen name="Scanner" component={ScannerScreen} options={{ title: 'Scan ISBN' }} />
    <Tab.Screen name="BookShelf" component={BookShelfScreen} options={{ title: 'BookShelf' }} />
  </Tab.Navigator>
)

export default bottomBookShelfNavigator
