import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonComponent from '../Onpress/ButtonComponent';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/AntDesign';
import Configstyle from "../../config/styles";
const colors = Configstyle.PaletteColors;
import DateTimePicker from '@react-native-community/datetimepicker'
import { SimpleLineIcons } from '@expo/vector-icons';
import ChoosingList from '../Onpress/ChoosingList';


//Components


const ChercherTrajet = (props) => {
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ showDatePicker, setShowDatePicker ] = useState(false)

    const handleShowDatePicker = () => {
        setShowDatePicker(true);
    };



    
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.wrapperInputs}>
                    <View style={{ borderBottomColor: colors.grey, borderBottomWidth: 1 , padding: 20 }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{flexDirection: 'row', alignItems: 'center' }}>
                        <SimpleLineIcons name='flag' size={20} style={{marginRight: 10}} />
                        {/* <SimpleLineIcons name='location-pin'/> */}
                        <Text>{selectedOption ? selectedOption : 'Select an option'}</Text>
                        <ChoosingList options={['Rouen']}  selectedOption={selectedOption} setSelectedOption={setSelectedOption} modalVisible={modalVisible} setModalVisible={setModalVisible} />
                    </TouchableOpacity>
                    </View>

                    <TextInput placeholder={t('DEPART')} />
                </View>
                <View>
                    <TouchableOpacity style={styles.iconBox}>
                        <Icon name='swap' style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={()=> handleShowDatePicker}>
                <TextInput
                value={selectedDate.toLocaleDateString()}
                onFocus={handleShowDatePicker}
                placeholder="Seleccionar fecha"
                editable={true}
                />
                {showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selected) => {
                    if (selected) {
                        setSelectedDate(selected);
                    }
                    setShowDatePicker(false);
                    }}
                />
                )}
            </TouchableOpacity>

            <ButtonComponent title={t('RECHERCHER')} />
        </View>
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
        padding: 20,
        margin: 20,
        borderRadius: 10
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
        flexDirection: 'row'
    },
    wrapperInputs:{
        width: "80%"
    }
});
export default ChercherTrajet