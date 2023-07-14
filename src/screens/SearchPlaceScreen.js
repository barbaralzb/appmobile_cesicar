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
import { FlatList } from 'react-native-gesture-handler';
import { coordenatesCesi } from '../api/utils';
import { defPlaces, favPlaces, homePlace, schoolPlace } from '../utils/favDB';




const SearchPlaceScreen = (props) => {
  const {
    toCesi = true,
    navigation,
    params
  } = props
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState({});
  const mapViewRef = useRef(null)
  const { t } = useTranslation()
  const [selectedId, setSelectedId] = useState();



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
          <TouchableOpacity style={styles.wrapperIconBack} onPress={navigation.goBack}>
            <Icon
              name="arrow-left"
              color={colors.primary}
              size={20}
            />
          </TouchableOpacity>
        ),
        headerTitle: () => (
            <TextComponent text={t('VOUS_PARTEZ_D_OU')} weight="700" size={18} />
        )
        });
    }, [navigation, params]);


  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const handlerOrigin = () => navigation.navigate('HomeScreen', {  } )

  const Item = ({item}) => {
      const { label, typePlace } = item;
      
      let icon = {}
      if (typePlace === 'HOME' ) icon = { name: 'home', color: colors.yellow }
      if (typePlace === 'FAV' )  icon = { name: 'heart', color: colors.red }
      if (typePlace === 'SCHOOL' )  icon = { name: 'briefcase', color: colors.indigo }

      return (
          <TouchableOpacity style={styles.userSection} onPress={handlerOrigin}>
              <View style={styles.wrapperItem}>
                  <View style={[ styles.boxIcon, {backgroundColor: `${icon.color}20` }] }>
                      <Icon name={icon.name} size={20} color={colors.primary} />
                  </View>
              </View>
              <View style={styles.textUserSection}>
                  <TextComponent text={label} weight={500} />
              </View>
              <TouchableOpacity onPress={""} style={styles.icon} >
                <Icon name={"more-vertical"} size={16} />
              </TouchableOpacity>
          </TouchableOpacity>
      );
  }
  const HeaderFlatlist = () => {
    return(
      <TouchableOpacity style={styles.userSection} onPress={handlerOrigin}>
        <View style={styles.wrapperItem}>
            <View style={styles.boxIcon}>
                <Icon name={'navigation'} size={20} color={colors.primary} />
            </View>
        </View>
        <View style={styles.textUserSection}>
            <TextComponent text={t('MA_POSITION')} weight={500} />
        </View>
      </TouchableOpacity>
    )
  }

  return (
      <SafeAreaView style={styles.container}>
      { !origin ?
          <ActivityIndicator
            size={"large"}
            color={'#aeaeae'}
            style={styles.spinner}
          />
      :
        <View style={styles.wrapper}>
        <View style={{ position: "absolute", width: '100%', zIndex: 2, alignSelf: 'center', top: 30}}>
          <GooglePlacesAutocomplete
          currentLocationLabel="Posición actual"
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
        </View>
        <FlatList
            data={[ ...defPlaces, ...favPlaces]}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            contentContainerStyle={{marginTop: 60}}
            ListHeaderComponent={HeaderFlatlist}
          />
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BackGroundPage,
  },
  wrapper:{
    backgroundColor: '#fff',
    margin: 20,
    padding: 30,
    flex:1,
    borderRadius: 10,
    position: 'relative'
  },
  textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      paddingHorizontal: 0,
      color: 'black',
  },
  textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 40,
      borderWidth: .4,
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: 16,
      color: colors.primary,
      borderRadius: 10
  },
  listView: {
    elevation: 1,
  },
  wrapperIconBack:{
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10
  },
  userSection: {
    height: 100,
    backgroundColor: 'white',
    position: 'relative',
    flexDirection: "row",
    alignItems: 'center',
    borderBottomColor: colors.BackGroundPage,
    borderBottomWidth: 1,
  },
  boxIcon:{
    backgroundColor: `${colors.blue}20`,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  textUserSection:{
    flex: 3,
    justifyContent: 'center',
  },
  icon:{
    flex: .7,
    alignSelf: 'center',
  },
  wrapperItem:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20
  },
  
});

export default SearchPlaceScreen