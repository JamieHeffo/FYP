import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { supabase } from '../supabase/supabase';
import ShoppingListItem from '../src/components/ShoppingListItem';
import { Colors } from '../src/assets/Colors';

const ShoppingList = () => {
    const [ingredients, setIngredients] = useState([]);

    const fetchIngredients = async () => {
        try {
            const { data: recipeIDData, error: recipeIDError } = await supabase
                .from('recipes')
                .select('recipeid')
                .eq('onshoppinglist', true);

            if (recipeIDError) {
                console.error("Error fetching recipe ID:", recipeIDError);
                return;
            }

            const recipeIDs = recipeIDData.map(entry => entry.recipeid);

            const { data: amountsData, error: amountsError } = await supabase
                .from('recipeingredients')
                .select('*')
                .in('recipeid', recipeIDs);

            if (amountsError) {
                console.error("Error fetching ingredient amounts:", amountsError);
                return;
            }

            const ingredientIDs = amountsData.map(entry => entry.ingredientid);

            const { data: ingredientsData, error: ingredientsError } = await supabase
                .from('ingredients')
                .select('*')
                .in('ingredientid', ingredientIDs);

            if (ingredientsError) {
                console.error("Error fetching ingredients:", ingredientsError);
                return;
            }

            const combinedData = amountsData.map(amountEntry => ({
                ...amountEntry,
                ingredient: ingredientsData.find(ingredient => ingredient.ingredientid === amountEntry.ingredientid),
            }));

            setIngredients(combinedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchIngredients();
        const intervalId = setInterval(fetchIngredients, 10000);
        return () => clearInterval(intervalId);
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
        backgroundColor: Colors.TEAL_LIGHT
    },

    scrollView: {
        flex: 1,
        backgroundColor: Colors.TEAL_LIGHT,
        padding: '5%',
        paddingBottom: '20%'
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
