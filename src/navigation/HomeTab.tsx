import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

/* prettier-ignore */
const getTabBarIcon = (icon: string) => (
  ({ tintColor }: { tintColor: string }) => (
    <FontAwesome
      name={icon}
      size={24}
      style={{ color: tintColor }}
    />
  )
);

export const HomeTab = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: getTabBarIcon('home'),
        tabBarLabel: 'Home',
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: getTabBarIcon('user'),
        tabBarLabel: 'Profile',
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#000',
      inactiveTintColor: '#DDD',
      showIcon: true,
      showLabel: true,
      style: {
        backgroundColor: '#FFF',
      },
      indicatorStyle: null,
    },
  }
);
