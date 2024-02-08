import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ToDoItem = (props) => {
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
export default ToDoItem;

const styles = StyleSheet.create({
    Item: {
        width: '100%',
        height: 80,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#F887A8',
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