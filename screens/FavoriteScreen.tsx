import React, { useEffect, useState } from 'react'
import { View , Text} from 'react-native'
import { DatabaseInstance } from '../db/db'
import { SQLiteDatabase } from 'expo-sqlite';
import ContactList from '../components/ContactList';
import { useIsFocused } from '@react-navigation/native';
import ConfirmationBox from '../components/ConfirmationBox';

const FavoriteScreen = ({navigation}) => {
  const [favoriteContacts, setFavoriteContacts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  async function fetchFavoriteContact(){
    const db :SQLiteDatabase= DatabaseInstance.getInstance();
    const query = `
      SELECT id, name, imageUri FROM contacts 
      WHERE favorite=1
    `
    await db.transactionAsync(async(tx)=>{
      const result = await tx.executeSqlAsync(query, []);
      setFavoriteContacts(result.rows);
    })
    setIsLoaded(true);
  }
  const isFocus = useIsFocused();
  useEffect(()=>{
    if(isFocus==true || isLoaded==false){
      fetchFavoriteContact();
    }
  },[isFocus, isLoaded])

  return (
    <View style={{padding:20}} >
      <ContactList contactList={favoriteContacts} navigation={navigation} setIsLoaded={setIsLoaded}/>
    </View>
  )
}

export default FavoriteScreen
