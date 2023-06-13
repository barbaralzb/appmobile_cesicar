import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {getPokemonDetailsByUrlApi, getPokemonsApi} from '../api/pokemon';
import PokemonList from '../componets/PokemonList';

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPokemons();
    }, [loadPokemons]);

    // TODO hacer hook useService o useRequest para tener un error y un loading

    const loadPokemons = useCallback(async () => {
        try {
        // inicializamos la "carga" del request
        setLoading(true);
        const {results: pokemonsResponse, next: nextPokemonListUrl} =
            await getPokemonsApi(nextUrl);
        setNextUrl(nextPokemonListUrl);
        const pokemonsArray = [];
        for await (const pokemon of pokemonsResponse) {
            const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
            pokemonsArray.push({
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            type: pokemonDetails.types[0].type.name,
            order: pokemonDetails.id,
            image: pokemonDetails.sprites.other['official-artwork'].front_default,
            });
        }
        setPokemons([...pokemons, ...pokemonsArray]);
        } catch (error) {
        console.error(error);
        } finally {
        // regresamos loading a false
        setLoading(false);
        }
    }, [pokemons, nextUrl]);

    return (
        <SafeAreaView>
        <PokemonList
            pokemons={pokemons}
            loadPokemons={loadPokemons}
            isNext={nextUrl}
            isLoading={loading}
        />
        </SafeAreaView>
    );
};
