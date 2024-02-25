import { Colors } from '../assets/Colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipeCard = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.Item}>
                <Text style={styles.ToDoText}>{props.item.title}</Text>
                <Text style={styles.ToDoText}>Calories : {props.item.calories}</Text>
                <Text style={styles.ToDoText}>Time : 40 Minutes</Text>
            </View>
        </View>
    )
}
export default RecipeCard;

const styles = StyleSheet.create({
    Item: {
        width: '100%',
        height: 80,
        borderWidth: 1,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.TEAL_DARK,
        borderRadius: 5,
        marginTop: '3%',
        justifyContent: 'center',
        //Shadow Style
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.5,
        elevation: 5
    },

    mainView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    ToDoText: {
        marginLeft: '10%',
    },

})