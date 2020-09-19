import React from 'react';
import {View,Text} from 'react-native';
import Button from './button';
import Block from '../../components/Block'
import Feather from 'react-native-vector-icons/Feather'
export function SearchBar({navigation}){
    return(
       <Block direction="row">
        <Button margin={4} color="#fff" padding={10} borderRadius={4} shadow>
          <Feather name="map-pin" size={20} />
        </Button>
         <Block paddingHorizontal={10} direction="row" color='#fff' block shadow margin={4} middle borderRadius={4}>
          <Button color="#fff" margin={10} style={{ flex: 1, }} onPress={()=>navigation.navigate('Search')}>
              <Text>Search for meals</Text>
           </Button>
            <Feather style={{padding:10,}} name="search" size={20} />
         </Block>
       </Block>
    );
    };
