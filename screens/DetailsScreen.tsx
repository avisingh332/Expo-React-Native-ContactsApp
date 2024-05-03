import React from 'react'
import { View, Text, Button } from 'react-native'

const DetailsScreen = ({navigation}) => {
  return (
    <View>
      <Button
      title='Favorites Page'
      onPress={()=>{navigation.navigate('Favorite')}}/>
    </View>
  )
}

export default DetailsScreen
