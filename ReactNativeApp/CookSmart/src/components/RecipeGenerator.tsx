
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../assets/Colors';

const RecipeGenerator = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Your recipe will be generated here...</Text>
                <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
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
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonClose: {
        backgroundColor: Colors.TEAL,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default RecipeGenerator;
