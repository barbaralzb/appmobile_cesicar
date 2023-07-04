import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import FavoriteScreen from '../../screens/Favorite';
import PokemonScreen from '../../screens/Pokemon';
import HomeScreen from '../../screens/Home/HomeScreen';
import MapDepartScreen from '../../screens/Publier/MapDepartScreen';
import TrajetsRecherchesScreen from '../../screens/Home/TrajetsRecherchesScreen';
 
const Stack = createNativeStackNavigator()

export default function SearchNavigation() {
    const { t } = useTranslation()
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="TrajetsRecherchesScreen" component={TrajetsRecherchesScreen} options={{ title: "", headerTransparent: true }} />
            <Stack.Screen name="MapDepartScreen" component={MapDepartScreen} options={{ title: `${t("VOUS_ALLEZ_OU")}`, headerTransparent: true }} />
            <Stack.Screen name="Favorite" component={FavoriteScreen} options={{ title: "Favoritos" }}/>
            <Stack.Screen name="Pokemon" component={PokemonScreen} options={{ title: "", headerTransparent: true }}/>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({});