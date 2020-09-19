import React, { useState } from 'react';
import { SafeAreaView,View,Text,StyleSheet ,Image, ScrollView, TouchableOpacity} from 'react-native';
import { Button, TextField, TextArea, Colors } from 'react-native-ui-lib';
import ImagePicker from 'react-native-image-crop-picker';
import {Input, theme} from 'galio-framework'
import { withFormik } from 'formik';
import * as yub from 'yup'
import { color } from 'react-native-reanimated';
import {uploadFood} from '../../utils/foodapi'
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        padding:8,
    },
    imgcotainer:{
        backgroundColor: 'transparent',
        width:300 ,
        height: 200,
    },
    imageframe:{
        width:300,
        height:200,
        resizeMode:'contain',
    }
});

const AddScreen=(props)=>{
    const [selectedImg,setSelectedImg]=useState('');
    const Pickhandler=()=>{
        ImagePicker.openPicker({ width: 300,
      height: 200,
      cropping: true,}).then(image=>{
            setSelectedImg(image.path);
            console.log(image);
            props.setFieldValue('image',image.path);
              }
            ).catch((err) => { console.log("openCamera catch" + err.toString()) });
    }
    let content=(
        <TouchableOpacity style={[styles.imgcotainer, { marginBottom: 40, }]} onPress={Pickhandler}>
            <Image source={require('../../assets/upload.png')} style={styles.imageframe} />
            <Text style={{ color: "#6495ED", fontSize: 20, fontFamily: "DancingScript-Regular" }} >Click to pick an image from your library</Text>
        </TouchableOpacity>
    )
    if(selectedImg!==''){
        content = (
            <TouchableOpacity style={[styles.imgcotainer, { marginBottom: 5, }]} onPress={Pickhandler}>
                <Image source={{ uri: selectedImg }} style={styles.imageframe} />
            </TouchableOpacity>
    )
    }
    return(
        <SafeAreaView style={{flex:1,}}>
        <ScrollView>
                <View style={styles.container}>
                    {content}
                    {/* <Text style={{left:5,marginTop:12,}}>Name of Food:</Text> */}
                    <View style={{ borderBottomWidth: 1, borderBottomColor: "#DC143C", width: "100%",}}></View>
                    <Text style={{ left: -100, color: "#6495ED", fontSize: 25, marginTop:10, fontFamily:"DancingScript-Regular"}}>Name of Food: </Text>
                    <View style={{ height: 45, borderBottomColor: '#DC143C',borderBottomWidth:1, width: "90%",  backgroundColor: "transparent",marginTop:5, }}>
                        <TextArea placeholder="Write something" onChangeText={text => props.setFieldValue('name', text)} />
                </View>
                 
                    <Text style={{ left: -76, margin: 5, color: "#6495ED", fontSize: 25, fontFamily: "DancingScript-Regular" }}>Description of Food: </Text>
                    <View style={{ height: 200, borderBottomColor: '#DC143C', borderBottomWidth: 1,  width: "90%",  backgroundColor:"transparent" }}>
                        <TextArea placeholder="Write something" onChangeText={text => props.setFieldValue('description', text)} />
                    </View>
                    <Button outline outlineColor="#DC143C"
                        backgroundColor="#6495ED" outlineWidth={1}
                        size={Button.sizes.large}
                        label="POST"
                        style={{ marginTop: 10, }}
                        iconOnRight
                        iconSource={require('../../assets/login.png')}
                        color="#DC143C"
                        // iconStyle={{ tintColor: "#DC143C" }}
                        onPress={() => props.handleSubmit()}
                    />
                    {/* <Input rounded placeholder="Input description" label="Description of Food:" bgColor="white" style={{ borderColor: "#DC143C", width: "90%", marginTop: 5, }} placeholderTextColor="#DC143C" /> */}
                </View>
        </ScrollView>
          
        </SafeAreaView>
    )
}
export default withFormik({
    mapPropsToValues:({})=>({
         name:null,
         description:null,
         image:null,  
         creAt:null,
         id:null,
    }),
  validationSchema:(props)=>yub.object().shape({
      name:yub.string().required('Yêu cầu tên của thức ăn'),
      description:yub.string().required('Yêu cầu mô tả về thức ăn'),
  }),
  handleSubmit:(value,{props})=>{
        uploadFood(value);
  }
})(AddScreen)