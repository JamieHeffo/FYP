import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../assets/Colors';

const RecipeView = ({ visible, onClose, recipe }) => {
    if (!recipe) return null;

    return (
        <Modal style={styles.modal} transparent={true} visible={visible} animationType='slide' onRequestClose={onClose}>
            <View style={styles.modalView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>{recipe.title}</Text>

                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>{`${recipe.calories} Kcal`}</Text>
                        <Text style={styles.text}>{`${recipe.time} minutes`}</Text>
                        <Text style={styles.text}>{`Serves ${recipe.servings}`}</Text>
                    </View>


                    <Text style={styles.heading}>Ingredients</Text>
                    <View style={styles.data}>
                        {recipe.ingredients.map((ingredient, index) => (
                            <Text style={styles.text} key={index}>{`${ingredient.quantity}g of ${ingredient.name}`}</Text>
                        ))}
                    </View>

                    <Text style={styles.heading}>Instructions</Text>
                    <View style={styles.data}>
                        {recipe.instructions.map((instruction, index) => (
                            <Text style={styles.text} key={index}>{`${instruction.stepnumber}. ${instruction.description}`}</Text>
                        ))}
                    </View>

                    <Text style={styles.heading}>Notes</Text>
                    <View style={styles.data}>
                        {recipe.notes.map((note, index) => (
                            <Text style={styles.text} key={index}>{note.note}</Text>
                        ))}
                    </View>



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
        marginTop: '5%',
        fontSize: 30,
        color: Colors.TEAL,
        fontWeight: 'bold',
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
    infoContainer: {
        paddingTop: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '2%',
        marginHorizontal: '2%',
    },
    data:
    {
        marginLeft: '2%',
        marginVertical: '2%',
    }
});

export default RecipeView;
