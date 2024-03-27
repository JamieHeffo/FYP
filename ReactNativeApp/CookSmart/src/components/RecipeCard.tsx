import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../../supabase/supabase';
import CheckBox from '@react-native-community/checkbox';
import { Colors } from '../assets/Colors';

const RecipeCard = ({ item, onPress }) => {
    const [isSelected, setSelection] = useState(item.onshoppinglist);

    const handleCheckboxChange = async (newValue) => {
        // Update the local UI state
        setSelection(newValue);

        // Update onShoppingList value in the database
        const { error } = await supabase
            .from('recipes')
            .update({ onshoppinglist: newValue })
            .match({ recipeid: item.recipeid });

        if (error) {
            console.error('Error adding item to shopping list ', error.message);
        }
    };


    return (
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
                <View>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.detailText}>{item.calories} Kcal</Text>
                    <Text style={styles.detailText}>{item.time} Minutes</Text>
                    <Text style={styles.detailText}>Serves {item.servings}</Text>
                </View>
            </TouchableOpacity>
            <CheckBox
                value={isSelected}
                onValueChange={handleCheckboxChange}
                style={styles.checkbox}
            />
        </View>
    );
};

export default RecipeCard;

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderColor: Colors.TEAL_DARK,
        borderWidth: 1,
        borderRadius: 5,
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.5,
        elevation: 5,
        marginTop: '3%',
        padding: 10,
    },
    item: {
        flex: 1, // Take up all space except for checkbox
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.TEAL,
        marginBottom: 5,
    },
    detailText: {
        fontSize: 16,
        color: '#808080',
    },
    checkbox: {
        marginLeft: 10, // Add some space between the text and the checkbox
    },
});
