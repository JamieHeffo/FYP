import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState } from 'react-native'
import { supabase } from '../../supabase/supabase'
import { Colors } from '../assets/Colors'
import { Button, Input } from 'react-native-elements'
import { TextInput, Image } from 'react-native'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function Auth(onLogin) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/roboChef.png')}
                style={{ width: 200, height: 200, alignSelf: 'center' }}
            />
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <TextInput style={styles.inputBox}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput style={styles.inputBox}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button style={styles.buttons}
                    title="Sign in"
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Button style={styles.buttons}
                    title="Sign up"
                    titleStyle={{ color: Colors.TEAL_LIGHT }}
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '50%',
        padding: '5%',
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    inputBox: {
        backgroundColor: '#FFFFFF',
        height: 44,
        marginHorizontal: 16,
        paddingLeft: '5%',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttons: {
        marginBottom: '2%',
        width: '90%',
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.TEAL,
        alignItems: 'center',
        marginHorizontal: '5%',//aligns the button in the centre
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})