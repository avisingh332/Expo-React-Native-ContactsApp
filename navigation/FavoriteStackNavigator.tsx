import React from 'react';
import FavoriteScreen from '../screens/FavoriteScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const FavoriteStack = createNativeStackNavigator();

export default function FavoriteStackNavigator() {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen name="Favorite" options={{headerShown:false}} component={FavoriteScreen} />
    </FavoriteStack.Navigator>
  );
}
