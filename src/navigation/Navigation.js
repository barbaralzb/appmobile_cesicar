import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from '@expo/vector-icons/AntDesign'
import { useTranslation } from 'react-i18next';


import FavoriteNavigation from "./FavoriteNavigation";
import UnderConstructionScreen from "../screens/UnderConstruction";
import AccountNavigation from "./AccountNavigation";
import PokedexNavigation from "./PokedexNavigation";

const Tab = createBottomTabNavigator();

export default function Navigation() {
    const { t } = useTranslation();
    
    return (
        <Tab.Navigator
            initialRouteName="Pokedex"
            screenOptions={{
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen 
                name="Favorite"
                component={FavoriteNavigation}
                options={{
                    headerShown: false,
                    tabBarLabel: t('Favoritos'),
                    tabBarIcon: ({ color, size }) => 
                        <Icon name="search1" color={color} size={16} />,
                }}
            />
            <Tab.Screen
                name="Pokedex"
                component={PokedexNavigation}
                options={{
                    headerShown: false,
                    tabBarLabel: "Pokedex",
                    tabBarIcon: ({ color, size }) => 
                        <Icon name="closecircleo" color={color} size={16} />,
                }}
            />
            <Tab.Screen 
                name="Account"
                component={AccountNavigation}
                options={{
                    headerShown: false,
                    tabBarLabel: t('Account'),
                    tabBarIcon: ({ color, size }) => 
                        <Icon name="car" color={color} size={16} />,
                }}
            />
            <Tab.Screen 
                name="Notifis"
                component={UnderConstructionScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: t('NOTIFS'),
                    tabBarIcon: ({ color, size }) => 
                        <Icon name="bells" color={color} size={16} />,
                }}
            />
            <Tab.Screen 
                name="Profile"
                component={UnderConstructionScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: t('PROFILE'),
                    tabBarIcon: ({ color, size }) => 
                        <Icon name="user" color={color} size={16} />,
                }}
            />
        </Tab.Navigator>
    );
}