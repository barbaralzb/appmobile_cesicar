import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectionScreen from '../../screens/Auth/ConnectionScreen';
import InscriptionScreen from '../../screens/Auth/InscriptionScreen';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator()

export default function AuthNavigation() {
    return (
        <Stack.Navigator initialRouteName='Connection' screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#fff"} }}>
            <Stack.Screen name="Connection" component={ConnectionScreen} />
            <Stack.Screen name="Inscription" component={InscriptionScreen} />
        </Stack.Navigator>
    );
};