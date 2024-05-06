import * as FileSystem from 'expo-file-system';

// Set the local directory where you want to store the image

export async function storeImageLocally(imageUri) {
    // Create the directory if it doesn't exist
    const localDirectory = FileSystem.documentDirectory + 'contact-images/';
    await FileSystem.makeDirectoryAsync(localDirectory, { intermediates: true });
    console.log("File Path is: ",localDirectory);

     const filename = imageUri.split('/').pop(); // Get the file name from the URI
     console.log("File Name is :", filename);
    const destination = localDirectory + filename;

  // Copy the image from its current location to the new destination
  await FileSystem.copyAsync({
    from: imageUri,
    to: destination,
  });
  return destination; // This is the new local URI of the stored image
}

export async function deleteImage(imageUri){
  try {
    await FileSystem.deleteAsync(imageUri);
    console.log("Image Deleted Successfully")
  } catch (error) {
    throw(error);
  }
}