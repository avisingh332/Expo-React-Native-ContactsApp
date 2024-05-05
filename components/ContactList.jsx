import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const ContactList = ({contactList,navigation}) => {
  return (
    <View>
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
  )
}
const styles = StyleSheet.create({
  row:{
    display:'flex', 
    flexDirection:'row',
    padding:20,
    backgroundColor:'gray',
    marginTop:10,
    borderRadius:25
  }
})

export default ContactList
