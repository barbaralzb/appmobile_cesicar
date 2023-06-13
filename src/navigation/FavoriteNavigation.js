import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoriteScreen from '../screens/Favorite';
import PokemonScreen from '../screens/Pokemon';

const Stack = createNativeStackNavigator()

export default function FavoriteNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favorite" component={FavoriteScreen} options={{ title: "Favoritos" }}/>
            <Stack.Screen name="Pokemon" component={PokemonScreen} options={{ title: "", headerTransparent: true }}/>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({});