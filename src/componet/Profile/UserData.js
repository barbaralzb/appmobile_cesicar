import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, FlatList } from "react-native";
import useAuth from "../../hooks/useAuth";
import { getPokemonsFavoriteApi } from '../../api/favorite'
import { useFocusEffect } from "@react-navigation/native";
import AppStyles from "../../config/styles";
import TextComponent from "../../componets/TextComponent";
const colors = AppStyles.PaletteColors;
import Avatar from '../../assets/svg/Avatar-H.svg'
import Icon from 'react-native-vector-icons/Feather'
import { useTranslation } from "react-i18next";


const UserData = () => {
    const { t } = useTranslation();
    
    const { user, signOut } = useAuth();
    const [ total, setTotal ] = useState(0);

    // console.log('user', user.data)

    const DATA = [
        {
            id: 'SETTINGS',
            title: t('PARAMETRES'),
            icon: "settings"
        },
        {
            id: 'FAQ',
            title: t('FAQ'),
            icon: "help-circle"
        },
        {
            id: 'TERMS',
            title: t('TERMS'),
            icon: "edit-3"
        },
        {
            id: 'ABOUT',
            title: t('A_PROPOS'),
            icon: "info"
        },
        {
            id: 'SUPPORT',
            title: t('SUPPORT'),
            icon: 'headphones'
        },
        {
            id: 'SE_DECONNECTER',
            title: t('SE_DECONNECTER'),
            icon: "log-out",
            action: signOut
        },
    ];

    // aqui simulo que una simulacion en tiempo real pero es una peticion que va rapido
    // useFocusEffect permite realizar acciones especificas en un componente cuando este esta visible. Esto es importante yq aue puedo tener multiples pantalals o componentes que se muestran.
    // Entonces este es importante para detectar cuando el componente esta visible s ejecutará lo que esta dentro (obtener el enfoque)
    // La diferencia con el useEffect es que este no habra un ejecucion inicial, o se actulizara sin tener el enfoque
    useFocusEffect(
        // hacer un useCallback  no permite que se memorize y no se vuelva a crear en cada renderizado
        // hay mas pero hasta aca quedo claro
        useCallback(() => {
            (async () => {
                try {
                    const response = await getPokemonsFavoriteApi()
                    setTotal(response?.length || 0)
                } catch (error) {
                    setTotal(0)
                }
            })()
        }, [])
    )
    return (
        <View style={styles.content}>
            <FlatList
                data={DATA}
                renderItem={({item}) => <ItemMenu item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatlist}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={headerFlatlist}
                ItemSeparatorComponent={()=><View style={styles.separator} />}
                ListHeaderComponentStyle={styles.headerFlatlist}
            />
        </View>
    );
}
const headerFlatlist = () => (
    <TouchableOpacity style={[styles.userSection, styles.borderRadius ]} onPress={()=> {}}>
            <View style={styles.drop} />
            <View style={styles.avatar}>
                <Avatar />
            </View>
            <View style={styles.textUserSection}>
                <TextComponent text={'hello'} size={20} weight={500} />
                <TextComponent text={'hello'} />
            </View>
            <Icon name={"chevron-right"} style={styles.icon} size={16} />
    </TouchableOpacity>
)

const ItemMenu = ({item}) => {
    const { title, icon, action } = item;
    return (
        <TouchableOpacity style={styles.userSection} onPress={action}>
            <View style={styles.wrapper}>
                <View style={styles.boxIcon}>
                    <Icon name={icon} size={20} />
                </View>
            </View>
            <View style={styles.textUserSection}>
                <TextComponent text={title} />
            </View>
            <Icon name={"chevron-right"} style={styles.icon} size={16} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    content: {
        flex:1,
    },
    shadow: {
        shadowColor: colors.lightGrey,
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        elevation: 2,
    },
    userSection: {
        height: 100,
        backgroundColor: 'white',
        position: 'relative',
        flexDirection: "row",
        borderBottomColor: colors.BackGroundPage,
        borderBottomWidth: 1,
    },
    drop:{
        height: '100%',
        flex:.3,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 12,
    },
    avatar : {
        flex: 1.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textUserSection:{
        flex: 3,
        justifyContent: 'center'
    },
    icon:{
        flex: .7,
        alignSelf: 'center',
    },
    boxIcon:{
        backgroundColor: colors.lightIndigo,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
    },
    flatlist: {
        margin: 30,
        borderRadius: 12,
    },
    separator:{
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1
    },
    wrapper:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerFlatlist:{
        marginBottom: 20
    },
    borderRadius:{
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    }

});

export default UserData;