import React from 'react'
import { View, Text, Button, TextInput,StyleSheet } from 'react-native'

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        {/* search Section */}
        <View style ={styles.searchContainer}>
          <TextInput
          placeholder='Search Contacts'/>
          <View style={{width:30, height:30, backgroundColor:'blue', borderRadius:99}}>

          </View>
        </View>

        {/* BodySection */}
        <View>
          <Button
          title='Details'
          onPress={()=>{navigation.navigate('Details')}}
          />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    marginTop:20,
    padding:20,
  },
  searchContainer:{
    backgroundColor:'gray',
    padding:10,
    paddingHorizontal:20,
    borderRadius:99,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  }
})

export default HomeScreen
