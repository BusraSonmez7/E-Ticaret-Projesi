import React, {useState} from "react";
import {
    View, 
    StyleSheet, 
    Alert, 
    TextInput,
    Text,
    TouchableOpacity
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PostMethod from "../../webApi/PostMethod";

const AccountRegister = (props) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname,setSurname] = useState('');
    const [telephone,setTelephone] = useState('');

      const registerMethod = async ()=>{

        const data = {
            'email': email,
            'password': password,
            'telephone': telephone,
            'name': name
        };

        PostMethod({path: 'register', data: data})
        .then(function (response) {

            if(response.data.status !== 'error'){

                Alert.alert(
                    "Kullanıcı Kaydı",
                    response.data.message,
                    [
                      {
                        text: "Kapat"
                      },
                      { text: "Tamam", onPress: () => props.navigation.goBack() }
                    ]
                  );

            }
            else{
                Alert.alert(
                    "Kullanıcı Kaydı",
                    response.data.message,
                    [
                      { text: "Tamam" }
                    ]
                  );
            }

        })
        .catch(function (error) {
        console.log(error);
        }); 


    }

    return(
        <View style={accountStyle.mainViewStyle}>
            
                <View style={accountStyle.contactStyle}>
                    
                    <Text style={accountStyle.styleContactText}>
                        İletişim Bilgileri
                    </Text>

                    <View style={accountStyle.viewStyle}>
                        <Icon 
                            name="account-circle" 
                            size={30} 
                            color= "#ec1c4c"
                        />
                        <TextInput 
                            value={name} 
                            onChangeText={setName} 
                            style={accountStyle.input} 
                            placeholder="Ad"
                        />
                    </View>

                    <View style={accountStyle.viewSurnameStyle}>
                        <TextInput 
                            value={surname} 
                            onChangeText={setSurname} 
                            style={accountStyle.input} 
                            placeholder="Soyad"
                        />
                    </View>
                    

                    <View style={accountStyle.viewStyle}>
                        <Icon 
                            name="phone" 
                            size={30} 
                            color= "#ec1c4c"
                        />
                        <TextInput 
                            value={telephone} 
                            onChangeText={setTelephone} 
                            style={accountStyle.input} 
                            placeholder="Telefon"
                        />
                    </View>

                </View>

                <View style={accountStyle.contactStyle}>

                    <Text style={accountStyle.styleContactText}>
                        E-Posta & Şifre
                    </Text>

                    <View style={accountStyle.viewStyle}>
                        <Icon 
                            name="email" 
                            size={30} 
                            color= "#ec1c4c"
                        />
                        <TextInput 
                            value={email} 
                            onChangeText={setEmail} 
                            style={accountStyle.input} 
                            placeholder="E-Posta"
                        />
                    </View>

                    <View style={accountStyle.viewStyle}>
                        <Icon 
                            name="key" 
                            size={30} 
                            color= "#ec1c4c"
                        />
                        <TextInput 
                            value={password} 
                            onChangeText={setPassword} 
                            style={accountStyle.input} 
                            placeholder="Şifre"
                        />
                    </View>

                </View>
                <TouchableOpacity 
                    style={accountStyle.saveButton} 
                    onPress={() => registerMethod()}
                >
                    <Text style={accountStyle.saveButtonText}>
                        Kaydet
                    </Text>

                </TouchableOpacity>
        </View>
    );
}

const accountStyle=StyleSheet.create({
    viewStyle:{
        flexDirection:"row",
        alignItems:"center",
        marginStart:10,
    },
    contactStyle:{
        marginTop:15,
        backgroundColor:"white",
    },
    viewSurnameStyle:{
        flexDirection:"row",
        alignItems:"center",
        marginStart:40,
    },
    input: {
        height: 40,
        flex:1,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:5,
        borderColor:"gray",
      },
      styleContactText:{
          padding:10,
          paddingStart:30,
          color:"black",
          borderColor:"gainsboro",
          borderWidth:1,
      },
      epostaTitleStyle:{
          marginStart:10,
          color:"black"
      },
      saveButton:{
          backgroundColor:"#ec1c4c",
          padding:5,
          marginEnd:15,
          marginStart:15,
          borderRadius:5,
          marginBottom:20,
      },
      saveButtonText:{
          color:"white",
          textAlign:"center",
      }
    
})

export default AccountRegister;