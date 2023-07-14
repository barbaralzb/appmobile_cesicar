import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/Feather'
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns'

import Configstyle from "../config/styles";
const colors = Configstyle.PaletteColors;
import { getTravelsApi } from '../api/fetchApi/Travels';
import { useTranslation } from 'react-i18next';
import { coordenatesCesi } from '../api/utils';


const MapScreen = (props) => {
  const {
    toCesi = true,
  } = props
  const { t } = useTranslation();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState({});
  const [listTravels, setListTravels] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(()=> {
    if (toCesi) {
      setDestination(coordenatesCesi)
    }
  }, [toCesi])


  useEffect(() => {
    const fetchData = async (toCesi) => {
      try {
        const response = await getTravelsApi();
        const travels = response.data['hydra:member'];

        const filteredTravels = travels.filter(travel => travel.toCesi === toCesi);

        setListTravels(filteredTravels);
      } catch (error) {
        console.log('error map', error);
      }
    };
    fetchData(toCesi)
  }, []);

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

  const ItemTravel = ({item}) => {
    return(
      <TouchableOpacity style={styles.wrapperItem}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://source.unsplash.com/random/800x800/?img=1',
          }}
        />
        <View style={{ width: "100%", paddingLeft: 30 }}>
          <View style={{ flex: 1 }}>
            <Text>{item.user.name}</Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name={"star"} color={colors.yellow} />
              <Text>{5}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
              <View style={{justifyContent: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{ width:20, height:20, backgroundColor: colors.indigo, borderRadius : 50, marginBottom: 10 }} />
                  <Text style={{marginLeft:20}}>{'Rouen'}</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name={"enviroment"} color={colors.red} size={20} />
                  <Text style={{marginLeft:20}}>{'Cesi Rouen'}</Text>
                </View>
            
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
    { !origin || !listTravels ?
        <ActivityIndicator
          size={"large"}
          color={'#aeaeae'}
          style={styles.spinner}
        />
    :
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
      >
        <Marker 
          coordinate={origin}
          pinColor={colors.indigo}
        />
        <Marker 
          coordinate={destination}
          pinColor={colors.green}
        />
        {listTravels.map((travel, index) => {
          const date = new Date(travel.departure_date)
          const formattedTime = format(date, 'HH:mm')
          return (
            <Marker
                coordinate={{
                latitude: travel.position[0],
                longitude: travel.position[1]
                }}
                key={index}
                title = {travel.user.name}
                description={formattedTime}
              />
            )
        }
        )}
      </MapView>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});

export default MapScreen