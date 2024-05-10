import { SQLiteDatabase } from 'expo-sqlite';
import React, { useEffect, useRef, useState } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { DatabaseInstance } from '../db/db';
import ContactList from '../components/ContactList';
import { useIsFocused } from '@react-navigation/native';

const SearchHeader = ({ setQueryText, inputRef }) => {
  // const SearchHeader = ( ) => {
  console.log("Rendering Search Header")
  useEffect(() => {
    console.log("Search Header Mounted.....");
    // Set the focus when the screen is mounted
    if (inputRef.current) {
      console.log("its not null... settting the Focus .. ..")
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, []);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        ref={inputRef}
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={(text)=>{setQueryText(text.trim())}}
      />
    </View>
  );
};

const SearchScreen = ({ navigation }) => {
  console.log("Rendering Search Screen")

  const [contactList, setContactList] = useState(null);
  const [filteredContactList, setFilteredContactList] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const isFocused = useIsFocused();
  const searchInputRef = useRef(null);

  

  async function loadData() {
    const db: SQLiteDatabase = DatabaseInstance.getInstance();
    var result = null;
    await db.transactionAsync(async (tx) => {
      result = await tx.executeSqlAsync('Select * from contacts', []);
    })
    // console.log(result.rows);
    setContactList(result.rows);
  }

  useEffect(() => {
    console.log("Search Screen Mounted")
    if (isFocused || !isDataLoaded) {
      loadData();
    }
  }, [isDataLoaded])

  useEffect(() => {
    console.log("Contact list:", contactList);
    if(contactList!=null){
      setIsDataLoaded(true);
    }
  }, [contactList])

  useEffect(()=>{
    if (queryText == "") {
      setFilteredContactList([]);
      return;
    }
    setFilteredContactList(contactList.filter(c => {
      return (c.name.toUpperCase().includes(queryText.toUpperCase()) ||
        c.phoneNumber.toUpperCase().includes(queryText.toUpperCase()) ||
        c.email.toUpperCase().includes(queryText.toUpperCase()))
    }));
  },[queryText,contactList]);

  useEffect(() => {
    if(isDataLoaded == true) {
      navigation.setOptions({
        headerTitle: () => <SearchHeader setQueryText={setQueryText} inputRef={searchInputRef} />,
        // headerTitle: ()=> <SearchHeader />,
        // headerLargeTitle:true, 
        // headerSearchBarOptions:{
        //   placeholder:"Search",
        //   onChangeText: (event)=>{onChangeText(event.nativeEvent.text)}
        // }
      });
    }
  }, [isDataLoaded])


  return (
    <View style={styles.container}>
      <ContactList navigation={navigation} contactList={filteredContactList} setIsLoaded={setIsDataLoaded} />
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  searchContainer: {
    flex: 1,
    // backgroundColor:'blue',
    // paddingHorizontal: 16,
  },
  searchInput: {
    // borderWidth: 1,
    // borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 15,
  },
  container: {
    marginTop: 10,
    padding: 10,
  }
});
export default SearchScreen
