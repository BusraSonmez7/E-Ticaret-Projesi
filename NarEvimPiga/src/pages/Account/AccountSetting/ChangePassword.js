import React, {useState} from "react";
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PostMethod from "../../../webApi/PostMethod";
import Header from "../../../components/Header";

const width = Dimensions.get('screen').width;

const ChangePassword = (props) => {

    const  [newPassword, setNewPassword] = useState("");
    const  [oldPassword, setFormerPassword] = useState("");

    const postMethod = async ()=>{

        const data = {
            'old_password': oldPassword,
            'new_password': newPassword
        };

        PostMethod({path: 'changePassword', data: data})
        .then(function (response) {

            if(response.data.status === 'error'){
                alert(response.data.message);
            }
            else{
                alert(response.data.message);
                props.route.params.navigation.goBack();
            }
        })
        .catch(function (error) {
        console.log(error);
        }); 

    }

    const changePasswordClick = () => {
        postMethod();
    }

    return(
        <View style = {changePasswordStyle.container}>
<Header title = 'Şifremi Unuttum' navigation = {props.navigation}/>

            <Image 
                style={changePasswordStyle.logo} 
                source={require('../../../images/narevimlogo.png')}
            />

            <View style = {changePasswordStyle.inputView}>
                <Icon 
                    name= 'account-key-outline' 
                    size={40} 
                    color= "#ec1c4c"
                />

                <TextInput 
                    value={oldPassword} 
                    onChangeText={setFormerPassword} 
                    style={changePasswordStyle.input} 
                    placeholder="Eski Şifre"
                />
            </View>

            <View style = {changePasswordStyle.inputView}>
                <Icon 
                    name= 'account-key' 
                    size={40} 
                    color= "#ec1c4c"
                />

                <TextInput 
                    value={newPassword} 
                    onChangeText={setNewPassword} 
                    style={changePasswordStyle.input} 
                    placeholder="Yeni Şifre"
                />
            </View>
            <TouchableOpacity 
                style = {changePasswordStyle.button}
                onPress = {() => changePasswordClick()}
            >
                <Text style = {changePasswordStyle.buttonText}>
                    Şifreyi Değiştir
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const changePasswordStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        marginStart:50,
        marginTop:30,
        marginBottom:50,
    },
    input: {
        flex: 1,
        marginStart: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        paddingStart: 10,
    },
    button: {
        backgroundColor: "#ec1c4c",
        width: width/1.1,
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    }
})

export default ChangePassword;