import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import Configstyle from "../../config/styles";
const colors = Configstyle.PaletteColors;
import TextComponent from '../../componets/TextComponent'


const FavItem = ({setDestination}) => {
    const DEST_FAV = "Cauchoise"
    return (
        <TouchableOpacity style={styles.containerFav} onPress={()=> setDestination(DEST_FAV)}>
                <View style={styles.row}>
                    <View style={styles.iconBox}>
                        <Icon name="star" size={20} />
                    </View>
                    <TextComponent text={DEST_FAV} />
                </View>
                <TouchableOpacity>
                    <Icon name="more-vertical" size={20} />
                </TouchableOpacity>
        </TouchableOpacity>
    )
}

const MapDepartScreen = (props) => {
    const { params, navigation } = props

    const [ destination, setDestination ] = useState("")

    useEffect(() => {
        navigation.setOptions({
        headerLeft: () => (
            <Icon
                name="arrow-left"
                color={colors.primary}
                size={20}
                style={{ marginLeft: 20 }}
                onPress={navigation.goBack}
            />
        ),
        });
    }, [navigation, params]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    value={destination}
                />
                <FavItem  setDestination={setDestination} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center'
    },
    card:{
        backgroundColor: colors.white,
        width: "90%",
        padding: 20,
        gap: 20,
        borderRadius: 10
    },
    input: {
        padding: 10,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.grey
    },
    iconBox:{
        height: 40,
        width: 40,
        backgroundColor: colors.lightIndigo,
        borderRadius : 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    },
    containerFav:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
export default MapDepartScreen;