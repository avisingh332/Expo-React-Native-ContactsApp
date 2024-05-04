import React, {  useCallback, useEffect, useState } from 'react'
import { View, Text, Button, TextInput,StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { connectToDb, createTables, getContacts, listTables } from '../db/db';
import * as SQLite from 'expo-sqlite'; 
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({navigation, route}) => {
  console.log({route});

  const [contactList, setContactList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const loadData = async()=>{
    await createTables();
    let res = await getContacts();
    // console.log("Result in UseEffect Load Data function......")
    console.log(res);
    setContactList(res);
    setIsDataLoaded(true);
  }
  useFocusEffect(()=>{
    if (route.params?.refresh !=null || isDataLoaded==false)  {
      setIsDataLoaded(true);
      loadData();
    }
  });
  // useEffect(()=>{
  //   console.log("UseEffect of Home Screen.............")
  //   loadData();
  // },[isDataLoaded])

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
          {
            contactList.length==0 ?
            <Text style={{fontSize:20, color:'black'}} >Empty List......</Text>
            :
            <ScrollView>
              {
                contactList.map((item,index)=>{
                  return (
                    <TouchableOpacity key={index} style={[styles.row]}
                    onPress={()=>{navigation.navigate('Details', {id:item.id})}}
                    >
                      <FontAwesome6 name="face-grin-stars" size={24} color="black" />
                      <Text style={{marginStart:10, alignItems:'center'}}>{item.Name}</Text>
                      <AntDesign name="rightcircleo" size={24} color="black" />
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          }
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
