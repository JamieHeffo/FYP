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
                <Text style={styles.itemText}>{props.item.ingredient.name}</Text>
                <Text style={styles.amountText}>{props.item.amount}g</Text>
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
        paddingBottom: '1%'
    },

    itemText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.TEAL,
        flex: 3,
        // marginLeft: '2%', // Space between checkbox and text
    },

    amountText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.TEAL,
        flex: 1, // Adjust this value as needed for the amount
        //textAlign: 'justify', // Align text to the right
        paddingRight: '20%'
    },

    checkbox: {
        //alignSelf: 'center',
        paddingHorizontal: 30,
        //paddingLeft: '15%',
        transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
        //height: '80%',
        //width: '80%',
    }
});
