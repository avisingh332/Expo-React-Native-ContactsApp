import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import {  connectToDb, createTables, listTables  } from "./db/db";
export default function App() {
  // const [result, setResult]  = useState();
  const loadData = useCallback( async()=>{
    try{
      const db= await connectToDb();
      // dropTable(db);
      await createTables(db);
      // listTables(db);
      // await addContact(db);
      // getContacts(db);
      // console.log("Result is ", result);
    }
    catch(error){
      console.log("Here")
      console.log(error);
    }
  }, [])

  useEffect(()=>{
    loadData();
  },[loadData]);
  
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

