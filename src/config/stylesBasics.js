import { StyleSheet } from 'react-native';
import Configstyle from "./styles";
const colors = Configstyle.PaletteColors;

export default StyleSheet.create({
    shadow: {
        elevation: 10,
        shadowColor: `${colors.grey}33`,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: colors.white
    },
});