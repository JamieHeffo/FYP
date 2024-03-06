import React from 'react';
import { View, Text, Button, Alert, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
//import { supabase } from '../supabase/supabase';


const Chat = ({ navigation }) => {

    const handleLogout = async () => {
        // Navigate to the login screen or any other appropriate screen after logout
        await supabase.auth.signOut();
    };
    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.scrollView}>
                {/*<Text style={styles.heading}>Ask The Chef</Text>*/}
                <TouchableOpacity onPress={handleLogout}>
                    <Text>Log Out</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>


    );
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        //backgroundColor: '#F887A8'
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

export default Chat;