import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider as MemberProvider } from './src/context/MemberContext';
import { setNavigator } from './src/navigationRef';

import HomeScreen from './src/screens/HomeScreen';
import DetailFamilyScreen from './src/screens/DetailFamilyScreen';
import AddPersonScreen from './src/screens/AddPersonScreen';
import EditPersonScreen from './src/screens/EditPersonScreen';

import SearchScreen from './src/screens/SearchScreen';
import WebDiagramScreen from './src/screens/WebDiagramScreen';

const switchNavigator = createStackNavigator({
  Home: HomeScreen,
  AddPerson: AddPersonScreen,
  EditPerson: EditPersonScreen,
  DetailFamily: DetailFamilyScreen,
  Search: SearchScreen,
  WebDiagram: WebDiagramScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: '',
      cardStyle: { backgroundColor: '#FFFFFF' },
      backgroundColor:'white',
      headerStyle: {
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        backgroundColor: 'transparent'
      },
    },
})

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <MemberProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </MemberProvider>
  );
};