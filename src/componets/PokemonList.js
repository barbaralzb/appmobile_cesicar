import React from 'react';
import {ActivityIndicator, FlatList, Platform, StyleSheet} from 'react-native';
import PokemonCard from './PokemonCard';

export default function PokemonList(props) {
    const { pokemons, loadPokemons, isLoading, isNext } = props

    const loadMore = () => {
        loadPokemons()
    }

    return (
        <FlatList
            data={pokemons}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(pokemon)=> String(pokemon.id)}
            renderItem={({item})=> <PokemonCard pokemon={item} /> }
            contentContainerStyle={styles.flatlist}
            onEndReached={ isNext && loadMore }
            onEndReachedThreshold={0.1}
            ListFooterComponent={
                isLoading &&
                isNext && (
                    <ActivityIndicator
                        size={"large"}
                        color={'#aeaeae'}
                        style={styles.spinner}
                    />
                )
            }
        />
    );
};

const styles = StyleSheet.create({
    flatlist: {
        paddingHorizontal: 5,
        marginTop: Platform.OS === 'ios' ? 0 : 30,
    },
    spinner : {
        marginTop: 20,
        marginBottom: Platform.OS === 'ios' ? 60 : 90
    }
});