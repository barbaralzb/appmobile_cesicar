import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import Configstyle from "../../config/styles";
const colors = Configstyle.PaletteColors;
import TextInputComponent from '../../componets/Form/TextInputComponent';
import ButtonComponent from '../../componets/Onpress/ButtonComponent';
import TextComponent from '../../componets/TextComponent';
import LinkButton from '../../componets/Onpress/LinkButton';
import { CheckBox } from 'react-native-elements';

export default function InscriptionScreen(props) {

    const { t } = useTranslation();
    const [checked, setChecked] = useState(false);
    const [hidePass, setHidePass] = useState(true);
    const [password, setPassword] = useState('')
    const [checkBoxHandlerAcceptCGU, setCheckBoxHandlerAcceptCGU] = useState(false)

    
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.logoWrapper}>
            <Image source={require('../../assets/images/logo/cesicar-indigo.png')} resizeMode='contain' style={{width:200, height: 150}} />
        </View>
        <View style={styles.body}>
            <TextInputComponent label={t('IDENTIFIANT')} placeholder={t('EMAIL_EXEMPLE')}/>
            <TextInputComponent 
                    secureTextEntry={hidePass ? true : false}
                    label={t('MOT_DE_PASSE_TEXT')}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    showPassword={() =>setHidePass(!hidePass)}
                    hidePass={hidePass}
                    placeholder="****"
                />
                <CheckBox
                    title={t('JAI_LU_ET_JACCEPTE_LES_CGU')}
                    checked={checkBoxHandlerAcceptCGU}
                    onPress={() => setCheckBoxHandlerAcceptCGU(!checkBoxHandlerAcceptCGU)}
                    checkedColor={colors.indigo}
                    wrapperStyle={styles.wrapperStyleCheckbox}
                    containerStyle={styles.checkboxContainerStyle}
                    textStyle={styles.checkboxTextStyle}
                />
        </View>
        <View style={styles.footer}>    
            <ButtonComponent title={t('SUIVANT')} mb={30} />
            <TextComponent text={t('VOUS_AVEZ_DEJA_UN_COMPTE')} align='center'/>
            <LinkButton title={t('SE_CONNECTER')} onPress={()=>props.navigation.navigate('Connection')} />
        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30
    },
    logoWrapper: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    body:{
        flex: 1,
        justifyContent: 'center',
    },
    footer:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333333',
    },
    buttonContainer: {
        width: '80%',
    },
    button: {
        marginBottom: 20,
        backgroundColor: 'black',
    },
    forgotPasswordButton: {
        marginTop: 20,
        color: '#3366FF',
    },
    wrapperStyleCheckbox: {
        alignItems: 'flex-start'
    },
    screen: {
        flex: 1,
        padding: 30,
        paddingTop: 10,
    },
    underTitle: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    InputContainer: {
        flex: 1,
    },
    link: {
        alignSelf: "flex-start",
    },
    pb30: {
        paddingBottom: 30,
    },
    mr: {
        marginRight: 10
    },
    icon:{
        position: 'absolute',
        right: 12,
        top: '25%'
    },
    checkboxContainerStyle: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        margin: 0,
        padding:0,
        paddingRight: 10
    },
    checkboxTextStyle: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.primary
    }
});