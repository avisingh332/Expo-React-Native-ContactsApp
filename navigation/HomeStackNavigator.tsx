import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import DetailsScreen from '../screens/DetailsScreen';
const HomeStack = createNativeStackNavigator();

export default function HomeStackNavigator(){
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
      <HomeStack.Screen name="Favorite" component={FavoriteScreen} />
      <HomeStack.Screen name="Details" component ={DetailsScreen}/>
    </HomeStack.Navigator>
  );
}