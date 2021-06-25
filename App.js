import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Poke} from './Components/Pokemon';
import {PokesDetlhes} from './Components/CenaDetalhes';

const Stack = createStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Pokedex" component={Poke} />
        <Stack.Screen name="Detalhes" component={PokesDetlhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
