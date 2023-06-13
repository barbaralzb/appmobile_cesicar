import React, { useEffect, useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome5";
import { addPokemonFavoriteApi, isPokemonFavoriteApi, removePokemonFavoriteApi } from "../../api/favorite";

export default function Favorite(props) {
  const { id } = props;
  const [ isFavorite, setIsFavorite ] = useState(undefined)
  const [ reloadCheck, setReloadCheck ] = useState(false)

  useEffect( () => {
		( async () => {
			try {
				const response = await isPokemonFavoriteApi( id );
				setIsFavorite( response )
			} catch (error) {
				setIsFavorite( false )
			}
		})();
	}, [id, reloadCheck] )

  const onReloadCheckFavorite = () => {
    setReloadCheck((prev) => !prev)
  }

  const addFavorite = async () => {
    try {
      await addPokemonFavoriteApi(id);
      onReloadCheckFavorite()
    } catch (error) {
      console.log(error)
    }
  };

  const removeFavorite = async () => {
    try {
      await removePokemonFavoriteApi(id);
      onReloadCheckFavorite()
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <Icon
      name="heart"
      color="#fff"
      size={20}
      onPress={isFavorite ? removeFavorite : addFavorite}
      style={{ marginRight: 20 }}
      solid={isFavorite}
    />

  );
}