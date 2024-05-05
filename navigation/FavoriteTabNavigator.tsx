import React from 'react';
import FavoriteScreen from '../screens/FavoriteScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const FavoriteStack = createNativeStackNavigator();

export default function FavoriteTabNavigator() {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen name="Favorite" component={FavoriteScreen} />
    </FavoriteStack.Navigator>
  );
}