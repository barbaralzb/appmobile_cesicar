import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokedexScreen from '../../screens/Pokedex';
import PokemonScreen from '../../screens/Pokemon';

const Stack = createNativeStackNavigator()

export default function PokedexNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Pokedex"
                component={PokedexScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Pokemon"
                component={PokemonScreen}
                options={{ title:"",  headerTransparent: true }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({});