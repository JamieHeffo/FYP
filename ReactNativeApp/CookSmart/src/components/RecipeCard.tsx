import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Colors } from '../assets/Colors';

const RecipeCard = ({ item, onPress }) => {
    const [isSelected, setSelection] = useState(false);

    return (
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
                <View>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.detailText}>Calories: {item.calories}</Text>
                    <Text style={styles.detailText}>Time: {item.time}</Text>
                    <Text style={styles.detailText}>Servings: {item.servings}</Text>
                </View>
            </TouchableOpacity>
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
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
