import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from '../supabase/supabase';
import AddIcon from '../src/assets/AddIconImage.png';
import RecipeCard from '../src/components/RecipeCard';
import AddRecipeModal from '../src/components/AddRecipeModal';
import RecipeView from '../src/components/RecipeView';
import Tabs from '../navigation/tabs';
import { Colors } from '../src/assets/Colors';

function App(): React.JSX.Element {
    const [recipeName, setRecipeName] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Manages the state of the selected recipe modal
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isRecipeViewVisible, setIsRecipeViewVisible] = useState(false);

    // If a recipe card is pressed, open the modal
    const handleRecipePress = async (recipe) => {
        // Identify the ingredients in the selected recipe
        const recipeingredientsResult = await supabase
            .from('recipeingredients')
            .select('*')
            .eq('recipeid', recipe.recipeid);

        // Collecting all ingredient IDs
        const ingredientIds = recipeingredientsResult.data.map(item => item.ingredientid);

        // Fetch ingredients with the corresponding recipeID
        const ingredientsResult = await supabase
            .from('ingredients')
            .select('*')
            .in('ingredientid', ingredientIds);

        // Merging recipeIngredients with ingredients
        const mergedIngredients = recipeingredientsResult.data.map(recipeIngredient => {
            const ingredient = ingredientsResult.data.find(ingredient => ingredient.ingredientid === recipeIngredient.ingredientid);
            return {
                ...ingredient,
                quantity: recipeIngredient.amount,
            };
        });

        const instructionsResult = await supabase
            .from('instructions')
            .select('*')
            .eq('recipeid', recipe.recipeid);

        const notesResult = await supabase
            .from('notes')
            .select('*')
            .eq('recipeid', recipe.recipeid);

        const fullRecipeDetails = {
            ...recipe,
            ingredients: mergedIngredients,
            instructions: instructionsResult.data,
            notes: notesResult.data
        };

        setSelectedRecipe(fullRecipeDetails);
        setIsRecipeViewVisible(true);
        console.log('Selected Recipe:', mergedIngredients);
    };


    const closeRecipeView = () => {
        setIsRecipeViewVisible(false);
    };



    // Function to get all the recipe names from the database
    const getRecipeName = async () => {
        let { data: recipes, error } = await supabase
            .from('recipes')
            .select('*');

        return recipes;
    }

    //Hook to fetch recipe titles when the component mounts
    useEffect(() => {
        getRecipeName()
            .then((recipes) => {
                setRecipeName(recipes);
            })
    }, []);

    // * INSERTING DATA

    // Function to add a new recipe to the database
    const addNewRecipe = async (recipeTitle: string, ingredients: { name: string, quantity: string }[], instructions: string[], notes: string[]) => {

        // Recipe title
        const { data: Recipes, error: recipeError } = await supabase
            .from('recipes')
            .insert([{ title: recipeTitle, calories: 200, userid: 1 }])
            .select('*');

        // Get the recipe ID to link other tables
        const recipeId = Recipes[0].recipeid;

        // Ingredient Data
        const ingredientsData = ingredients.map((ingredient, index) => ({
            name: ingredient.name,
        }));

        // Insert into ingreditents tables
        const { data: Ingredients, error: ingredientError } = await supabase
            .from('ingredients')
            .insert(ingredientsData)
            .select('*')

        //Get the ingredient ID to link other tables
        let ingredientId = Ingredients[0].ingredientid;

        const recipeIngredientsData = ingredients.map((ingredient, index) => ({
            recipeid: recipeId,
            ingredientid: Ingredients[index].ingredientid,
            amount: ingredient.quantity,
        }));

        // Insert into recipeIngredients table
        const { data: RecipeIngredients, error: recipeIngredientError } = await supabase
            .from('recipeingredients')
            .insert(recipeIngredientsData)
            .select('*');

        // Instruction Data 
        const instructionsData = instructions.map((instruction, index) => ({
            recipeid: recipeId,
            stepnumber: index + 1,
            description: instruction,
        }))

        // Insert the instruction data
        const { data: Instructions, error: instructionError } = await supabase
            .from('instructions')
            .insert(instructionsData)
            .select('*');

        // Notes Data
        const notesData = notes.map((note, index) => ({
            recipeid: recipeId,
            note: note,
        }))

        const { data: Notes, error: noteError } = await supabase
            .from('notes')
            .insert(notesData)
            .select('*');

        // Log errors
        if (recipeError) console.log('Recipe Error:', recipeError);
        if (ingredientError) console.log('Ingredient Error:', ingredientError);
        if (recipeIngredientError) console.log('Recipe Ingredient Error:', recipeIngredientError);
        if (instructionError) console.log('Instruction Error:', instructionError);
        if (noteError) console.log('Note Error:', noteError);


        return Recipes;
    }


    // Function to save a new recipe
    const saveRecipe = (recipeTitle: string, ingredients: string[], instructions: string[], notes: string[]) => {
        addNewRecipe(recipeTitle, ingredients, instructions, notes)
            .then(() => {
                getRecipeName()
                    .then((recipes) => {
                        setRecipeName(recipes);
                    })
            })
    }


    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.scrollView}>
                <Text style={styles.heading}>My Recipes</Text>
                <FlatList
                    data={recipeName}
                    renderItem={({ item, index }) => (
                        <RecipeCard item={item} onPress={handleRecipePress} />
                    )}
                    keyExtractor={item => item.recipeid.toString()}
                />
                <TouchableOpacity style={styles.AddButton} onPress={() => setShowModal(true)}>
                    <Image source={AddIcon} style={styles.AddIconImage} />
                </TouchableOpacity>
            </View>

            {showModal ? <AddRecipeModal saveNewRecipe={saveRecipe} hideModal={() => setShowModal(false)} /> : null}
            {isRecipeViewVisible && ( // Added RecipeView modal
                <RecipeView
                    visible={isRecipeViewVisible}
                    recipe={selectedRecipe}
                    onClose={closeRecipeView}
                />
            )}
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Colors.TEAL_LIGHT,
    },

    scrollView: {
        flex: 1,
        marginBottom: '21%', // Stops it going behind the nav bar
        backgroundColor: Colors.TEAL_LIGHT,
        paddingHorizontal: '5%',
    },

    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.TEAL,
        marginTop: '5%',
        marginBottom: '5%'
    },

    AddButton: {
        width: 60,
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        position: 'absolute',
        bottom: '-5%',
        right: '1%',
        margin: '5%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    AddIconImage: {
        width: 70,
        height: 70,
    },
});

export default App;
