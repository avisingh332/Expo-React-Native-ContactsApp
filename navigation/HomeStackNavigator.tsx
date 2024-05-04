import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import AddContact from '../screens/AddContact';
const HomeStack = createNativeStackNavigator();

export default function HomeStackNavigator(){
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
      {/* <HomeStack.Screen name="Favorite" component={FavoriteScreen} /> */}
      <HomeStack.Screen name="Details" component ={DetailsScreen}/>
      <HomeStack.Screen name="Search" component ={SearchScreen}/>
      <HomeStack.Screen name="AddContact" component={AddContact}/>
    </HomeStack.Navigator>
  );
}