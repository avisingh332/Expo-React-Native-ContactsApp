import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native'
import { DatabaseInstance, getContacts } from '../db/db';
import { SQLiteDatabase } from 'expo-sqlite';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { deleteImage } from '../utility/SaveImageLocally';


const HeaderRightComponent = ({ handleDelete, handleFavorite, handleEdit, favorite }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <TouchableOpacity onPress={() => { handleFavorite() }}>
        <AntDesign name={(favorite == 0) ? 'staro' : 'star'} size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEdit()}>
        <MaterialCommunityIcons style={{ marginStart: 5 }} name="pencil" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { handleDelete() }}>
        <Ionicons name="trash" style={{ marginStart: 5 }} size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const DetailsScreen = ({ navigation, route }) => {
  const [details, setDetails] = useState({
    id: route.params?.id,
    name: '',
    email: '',
    phoneNumber: '',
    favorite: 0,
    imageUri: null,
  });
  // const [dataLoaded, setDataLoaded] = useState(false);

  async function handleFavorite() {
    const query = `
      UPDATE CONTACTS
      SET  favorite = ?
      WHERE id= ?
    `;
    console.log("Details Before favorite:", details);
    const favorite = details.favorite == 1 ? 0 : 1;
    console.log("Value of Favorite to be Setted: ", favorite);
    const db: SQLiteDatabase = DatabaseInstance.getInstance();
    await db.transactionAsync(async (tx) => {
      await tx.executeSqlAsync(query, [favorite, details.id]);
      console.log(`${favorite ? 'Added' : 'Removed'}  Favorite`);
    })
    loadData();
  }

  async function handleEdit() {
    navigation.navigate('UpsertContact', { details: details })
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightComponent handleDelete={handleDelete}
        handleFavorite={handleFavorite}
        handleEdit={handleEdit}
        favorite={details.favorite} />
    })
  }, [details])

  async function loadData() {
    const query = `SELECT * FROM contacts WHERE id=?`;
    const db: SQLiteDatabase = DatabaseInstance.getInstance();
    let obj = {
      id: '',
      name: '',
      phoneNumber: '',
      email: '',
      favorite: 0,
      imageUri: '',
    };

    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(query, [details.id]);
      // console.log("Settings Details");
      // console.log(result.rows[0]);
      obj = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        phoneNumber: result.rows[0].phoneNumber,
        email: result.rows[0].email,
        favorite: result.rows[0].favorite,
        imageUri: result.rows[0].imageUri,
      }
      setDetails(obj);
      // console.log(details);
    })
  }

  async function handleDelete() {
    console.log("Into Handle Delete ");
    console.log("Id is ", details.id);
    const db: SQLiteDatabase = DatabaseInstance.getInstance();
    try{
      await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync("DELETE FROM contacts WHERE id=?", [details.id]);
        console.log("Contact Deleted from Database!!");
        // console.log("Image Removed Successfully")
        // navigation.navigate('Home');
      });
      await deleteImage(details.imageUri);
      Alert.alert("Deleted Successfully!!!");
      navigation.navigate('Home');
    } catch(error){
      throw (error);
    }
  }

  return (
    <View style={{ marginTop: 15, padding: 20, flex: 1 }} >
      <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <View style={styles.imageContainer}>
          <Image resizeMode='contain' style={styles.image} source={{ uri: details.imageUri }}></Image>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 25 }}>{details.name}</Text>
        </View>
      </View>

      <View style={styles.iconTrayWrapper}>
        <Feather style={styles.trayIcon} name="phone-call" size={30} color="black" />
        <MaterialIcons style={styles.trayIcon} name="message" size={30} color="black" />
        <MaterialIcons style={styles.trayIcon} name="email" size={30} color="black" />
      </View>
      <View style={styles.detailsWrapper}>
        <View style={styles.textWrapper}>
          <Text style={{ fontWeight: 'bold' }}>Phone Number: </Text>
          <Text>{details.phoneNumber}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={{ fontWeight: 'bold' }}>Email: </Text>
          <Text>{details.email}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  imageContainer: {
    // backgroundColor:'green',
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 999,
    padding: 20,
    overflow: 'hidden'
  },

  image: {
    height: '170%',
    width: '170%',
  },

  iconTrayWrapper: {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 30,
    marginHorizontal: 20
  },
  trayIcon: {
    backgroundColor: 'gray', padding: 10, borderRadius: 999,
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5
  },
  detailsWrapper: {
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 15
  }
})

export default DetailsScreen
