import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { supabase } from '../supabase/supabase';
import ShoppingListItem from '../src/components/ShoppingListItem';

const ShoppingList = ({ navigation }) => {
    const [ingredients, setIngredients] = useState([]);

    // Function to get ingredient data from the database
    const getIngredients = async () => {
        let { data: ingredientsData, error } = await supabase
            .from('ingredients')
            .select('*');

        if (error) {
            console.error("Error fetching ingredients:", error);
            // Handle the error (e.g., show an error message to the user)
            return [];
        }

        return ingredientsData;
    }

    // Function to get ingredient amounts from the database
    const getIngredientAmounts = async () => {
        let { data: amountsData, error } = await supabase
            .from('recipeingredients')
            .select('*');

        if (error) {
            console.error("Error fetching ingredient amounts:", error);
            // Handle the error (e.g., show an error message to the user)
            return [];
        }

        return amountsData;
    }

    // Hook to fetch ingredient data when the component mounts
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
    }, []);

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
        backgroundColor: '#F887A8'
    },

    scrollView: {
        flex: 1,
        backgroundColor: '#847DA4',
        padding: '5%',
    },

    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F887A8',
        marginTop: '5%',
        marginBottom: '5%'
    },
});

export default ShoppingList;
