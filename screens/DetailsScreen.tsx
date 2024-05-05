import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { DatabaseInstance } from '../db/db';
import { SQLiteDatabase } from 'expo-sqlite';
import { EventRegister } from 'react-native-event-listeners';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const HeaderRightComponent = ({handleDelete, handleFavorite, favorite})=>{ 
  console.log("Value of Favorite is : ", favorite);
  return (
    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
      <TouchableOpacity onPress={()=>{handleFavorite()}}>
        <AntDesign name={(favorite==0)?'staro':'star'} size={30} color="black" />
      </TouchableOpacity>
      <MaterialCommunityIcons style={{marginStart:5}} name="pencil" size={30} color="black" />
      <TouchableOpacity onPress={()=>{handleDelete()}}>
        <Ionicons name="trash" style={{marginStart:5}} size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const DetailsScreen = ({navigation, route}) => {
  console.log("Details Screen Rendered!!!!");
  
  const [details,setDetails]= useState({
    id:route.params?.id,
    Name:'', 
    Email:'',
    PhoneNumber:'',
    Favorite:0,
  });
  // const [dataLoaded, setDataLoaded] = useState(false);

  async function handleFavorite(){
    const query =`
      UPDATE CONTACTS
      SET  Favorite = ?
      WHERE id= ?
    `;
    console.log("Details Before Favorite:", details);
    const favorite = details.Favorite==1?0:1;
    console.log("Value of Favorite to be Setted: ", favorite);
    const db:SQLiteDatabase = DatabaseInstance.getInstance();
    await db.transactionAsync(async(tx)=>{
      await tx.executeSqlAsync(query, [ favorite ,details.id]);
      console.log(`${favorite?'Added':'Removed'}  Favorite`);
    })
    loadData();
  }

  useEffect(()=>{
    console.log("DetailsScreen is Mounted...");
    // loadData();
    renderHeaderComp();
  },[]);

  useEffect(()=>{
    navigation.setOptions({
      headerRight:()=><HeaderRightComponent handleDelete={handleDelete} 
        handleFavorite={handleFavorite}
        favorite={details.Favorite}/>
    })
  },[details])

  async function renderHeaderComp(){
    await loadData();
    console.log("After Loading Data");
    console.log(details);
  }
  async function loadData(){
    const query = `SELECT * FROM contacts WHERE id=?`;
    const db:SQLiteDatabase =DatabaseInstance.getInstance();
    let obj = {
      id:'',
      Name:'',
      PhoneNumber: '',
      Email: '',
      Favorite: 0,
    };
    await db.transactionAsync(async(tx)=>{
      const result = await tx.executeSqlAsync(query, [details.id]);
      console.log("Settings Details");
      console.log(result.rows[0]);
       obj ={
        id:result.rows[0].id,
        Name:result.rows[0].Name,
        PhoneNumber: result.rows[0].PhoneNumber,
        Email: result.rows[0].Email,
        Favorite: result.rows[0].Favorite
      }
      setDetails(obj);
      console.log(details);
    })
  }

  async function handleDelete(){
    console.log("Into Handle Delete ");
    console.log("Id is ", details.id);
    const db:SQLiteDatabase=  DatabaseInstance.getInstance();
    console.log("Id is ", details.id);
    await db.transactionAsync(async(tx)=>{
       await tx.executeSqlAsync("DELETE FROM contacts WHERE id=?", [details.id]);
       console.log("Deleted Successfully!!!");
       navigation.navigate('Home');
    });
  }

  return (
    <View  style={{marginTop:15, padding:20,flex:1}} >
      <View style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
        <View style={{backgroundColor:'gray',borderRadius:999,padding:20}}>
          <Image resizeMode='contain' style={styles.imageStyle}  source={require("../assets/add-photo-icon.png")}></Image>
        </View>
        <View style={{marginTop:10}}> 
          <Text style={{fontSize:25}}>{details.Name}</Text>
        </View>
      </View>

      <View style={styles.iconTrayWrapper}>
        <Feather style={styles.trayIcon} name="phone-call" size={30} color="black" />
        <MaterialIcons style={styles.trayIcon} name="message" size={30} color="black" />
        <MaterialIcons style={styles.trayIcon} name="email" size={30} color="black" />
      </View>
      <View style={styles.detailsWrapper}>
        <View style={styles.textWrapper}>
          <Text style={{fontWeight:'bold'}}>Phone Number: </Text>
          <Text>{details.PhoneNumber}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={{fontWeight:'bold'}}>Email: </Text>
          <Text>{details.Email}</Text>
        </View>
      </View>
      <View style={{marginTop:10}}>
        <View style={{marginVertical:10}}><Button title ='Delete' color={'red'} onPress={()=>handleDelete()}/></View>
        <View style={{marginVertical:10}}><Button title ='Update' /></View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  imageStyle:{
    height:180,
    width:180,
  },
  iconTrayWrapper:{
    display:'flex',flexDirection:'row', justifyContent:'space-between', marginVertical:30,
    marginHorizontal:20
  },
  trayIcon:{
    backgroundColor:'gray',padding:10,borderRadius:999,
  },
  textWrapper:{
    display:'flex',
    flexDirection:'row',
    padding:5
  },
  detailsWrapper:{
    backgroundColor:'gray',
    padding:20,
    borderRadius:15
  }
})

export default DetailsScreen
