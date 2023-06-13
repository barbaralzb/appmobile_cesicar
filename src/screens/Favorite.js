import React, { useState, useCallback } from "react";
import { Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getPokemonsFavoriteApi } from "../api/favorite";
import { getPokemonDetailsApi } from "../api/pokemon";
import useAuth from "../hooks/useAuth";
import PokemonList from "../componets/PokemonList";
import NotLogged from "../componets/NotLogged";

export default function Favorite() {
    const [pokemons, setPokemons] = useState([]);
    const { auth } = useAuth();

    // Este hook de react navigation para recuperar los pokemones que fueron añadidos a favorito recientemente
    // y dentro tiene un useCallback
    // el useCallback es lo mismo en estructura y se ejecuta de la misma forma que un useeffect, Podria reemplazar useEffect por use Callback 
    // Asi le vuelve a recargar la lista sin recargar la aplicacion
    useFocusEffect(
        useCallback(() => {
            if (auth) {
                (async () => {
                const response = await getPokemonsFavoriteApi();

                const pokemonsArray = [];
                for await (const id of response) {
                    const pokemonDetails = await getPokemonDetailsApi(id);

                    pokemonsArray.push({
                        id: pokemonDetails.id,
                        name: pokemonDetails.name,
                        type: pokemonDetails.types[0].type.name,
                        order: pokemonDetails.order,
                        image:
                        pokemonDetails.sprites.other["official-artwork"].front_default,
                    });
                }

                setPokemons(pokemonsArray);
                })();
            }
        }, [auth])
    );

    return !auth ? (
        <NotLogged />
    ) : (
        <PokemonList pokemons={pokemons} />
    );
}