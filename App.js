import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';

import { Provider as MemberProvider } from './src/context/MemberContext';
import { setNavigator } from './src/navigationRef';

import HomeScreen from './src/screens/HomeScreen';
import DetailFamilyScreen from './src/screens/DetailFamilyScreen';
import AddPersonScreen from './src/screens/AddPersonScreen';

const switchNavigator = createSwitchNavigator(
  {
    mainFlow: createBottomTabNavigator({
      homeFlow: {
        screen: createStackNavigator({
            Home: HomeScreen,
            AddPerson: AddPersonScreen,
            DetailFamily: DetailFamilyScreen,
            },
            {
              initialRouteName: 'Home',
              defaultNavigationOptions: {
                title: 'Home',
              },
        }),
        navigationOptions: {
          // tabBarLabel:() => {return null},
          tabBarLabel: 'Beranda',
          tabBarIcon: ({ tintColor }) => (
            <AntDesign name="home" color={ tintColor } size={25} />
          )
        }
      },
    })
  }
);

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