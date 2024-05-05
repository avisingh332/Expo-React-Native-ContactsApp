import React, {  useCallback, useEffect, useState } from 'react'
import { View, Text, Button, TextInput,StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { createTables, dropTable, getContacts } from '../db/db';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import ContactList from '../components/ContactList';

const HomeScreen = ({navigation}) => {
  const [contactList, setContactList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const isFocused = useIsFocused();
  const loadData = async()=>{
    // await dropTable()
    await createTables();
    let res = await getContacts();
    setContactList(res);
    setIsDataLoaded(true);
  }
  
  useEffect(()=>{
    if(isFocused==true){
      console.log("Home Screen is Mounted!!!")
      loadData();
    }
  },[isFocused])

  return (
    <View style={styles.container}>

        {/* search Section */}
        <View style ={styles.searchContainer}>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('Search')
          }} style={styles.searchContainerText}>
            <Text >Search Contacts</Text>
          </TouchableOpacity>
          {/* Profile Picture section */}
          <View style={{width:30, height:30, backgroundColor:'blue', borderRadius:99}}>
          </View>
        </View>

        {/* BodySection */}
        <View style={styles.bodySection}>
          <ContactList contactList={contactList} navigation={navigation}/>
        </View>
        {/* Addcontact Button */}
        <TouchableOpacity style={styles.addContactButton}
        onPress={()=>{navigation.navigate('AddContact')}}
        >
          <AntDesign name="pluscircle" size={40} color="black"/>
          {/* <Text> Add New Contact </Text> */}
        </TouchableOpacity>
    </View>
  )
}
var styles = StyleSheet.create({
  container:{
    marginTop:20,
    padding:20,
    flex:1,
    // backgroundColor:'blue',
  },
  searchContainer:{
    backgroundColor:'gray',
    borderRadius:99,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal:10,
    paddingEnd:20,
  },
  searchContainerText:{
    paddingVertical:20,
    paddingHorizontal:20,
    display:'flex', 
    justifyContent:'center',
    width:'90%',
    backgroundColor:'gray',
    borderRadius:99,
  },
  row:{
    display:'flex', 
    flexDirection:'row',
    padding:20,
    backgroundColor:'gray',
    marginTop:10,
    borderRadius:25
  },
  bodySection:{
    marginBottom:100,
    marginTop:20,
    // backgroundColor:"green",
    padding:10,
    paddingBottom:0,
    flex:1,
  },
  addContactButton:{
    position:'absolute',
    bottom:20,
    right:20,
  }
})

export default HomeScreen
