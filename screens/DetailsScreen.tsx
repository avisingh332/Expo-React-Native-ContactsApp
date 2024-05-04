import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { DatabaseInstance } from '../db/db';
import { SQLiteDatabase } from 'expo-sqlite';

const DetailsScreen = ({navigation, route}) => {
  const id = route.params.id;
  const [details,setDetails]= useState({
    Name:'',
    Email:'',
    PhoneNumber:''
  });

  useEffect(()=>{
    const db:SQLiteDatabase =DatabaseInstance.getInstance();
    const query = `
      SELECT * FROM contacts WHERE id=?
    `
    db.transaction(tx=>{
      tx.executeSql(query, [id], 
        (txObj, res)=>{
          console.log(res.rows._array[0]);
          setDetails(res.rows._array[0]);
        },
        (txOjb, error)=>{throw error}
        )
    })

  },[]);

  async function handleDelete(){
    const db:SQLiteDatabase=  DatabaseInstance.getInstance();
    await db.transactionAsync(async(tx)=>{
      const result = await tx.executeSqlAsync("DELETE FROM contacts WHERE id=?", [id]);
      console.log({result});
      navigation.navigate('Home', {refresh:true});
    })
  }
  return (
    <View>
      <Text>{details.Name}</Text>
      <Button
      title='Delete'
      onPress={()=>{handleDelete()}}/>
    </View>
  )
}

export default DetailsScreen
