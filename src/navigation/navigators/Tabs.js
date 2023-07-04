import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from '@expo/vector-icons/Feather'
import { useTranslation } from 'react-i18next';
import SearchNavigation from "./SearchNavigation";
import UnderConstructionScreen from "../../screens/UnderConstruction";
import ProfileNavigation from "./ProfileNavigation";
import PokedexNavigation from "./PokedexNavigation";
import AppStyles from "../../config/styles";
const colors = AppStyles.PaletteColors;


const Tab = createBottomTabNavigator();

export default function Tabs(){
    const { t } = useTranslation();
    
    return (
        <Tab.Navigator
            initialRouteName="SearchNavigation"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarLabelStyle:{
                    fontSize: 12,
                    marginTop: -15,
                    marginBottom: 5,
                },
                tabBarActiveTintColor: colors.indigo,
                tabBarInactiveTintColor: 'grey',
                tabBarStyle:{
                    height: 100,
                    borderTopColor: 'transparent',
                    shadowColor: `${colors.grey}40` ,
                    shadowOffset: {
                        width: -10,
                        height: -10
                    },
                    shadowOpacity: 0.7,
                    shadowRadius: 20,
                    elevation: 10, 
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }
            }}

        >
            <Tab.Screen 
                name="SearchNavigation"
                component={SearchNavigation}
                options={{
                    headerShown: false,
                    tabBarLabel: t('RECHERCHER'),
                    tabBarIcon: ({ color, size }) => 
                        <Icon name="search" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="PokedexNavigation"
                component={PokedexNavigation}
                options={{
                    headerShown: false,
                    tabBarLabel: t("PUBLIER"),
                    tabBarIcon: ({ color, size }) => 
                        <Icon name="plus-circle" color={color} size={size} />,
                }}
            />
            <Tab.Screen 
                name="TrajetsNavigation"
                component={UnderConstructionScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: t('TRAJETS'),
                    tabBarIcon: ({ color, size }) => 
                        <Icon name="git-branch" color={color} size={size} />,
                }}
            />
            <Tab.Screen 
                name="NotificationNavigation"
                component={UnderConstructionScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: t('NOTIFS'),
                    tabBarIcon: ({ color, size }) => 
                        <Icon name="message-circle" color={color} size={size} />,
                }}
            />
            <Tab.Screen 
                name="ProfileNavigation"
                component={ProfileNavigation}
                options={{
                    headerShown: false,
                    tabBarLabel: t('PROFILE'),
                    tabBarIcon: ({ color, size }) => 
                        <Icon name="user" color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
}