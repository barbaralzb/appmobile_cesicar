import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Configstyle from "../../config/styles";
import TextComponent from '../TextComponent';
import Ionicons from '@expo/vector-icons/Ionicons';
const colors = Configstyle.PaletteColors;

const ButtonComponent = (props) => {
  
  var colorProp = "colorParam";
  var colorObj = {colorParam : `${props.color ? props.color : "primary"}`}
  var dynamicColor =  colorObj[colorProp]

  const [colorText, setColorText] = useState();

useEffect(() => {
    if ( props.color === "white"  ) return setColorText(colors.primary)
    else if ( props.outline  ) return setColorText(colors[dynamicColor])
    else setColorText('white')
}, []);

  return (
    <TouchableOpacity onPress={props.onPress} {...props} style={[{...styles(props, dynamicColor).button,...props.style}]}>
        <TextComponent 
          weight={"600"} 
          color={colorText} 
          text={props.title}
          align='center'
          uppercase={props.uppercase}
        />
        {props.icon &&
          <View style={styles(props).icon}>
            <Ionicons name="chevron-right" size={20} color={colorText} />
          </View>
        }
    </TouchableOpacity>
  );
};
const styles = (props, dynamicColor) => StyleSheet.create({
  button: {
    width: props.width ? props.width : 250,
    backgroundColor: props.outline ? colors.white : colors[dynamicColor],
    borderColor: colors[dynamicColor],
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    opacity:props.disabled?0.6:1,
    marginTop: props.mt ? props.mt : 0,
    marginBottom: props.mb ? props.mb : 0,
    alignSelf: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: '50%',
    bottom: '50%',
    right: 20,
  },
});
export default ButtonComponent;
