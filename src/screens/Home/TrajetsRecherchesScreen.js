import React, { useEffect, useState } from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import Configstyle from "../../config/styles";
const colors = Configstyle.PaletteColors;
import TextComponent from '../../componets/TextComponent'
import { useTranslation } from 'react-i18next';
import Trajet from '../../componet/Trajets/Trajet';
import { getTravelsByDestinationApi } from '../../api/fetchApi/Travels';


const DATA = [
    {
        id: 1,
        name: "Jojo",
        stars: 3,
        destination: "CESI Rouen",
        depart: "Cachoise",
        heureDepart: "7h30",
        heureArrive: "8h20",
    }
]

const TrajetsRecherchesScreen = (props) => {
    const {
        navigation,
        route : { params }
    } = props
    const { t } = useTranslation()

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getTravelsByDestination();
    }, [params]);

    const getTravelsByDestination = async () => {
        const toCesi = params?.cesiIsDestination
        console.log(toCesi)
        try {
            const response = await getTravelsByDestinationApi( toCesi );
            const data = response.data;
            // Procesar los datos obtenidos de la API.
            console.log(data);
            setLoader(false)
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoader(false)
        }
    };



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
            <TextComponent text={"Date"} weight="700" size={20} />
        )
        });
    }, [navigation, params]);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Trajet item={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin: 30
    },

});
export default TrajetsRecherchesScreen;