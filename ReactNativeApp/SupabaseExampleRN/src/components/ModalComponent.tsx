import React, { useState } from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
const ModalComponent = (props) => {

    const [text, setText] = useState('')

    const addNewItem = () => {

        if (text.length === 0)
            return;

        props.saveNewItem(text);
        setText("");
        props.hideModal();
    }
    return (
        <Modal animationType='slide' visible={true} transparent={true}>
            <TouchableOpacity onPress={props.hideModal} style={styles.modalBackDrop} activeOpacity={1}>
                <View style={styles.newItemForm}>
                    <Text style={styles.heading}>Add Item</Text>
                    <TextInput value={text} onChangeText={setText} placeholder='Enter New Item' style={styles.input}></TextInput>
                    <TouchableOpacity style={styles.button} onPress={() => addNewItem()}>
                        <Text style={styles.buttonText}>Add Item</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default ModalComponent;

const styles = StyleSheet.create({
    modalBackDrop: {
        flex: 1,
        backgroundColor: '#847DA4',//'rgba(0,0,0,0.60',
        alignItems: 'center',
        justifyContent: 'center',
    },

    newItemForm: {
        width: '90%',
        height: 230,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',

    },

    heading: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 10,
    },

    input: {
        width: '90%',
        height: 80,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#F887A8',
        borderRadius: 4,
        paddingLeft: 10,
    },

    button: {
        marginTop: 20,
        width: '90%',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F887A8',
        alignItems: 'center',
        justifyContent: 'center',

    },

    buttonText: {
        color: '#FFFFFF'
    }
})