import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import UpsertContactScreen from '../screens/UpsertContactScreen';

const HomeStack = createNativeStackNavigator();

export default function HomeStackNavigator(){
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
      <HomeStack.Screen name="Search" component ={SearchScreen}/>
      <HomeStack.Screen name="UpsertContact" component={UpsertContactScreen}/>
    </HomeStack.Navigator>
  );
}