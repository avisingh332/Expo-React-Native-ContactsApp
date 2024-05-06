import React, { useEffect, useState } from 'react'
import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { upsertContact } from '../db/db';
import { EventRegister } from 'react-native-event-listeners';
import * as ImagePicker from 'expo-image-picker';
import { storeImageLocally } from '../utility/SaveImageLocally';

const UpsertContactScreen = ({ navigation, route }) => {
  const [isUpdateRequest, setIsUpdateRequest] = useState(false);
  const [isImageSet, setIsImageSet] = useState(false);
  const [inputForm, setInputForm] = useState({
    id:null,
    Name: '',
    PhoneNumber: '',
    Email: '',
    Favorite: 0,
  });

  const fireEvent = () => {
    EventRegister.emitEvent('reloadContacts', "Event Triggered");
  }

  const handleChange = (field: string, value: string) => {
    setInputForm({
      ...inputForm,
      [field]: value
    })
  }

  const handleSubmit = async () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputForm.Email == '' || !emailRegex.test(inputForm.Email) || inputForm.Name == '' || inputForm.PhoneNumber == ''
      || image == null) {
      Alert.alert("Input Correct values");
      navigation.navigate('Home');
      return;
    }
    let imageLocalUri;
    if (isImageSet) {
      imageLocalUri = await storeImageLocally(image);
      console.log('Image saved in memory');
    }
    await upsertContact({ ...inputForm, imageUri: isImageSet ? imageLocalUri : image, isUpdateRequest: isUpdateRequest })
    Alert.alert("Updated Successfully!!!");
    // setInputForm({
    //   Name: '',
    //   PhoneNumber: '',
    //   Email: '',
    //   Favorite: 0,
    // })
    navigation.goBack();
  }

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64:true
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsImageSet(true);
    }
  };

  useEffect(() => {
    console.log("Image is set value is ", image);
  }, [image]);

  useEffect(() => {
    
    
    if (route.params?.details != null) {

      const details = route.params?.details;
      console.log("Details Got through Param are: ", details);
      setIsUpdateRequest(true);
      setInputForm({
        id: details.id,
        Name: details.Name,
        PhoneNumber: details.PhoneNumber,
        Email: details.Email,
        Favorite: details.Favorite,
      });
      setImage(details.ImageUri)
      navigation.setOptions({
        title: 'Update Contact'
      })
    }
  }, []);

  return (
    <ScrollView>
      <View style={{ marginTop: 20, padding: 20, flex: 1 }}>
        <TouchableOpacity onPress={pickImage} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <View style={styles.imageContainer}>
            <Image resizeMode='contain' style={styles.image} source={image ? { uri: image } : require("../assets/add-photo-icon.png")}></Image>
          </View>
          {!isUpdateRequest && <Text>Add Picture</Text>}
        </TouchableOpacity>
        {/* {image && <Image source={{ uri:image }} style={{width:200, height:200}} />} */}
        <View>
          {/* Contact Name */}
          <View style={{ ...styles.inputWrapper, marginTop: 25 }}>
            <MaterialIcons name="category" size={24} color="black" />
            <TextInput
              placeholder='Contact Name'
              style={{ fontSize: 15, width: '100%' }}
              value={inputForm.Name}
              onChangeText={(text) => { handleChange('Name', text) }}
            />
          </View>

          {/* Phone Number */}
          <View style={{ ...styles.inputWrapper, marginTop: 25 }}>
            <FontAwesome6 name="phone" size={24} color="black" />
            <TextInput
              keyboardType='numeric'
              placeholder='Phone Number'
              style={{ fontSize: 15, width: '100%' }}
              value={inputForm.PhoneNumber}
              onChangeText={(text) => { handleChange('PhoneNumber', text) }}
            />
          </View>
          {/* Email */}
          <View style={{ ...styles.inputWrapper, marginTop: 25 }}>
            <Fontisto name="email" size={24} color="black" />
            <TextInput
              keyboardType='email-address'
              placeholder='Email'
              style={{ fontSize: 15, width: '100%' }}
              value={inputForm.Email}
              onChangeText={(text) => { handleChange('Email', text) }}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={{ ...styles.button, marginTop: 25 }} onPress={() => { handleSubmit() }}>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>{isUpdateRequest ? 'Update' : 'Create'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  image: {
    height: '170%',
    width: '170%',
  },
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
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#DDDDDD',
    padding: 15,
    borderRadius: 10
  },
  button: {
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
})

export default UpsertContactScreen
