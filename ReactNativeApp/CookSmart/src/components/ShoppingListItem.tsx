import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../assets/Colors';

const ShoppingListItem = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.Item}>
                <Text style={styles.ToDoText}>{props.item.ingredient.name} - {props.item.amount}g</Text>

            </View>
        </View>
    )
}
export default ShoppingListItem;

const styles = StyleSheet.create({
    Item: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: Colors.TEAL_MID,
        borderRadius: 5,
        marginTop: '3 %',
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