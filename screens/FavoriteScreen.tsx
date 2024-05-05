import React, { useEffect, useState } from 'react'
import { View , Text} from 'react-native'
import { DatabaseInstance } from '../db/db'
import { SQLiteDatabase } from 'expo-sqlite';
import ContactList from '../components/ContactList';
import { useIsFocused } from '@react-navigation/native';

const FavoriteScreen = ({navigation}) => {
  const [favoriteContacts, setFavoriteContacts] = useState([]);
  async function fetchFavoriteContact(){
    const db :SQLiteDatabase= DatabaseInstance.getInstance();
    const query = `
      SELECT id, Name FROM contacts 
      WHERE Favorite=1
    `
    await db.transactionAsync(async(tx)=>{
      const result = await tx.executeSqlAsync(query, []);
      console.log(result.rows);
      setFavoriteContacts(result.rows);
    })
  }
  const isFocus = useIsFocused();
  useEffect(()=>{
    if(isFocus==true){
      fetchFavoriteContact();
    }
  },[isFocus])

  return (
    <View style={{padding:20}} >
      <ContactList contactList={favoriteContacts} navigation={navigation}/>
    </View>
  )
}

export default FavoriteScreen
