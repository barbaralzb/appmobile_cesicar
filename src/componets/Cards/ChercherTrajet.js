import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import ButtonComponent from '../Onpress/ButtonComponent';
import { useTranslation } from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import Configstyle from "../../config/styles";
const colors = Configstyle.PaletteColors;
import DateTimePicker from '@react-native-community/datetimepicker'



//Components
import ChoosingList from '../Onpress/ChoosingList';
import TextComponent from '../TextComponent';
import { coordenatesCesi } from '../../api/utils';

const OPTIONS = [
    'Campus de Rouen'
]

const positionCESIData = {
    id: "CESI",
    name: "CESI Rouen",
    coordenates : coordenatesCesi
}


const ChercherTrajet = (props) => {
    const {
        placeDataChosen,
        navigation
    } = props
    const { t } = useTranslation();
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [ cesiIsDestination, setCesiIsDestination] = useState(true);

    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ showDatePicker, setShowDatePicker ] = useState(false)

    const handleShowDatePicker = () => {
        setShowDatePicker(!showDatePicker)
    };

    useEffect(()=> {
        setDestination(positionCESIData)
        if (placeDataChosen) setOrigin(placeDataChosen)
    },[])

    const switchPlaces = () => setCesiIsDestination(!cesiIsDestination)
    

    const handlerPlace = ({type}) => {
        const ModalListIsDestination = (type == "DESTINATION" && cesiIsDestination)
        const ModalListIsOrigin = (type == "ORIGIN" && !cesiIsDestination)
        if ( ModalListIsDestination || ModalListIsOrigin) {
            setModalVisible(true)
        } else {
            navigation.navigate('SearchPlaceScreen')
        }
    }

    useEffect(()=>{
        if(cesiIsDestination){
            setDestination(positionCESIData)
            setOrigin(placeDataChosen)
        } else {
            setDestination(placeDataChosen)
            setOrigin(positionCESIData)
        }
    },[cesiIsDestination])

    
    return (
        <>
        <Modal visible={showDatePicker} transparent>
            <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowDatePicker(!showDatePicker)}>
                <View style={styles.modalContent}>
                    <DateTimePicker
                        placeholderText={selectedDate}
                        dateFormat={"day month year"}
                        value={selectedDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, selected) => {
                        if (selected) {
                            setSelectedDate(selected);
                        }
                        }}
                    />
                    <ButtonComponent title={t('VALIDER')} onPress={()=>setShowDatePicker(!showDatePicker)} />
                </View>
            </TouchableOpacity>
        </Modal>
        <ChoosingList options={OPTIONS} selectedOption={selectedOption} setSelectedOption={setSelectedOption} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.wrapperInputs}>
                    <TouchableOpacity onPress={()=>handlerPlace({type: "ORIGIN"})} style={{ paddingVertical: 30, flexDirection: 'row', alignItems: 'center'  }}>
                        <Icon name='map-pin' size={24} style={{marginRight: 20}} />
                        <TextComponent text={origin ? origin.name :t('DEPART')} size={18} color={origin ? colors.primary : colors.grey} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>handlerPlace({type: "DESTINATION"})} style={{ borderTopColor: colors.grey, borderTopWidth: 1 , paddingVertical: 30, flexDirection: 'row',  alignItems: 'center' }}>
                        <Icon name='flag' size={24} style={{marginRight: 20}} />
                        <TextComponent text={destination ? destination.name : t('ARRIVEE')} size={18} color={destination ? colors.primary : colors.grey} />
                    </TouchableOpacity>
                </View>
                <View style={styles.wrapperSwitch}>
                    <TouchableOpacity style={styles.iconBox} onPress={switchPlaces} >
                        <AntDesign name='swap' style={styles.icon} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={()=> handleShowDatePicker()}>
                <View style={{ borderTopColor: colors.grey, borderTopWidth: 1, paddingVertical: 30, flexDirection: 'row' }}>
                    <Icon name='calendar' size={24} style={{marginRight: 20}} />
                    <TextInput
                        value={selectedDate.toLocaleDateString()}
                        onFocus={handleShowDatePicker}
                        placeholder="Sélectionner une date"
                        editable={true}
                    />
                </View>
            </TouchableOpacity>



            <View style={{ paddingVertical: 10 }}>
                <ButtonComponent title={t('RECHERCHER')} onPress={ () => navigation.navigate("TrajetsRecherchesScreen")} />
            </View>
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.white,
        elevation: 10,
        shadowColor: '#15173650',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        padding: 30,
        borderRadius: 10,
        margin: 30
    },
    iconBox:{
        borderRadius: 10,
        borderColor: colors.grey,
        borderWidth: 1,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon:{
        transform: [{rotate: '90deg'}]
    },
    wrapper:{
        flexDirection: 'row',
    },
    wrapperInputs:{
        flex:4,
    },
    wrapperSwitch:{
        flex:1,
        justifyContent:'center',
        alignItems: 'flex-end',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 4,
    },
});
export default ChercherTrajet