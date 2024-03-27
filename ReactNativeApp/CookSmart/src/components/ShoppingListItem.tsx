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
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        minHeight: 60, // Use minHeight for dynamic height adjustment
        borderWidth: 1,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.TEAL_DARK,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'flex-start',
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
        fontSize: 18,
        color: Colors.TEAL,
        flex: 2.5, // Increase flex to give more room for the text
    },
    amountText: {
        fontWeight: 'bold',
        fontSize: 18, // Adjust font size to maintain consistency
        color: Colors.TEAL,
        flex: 1,
        paddingRight: '5%', // Adjust padding to ensure it fits
    },
    checkbox: {
        paddingHorizontal: 30,
        transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    }
});

