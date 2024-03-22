import React, { useState } from 'react';
import axios from 'axios';
import { Colors } from '../src/assets/Colors';
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { View, Text, Button, Alert, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ScrollView, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import RecipeGenerator from '../src/components/RecipeGenerator';
import { useFocusEffect } from '@react-navigation/native';

const PhotoRecipe = ({ navigation }) => {

    //Camera permission variables
    const cameraPermission = Camera.getCameraPermissionStatus()
    const microphonePermission = Camera.getMicrophonePermissionStatus()
    const cameraRef = React.useRef(null);

    // State variables to manage the camera and modal
    const [buttonLabel, setButtonLabel] = useState('Capture');
    const [isModalVisible, setModalVisible] = useState(false);
    const [cameraVisible, setCameraVisible] = useState(true);
    const [inputValue, setInputValue] = useState('');

    //State variables to manage the recipe data
    const [detectedObjects, setDetectedObjects] = useState([]);
    const [recipeData, setRecipeData] = useState(null);

    // List of Recipe Styles
    const recipeStyles = ['Italian', 'Mexican', 'Chinese', 'Indian', 'American', 'Japanese', 'Korean', 'Thai', 'French', 'African', 'Irish'];
    const [currentStyleIndex, setCurrentStyleIndex] = useState(0); // Index of the currently selected style

    // Declare camera devices
    const device = useCameraDevice('back', {
        physicalDevices: ['wide-angle-camera']
    })

    // Useeffect hook to bring the camera back on page reset
    useFocusEffect(
        React.useCallback(() => {
            setCameraVisible(true); // Show camera
            setButtonLabel('Capture'); // Reset button label
            setDetectedObjects([]); // Clear detected objects
            setCurrentStyleIndex(0); // Reset recipe style index
            setRecipeData(null); // Clear recipe data
            return () => { };
        }, [])
    );
    // Handlder to open the modal view on generate recipe
    const handleButtonPress = () => {

        if (buttonLabel === 'Capture') {
            takePhoto();
        } else {
            // Open the modal when button label is 'Generate Recipe'
            setModalVisible(true);

            // Create a single string with the recipe style and ingredients
            const recipeStyle = `${recipeStyles[currentStyleIndex]}`;
            const ingredients = `${detectedObjects.map(item => item.label).join(', ')}`;

            const prompt = `Generate a ${recipeStyle} style recipe with the following ingredients : ${ingredients}`;

            //Call the GPT API to generate a recipe

            console.log(prompt);
            generateRecipe(prompt);
        }
    };

    // Handler to manually add items to detection list
    const handleAddItem = () => {
        if (inputValue.trim() !== '') {
            const newItem = {
                key: String(detectedObjects.length),
                label: inputValue
            };
            setDetectedObjects([...detectedObjects, newItem]);
            setInputValue(''); // Clear the input after adding
        } else {
            Alert.alert("Error", "Please enter an ingredient.");
        }
    };


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

                const formData = new FormData();
                formData.append('file', {
                    uri: photoUri,
                    name: 'photo.jpg',
                    type: 'image/jpeg'
                });

                const response = await axios.post('https://detect.roboflow.com/vegetables-xfglo/1', formData, {
                    params: {
                        //api_key: process.env.REACT_APP_ROBOFLOW_API_KEY
                        api_key: 'pVgrgJI8kfW40jASdT4Y'
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

                // Change button label if objects are detected
                if (detectedList.length > 0) {
                    setButtonLabel('Generate Recipe');
                    setCameraVisible(false);
                }

            } catch (error) {
                // Log or handle the error if photo capture fails
                console.error(error);
                Alert.alert("Camera Error", "Could not take photo.");
            }
        }
    };

    // Function to generate a recipe using the OpenAI API
    const generateRecipe = async (prompt) => {

        // Example JSON object to send to the API
        const jsonObject = {
            users: [
                {
                    userid: "unique_user_id",
                    username: "user_name",
                    recipes: [
                        {
                            recipeid: "unique_recipe_id",
                            title: "recipe_title",
                            time: "time_to_cook", // Text Field Stored in Minutes formatted HH:MM
                            servings: "number_of_servings",// Float
                            calories: "calorie_count",
                            onshoppinglist: "FALSE",
                            ingredients: [
                                {
                                    ingredientid: "unique_ingredient_id",
                                    name: "ingredient_name", // The ingredient name should be a whole ingredient. ie 'Onion', 'Tomato', 'Pasta' not 'Sliced Onion'
                                    amount: "amount_used" // Must be INTEGER, Stored in GRAMS
                                }
                            ],
                            notes: [
                                {
                                    noteid: "unique_note_id",
                                    note: "note_content"
                                }
                            ],
                            instructions: [
                                {
                                    instructionid: "unique_instruction_id",
                                    stepnumber: "step_number",
                                    description: "instruction_description"
                                }
                            ]
                        }
                    ]
                }
            ],
            ingredients: [
                {
                    ingredientid: "unique_ingredient_id",
                    name: "ingredient_name"
                }
            ]
        };
        const jsonString = JSON.stringify(jsonObject, null, 2);

        try {
            const data = {
                model: "gpt-3.5-turbo-0125",
                response_format: { "type": "json_object" },
                messages: [
                    { role: "system", content: "You are a world class Chef who specialises in teaching people who are new to cooking how to cook simple meals" },
                    { role: "system", content: "You can assume that they have access to basic pantry items" },
                    { role: "system", content: "Every ingredient amount in the recipe is stored in grams, so the amounts must be an integer" },
                    { role: "system", content: `You only respond in JSON objects. This is an example of a JSON object: ${jsonString}` },
                    { role: "user", content: prompt }
                ]
            };

            const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
                headers: {
                    //'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                    'Authorization': ``,
                    'Content-Type': 'application/json'
                }
            });

            const messageText = response.data.choices[0].message.content;
            console.log('OpenAI response message:', messageText);
            // Store the response in the state
            setRecipeData(messageText);
        } catch (error) {
            console.error('OpenAI API error:', error);
            Alert.alert("API Error", "Failed to generate recipe.");
        }
    };

    return (
        <SafeAreaView style={styles.whole}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            //keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >

                <RecipeGenerator
                    visible={isModalVisible}
                    recipeData={recipeData}
                    onClose={() =>
                        setModalVisible(false)}>
                </RecipeGenerator>

                <Text style={styles.heading}>Generate Recipe</Text>
                {cameraVisible ? (
                    <View style={styles.cameraContainer}>
                        <Camera style={styles.camera}
                            ref={cameraRef}
                            device={device}
                            isActive={true}
                            photo={true}
                        />
                    </View>

                ) : ( //Rendered after the photo is taken and the camera disappears
                    <View>
                    </View>
                )}

                {/* ONLY RENDERED ONCE PHOTO IS TAKEN AND INGREDIENTS ARE DETECTED
                    CAMERA DISSAPEARS AND FURTHER PROMPTS OPEN                   */}
                {!cameraVisible && (
                    <>
                        {/* Recipe Style Selector */}
                        <View style={styles.listContainer}>
                            <Text style={styles.titleText}>Recipe Style</Text>

                            <View style={styles.recipeStyleContainer}>
                                <Button
                                    title="<"
                                    onPress={() => setCurrentStyleIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : recipeStyles.length - 1))}
                                />
                                <Text style={styles.recipeStyleText}>
                                    {recipeStyles[currentStyleIndex]}
                                </Text>
                                <Button
                                    title=">"
                                    onPress={() => setCurrentStyleIndex(prevIndex => (prevIndex + 1) % recipeStyles.length)}
                                />
                            </View>

                            {/* List of detected objects */}
                            <Text style={styles.titleText}>Ingredients Detected</Text>
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

                        <View style={styles.addContainer}>
                            <TextInput
                                style={styles.listText}
                                placeholder="Add an ingredient"
                                value={inputValue}
                                onChangeText={text => setInputValue(text)}
                            />
                            <Button
                                style={styles.listText}
                                title="+"
                                onPress={handleAddItem}
                            />
                        </View>

                    </>
                )}
            </KeyboardAvoidingView>
            <View>
                {/* Shutter Button */}
                < TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text style={styles.buttonText}>{buttonLabel}</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    whole: {
        backgroundColor: Colors.TEAL_LIGHT,
        flex: 1,

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
        flex: 1,
    }
    ,
    camera: {
        flex: 1,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 20,
    },

    listContainer: {
        flex: 1,
        height: '20%',
        marginHorizontal: '5%',
        justifyContent: 'center',
    },

    ingredients: {
        width: '100%',
        height: 50,
        marginBottom: '2%',
        borderWidth: 1,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.TEAL_DARK,
        borderRadius: 5,
        marginTop: '1%',
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

    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.TEAL,
        //marginHorizontal: '5%',
    },

    listText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.TEAL,
        alignSelf: 'center',
    },

    button: {
        marginTop: '2%',
        marginBottom: '30%',
        width: '90%',
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.TEAL,
        alignItems: 'center',// aligns the button text in the centre
        justifyContent: 'center',// aligns the button text in the centre vertically
        marginHorizontal: '5%',//aligns the button in the centre
        //Shadow Style
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5

    },

    buttonText: {
        color: Colors.WHITE,
        fontSize: 20,
    },


    recipeStyleContainer: {
        flexDirection: 'row',
        alignItems: 'center',// Centres Text vertically
        justifyContent: 'center', // Centres text horizontally
        //marginHorizontal: '5%',
        backgroundColor: Colors.WHITE,
        width: '35%',
        marginBottom: '5%',
        borderRadius: 10,
        borderColor: Colors.TEAL_DARK,
        borderWidth: 1,
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

    addContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '5%',
        paddingHorizontal: '5%',
        backgroundColor: '#FFF',
        marginBottom: '5%',
        borderRadius: 10,
        borderColor: Colors.TEAL_DARK,
        borderWidth: 1,
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

    recipeContainerOverlay: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PhotoRecipe;