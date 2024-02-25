import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { supabase } from '../supabase/supabase';
import ShoppingListItem from '../src/components/ShoppingListItem';
import { Colors } from '../src/assets/Colors';

const ShoppingList = () => {

    // State to store the ingredient data
    const [ingredients, setIngredients] = useState([]);

    // Function to get recipe ID where recipes are on the shopping list
    const getRecipeID = async () => {
        let { data: recipeIDData, error } = await supabase
            .from('recipes')
            .select('recipeid')
            .eq('onshoppinglist', true);

        if (error) {
            console.error("Error fetching recipe ID:", error);
            // Handle the error (e.g., show an error message to the user)
            return [];
        }
        console.log('RecipeID : \n', recipeIDData);
        return recipeIDData;
    }

    //Take the recipe ID and use it to find which ingredients are nee for that recipe

    // Function to get ingredient amounts from the database
    const getIngredientAmounts = async (recipeIDs) => {
        let { data: amountsData, error } = await supabase
            .from('recipeingredients')
            .select('*')
            .in('recipeid', recipeIDs);

        if (error) {
            console.error("Error fetching ingredient amounts:", error);
            // Handle the error (e.g., show an error message to the user)
            return [];
        }
        console.log('Amounts : \n', amountsData);
        return amountsData;
    }

    //ingredients data links recipeID to ingredientID

    // Function to get ingredient data from the database
    const getIngredients = async (ingredientIDs) => {
        let { data: ingredientsData, error } = await supabase
            .from('ingredients')
            .select('*');

        if (error) {
            console.error("Error fetching ingredients:", error);
            // Handle the error (e.g., show an error message to the user)
            return [];
        }
        console.log('Ingredients : \n', ingredientsData);
        return ingredientsData;
    }

    //Take the ingredient ID and ue it to find the ingredient name

    // Use the retrieved recipe IDs to fetch ingredient amounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Step 1: Fetch Recipe IDs
                const recipeIDs = await getRecipeID();

                // Step 2: Fetch Ingredient Amounts for Recipe IDs
                const amountsData = await getIngredientAmounts(recipeIDs.map(entry => entry.recipeid));

                // Step 3: Extract Ingredient IDs from Amounts Data
                const ingredientIDs = amountsData.map(entry => entry.ingredientid);

                // Step 4: Fetch Ingredient Data for Ingredient IDs
                const ingredientsData = await getIngredients(ingredientIDs);

                // Step 5: Combine Data based on Ingredient ID
                const combinedData = amountsData.map(amountEntry => ({
                    ...amountEntry,
                    ingredient: ingredientsData.find(ingredient => ingredient.ingredientid === amountEntry.ingredientid),
                }));

                setIngredients(combinedData);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error (e.g., show an error message to the user)
            }
        };

        fetchData();
    }, []); // Ensure this effect runs only once on component mount




    /*     // Hook to fetch ingredient data when the component mounts
        useEffect(() => {
            const fetchData = async () => {
                const ingredientsData = await getIngredients();
                const amountsData = await getIngredientAmounts();
     
                // Combine the data based on a shared identifier (e.g., ingredient ID)
                const combinedData = ingredientsData.map(ingredient => ({
                    ...ingredient,
                    amount: amountsData.find(amount => amount.ingredientid === ingredient.ingredientid)?.amount || 0,
                }));
     
                setIngredients(combinedData);
            };
     
            fetchData(); 
        }, []);*/


    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.scrollView}>
                <Text style={styles.heading}>Shopping List</Text>
                <FlatList
                    data={ingredients}
                    renderItem={({ item }) => (
                        <ShoppingListItem item={item} />
                    )}
                    keyExtractor={item => item.ingredientid.toString()}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Colors.TEAL_LIGHT
    },

    scrollView: {
        flex: 1,
        backgroundColor: Colors.TEAL_LIGHT,
        padding: '5%',
    },

    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.TEAL,
        marginTop: '5%',
        marginBottom: '5%'
    },
});

export default ShoppingList;
``