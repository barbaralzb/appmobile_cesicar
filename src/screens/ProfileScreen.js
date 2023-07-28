import React, { useEffect } from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import UserData from '../componet/Profile/UserData';
import useAuth from '../hooks/useAuth';
import ButtonComponent from '../componets/Onpress/ButtonComponent';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen(props) {
    const {
        navigation
    } = props
    const { t } = useTranslation();
    const { isConnected } = useAuth()

    return (
        <SafeAreaView style={styles.container}>
            {isConnected ?
                <UserData navigation ={navigation} /> 
                :
                <View  style={styles.buttons}>
                    <ButtonComponent title={t('CONNECTEZ_VOUS')} mb={30} onPress={()=> navigation.navigate("Auth", { screen: 'Connection' }) }  />
                    <ButtonComponent title={t('SINCRIRE')} onPress={()=> navigation.navigate("Auth", { screen: 'Inscription' }) } />
                </View>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    buttons:{
        justifyContent: 'center',
        alignItems: 'center'
    }
});