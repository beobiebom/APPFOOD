import React from 'react';
import { TouchableOpacity, StyleSheet,Image, Text } from 'react-native';
import LoadingDot from './Loading/LoadingDot';
const style=StyleSheet.create({
    btnstyle:{
               borderRadius: 8,
               alignItems: 'center',
               justifyContent: 'center',
               flex:1,
               borderWidth:1,
               borderColor:'gray',
               flexDirection:'row',
               marginHorizontal:5,
    }
});

const Button=({color,textcolor,fontSize,icon,title,styleas,loading,onPress,height})=>{
    let content = <LoadingDot size={8} color='white'/>
    if(!loading){
            content = (
                <>
                    <Image style={{ width: 20, height: 20}} source={icon} />
                    <Text style={{ marginLeft: 10, fontSize:fontSize, color: textcolor }} >{title}</Text>
                </>
            )
    }
    return(
        <TouchableOpacity style={[style.btnstyle,{backgroundColor:color,height:height,}]} onPress={onPress} >
            {content}
        </TouchableOpacity>
    );
}

export default Button;