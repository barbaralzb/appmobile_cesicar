import React, { useState } from 'react';
import { TextInput, StyleSheet, Keyboard } from 'react-native';
import Configstyle from "../../config/styles";
const colors = Configstyle.PaletteColors;

const TextAreaComponent = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const styles = getStyles(isFocused);
    return (
        <TextInput 
            {...props}
            style={{ ...styles.TextAreaComponent, ...props.style}}
            placeholder={props.placeholder} 
            multiline={true}
            onChangeText={props.onChangeText}
            value={props.value}
            onBlur={() => setIsFocused(!isFocused)}
            onFocus={() => setIsFocused(true)}
            onSubmitEditing={Keyboard.dismiss}
            placeholderTextColor={props.placeholderTextColor}
        />
    )
};
const getStyles = (isFocused) => StyleSheet.create({
    TextAreaComponent: {
        width: "100%",
        height: 100,
        backgroundColor: isFocused ? colors.white : colors.lightGrey,
        padding: 10,
        textAlignVertical: "top",
        borderRadius: 4,
        borderWidth: 2,
        borderColor: isFocused  ? `${colors.primary}66` : colors.transparent,
    }
})
export default TextAreaComponent;
