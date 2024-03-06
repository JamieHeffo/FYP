import React from 'react';
import { Colors } from '../src/assets/Colors';
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { View, Text, Button, Alert, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

const PhotoRecipe = ({ navigation }) => {

    const cameraPermission = Camera.getCameraPermissionStatus()
    const microphonePermission = Camera.getMicrophonePermissionStatus()
    const cameraRef = React.useRef(null);

    const device = useCameraDevice('back', {
        physicalDevices: ['wide-angle-camera']
    })

    //if (device == null) return <NoCameraDeviceError />

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.scrollView}>
                <Text style={styles.heading}>Generate Recipe</Text>
            </View>

            <Camera
                style={StyleSheet.absoluteFill}
                ref={cameraRef}
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