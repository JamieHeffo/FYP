import React from 'react';
import { Colors } from '../src/assets/Colors';
import { Camera } from 'react-native-vision-camera';
import { View, Text, Button, Alert, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

const PhotoRecipe = ({ navigation }) => {

    const cameraPermission = Camera.getCameraPermissionStatus()
    const microphonePermission = Camera.getMicrophonePermissionStatus()

    const device = useCameraDevice('back')

    if (device == null) return <NoCameraDeviceError />

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.scrollView}>
                <Text style={styles.heading}>Generate Recipe</Text>
            </View>

            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
            />

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Colors.TEAL_LIGHT,
    },

    scrollView: {
        flex: 1,
        padding: '5%',
    },

    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.TEAL,
        marginTop: '5%',
        marginBottom: '5%'
    },
});

export default PhotoRecipe;