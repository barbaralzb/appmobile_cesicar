import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth"
import AuthNavigation from "./navigators/AuthNavigation";
import Tabs from "./navigators/Tabs";


const MainStack = createNativeStackNavigator();

export default function Navigation() {
    const { isConnected, user } = useAuth()

    // console.log('isConnected', isConnected)
    console.log('user', user)

    return (
        <MainStack.Navigator 
            initialRouteName="AuthNavigation"
            screenOptions={{ headerShown: false }}
            >
            { !isConnected ? <MainStack.Screen name="AuthNavigation" component={AuthNavigation} /> : <MainStack.Screen name="Tabs" component={Tabs} /> }
        </MainStack.Navigator>
    )
    
}