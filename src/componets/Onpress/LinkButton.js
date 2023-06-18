import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Configstyle from "../../config/styles";
import TextComponent from '../TextComponent';
import Ionicons from '@expo/vector-icons';


const colors = Configstyle.PaletteColors;

const LinkButton = (props) => {
  var colorProp = "colorParam";
  var colorObj = {colorParam : `${props.color ? props.color : "primary"}`}
  var dynamicColor =  colorObj[colorProp]

  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...props.style, ...styles.wrapper }} disabled={props.disabled} >
      <View style={styles.container}>
        {props.icon &&
         
            <Ionicons style={styles.icon} name="chevron-left" size={20} color={props.color ? colors[dynamicColor] : colors.primary} />
   
        }
        {props.title &&
          <TextComponent
            weight={props.weight?props.weight:"500"}
            text={props.title}
            color= {props.color ? colors[dynamicColor] : colors.primary}
            // underline={props.underline ? props.underline : 'none'}
            underline
            size={props.size}
            // style={{lineHeight: 1}}
          />
        }
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  icon: {
    justifyContent: "center",
    marginRight:  8,
  }
})

export default LinkButton;
