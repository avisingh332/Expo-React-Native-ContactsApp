import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import FavoriteStackNavigator from './FavoriteStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';


const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  
  return (
    <Drawer.Navigator> 
      <Drawer.Screen options={{headerShown:false, title:'Home'}} name="HomeDrawer" component={HomeStackNavigator}/>
      <Drawer.Screen name="FavoriteDrawer" options={{headerShown:true,title:'Favorites'}} component={FavoriteStackNavigator} />
    </Drawer.Navigator>
  );
}


