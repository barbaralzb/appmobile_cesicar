import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, Platform, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Configstyle from "../../config/styles";
const colors = Configstyle.PaletteColors;
const TextInputComponent = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const styles = getStyles(isFocused);
    return (
    <View style={styles.wrapper}>
        <Text style={styles.label}>{props.label}</Text>
        <View style={{ ...styles.input, ...props.style }}>
            <TextInput 
                    {...props}
                    placeholder={props.placeholder}
                    onBlur={() => setIsFocused(!isFocused)}
                    onFocus={() => setIsFocused(true)}
                    //onSubmitEditing={Keyboard.dismiss}
                    autoComplete={props.autoComplete}
                    textContentType={props.textContentType}
                    onSubmitEditing={props.onSubmitEditing}
                    autoCorrect={false}
                    style={{ ...styles.text, ...props.styleTextInput }}
                    placeholderTextColor={`${colors.primary}80`}
                    />
                {props.showPassword ? 
                <TouchableOpacity onPress={props.showPassword} style={styles.icon} >
                    <Ionicons name={props.hidePass === false ?'eye' : 'eye-off-sharp'} size={20} color={props.hidePass === false ? colors.indigo : colors.primary}/>
                </TouchableOpacity>
                :null
                }
        </View>
    </View>
    )
};
const getStyles = (isFocused) => StyleSheet.create({
    input: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        backgroundColor: colors.white,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: isFocused  ? colors.primary :  `${colors.primary}`,
        paddingHorizontal: 10,
        paddingVertical:Platform.OS === 'ios' ? 10 : 0,
        height: 50,
        padding: 12,
    },
    text:{
        flex:1,
        textTransform:'lowercase'
    },
    label:{
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 500
    },
    wrapper:{
        marginBottom: 30
    }
})
export default TextInputComponent;
