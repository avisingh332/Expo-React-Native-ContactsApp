import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Button, TextInput,StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { connectToDb, getContacts } from '../db/db';

const HomeScreen = ({navigation}) => {
  // const contactList = [
  //   {
  //     name:'Aviansh',
  //     PhoneNumber:'',
  //   },
  //   {
  //     name:'Mohan',
  //     PhoneNumber:'',
  //   },
  //   {
  //     name:'Sohan',
  //     PhoneNumber:'',
  //   },
  //   {
  //     name:'Rajesh',
  //     PhoneNumber:'',
  //   },
  //   {
  //     name:'Sita',
  //     PhoneNumber:'',
  //   },
  //   {
  //     name:'gita',
  //     PhoneNumber:'',
  //   },
  //   {
  //     name:'Govind',
  //     PhoneNumber:'',
  //   },
  //   {
  //     name:'Sohan',
  //     PhoneNumber:'',
  //   },
  //   {
  //     name:'Rajesh',
  //     PhoneNumber:'',
  //   },
  //   {
  //     name:'Sita',
  //     PhoneNumber:'',
  //   },
  //   {
  //     name:'gita',
  //     PhoneNumber:'',
  //   },
  //   {
  //     name:'Govind',
  //     PhoneNumber:'',
  //   }
  // ]
  const [contactList, setContactList] = useState([]);

  const loadData = useCallback(async ()=>{
    const db = await connectToDb();
    var res: any[] = null;
    res= await getContacts(db);
    setContactList(res);
  },[]);

  useEffect(()=>{
    loadData();
    console.log(contactList);
  },[loadData]);
  const [selectedIndices, setSelectedIndices] = useState(new Set());

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
                    onLongPress={()=>{
                      // setSelectedIndices([...selectedIndices,index]);
                      const newSet = new Set(selectedIndices);
                      newSet.has(index)?newSet.delete(index):newSet.add(index);
                      setSelectedIndices(newSet);
                    }}>
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
          <Text> Avinash Singh </Text>
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
    bottom:80,
    right:50,
  }
})

export default HomeScreen
