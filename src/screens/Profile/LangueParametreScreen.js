import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View, } from 'react-native'
import * as Localization from 'expo-localization';
import { useTranslation } from 'react-i18next'

// Constants
import Configstyle from "../../config/styles"
const dim = Configstyle.dimension
const colors = Configstyle.PaletteColors

// Images 
import IMG_PS from '../../assets/svg/flags/PS.svg'
import IMG_GB from '../../assets/svg/flags/GB.svg'
import IMG_FR from '../../assets/svg/flags/fr.svg'
import IMG_ES from '../../assets/svg/flags/ES.svg'
import IMG_DE from '../../assets/svg/flags/DE.svg'

// Components
import TextComponent from '../../componets/TextComponent';
import BackButton from '../../componets/Onpress/BackButton';




const LangueParametreScreen = (props) => {
  const {
    navigation
  } = props

  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(Localization.getLocales()[0].languageCode || 'fr');
  
  const DATA = [
    {
      id: 'FRANCAIS',
      title: 'Français',
      titleTraduit: t('FRANCAIS'),
      available: true,
      flagImg: IMG_FR,
      code: 'fr'
    },
    {
      id: 'ENGLISH_UK',
      title: 'English, UK',
      titleTraduit: t('ENGLISH'),
      available: true,
      flagImg: IMG_GB,
      code: 'en'
    },
    {
      id: 'ESPAGNOL',
      title: 'Español',
      titleTraduit: t('ESPAGNOL'),
      available: true,
      flagImg: IMG_ES,
      code: 'es'
    },
    {
      id: 'ARABE',
      title: 'Arabe',
      titleTraduit: t('ARABE'),
      available: false,
      flagImg: IMG_PS,
      code: 'ar'
    },
    {
      id: 'Deutsh',
      title: 'Deutsch',
      titleTraduit: t('DEUTSH'),
      available: false,
      flagImg: IMG_DE,
      code: 'de'
    },
  ];

    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => <BackButton navigation={navigation} />,
        headerTitle: () => <TextComponent text={t('GERER_VOTRE_LANGUE')} weight="700" size={18} />
      });
  }, [navigation]);
  
  const changeLanguageAPI = async (item) => {
    setLoading(true); // Mostrar el indicador de carga mientras se realiza el cambio de idioma.

    try {
      await i18n.changeLanguage(item.code); // Cambiar el idioma utilizando la librería i18next.
      setSelectedLanguage(item.code); // Actualizar el estado del idioma seleccionado.
    } catch (error) {
      console.error('Error al cambiar el idioma:', error);
    }

    setLoading(false); // Ocultar el indicador de carga después de cambiar el idioma.
  };

  const Item = ({ item }) => {
    const FlagImg = item.flagImg
    return (
      <TouchableOpacity disabled={!item.available} onPress={() => { changeLanguageAPI(item) }} style={[styles.container, { opacity: !item.available ? 0.4 : 1 }]} >
        <View style={styles.radioContainer}>
          {
            selectedLanguage === item.code ?
              <View style={styles.radio} />
              : null
          }
        </View>
        <View style={styles.wrapper}>
          <TextComponent style={styles.textRadio} weight='600' text={item.title} />
          <View style={styles.traductionDrags}>
            <TextComponent style={styles.textRadio} weight='400' size={12} text={item.titleTraduit} />
            <FlagImg style={styles.drag} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
      <SafeAreaView style={styles.screen}>
      {loading ?
        <ActivityIndicator size="large" color={colors.primary} /> :
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={item => item.id}
            bounces={false}
          />
      }
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  radioContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  textRadio: {
    marginLeft: 10,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  traductionDrags: {
    flexDirection: 'row',
    flex: .5,
    justifyContent: 'flex-end'
  },
  drag: {
    marginLeft: 20
  }
})
export default LangueParametreScreen