import React, { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/Feather'
import { AntDesign } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from '@env';

import Configstyle from "../config/styles";
const colors = Configstyle.PaletteColors;
import { useTranslation } from 'react-i18next';
import { getPlaceCoordinateApi } from '../api/fetchApi/Google';
import TextComponent from '../componets/TextComponent';

const coordenatesCesi = { latitude : 49.3823994, longitude: 1.0725815 }

const MapScreen = (props) => {
  const {
    toCesi = true,
    navigation,
    params
  } = props
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState({});
  const mapViewRef = useRef(null)
  const { t } = useTranslation()


  useEffect(()=> {
    if (toCesi) {
      setDestination(coordenatesCesi)
    }
  }, [toCesi])

  const handlePlaceSelected = (place) => {
      getPlaceCoordinateApi(place)
      .then((markerCoordinate) => {

        const region = {
          latitude: markerCoordinate.latitude,
          longitude: markerCoordinate.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        mapViewRef.current.animateToRegion(region, 1000);

        setOrigin(markerCoordinate)
      })
      .catch((error) => {
          console.error('Error fetching travels:', error);
      });
  };

  useEffect(() => {
    getLocationPermission();
  }, [])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
  }

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
        headerTitle: () => (
            <TextComponent text={t('VOUS_PARTEZ_D_OU')} weight="700" size={16} />
        )
        });
    }, [navigation, params]);

  return (
      <SafeAreaView style={styles.container}>
      { !origin ?
          <ActivityIndicator
            size={"large"}
            color={'#aeaeae'}
            style={styles.spinner}
          />
      :
        <MapView 
          ref={mapViewRef}
          style={styles.map} 
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
        <GooglePlacesAutocomplete
          placeholder="Buscar dirección"
          onPress={handlePlaceSelected}
          fetchDetails={true}
          query={{
              key: GOOGLE_MAPS_KEY,
              language: 'fr',
              components: 'country:fr',
          }}
          styles={{
              textInputContainer: styles.textInputContainer,
              textInput: styles.textInput,
              listView: styles.listView,
          }}
        />
          <Marker
            draggable
            coordinate={origin}
            pinColor={colors.indigo}
          />
        </MapView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  wrapperItem:{
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 20,
    borderRadius: 10 ,
    shadowColor: `${colors.grey}66`,
    shadowOffset: {
        width: 0,
        height: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.4,
    elevation: 5,
  },
  avatar:{
    width: 30,
    height: 30,
    borderRadius: 50
  },
  textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      paddingHorizontal: 0,
      color: 'black',
      paddingTop: 30
  },
  textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 40,
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: 16,
      color: 'black',
        elevation: 10,
        shadowColor: '#15173650',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        borderRadius: 10,
  },
  listView: {
      borderWidth: 1,
      borderColor: '#DDD',
      backgroundColor: '#FFF',
      marginHorizontal: 10,
      elevation: 1,
  }
});

export default MapScreen