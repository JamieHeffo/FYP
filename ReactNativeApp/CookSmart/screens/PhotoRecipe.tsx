import React, { useState } from 'react';
import axios from 'axios';
import { Colors } from '../src/assets/Colors';
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { View, Text, Button, Alert, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import RNFS from 'react-native-fs';

const PhotoRecipe = ({ navigation }) => {

    const cameraPermission = Camera.getCameraPermissionStatus()
    const microphonePermission = Camera.getMicrophonePermissionStatus()
    const [detectedObjects, setDetectedObjects] = useState([]);
    const cameraRef = React.useRef(null);

    const device = useCameraDevice('back', {
        physicalDevices: ['wide-angle-camera']
    })


    //if (device == null) return <NoCameraDeviceError />

    // Function to take a photo using the camera component
    const takePhoto = async () => {

        if (cameraRef.current) {
            try {
                // Capture the photo with specified settings
                const photo = await cameraRef.current.takePhoto({
                    qualityPrioritization: 'speed',
                    flash: 'off',
                    enableShutterSound: false
                });

                // Print details to log to check if its working
                //console.log('Photo taken:', photo);

                // Use the URI of the captured photo
                const photoUri = photo.path || photo.uri;

                // Use react-native-fs to read the file
                //const imageData = await RNFS.readFile(photo.path, 'base64').then(base64data => {
                //    return `data:image/jpeg;base64,${base64data}`;
                //});

                //console.log('Image data:', imageData);

                const formData = new FormData();
                formData.append('file', {
                    uri: photoUri,
                    name: 'photo.jpg',
                    type: 'image/jpeg'
                });

                const response = await axios.post('https://detect.roboflow.com/vegetables-xfglo/1', formData, {
                    params: {
                        api_key: "pVgrgJI8kfW40jASdT4Y"
                    },
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                console.log('Roboflow response:', response.data);

                // Aggregate detections by class and count them
                const counts = response.data.predictions.reduce((acc, { class: className }) => {
                    acc[className] = (acc[className] || 0) + 1;
                    return acc;
                }, {});

                const detectedList = Object.keys(counts).map((key, index) => ({
                    key: String(index),
                    //Format the label to show the count and class
                    label: `${counts[key]} ${key}`,
                }));

                // Set the detected objects in state
                setDetectedObjects(detectedList);


            } catch (error) {
                // Log or handle the error if photo capture fails
                console.error(error);
                Alert.alert("Error", "Failed to take photo.");
            }
        }
    };

    return (
        <SafeAreaView style={styles.whole}>
            <Text style={styles.heading}>Generate Recipe</Text>

            <View style={styles.cameraContainer}>
                <Camera style={styles.camera}
                    ref={cameraRef}
                    device={device}
                    isActive={true}
                    photo={true}
                />
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={detectedObjects}
                    renderItem={({ item }) => (
                        <View style={styles.ingredients}>
                            <Text style={styles.listText}>{item.label}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.key}
                />
            </View>
            <View>
                {/* Shutter Button */}
                < TouchableOpacity style={styles.button} onPress={() => takePhoto()}>
                    <Text style={styles.buttonText}>Capture</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    whole: {
        backgroundColor: Colors.TEAL_LIGHT,
        //marginHorizontal: '5%',

    },

    heading: {
        marginHorizontal: '5%',
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.TEAL,
        marginTop: '5%',
        marginVertical: '5%',
        backgroundColor: Colors.TEAL_LIGHT,
    },
    cameraContainer: {
        //flex: 1,
        height: '50%',
    }
    ,
    camera: {
        backgroundColor: Colors.TEAL_LIGHT,
        //flex: 1,
        height: '100%',
        width: '100%',
        //position: 'absolute',
        //marginHorizontal: '2%',
        overflow: 'hidden',
        borderRadius: 20,
    },

    listContainer: {
        height: '20%',
        marginHorizontal: '5%',
        //alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.TEAL_LIGHT,
    },

    ingredients: {
        width: '100%',
        //alignContent: 'center',
        //height: 50,
        height: '80%',
        marginBottom: 2,
        borderWidth: 1,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.TEAL_DARK,
        borderRadius: 5,
        marginTop: 2,
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

    listText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.TEAL,
        alignSelf: 'center',
    },

    button: {
        //paddingTop: 10,
        //marginTop: '12%',
        marginBottom: '30%',
        //position: 'absolute',
        width: '90%',
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.TEAL,
        alignItems: 'center',// aligns the button text in the centre
        justifyContent: 'center',// aligns the button text in the centre vertically
        marginHorizontal: '5%'//aligns the button in the centre
    },

    buttonText: {
        color: Colors.WHITE,
        fontSize: 20,
    },

});

export default PhotoRecipe;