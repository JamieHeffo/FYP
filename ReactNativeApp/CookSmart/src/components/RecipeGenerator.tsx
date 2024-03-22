import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { RippleLoader, TextLoader } from 'react-native-indicator';
import { supabase } from '../../supabase/supabase';
import { Colors } from '../assets/Colors';

// RecipeGenerator: Displays recipe details in a modal
const RecipeGenerator = ({ visible, onClose, onSave, recipeData }) => {
    let title = '';
    let calories = 0;
    let time = '';
    let servings = 0;
    let ingredients = [];
    let instructions = [];
    let notes = [];

    if (recipeData) {
        const data = JSON.parse(recipeData);

        if (data && data.users && data.users.length > 0) {
            const recipe = data.users[0].recipes[0];
            title = recipe.title;
            time = recipe.time;
            servings = recipe.servings;
            calories = recipe.calories;
            ingredients = recipe.ingredients;
            instructions = recipe.instructions;
            notes = recipe.notes;
        }
    }

    // Function to save generated recipe
    const saveGeneratedRecipe = async (recipeData) => {

        // Recipe data
        const { data: Recipes, error: recipeError } = await supabase
            .from('recipes')
            .insert([{ title, calories, time, servings, userid: 1 }])
            .select('*');

        if (recipeError) {
            console.error('Error inserting recipe:', recipeError);
            return;
        }

        // Get the recipe ID to link other tables
        const recipeId = Recipes[0].recipeid;

        // Inserting ingredients and retrieving IDs
        const { data: Ingredients, error: ingredientError } = await supabase
            .from('ingredients')
            .insert(ingredients.map(ingredient => ({
                name: ingredient.name
            })))
            .select('ingredientid, name');

        if (ingredientError) {
            console.error('Error inserting ingredients:', ingredientError);
            return;
        }

        // Preparing data for recipeingredients table
        const recipeIngredientsData = ingredients.map(ingredient => {
            const foundIngredient = Ingredients.find(i => i.name === ingredient.name);
            return {
                recipeid: recipeId,
                ingredientid: foundIngredient.ingredientid,
                amount: ingredient.amount
            };
        });

        const recipeInstructionsData = instructions.map((instruction, index) => ({
            recipeid: recipeId,
            stepnumber: index + 1,
            description: instruction.description
        }));

        const { error: instructionsError } = await supabase
            .from('instructions')
            .insert(recipeInstructionsData);

        if (instructionsError) {
            console.error('Error inserting instructions:', instructionsError);
        }

        // Inserting into recipeingredients table
        const { error: recipeIngredientError } = await supabase
            .from('recipeingredients')
            .insert(recipeIngredientsData);

        if (recipeIngredientError) {
            console.error('Error inserting recipe ingredients:', recipeIngredientError);
            return;
        }

        // Assuming notes is always present and is an array of note objects
        const recipeNotesData = notes.map(note => ({
            recipeid: recipeId,
            note: note.note
        }));

        // Inserting notes
        const { error: notesError } = await supabase
            .from('notes')
            .insert(recipeNotesData);

        if (notesError) {
            console.error('Error inserting notes:', notesError);
            return;
        }
    };




    return (
        <Modal style={styles.modal} transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalView}>
                {/* Display loading indicator */}
                {!recipeData && (
                    <>
                        <RippleLoader />
                        <Text style={styles.heading}>
                            Crafting your Recipe
                        </Text>
                    </>
                )}
                {/* Display recipe data when available */}
                {recipeData && (
                    // Code to display recipe data
                    <>
                        <ScrollView>
                            <Text style={styles.title}>{title}</Text>

                            <Text style={styles.heading}>Ingredients:</Text>
                            {ingredients.map((ingredient, index) => (
                                <Text style={styles.text} key={index}>{`${ingredient.amount}g of ${ingredient.name}`}</Text>
                            ))}

                            <Text style={styles.heading}>Instructions:</Text>
                            {instructions.map((instruction, index) => (
                                <Text style={styles.text} key={index}>{`${instruction.stepnumber}. ${instruction.description}`}</Text>
                            ))}

                            <Text style={styles.heading}>Notes:</Text>
                            {notes.map((note, index) => (
                                <Text style={styles.text} key={index}>{note.note}</Text>
                            ))}
                        </ScrollView>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={saveGeneratedRecipe}>
                                <Text style={styles.buttonText}>Save to Database</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dismissButton} onPress={onClose}>
                                <Text style={styles.buttonText}>Dismiss</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modal: {
        height: '86%',
        borderRadius: 20,
        backgroundColor: Colors.BEIGE,
    },
    modalView: {
        marginTop: 'auto',
        backgroundColor: "white",
        height: '86%',
        borderRadius: 20,
        padding: 35,
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
    scrollViewContent: {
        padding: 20
    },
    title: {
        fontSize: 30,
        color: Colors.TEAL,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    heading: {
        fontSize: 20,
        color: Colors.TEAL,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#808080',
        marginBottom: 10,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: Colors.TEAL,
        borderRadius: 25,
        padding: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10, // Margin between buttons
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
        color: Colors.WHITE,
        fontSize: 20,
    },
});

export default RecipeGenerator;
