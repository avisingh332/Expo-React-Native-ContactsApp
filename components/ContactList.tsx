import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deleteRecord } from '../db/db';
import ConfirmationBox from './ConfirmationBox';


const ContactList = ({ contactList, navigation, setIsLoaded }) => {
  const contactListWithkey = contactList.map((item,index)=>({...item,key:index+1}))
  const [showConfirmationBox, setShowConfirmationBox]  = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  async function handleDelete() {
    console.log("into Delete Fucntion:", contactToDelete);
    await deleteRecord(contactToDelete);
    setShowConfirmationBox(false);
    setIsLoaded(false);
  }
  
  return (
    <View>
      {
        contactList.length == 0 ?
          <Text style={{ fontSize: 20, color: 'black' }} >Empty List......</Text>
          :
          <View>
            <SwipeListView
              data={contactListWithkey}
              renderItem={({ item, index }) => (
                <TouchableHighlight key={index} style={{ borderRadius: 25, marginBottom:10 }}
                  onPress={() => { navigation.navigate('Details', { id: item.id }) }}
                >
                  <View style={[styles.row]} >
                    <View style={styles.imageContainer}>
                      <Image resizeMode='contain' source={{ uri: item.imageUri }} style={styles.image} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ marginStart: 20, alignItems: 'center', fontSize: 20 }}>{item.name}</Text>
                      <AntDesign name="rightcircleo" size={30} color="black" />
                    </View>
                  </View>
                </TouchableHighlight>
              )}

              renderHiddenItem={({item}, rowMap) => {
                return (
                  <View style={styles.rowHidden}>
                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => { navigation.navigate('UpsertContact', { id: item.id }) }}>
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonWrapper, { backgroundColor: 'red', marginStart: 5 }]} onPress={() => { setContactToDelete(item.id); setShowConfirmationBox(true); }}>
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
              disableRightSwipe={true}
              rightOpenValue={-150}
            />
            {showConfirmationBox && <ConfirmationBox showAlert={showConfirmationBox} setShowAlert={setShowConfirmationBox} onConfirm={handleDelete}/>}
          </View>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'gray',
    borderRadius: 25
  },
  rowHidden: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 15,
    // backgroundColor: 'gray',
    marginTop: 10,
    borderRadius: 25
  },
  imageContainer: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 100,
    padding: 2,
    overflow: 'hidden'
  },
  image: {
    height: '170%',
    width: '170%'
  },
  buttonWrapper: {
    width: 60,
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 17,
  }
})

export default ContactList
