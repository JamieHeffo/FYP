import React from 'react';
import { View, Text, Button, Alert, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

const PhotoRecipe = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.scrollView}>
                <Text style={styles.heading}>Generate Recipe</Text>
            </View>

        </SafeAreaView>


    );
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#F887A8'
    },

    scrollView: {
        flex: 1,
        backgroundColor: '#847DA4',
        padding: '5%',
    },

    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F887A8',
        marginTop: '5%',
        marginBottom: '5%'
    },
});

export default PhotoRecipe;