import React, { useState } from "react";
import { Colors } from "../assets/Colors";
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const ModalComponent = ({ saveNewRecipe, hideModal }) => {
    // State variables
    const [recipeTitle, setRecipeTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [instructions, setInstructions] = useState(['']);
    const [notes, setNotes] = useState(['']);

    // Function to add a new ingredient to the form
    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    // Function to remove an ingredient from the form
    const removeIngredient = (index: number) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    // Function to handle changes in ingredient details
    type Ingredient = {
        name: string;
        quantity: string;
    };

    const handleIngredientChange = (index: number, key: keyof Ingredient, value: string) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][key] = value;
        setIngredients(updatedIngredients);
    };

    // Function to add new note text field
    const addNote = () => {
        setNotes([...notes, '']);
    };

    const removeNote = (index: number) => {
        const updatedNote = [...notes];
        updatedNote.splice(index, 1);
        setNotes(updatedNote);
    }

    // Function to handle changes in note details
    const handleNoteChange = (index: number, value: string) => {
        const updatedNote = [...notes];
        updatedNote[index] = value;
        setNotes(updatedNote);
    };

    // Function to add a new instruction to the form
    const addInstruction = () => {
        setInstructions([...instructions, '']);
    };

    // Function to remove an instruction from the form
    const removeInstruction = (index: number) => {
        const updatedInstructions = [...instructions];
        updatedInstructions.splice(index, 1);
        setInstructions(updatedInstructions);
    };

    // Function to handle changes in instruction details
    const handleInstructionChange = (index: number, value: string) => {
        const updatedInstructions = [...instructions];
        updatedInstructions[index] = value;
        setInstructions(updatedInstructions);
    };

    // Function to add a new recipe
    const addNewRecipe = async () => {

        // Check if the recipe title, ingredients, and instructions are not empty
        if ((recipeTitle.length === 0) ||
            instructions.some(instruction => instruction.length === 0))
            //|| ingredients.some(ingredient => ingredient.name.length === 0 || ingredient.quantity.length === 0) 
            return;

        saveNewRecipe(recipeTitle, ingredients, instructions, notes);
        // Clear all the state variables
        setRecipeTitle('');
        setIngredients([{ name: '', quantity: '' }]);
        setInstructions(['']);
        hideModal();
    };

    return (
        <Modal animationType='slide' visible={true} transparent={true} >
            <TouchableOpacity onPress={hideModal} style={styles.modalBackDrop} activeOpacity={1}>
                <View style={styles.newItemForm}>
                    <Text style={styles.heading}>Add Custom Recipe</Text>
                    {/* Recipe Title */}
                    <TextInput value={recipeTitle} onChangeText={setRecipeTitle} placeholder='Recipe Title' style={styles.input}></TextInput>

                    <ScrollView>
                        {/* Ingredients */}
                        {ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientContainer}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        value={ingredient.name}
                                        onChangeText={(value) => handleIngredientChange(index, 'name', value)}
                                        placeholder='Ingredient'
                                        style={[styles.input, { width: '75%' }]}
                                    />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%' }}>
                                        <TextInput
                                            keyboardType="numeric"
                                            value={ingredient.quantity}
                                            onChangeText={(value) => handleIngredientChange(index, 'quantity', value)}
                                            placeholder='g'
                                            style={[styles.input, { width: '60%', marginLeft: '25%' }]}
                                        />

                                        <TouchableOpacity onPress={() => removeIngredient(index)}>
                                            <Text style={styles.removeButton}>X</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        ))}

                        {/* Button to add a new ingredient */}
                        <TouchableOpacity onPress={addIngredient}>
                            <Text style={styles.addButton}>Add Ingredient</Text>
                        </TouchableOpacity>

                        {/* Instructions */}
                        {instructions.map((instruction, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                <TextInput
                                    value={instruction}
                                    onChangeText={(value) => handleInstructionChange(index, value)}
                                    placeholder='Instructions'
                                    style={styles.input}
                                />
                                <TouchableOpacity onPress={() => removeInstruction(index)}>
                                    <Text style={styles.removeButton}>X</Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                        {/* Button to add a new instruction */}
                        <TouchableOpacity onPress={addInstruction}>
                            <Text style={styles.addButton}>Add Instruction</Text>
                        </TouchableOpacity>

                        {/* Recipe Notes */}
                        {notes.map((notes, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                <TextInput
                                    value={notes}
                                    onChangeText={(value) => handleNoteChange(index, value)}
                                    placeholder='Notes'
                                    style={styles.input}
                                />
                                <TouchableOpacity onPress={() => removeNote(index)}>
                                    <Text style={styles.removeButton}>X</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {/* Button to add a new instruction */}
                        <TouchableOpacity onPress={addNote}>
                            <Text style={styles.addButton}>Add Note</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    {/* Submit Button */}
                    < TouchableOpacity style={styles.button} onPress={() => addNewRecipe()}>
                        <Text style={styles.buttonText}>Add Recipe</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity >
        </Modal >
    );
}

export default ModalComponent;

const styles = StyleSheet.create({
    modalBackDrop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    newItemForm: {
        width: '100%',
        height: '90%',
        borderRadius: 20,
        backgroundColor: Colors.WHITE,
        justifyContent: 'center',
        //alignItems: 'center', moves everything to the middle which messes with text boxes

    },

    heading: {
        fontWeight: 'bold',
        color: Colors.TEAL,
        fontSize: 25,
        marginBottom: '5%',
        marginTop: 10,
        marginLeft: '5%',
    },

    input: {
        width: '90%',
        marginTop: 10,
        height: 40,
        borderWidth: 1,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.TEAL_MID,
        borderRadius: 4,
        paddingLeft: '5%',
        marginLeft: '5%',
        //marginBottom: '2%' spacing around text boxes
    },

    button: {
        marginTop: 20,
        marginBottom: '10%',
        width: '90%',
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.TEAL,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%'//aligns the button in the centre
    },

    buttonText: {
        color: Colors.WHITE
    },

    addButton: {
        color: Colors.TEAL,
        //marginTop: 10,
        paddingLeft: '5%'
    },

    removeButton: {
        color: Colors.RED,
        marginTop: 10,
        marginLeft: '10%',
    },

    ingredientContainer: {
        //flexDirection: 'column', // Change to column direction
        //marginBottom: 10, // Adjust margin as needed
        width: '90%',
    },


});
