import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
// import { FontAwesome6 } from '@expo/vector-icons';
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
              {console.log("Item Number:", index,item.ImageUri)}
                return (
                <TouchableOpacity key={index} style={[styles.row]}
                onPress={()=>{navigation.navigate('Details', {id:item.id})}}
                >
                    {/* <FontAwesome6 name="face-grin-stars" size={24} color="black" /> */}
                    <View style={styles.imageContainer}>
                      <Image resizeMode='contain' source={{uri:item.ImageUri}} style={styles.image}/>
                    </View>
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
    padding:15,
    backgroundColor:'gray',
    marginTop:10,
    borderRadius:25
  },
  imageContainer:{
    height:60, 
    width:60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'blue',
    borderRadius:100,
    padding:2,
    overflow:'hidden'
  },
  image:{
    height:'170%',
    width:'170%'
  }
})

export default ContactList
