import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../assets/Colors';

const ShoppingListItem = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.Item}>
                <Text style={styles.ToDoText}>{props.item.name} - {props.item.amount}g</Text>

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
        borderColor: Colors.TEAL,
        borderRadius: 5,
        marginTop: 8,
        justifyContent: 'center',
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