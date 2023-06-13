import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import useAuth from "../../hooks/useAuth";
import { getPokemonsFavoriteApi } from '../../api/favorite'
import { useFocusEffect } from "@react-navigation/native";

export default function UserData() {
    const { auth, logout } = useAuth();
    const [ total, setTotal ] = useState(0);

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
        <View style={styles.titleBlock}>
            <Text style={styles.title}>Bienvenido,</Text>
            <Text style={styles.title}>{`${auth.firstName} ${auth.lastName}`}</Text>
        </View>

        <View style={styles.dataContent}>
            <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`} />
            <ItemMenu title="Username" text={auth.username} />
            <ItemMenu title="Email" text={auth.email} />
            <ItemMenu title="Total Favoritos" text={`${total} pokemons`} />
        </View>

        <Button title="Desconectarse" onPress={logout} style={styles.btnLogoun} />
        </View>
    );
    }

function ItemMenu(props) {
    const { title, text } = props;

    return (
        <View style={styles.itemMenu}>
        <Text style={styles.itemMenuTitle}>{title}:</Text>
        <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    titleBlock: {
        marginBottom: 30,
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
    },
    dataContent: {
        marginBottom: 20,
    },
    itemMenu: {
        flexDirection: "row",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: "#CFCFCF",
    },
    itemMenuTitle: {
        fontWeight: "bold",
        paddingRight: 10,
        width: 120,
    },
    btnLogoun: {
        paddingTop: 20,
    },
});