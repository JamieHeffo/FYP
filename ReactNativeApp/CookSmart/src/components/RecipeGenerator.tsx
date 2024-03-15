import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../assets/Colors';

// RecipeGenerator: Displays recipe details in a modal
const RecipeGenerator = ({ visible, onClose, onSave, recipeData }) => {
    let title = '';
    let ingredients = [];
    let instructions = [];
    let notes = [];

    if (recipeData) {
        const data = JSON.parse(recipeData);

        if (data && data.users && data.users.length > 0) {
            const recipe = data.users[0].recipes[0];
            title = recipe.title;
            ingredients = recipe.ingredients;
            instructions = recipe.instructions;
            notes = recipe.notes; // Add notes from the recipe data
        }
    }

    return (
        <Modal style={styles.modal} transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalView}>
                <ScrollView>
                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.heading}>Ingredients:</Text>
                    {ingredients.map((ingredient, index) => (
                        <Text style={styles.text} key={index}>{`${ingredient.amount} of ${ingredient.name}`}</Text>
                    ))}

                    <Text style={styles.heading}>Instructions:</Text>
                    {instructions.map((instruction, index) => (
                        <Text style={styles.text} key={index}>{`${instruction.stepnumber}. ${instruction.description}`}</Text>
                    ))}

                    <Text style={styles.heading}>Notes:</Text>
                    {notes.map((note, index) => (
                        <Text style={styles.text} key={index}>{note.note}</Text>
                    ))}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                        <Text style={styles.buttonText}>Save to Database</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dismissButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Dismiss</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        height: '86%',
        borderRadius: 20,
        backgroundColor: Colors.BEIGE,
    },
    modalView: {
        marginTop: 'auto',
        backgroundColor: "white",
        height: '86%',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    scrollViewContent: {
        padding: 20
    },
    title: {
        fontSize: 30,
        color: Colors.TEAL,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    heading: {
        fontSize: 20,
        color: Colors.TEAL,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#808080',
        marginBottom: 10,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: Colors.TEAL,
        borderRadius: 25,
        padding: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10, // Margin between buttons
    },
    dismissButton: {
        backgroundColor: '#808080',
        borderRadius: 25,
        padding: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 20,
    },
});

export default RecipeGenerator;
