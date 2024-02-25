import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ToDoItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <TextInput
                    style={styles.textInput}
                    value={message}
                    onChangeText={setMessage}
                    multiline
                />
                <SendIcon onPress={send} />
            </View>
        </View>
    );
}
export default ToDoItem;

const styles = StyleSheet.create({
    attachContainer: {
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        margin: 10,
    },
    mainContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#AFAFAF',
    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,
    },
});