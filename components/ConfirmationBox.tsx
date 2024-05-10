import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const ConfirmationBox = ({ showAlert, setShowAlert, onConfirm}) => {
    return (
        <Modal
            transparent={true}
            visible={showAlert}
            animationType="fade"
        >
            <TouchableWithoutFeedback onPress={() => {setShowAlert(false)}}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={(e)=>{e.stopPropagation()}}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Are you sure you want to delete?
                            </Text>
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity onPress={onConfirm}
                                    style={[styles.buttonContainer, styles.confirmButton]}
                                >
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{setShowAlert(false)}}
                                    style={[styles.buttonContainer, styles.cancelButton]}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background with some transparency
    },
    modalView: {
        backgroundColor: 'rgba(135, 206, 235, 0.9)', // Translucent sky blue
        padding: 30,
        borderRadius: 20,
    },
    modalText: {
        fontSize: 18,
    },
    buttonGroup: {
        marginTop: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        padding: 5,
        borderRadius: 5,
    },
    confirmButton: {
        backgroundColor: 'green',
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
});

export default ConfirmationBox;
