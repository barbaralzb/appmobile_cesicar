// 100	Thin (Hairline)
// 200	Extra Light (Ultra Light)
// 300	Light
// 400	Regular (Normal)
// 500	Medium
// 600	Semi Bold (Demi Bold)
// 700	Bold
// 800	Extra Bold (Ultra Bold)
// 900	Black (Heavy)

import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Configstyle from "../config/styles";
const colors = Configstyle.PaletteColors;

const TextComponent = (props) => {
    return <Text style={{ ...styles(props).text, ...props.style }} numberOfLines={props.numberOfLines}>{props.text}</Text>;
};
const styles =(props)=> StyleSheet.create({
    text: { 
        fontWeight: props.weight ? props.weight : "400",
        fontStyle: props.fontStyle === "italic"? props.fontStyle : 'normal' , 
        color: props.color ? props.color : colors.primary, 
        fontSize: props.size ? props.size  : 14,
        textAlign: props.align,
        textDecorationLine: props.underline === true ? 'underline' : 'none',
        marginTop: props.mt ? props.mt : 0,
        marginBottom: props.mb ? props.mb : 0,
        textTransform: props.uppercase ? 'uppercase' : props.capitalize ? 'capitalize' : 'none',
    }
});
export default TextComponent;
