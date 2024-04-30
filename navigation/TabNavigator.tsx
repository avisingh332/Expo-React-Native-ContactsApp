import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import FavoriteStackNavigator from './FavoriteStackNavigator';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route  }) => {
        return {
          tabBarIcon: ({ focused }) => {
            const iconName = route.name === 'HomeTab'
              ? (focused ? 'home' : 'home-outline')
              : (focused ? 'star-sharp' : 'star-outline');
            return <Ionicons name={iconName} size={24} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerShown:false,
        }
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator}/>
      <Tab.Screen name="FavoriteTab" component={FavoriteStackNavigator} />
    </Tab.Navigator>
  );
}