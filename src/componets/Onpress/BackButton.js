import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import Configstyle from "../../config/styles";
const colors = Configstyle.PaletteColors;

const BackButton = ({navigation}) => {
    return (
        <TouchableOpacity style={styles.wrapperIconBack} onPress={navigation.goBack}>
            <Icon
                name="arrow-left"
                color={colors.primary}
                size={20}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapperIconBack:{
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10
    },
});
export default BackButton;