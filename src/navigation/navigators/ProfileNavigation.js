import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/ProfileScreen';
import LangueParametreScreen from '../../screens/Profile/LangueParametreScreen.js';
import AuthNavigation from './AuthNavigation';
import AppStyles from "../../config/styles";
const colors = AppStyles.PaletteColors;

const Stack = createNativeStackNavigator()

export default function ProfileNavigation() {
    return (
        <Stack.Navigator initialRouteName='Profile' screenOptions={{ contentStyle: { backgroundColor: colors.BackGroundPage } }} >
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Auth" component={AuthNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="LangueParametreScreen" component={LangueParametreScreen} options={{ title: "", headerTransparent: true, presentation: 'formSheet' }} />
        </Stack.Navigator>
    );
};
