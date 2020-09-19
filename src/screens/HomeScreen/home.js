import React,{useEffect} from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import Block from '../../components/Block';
import { SearchBar } from './Searchbar';
import { BackHandler } from 'react-native'

export default function Home({navigation}){
  useEffect(() => {
    BackHandler.removeEventListener('hardwareBackPress')
  }, [])
    return(
      <SafeAreaView style={{flex:1,}}>
         <Block block color="#ececec" padding={10}>
          <SearchBar navigation={navigation}/>
          <View style={{backgroundColor:"#fff", flex:1,}}>
            <Button style={{}} title="OKKe" onPress={() => navigation.navigate('Searchst2')} />
          </View>
        
          </Block>
      </SafeAreaView>
    );
}