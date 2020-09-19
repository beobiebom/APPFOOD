import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet,ScrollView ,Text} from 'react-native';
import {Input} from 'galio-framework';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../HomeScreen/button'
let Foodlist=require('../../assets/Foods.json');

export default class Searchscr extends Component{
    constructor(props){
        super(props);
        this.state={
          allfoods:Foodlist,     
          filterfoods:Foodlist,     
        };
    }
        searchFood=(text)=>{
            this.setState({
                filterfoods:this.state.allfoods.filter(item=>
                    item.name.toLowerCase().includes(text.toLowerCase()),
                )
            });
            console.log(this.state.allfoods);
            console.log(this.state.filterfoods);
            console.log(text)
        }
    
    render(){
        return(
            <SafeAreaView style={{flex:1,}} > 
                <View style={{flex:1,}}>
                    <View style={{ flexDirection: 'row', margin: 2, paddingBottom: 5, }}>
                        <View style={styles.backbox}>
                            <Button block centered middle onPress={() => this.props.navigation.goBack()}>
                                <Feather name="chevron-left" size={20} />
                            </Button>
                        </View>
                        <View style={{ flex: 1, paddingRight: 8, }}>
                            <Input placeholder="Search foods" 
                            style={{ height: 40 }} rounded right icon="search" family="FontAwesome5"
                             iconSize={20} onChangeText={(text) => this.searchFood(text)}/>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#fff", flex: 1, }}>
                        {
                            this.state.filterfoods.map(item=>{
                                return (<Text>{item.name}</Text>);
                            })
                        }
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles=StyleSheet.create({
    backbox:{
        width: 40,
        height: 40,
        backgroundColor:'#FFFF',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        margin:8,
    },
    
});
