import { SQLiteDatabase } from 'expo-sqlite';
import React,{useEffect, useRef, useState} from 'react'
import { Text, View, TextInput, StyleSheet} from 'react-native'
import { DatabaseInstance } from '../db/db';
import ContactList from '../components/ContactList';

const SearchHeader = ({ onChangeText, inputRef }) => {
  console.log("Search Header Mounted")
   useEffect(()=>{
  // Set the focus when the screen is mounted
  console.log("into use Effect of search header");
    if (inputRef.current) {
      console.log("its not null... settting the Focus .. ..")
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  },[]);
  return (
    <View style={styles.searchContainer}>
      <TextInput
        ref={inputRef}
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={onChangeText}
      />
    </View>
  );
};

const SearchScreen = ({navigation}) => {
  console.log("Search Screen Mounted");
  const [contactList, setContactList] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  const searchInputRef = useRef(null);

  async function onChangeText(queryText){
    console.log(queryText.trim());
    const query = `
      SELECT * FROM contacts 
      WHERE Name Like ?
    `
    try {
      const db:SQLiteDatabase = DatabaseInstance.getInstance();
      await db.transactionAsync(async(tx)=>{
        const result = await tx.executeSqlAsync(query,[`%${queryText}%`]);
        setContactList(result.rows);
      })
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: ()=> <SearchHeader onChangeText={onChangeText} inputRef={searchInputRef}/>,
      headerBackTitle:'Back',
      headerBackTitleStyle: {
        fontSize: 16, // change font size
        color: 'red', // change font color
      },
      headerTitleAlign: 'center'
    });
  },[])

 

  return (
    <View style={styles.container}>
      <ContactList navigation={navigation} contactList={contactList}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'flex-start',
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
    paddingHorizontal:15,
  },
  container:{
    marginTop:10,
    padding:10,
  }
});
export default SearchScreen
