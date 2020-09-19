import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, View } from 'react-native';
import Splashimg from '../../assets/Splash.png';
import { useNavigation } from '@react-navigation/native';
const styles=StyleSheet.create({
  bg:{
      flex:1,
  }
});

const Splash=()=>{
  // const navigation = useNavigation();
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     navigation.navigate('Login');
  //   },3000)
  // },[]);
 return(
   <ImageBackground style={styles.bg} source={Splashimg} />
 );
};

export default Splash;