import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const PhotoToRecipe = ({ navigation }) => {

    return (
        <View>
            <Text>My Shopping List</Text>
            <Button title="Click Me" onPress={handleButtonClick} />
        </View>
    );

};

const handleButtonClick = () => {
    Alert.alert('Button Clicked');
};

export default PhotoToRecipe;
