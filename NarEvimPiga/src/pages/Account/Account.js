import React, {useState,useEffect} from "react";
import {
    View,
    Image,
    StyleSheet, 
    TextInput,
    Text,
    TouchableOpacity, 
    AsyncStorage
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackActions } from "@react-navigation/native";
import PostMethod from "../../webApi/PostMethod";

function Account({navigation}){

    const [txtEmail,setTxtEmail] = useState('');
    const [txtPassword,setTxtPassword] = useState('');

    useEffect(() => {
        console.log("First");
        getMethod();
      
    }, [])

    const getMethod = async ()=>{

        try {
            let email = "";
            let password = "";
            let login = 0;

            await AsyncStorage.getItem('email', (err, result) => {
                email = JSON.parse(result);
            });

            await AsyncStorage.getItem('password', (err, result) => {
                password = JSON.parse(result);
            });

            await AsyncStorage.getItem('login', (err, result) => {
                login = JSON.parse(result);
            });

            if(email !== "" && password !== "" && login === 1){
                loginMethod('login',email,password);
                  navigation.dispatch(
                    StackActions.replace('AccountSettingScreen',{navigation:navigation})
                  )
            }
            else{
                console.log("email: ",email, "\npassword: ",password);
            }
            
          } catch (error) {
            
          } 
    }

    const loginMethod = async (path, email, password)=>{

        const data = {
            'email': email,
            'password': password
        };

        const response = await PostMethod({path: path, data: data})
        .then(async function (response) {

            try {

                if(response.data.status !== "error"){
                    try {
                        await AsyncStorage.setItem('login',JSON.stringify(1));
                        await AsyncStorage.setItem('email',JSON.stringify(txtEmail));
                        await AsyncStorage.setItem('password',JSON.stringify(txtPassword));
                        navigation.dispatch(
                            StackActions.replace('AccountSettingScreen',{navigation:navigation})
                          );
                    } catch (error) {
                        
                    }
                    
                }
                else{
                    console.log("email veya şifre yanlış")
                    alert("Email veya şifre yanlış!");
                    await AsyncStorage.setItem('email',JSON.stringify(0));
                }
                return response;
                
            } catch (error) {
                console.log(error);
            }

        })
        .catch(function (error) {
        console.log(error);
        }); 

        return response;

    }


    return(
        <View style={accountStyle.mainViewStyle}>

            <Image 
                style={accountStyle.logoStyle} 
                source={require('../../images/narevimlogo.png')}
            />

            <View style={accountStyle.emailViewStyle}>

                <Icon 
                    name="email" 
                    size={25} 
                    color= "#ec1c4c"
                />
                <TextInput 
                    value={txtEmail} 
                    onChangeText={setTxtEmail} 
                    style={accountStyle.input} 
                    placeholder="E-posta"
                />

            </View>

            <View style={accountStyle.emailViewStyle}>

                <Icon 
                    name="vpn-key" 
                    size={25} 
                    color= "#ec1c4c"
                />
                <TextInput 
                    value={txtPassword} 
                    onChangeText={setTxtPassword} 
                    style={accountStyle.input} 
                    placeholder="Şifre"
                />

            </View>

            <TouchableOpacity 
                style={accountStyle.loginButton} 
                onPress= {() => loginMethod('login',txtEmail,txtPassword) 
                    & setTxtEmail("") 
                    & setTxtPassword("")
                }
            >
                <Text style={accountStyle.loginButtonText}>
                    Giriş Yap
                </Text>

            </TouchableOpacity>

            <TouchableOpacity 
                style={accountStyle.registerButton} 
                onPress={()=>navigation.navigate('AccountRegisterScreen',
                    {navigation:navigation}) 
                    & setTxtEmail("") 
                    & setTxtPassword("")
                }
            >
                <Text style={accountStyle.registerButtonText}>
                    Kayıt Ol
                </Text>

            </TouchableOpacity>

            <TouchableOpacity style={accountStyle.passwordButtonStyle}>

                <Text style={accountStyle.passwordStyle}>
                    Şifremi unuttum
                </Text>
            
            </TouchableOpacity>
        </View>
    );
}

const accountStyle=StyleSheet.create({
    logoStyle:{
        marginStart:50,
        marginTop:30,
        marginBottom:50,
    },
    mainViewStyle:{
        flex:1,
        paddingStart:40,
        backgroundColor: 'white'
    },
    emailViewStyle:{
        flexDirection:"row",
        alignItems:"center",  
    },
    input: {
        height: 40,
        width:250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:5,
        borderColor:"gray",
      },
      loginButton:{
        width:290,
        backgroundColor:"#ec1c4c",
        padding:5,
        borderRadius:5,

      },
      loginButtonText:{
        textAlign:"center",
        color:"white",
    },
    registerButton:{
        width:290,
        backgroundColor:"white",
        padding:5,
        borderRadius:5,
        marginTop:10,
        borderWidth:1,
        borderColor:"#ec1c4c"
      },
      registerButtonText:{
        textAlign:"center",
        color:"#ec1c4c",
    },
    passwordButtonStyle:{
        width:100,
    },
    passwordStyle:{
        color:"black",
        width: 200,
    }
    
})

export default Account;