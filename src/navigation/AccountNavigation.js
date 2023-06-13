import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/Account';

const Stack = createNativeStackNavigator()

export default function AccountNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={AccountScreen} options={{ title: "Account" }}/>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({});