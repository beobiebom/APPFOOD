import React from 'react';
import {View,Text, TextInput,StyleSheet} from 'react-native';

const style=StyleSheet.create({
  input:{
      padding:10,
      borderWidth:1,
      borderRadius:15,
    borderColor:'#bb5a5a',
  },
  title:{
    marginVertical:10,
    marginHorizontal:6
  }
});

const Input=({placeholder,secureTextEntry,onChangeText,value,type})=>{
return(
    <View>
      <Text style={style.title}>{placeholder}</Text>
        <TextInput
        textContentType={type}
        secureTextEntry={secureTextEntry}
         style={style.input} 
         value={value}
         onChangeText={onChangeText}
         placeholder={placeholder}/>
    </View>
);
}
export default Input;