import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import UpsertContactScreen from '../screens/UpsertContactScreen';

const HomeStack = createNativeStackNavigator();

export default function HomeTabNavigator(){
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
      {/* <HomeStack.Screen name="Details" component ={DetailsScreen} options={{
        title:''
      }} /> */}
      <HomeStack.Screen name="Search" component ={SearchScreen}/>
      <HomeStack.Screen name="UpsertContact" component={UpsertContactScreen}/>
    </HomeStack.Navigator>
  );
}