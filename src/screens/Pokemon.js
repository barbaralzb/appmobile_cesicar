import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getPokemonDetailsApi } from '../api/pokemon';
import Type from '../componets/Pokemon/Type';
import Stats from '../componets/Pokemon/Stats';
import Header from '../componets/Pokemon/Header';
import Icon from "react-native-vector-icons/FontAwesome5";
import Favorite from '../componets/Pokemon/Favorite';
import useAuth from '../hooks/useAuth';

export default function Pokemon(props) {
    const { 
        navigation,
        route : { params },
    } = props

    const [pokemon, setPokemon] = useState(null)
    const { auth } = useAuth()

    useEffect(() => {
        (async () => {
            try {
                const response = await getPokemonDetailsApi(params.id);
                setPokemon(response);
            } catch (error) {
                navigation.goBack();
            }
        })();
    }, [params]);

    useEffect(() => {
        navigation.setOptions({
        headerRight: () => auth && <Favorite id={pokemon?.id} />,
        headerLeft: () => (
            <Icon
                name="arrow-left"
                color="#fff"
                size={20}
                style={{ marginLeft: 20 }}
                onPress={navigation.goBack}
            />
        ),
        });
    }, [navigation, params, pokemon]);

    if (!pokemon) return null

    return (
        <ScrollView>
            <Header
                name={pokemon.name}
                order={pokemon.order}
                image={pokemon.sprites.other["official-artwork"].front_default}
                type={pokemon.types[0].type.name}
            />
            <Type types={pokemon.types} />
            <Stats stats={pokemon.stats} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({});