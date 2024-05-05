import React, {useCallback, useEffect, useState} from 'react'
import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { addContact, connectToDb, createTables, dropTable, getColumns, getContacts, listTables } from '../db/db';
import { EventRegister } from 'react-native-event-listeners';
const AddContact = ({navigation}) => {
  
  const[inputForm, setInputForm] =useState({
    name:'',
    phoneNumber:'', 
    email:'' ,
  });

  const fireEvent = ()=>{
    EventRegister.emitEvent('reloadContacts',"Event Triggered");
  }

  const handleChange = (field:string, value:string) =>{
    setInputForm({
      ...inputForm, 
      [field]:value
    })
  }

  const handleSubmit = async () =>{
    
    // console.log(inputForm);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputForm.email==''|| !emailRegex.test(inputForm.email) ||inputForm.name==''|| inputForm.phoneNumber==''){
      Alert.alert("Input Correct values");
      return;
    }

    await addContact(inputForm);
    
    setInputForm({
      name:'',
      phoneNumber:'', 
      email:''
    })
  }

  useEffect(()=>{
    console.log("AddContact is Mounted.....")
  },[]);

  return (
    <ScrollView>
    <View style={{marginTop:20, padding:20,flex:1}}>
      <View style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
        
        <View style={{backgroundColor:'gray',borderRadius:999,padding:20}}>
          <Image resizeMode='contain' style={styles.addImageIcon}  source={require("../assets/add-photo-icon.png")}></Image>
        </View>
        <Text>Add Picture</Text>
      </View>
      <View>
         {/* Contact Name */}
        <View style={{...styles.inputWrapper,marginTop:25}}>
          <MaterialIcons name="category" size={24} color="black" />
          <TextInput
          placeholder='Contact Name'
          style={{fontSize:15, width:'100%'}}
          value={inputForm.name}
          onChangeText={(text)=>{handleChange('name', text)}}
          />
        </View>

        {/* Phone Number */}
        <View style={{...styles.inputWrapper,marginTop:25}}>
        <FontAwesome6 name="phone" size={24} color="black" />
          <TextInput
          keyboardType='numeric'
          placeholder='Phone Number'
          style={{fontSize:15, width:'100%'}}
          value={inputForm.phoneNumber}
          onChangeText={(text)=>{handleChange('phoneNumber', text)}}
          />
        </View>
        {/* Email */}
        <View style={{...styles.inputWrapper,marginTop:25}}>
        <Fontisto name="email" size={24} color="black" />
          <TextInput
          keyboardType='email-address'
          placeholder='Email'
          style={{fontSize:15, width:'100%'}}
          value={inputForm.email}
          onChangeText={(text)=>{handleChange('email', text)}}
          />
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity style={{...styles.button, marginTop:25}} onPress={()=>{handleSubmit()} }>
          <Text style={{color:'white', fontSize:16, textAlign:'center'}}>Create</Text>
        </TouchableOpacity>
    </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  addImageIcon:{
    height:200,
    width:200,
  },
  imageContainer:{
    // backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    height:'70%',
    width:'60%',
    padding:40,
    borderRadius:999
  },
  inputWrapper:{
    display:'flex', 
    flexDirection:'row',
    gap:8,
    backgroundColor:'#DDDDDD',
    padding:15, 
    borderRadius:10
  }, 
  button:{
    padding:15, 
    backgroundColor:'blue', 
    borderRadius:20, 
  },
})

export default AddContact
