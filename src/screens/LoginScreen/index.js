import React, { useState,useEffect } from 'react';
import {View,Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {Input} from 'galio-framework';
import {Formik} from 'formik'
import * as yup from 'yup'
import Button from '../../components/button';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../utils/Context'
const style=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },
    wrapper:{
        padding:14,
        justifyContent:'center',
        resizeMode:'cover',
        flex:1,
    },
    header:{
        fontSize:20,
        fontWeight:'bold',
       textAlign:'center',
      marginBottom:40,
    },
    btnforgot:{
      fontWeight:'bold',
    },
  forgotcontainer: {
      flexDirection:'row',
      justifyContent:'flex-end',

    },
    btnsignin:{
        height:35,
        borderRadius:8,
        backgroundColor:'red',
        alignItems:'center',
    justifyContent: 'center',
    },
    fbggcontainer:{
        flexDirection:'row',
    },
    error:{
        color:'red',
        fontSize:8,
    },
    title: {
        marginVertical: 10,
        marginHorizontal: 6
    },
    input:{
        borderColor:'#685454',
        borderWidth:1.2,
    }
});

const Loginschema=yup.object({
    email: yup.string().email('Định dạng email chưa đúng!').required('Chưa nhập email'),
    password: yup.string().min(8, 'Mật khẩu phải từ 8 kí tự trở lên').required('Chưa nhập password'),
});

const Loginscreen=()=>{
    const { signIn } = React.useContext(AuthContext); 
  
    const [emailLoading,setEmailLoading]=useState(false);
    const [schema,setschema]=useState({
        email:'',
        pass:'',
        error:false,
    });
    const [emailInfor, setEmailInfor] = useState({
        email:"",
        displayName:"",
        phoneNumber:"",
        token:"",
    });
    
    const pressshow=async (erremail,errpass)=>{
        if((erremail===undefined)&&(errpass===undefined)){
            setschema({
                email: '',
                pass: '',
                error: false,
            } );
            return;
        }
        setschema({
            email:erremail,
            pass:errpass,
            error: true,
        });
    }
    const processEmailInfor=async (UserInfor)=>{
        setEmailInfor({
            email: UserInfor.email,
            displayName: UserInfor.displayName,
            phoneNumber: UserInfor.phoneNumber,
    });
    setschema({
        email:UserInfor.email,
    })
    console.log(schema.email)
    }
    const onEmailSignIn=async (values)=>{
        if(emailLoading) return;
        if(!schema.error){
            try {
                setEmailLoading(true);
                await auth().signInWithEmailAndPassword(values.email, values.password).then((res) => {processEmailInfor(res.user),console.log(res.user)}).catch(err=>console.log(err));
                let content = await auth().currentUser.getIdTokenResult();
                console.log(emailInfor);
                signIn(emailInfor);
            } catch (err) {
                console.log(err);
            };
        }
    }
            //   onSubmit={(values) => 
        //   {onEmailSignIn(values.email,values.password)}}
    return(
        <SafeAreaView style={style.container}>
        <Formik
          initialValues={{email:"",password:""}}
          validationSchema={Loginschema}>
          {(props) => (
                <ImageBackground style={style.wrapper} source={require('../../assets/BGSIGNIN.png')}>
                        <View style={{marginTop:120,}}>
                            <Text style={style.title}>Email ID: </Text>
                            <Input color="black" placeholderTextColor="#aeeff0" placeholder="Input your email"  value={props.values.email}
                            type="email-address" rounded style={style.input} onChangeText={props.handleChange('email')}/>
                            <Text style={style.error}>{schema.email}</Text>
                            <Text style={style.title}>Password: </Text>
                            <Input placeholderTextColor="#aeeff0" placeholder="Input your password" value={props.values.password} rounded style={style.input} onChangeText={props.handleChange('password')} password viewPass />
                            <Text style={style.error}>{schema.pass}</Text>
                        </View>
                        <View style={style.forgotcontainer}>
                            <TouchableOpacity>
                                <Text style={style.btnforgot}>Forgot Password ?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15, }}>
                            <Button fontSize={25} loading={emailLoading} icon={require('../../assets/signin.png')} title="SIGN IN" onPress={() => { pressshow(props.errors.email, props.errors.password),onEmailSignIn(props.values)}} textcolor="white" color='red' height={40} />
                        </View>
                        <Text style={{ textAlign: 'center', padding: 10, marginVertical: 5, }}>OR</Text>
                        <View style={style.fbggcontainer}>
                            <Button color='white' icon={require('../../assets/ggicon.png')} title='Google' height={35} fontSize={20}  />
                            <Button color='#4a6ea8'
                                icon={require('../../assets/fbicon.png')}
                                textcolor='white'
                                title='Facebook'
                                fontSize={20}
                                height={35}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, }}>
                            <Text>Not yet a member, </Text>
                            <TouchableOpacity>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                </ImageBackground>
              
          )}
            </Formik>   
        </SafeAreaView>
    );
}
export default Loginscreen;
