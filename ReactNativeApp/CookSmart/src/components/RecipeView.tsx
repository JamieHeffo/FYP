import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../assets/Colors';
import CheckBox from '@react-native-community/checkbox';

const RecipeView = ({ visible, onClose, recipe }) => {
    if (!recipe) return null;

    return (
        <Modal style={styles.modal} transparent={true} visible={visible} animationType='slide' onRequestClose={onClose}>
            <View style={styles.modalView}>
                <ScrollView>
                    <Text style={styles.title}>{recipe.title}</Text>

                    <Text style={styles.heading}>Ingredients</Text>
                    {recipe.ingredients.map((ingredient, index) => (
                        <Text style={styles.text} key={index}>{`${ingredient.quantity}g of ${ingredient.name}`}</Text>
                    ))}

                    <Text style={styles.heading}>Instructions</Text>
                    {recipe.instructions.map((instruction, index) => (
                        <Text style={styles.text} key={index}>{`${instruction.stepnumber}. ${instruction.description}`}</Text>
                    ))}

                    <Text style={styles.heading}>Notes</Text>
                    {recipe.notes.map((note, index) => (
                        <Text style={styles.text} key={index}>{note.note}</Text>
                    ))}



                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.dismissButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modal: {
        //height: '100%',
        borderRadius: 20,
        backgroundColor: Colors.BEIGE,
    },
    modalView: {
        marginTop: '10%',
        paddingBottom: '20%',
        backgroundColor: "white",
        height: '100%',
        borderRadius: 20,
        padding: '5%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        fontSize: 30,
        color: Colors.TEAL,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    heading: {
        fontSize: 25,
        color: Colors.TEAL,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: '#808080',
        marginBottom: 10,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
    },
    dismissButton: {
        backgroundColor: '#808080',
        borderRadius: 25,
        padding: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});

export default RecipeView;
