import React, { useState } from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const ModalComponent = (props) => {
    // State variables
    const [recipeTitle, setRecipeTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
    const [instructions, setInstructions] = useState(['']);

    // Function to add a new ingredient to the list
    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
    };

    // Function to remove an ingredient from the list
    const removeIngredient = (index: number) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    // Function to add a new instruction to the list
    const addInstruction = () => {
        setInstructions([...instructions, '']);
    };

    // Function to remove an instruction from the list
    const removeInstruction = (index: number) => {
        const updatedInstructions = [...instructions];
        updatedInstructions.splice(index, 1);
        setInstructions(updatedInstructions);
    };

    // Function to add a new recipe
    const addNewItem = () => {
        if (recipeTitle.length === 0 || ingredients.some(ingredient => ingredient.name.length === 0 || ingredient.quantity.length === 0) || instructions.some(instruction => instruction.length === 0))
            return;

        const newRecipe = {
            title: recipeTitle,
            ingredients: ingredients.filter(ingredient => ingredient.name.length > 0 && ingredient.quantity.length > 0),
            instructions: instructions.filter(instruction => instruction.length > 0),
        };

        props.saveNewItem(newRecipe);
        // Clear all the state variables
        setRecipeTitle('');
        setIngredients([{ name: '', quantity: '', unit: '' }]);
        setInstructions(['']);
        props.hideModal();
    };

    // Function to handle changes in ingredient details
    const handleIngredientChange = (index: number, key: string, value: string) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][key] = value;
        setIngredients(updatedIngredients);
    };

    // Function to handle changes in instruction details
    const handleInstructionChange = (index: number, value: string) => {
        const updatedInstructions = [...instructions];
        updatedInstructions[index] = value;
        setInstructions(updatedInstructions);
    };

    return (
        <Modal animationType='slide' visible={true} transparent={true}>
            <TouchableOpacity onPress={props.hideModal} style={styles.modalBackDrop} activeOpacity={1}>
                <View style={styles.newItemForm}>
                    <Text style={styles.heading}>Add Custom Recipe</Text>
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
                    </ScrollView>

                    {/* Button to add the new recipe */}
                    <TouchableOpacity style={styles.button} onPress={addNewItem}>
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
        backgroundColor: '#847DA4',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    newItemForm: {
        width: '100%',
        height: '90%',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        //alignItems: 'center', moves everything to the middle which messes with text boxes

    },

    heading: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: '5%'
    },

    input: {
        width: '90%',
        marginTop: 10,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#F887A8',
        borderRadius: 4,
        paddingLeft: '5%',
        marginLeft: '5%'
    },

    button: {
        marginTop: 20,
        marginBottom: '10%',
        width: '90%',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F887A8',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%'//aligns the button in the centre
    },

    buttonText: {
        color: '#FFFFFF'
    },

    addButton: {
        color: '#3498db',
        //marginTop: 10,
        paddingLeft: '5%'
    },

    removeButton: {
        color: '#e74c3c',
        marginTop: 10,
        marginLeft: '10%',
    },

    ingredientContainer: {
        //flexDirection: 'column', // Change to column direction
        marginBottom: 10, // Adjust margin as needed
        width: '90%',
    },


});
