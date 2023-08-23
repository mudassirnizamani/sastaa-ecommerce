/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AuthStack from './src/core/router/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, PaperProvider, MD2Colors} from 'react-native-paper';
import {AuthContextProvider} from './src/core/contexts/AuthContext';

const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FEDBD0',
    accent: '#442C2E',
    text: MD2Colors.grey600,
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthContextProvider />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
