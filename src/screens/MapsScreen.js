import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from '@env';

import Configstyle from "../config/styles";
const colors = Configstyle.PaletteColors;
import { useTranslation } from 'react-i18next';
import { getAddressFromCoordinates, getPlaceCoordinateApi } from '../api/fetchApi/Google';
import ButtonComponent from '../componets/Onpress/ButtonComponent';
import { coordenatesCesi } from '../api/utils';


const MapScreen = (props) => {
  const {
    navigation,
    route : { params }
  } = props
  const [place, setPlace] = useState(null);
  const mapViewRef = useRef(null)
  const { t } = useTranslation()
  const [ nameInput, setNameInput ] = useState(null)
  const [loader, setLoader] = useState(true);
  const [loadingPosition, setLoadingPosition] = useState(false);

  useEffect(()=> {
    if (params?.positionData) {
      setPlace(params.positionData.coordenates)
      setNameInput(params.positionData.name)
    }
    setLoader(false)
  }, [params])


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

        setPlace(markerCoordinate)
      })
      .catch((error) => {
          console.error('Error fetching travels:', error);
      });
  };

  const handleMarkerDragEnd = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setPlace({ latitude, longitude });
    getAddressFromCoordinates(event.nativeEvent.coordinate)
      .then((placeData) => {
        setLoadingPosition(false)
        setNameInput(placeData)
      })
      .catch((error) => {
          console.error('Error fetching travels:', error);
      });
  };
  const handleMarkerDragStart = () => setLoadingPosition(true)
  const handlerValidateButton = () => navigation.navigate('HomeScreen')
  return (
      <View style={styles.container}>
      { loader ?
          <ActivityIndicator
            size={"large"}
            color={'#aeaeae'}
            style={styles.spinner}
          />
      :
      <>
        <MapView 
          ref={mapViewRef}
          style={styles.map} 
          initialRegion={{
            latitude: place?.latitude || coordenatesCesi.latitude,
            longitude: place?.longitude || coordenatesCesi.longitude,
            latitudeDelta: place ? 0.01 : 0.1 ,
            longitudeDelta: place ?0.01 : 0.1
          }}
        >
        <GooglePlacesAutocomplete
          placeholder={ !nameInput || loadingPosition ? '...' : nameInput}
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
        {place && place.latitude && place.longitude && (
          <Marker
            draggable
            coordinate={place}
            onDragStart={handleMarkerDragStart}
            onDragEnd={handleMarkerDragEnd}
          >
            <View style={{height: 30, width: 30, backgroundColor: `${colors.alert}`, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{fontSize: 20}}>😀</Text>
            </View>
          </Marker>
        )
        }
        </MapView>
        <View style={styles.footerMap}>
          <ButtonComponent title={t('VALIDER_DEPART')} onPress={handlerValidateButton} />
        </View>
      </>
      }
    </View>
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
  },
  textInput: {
    margin: 20,
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
    maxHeight: 250
  },
  footerMap: {
    alignSelf: 'center',
    bottom: 100
  }
});

export default MapScreen