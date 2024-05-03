import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import {  connectToDb, createTables, dropTable, listTables  } from "./db/db";
export default function App() {
  // const [result, setResult]  = useState();
  
  const loadData = useCallback( async()=>{
    try{
      const db= await connectToDb();
      // await dropTable(db);
      await createTables(db);
      // console.log("Third Line")
      // await listTables(db);
    }
    catch(error){
      // console.log("Here")
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

