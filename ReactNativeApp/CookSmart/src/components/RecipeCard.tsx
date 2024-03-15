import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../assets/Colors'; // Assuming Colors are defined in a separate file

const RecipeCard = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.item}>
                <Text style={styles.titleText}>{props.item.title}</Text>
                <Text style={styles.detailText}>Calories: {props.item.calories}</Text>
                <Text style={styles.detailText}>Time: 40 Minutes</Text>
            </View>
        </View>
    );
};

export default RecipeCard;

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        alignItems: 'center',
        marginTop: '3%',
    },
    item: {
        width: '100%',
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
        padding: 10, // Added padding for internal spacing
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.TEAL, // Assuming you have a TEAL color in your Colors object
        marginBottom: 5, // Space between title and details
    },
    detailText: {
        fontSize: 16,
        color: '#808080', // Lighter grey for detail text
    },
});
