import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import 'react-native-url-polyfill/auto'
import { supabase } from './supabase/supabase'
import Auth from './src/components/Auth'
import Account from './src/components/Accounts'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

function App(): React.JSX.Element {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (

    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}

      {/*       <NavigationContainer>

        <Tabs />
      </NavigationContainer> */}
    </View>


  );
}


export default App;
