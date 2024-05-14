import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from "./screens/DetailsScreen";
import DrawerNavigation from "./navigation/DrawerNavigation";

const SharedStack = createNativeStackNavigator();

export default function App() {
   
  return (
    <NavigationContainer>
      <SharedStack.Navigator>
        {/* <SharedStack.Screen name="Drawer" component={DrawerNavigation}/> */}
        <SharedStack.Screen name="Drawer" options={{headerShown:false}} component={DrawerNavigation}/>
        <SharedStack.Screen name="Details" component={DetailsScreen}/>
      </SharedStack.Navigator>
    </NavigationContainer>
  );
}

{/* <sharedStackNavigator>
  <TabNavigator>
    <HomeStackNavigator>
      <HomeScreen/>
    </HomeStackNavigator>
    <FavoriteStackNavigator>
      <FavoriteScren/>
    </FavoriteStackNavigator>
  </TabNavigator>
  <DetailsScreen />
</sharedStackNavigator> */}