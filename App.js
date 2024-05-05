import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from "./screens/DetailsScreen";
const SharedStack = createNativeStackNavigator();
export default function App() {
   
  return (
    <NavigationContainer>
      <SharedStack.Navigator>
        <SharedStack.Screen name="Tabs" options={{headerShown:false}} component={TabNavigator}/>
        <SharedStack.Screen name="Details" component={DetailsScreen}/>
      </SharedStack.Navigator>
    </NavigationContainer>
  );
}

