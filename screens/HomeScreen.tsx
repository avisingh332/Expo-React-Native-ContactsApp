import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createTables, dropTable, getColumns, getContacts } from '../db/db';
import { DrawerActions, useIsFocused } from '@react-navigation/native';

import ContactList from '../components/ContactList';

const HomeScreen = ({ navigation }) => {
  const [contactList, setContactList] = useState([]);
  const isFocused = useIsFocused();
  const [isLoaded, setIsLoaded] = useState(true);
  const loadData = async () => {
    // await dropTable();
    await createTables();
    let res = await getContacts();
    setContactList(res);
    setIsLoaded(true);
  }

  useEffect(() => {
    if (isFocused == true || isLoaded == false) {
      loadData();
    }
  }, [isFocused, isLoaded])

  return (
    <View style={styles.container}>

      {/* search Section */}
      <View style={styles.searchContainer}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingStart: 20 }}>
          <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Search')
          }} style={styles.searchContainerText}>
            <Text >Search Contacts</Text>
          </TouchableOpacity>
        </View>
        {/* Profile Picture section */}
        <View style={{ width: 30, height: 30, backgroundColor: 'blue', borderRadius: 99 }}>
        </View>
      </View>

      {/* BodySection */}
      <View style={styles.bodySection}>
        <ContactList contactList={contactList} navigation={navigation} setIsLoaded={setIsLoaded} />
      </View>
      {/* Addcontact Button */}
      <TouchableOpacity style={styles.addContactButton}
        onPress={() => { navigation.navigate('UpsertContact') }}
      >
        <AntDesign name="pluscircle" size={40} color="black" />
        {/* <Text> Add New Contact </Text> */}
      </TouchableOpacity>
    </View>
  )
}
var styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingVertical: 20,
    flex: 1,
    // backgroundColor:'blue',
  },
  searchContainer: {
    backgroundColor: 'gray',
    borderRadius: 99,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingEnd: 40,
  },
  searchContainerText: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: 'gray',
    borderRadius: 99,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'gray',
    marginTop: 10,
    borderRadius: 25
  },
  bodySection: {
    marginBottom: 100,
    marginTop: 20,
    // backgroundColor:"green",
    paddingHorizontal: 20,
    paddingBottom: 0,
    flex: 1,
  },
  addContactButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
})

export default HomeScreen
