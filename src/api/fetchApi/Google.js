import axios from "axios";
import { GOOGLE_MAPS_KEY } from '@env';

export const getPlaceCoordinateApi = async (place) => {
    const { place_id } = place
    console.log(place)
    try {
        // Obtener las coordenadas del lugar seleccionado desde la API de Google Places
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_MAPS_KEY}`;

        const placeResponse = await axios.get(apiUrl);
        const { lat, lng } = placeResponse.data.result.geometry.location;

        // Crear un objeto de coordenadas para el marcador
        const markerCoordinate = {
        latitude: lat,
        longitude: lng,
        };

        console.log('Marker coordinate:', markerCoordinate);

        // Aquí puedes realizar acciones adicionales, como actualizar el estado del marcador en tu aplicación

        return markerCoordinate; // Reemplaza esto con el resultado correcto que necesites retornar
    } catch (error) {
        console.error('Error fetching travels:', error);
        throw error;
    }
};
