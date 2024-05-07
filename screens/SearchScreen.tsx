import { SQLiteDatabase } from 'expo-sqlite';
import React,{useEffect, useRef, useState} from 'react'
import { Text, View, TextInput, StyleSheet} from 'react-native'
import { DatabaseInstance } from '../db/db';
import ContactList from '../components/ContactList';

// const SearchHeader = ({ onChangeText ,inputRef }) => {
const SearchHeader = ( ) => {
  console.log("Rendering Search Header")
  useEffect(()=>{
    console.log("Search Header Mounted.....");
  // Set the focus when the screen is mounted
    // if (inputRef.current) {
    //   console.log("its not null... settting the Focus .. ..")
    //   setTimeout(() => {
    //     inputRef.current.focus();
    //   }, 100);
    // }
  },[]);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        // ref={inputRef}
        style={styles.searchInput}
        placeholder="Search..."
        // onChangeText={onChangeText}
      />
    </View>
  );
};

const SearchScreen = ({navigation}) => {
  console.log("Rendering Search Screen")

  const [contactList, setContactList] = useState([]);
  // const [filteredContactList, setFilteredContactList] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const searchInputRef = useRef(null);

  // async function onChangeText(queryText){
  //   console.log(queryText.trim());
  //   // console.log(contactList);
  //   console.log(dataLoading);
  // }

  async function loadData(){
    const db:SQLiteDatabase = DatabaseInstance.getInstance();
    var result=null;
    await db.transactionAsync(async(tx)=>{
      result = await tx.executeSqlAsync('Select * from Contacts', []);
    })
    // console.log(result.rows);
    setContactList(result.rows);
  }

  useEffect(()=>{
    console.log("Search Screen Mounted")
    loadData();
  },[])

  useEffect(()=>{
    console.log("Contact list:", contactList);
   if(contactList.length!=0){
    setDataLoading(false);
    navigation.setOptions({
      // headerTitle: ()=> <SearchHeader onChangeText={onChangeText} inputRef={searchInputRef}/>,
      headerTitle: ()=> <SearchHeader />,
      headerBackTitle:'Back',
      headerBackTitleStyle: {
        fontSize: 16, // change font size
        color: 'red', // change font color
      },
      headerTitleAlign: 'center'
    });
   }
  },[contactList])

 

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
