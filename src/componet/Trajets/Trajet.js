import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TextComponent from '../../componets/TextComponent';
import Avatar from '../../assets/svg/Avatar-H.svg'
import Icon from 'react-native-vector-icons/Feather'
import ButtonComponent from '../../componets/Onpress/ButtonComponent';
import { useTranslation } from 'react-i18next';

const Trajet = ({item}) => {
    const { t } = useTranslation()
    const {
        name,
        stars,
        destination,
        depart,
        heureDepart,
        heureArrive,
    } = item

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Avatar />
                </View>
                <View>
                    <TextComponent text={name} />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="star" />
                        <TextComponent text={stars} />
                    </View>
                </View>
            </View>

          
            <TextComponent text={destination} />
            <TextComponent text={depart} />
                
            <View style={styles.timeWrapper}>
                <TextComponent text={heureDepart} />
                <TextComponent text={heureArrive} />
            </View>

            <View style={styles.footer}>
                <ButtonComponent title={t('SE_CONNECTER')} onPress={""} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    footer:{
        padding: 20
    }
});
export default Trajet;