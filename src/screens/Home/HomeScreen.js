import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import TextComponent from "../../componets/TextComponent";
import { useTranslation } from 'react-i18next';
import AppStyles from "../../config/styles"
import ChercherTrajet from '../../componets/Cards/ChercherTrajet';
const colors = AppStyles.PaletteColors;



const HomeScreen = (props) => {
    const { navigation } = props
    const { t } = useTranslation()
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                    <View style={styles.hero}>
                        <TextComponent text={t('CHOISISSEZ_LE_TRAJET')} size={30} weight={700} />
                        <TextComponent text={t('CHOISISSEZ_LE_TRAJET')} size={20} weight={500} />
                    </View>
                    <ChercherTrajet navigation={navigation} />
                    <View style={styles.footer}>
                        <TextComponent text={''} size={20} weight={500} />
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.lightGrey,
        padding: 20
    }, 
    hero : {
        height: 150,
        justifyContent: 'center',
        alignItems:'center'
    },
    body : {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'red',
        borderRadius: 12,
        padding: 20,
        backgroundColor: colors.white,

    },
    shadow: {
        shadowColor: colors.lightGrey,
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        elevation: 2,
    },
    footer:{
        flex:1
    }

});
export default HomeScreen;