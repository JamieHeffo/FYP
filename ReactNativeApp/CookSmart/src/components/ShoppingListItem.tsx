import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../assets/Colors';
import CheckBox from '@react-native-community/checkbox';

const ShoppingListItem = (props) => {
    const [isSelected, setSelection] = useState(false);

    return (
        <View style={styles.mainView}>
            <View style={styles.item}>
                <CheckBox style={styles.checkbox}
                    value={isSelected}
                    onValueChange={setSelection}
                    tintColors={{ true: Colors.TEAL, false: Colors.GREY }}
                />
                <Text style={styles.itemText}>{props.item.ingredient.name} - {props.item.amount}g</Text>
            </View>
        </View >
    );
};

export default ShoppingListItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row', // Place checkbox and text side-by-side
        alignItems: 'center', // Vertically center the items in the container
        width: '100%',
        height: 60,
        borderWidth: 1,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.TEAL_DARK,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'flex-start', // Align children to the start of the container
        padding: '5%',
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        elevation: 3
    },

    mainView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 5
    },

    itemText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.TEAL,
        marginLeft: 10, // Space between checkbox and text
    },

    checkbox: {
        alignSelf: 'center',
        paddingHorizontal: 30,
        //height: '80%',
        //width: '80%',
    }
});
