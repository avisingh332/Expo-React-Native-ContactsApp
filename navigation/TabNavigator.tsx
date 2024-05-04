import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import FavoriteStackNavigator from './FavoriteStackNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  
  return (
    <Tab.Navigator
      screenOptions={({route})=>getScreenOptions(route)}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator}/>
      <Tab.Screen name="FavoriteTab" component={FavoriteStackNavigator} />
    </Tab.Navigator>
  );
}


const getScreenOptions = (route)=>{
  return {
    tabBarIcon:({focused})=>getTabBarIcon(focused,route),
    tabBarStyle: getTabBarStyle(route), 
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
    headerShown:false,
  }
}

const getTabBarIcon =(focused,route)=>{
  const iconName = route.name === 'HomeTab'
    ? (focused ? 'home' : 'home-outline')
    : (focused ? 'star-sharp' : 'star-outline');
  return <Ionicons name={iconName} size={24} />;
}

const getTabBarStyle = (route)=>{
  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log("Route name is: " , routeName);
  if(routeName=='Home'){
    return {display:'flex'}
  }
  else return {display:'none'}
}