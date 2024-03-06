import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import 'react-native-url-polyfill/auto';
import { supabase } from './supabase/supabase';
import Auth from './src/components/Auth';
import { View, StyleSheet, TextInput } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { Colors } from './src/assets/Colors';

function App(): React.JSX.Element {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleLogin = () => {
    setSession(supabase.auth.session());
  };

  return (
    <View style={styles.mainView}>
      {/* Check if user session exists */}
      {session && session.user ? (
        // If session exists, render the Tabs screen
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      ) : (
        // If session doesn't exist, render the authentication component
        <Auth onLogin={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.TEAL_LIGHT,
  },
  inputBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Add more styles for other elements as needed
});

export default App;
