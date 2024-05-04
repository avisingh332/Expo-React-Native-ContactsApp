import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import {  connectToDb, createTables, dropTable, listTables  } from "./db/db";
export default function App() {
  // const [dataLoaded, setIsDataLoaded] = useState(false);
  // const loadData= async()=>{
  //   await createTables();
  //   setIsDataLoaded(true);
  // }

  // useEffect(()=>{
  //  loadData();
  // },[dataLoaded]);
  
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

