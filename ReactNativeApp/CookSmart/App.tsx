import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';

function App(): React.JSX.Element {

  return (

    <NavigationContainer>
      <Tabs />
    </NavigationContainer>


  );
}


export default App;
