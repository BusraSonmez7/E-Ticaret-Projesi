import React, {useEffect} from "react";
import {
  View,
  Image,
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Text,
  Dimensions,
  AsyncStorage
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackActions } from "@react-navigation/native";
import GetMethod from '../../../webApi/GetMethod';

const width = Dimensions.get('screen').width;

function AccountSettings(props){

    const data = [
        {
          id: 0,
          icon:'update',
          title: 'Siparişlerim',
        },
        {
          id: 1,
          icon:'favorite',
          title: 'Favorilerim',
        },
        {
          id: 2,
          icon:'room',
          title: 'Adreslerim',
        },
        {
          id: 3,
          icon:'person',
          title: 'Kullanıcı Bilgileri',
        },
        {
          id: 4,
          icon:'vpn-key',
          title: 'Şifre Değiştir',
        },
        {
          id: 5,
          icon:'logout',
          title: 'Çıkış Yap',
        },
      ];

      const logoutMethod = async (path)=>{

        GetMethod({path: path})
        .then(function (response) {
            console.log(response.data.message);
        })
        .catch(function (error) {
        console.log(error);
        }); 
    }

      const settingListClick = (id) => {
        switch(id){
          case 0:
            props.navigation.navigate('OrderScreen');
            break;
          case 1:
            props.navigation.navigate('FavoriteScreen',{navigation:props.navigation});
            break;
          case 2:
            props.navigation.navigate('AddressScreen',{navigation:props.navigation});
            break;
          case 3:
            props.navigation.navigate('MemberInfoScreen',{navigation:props.navigation});
            break;
          case 4:
            props.navigation.navigate('ChangePasswordScreen',{navigation:props.navigation});
            break;
          case 5:
            logoutMethod('logout');
            logoutLocal();
            props.navigation.dispatch(
              StackActions.replace('AccountScreen',{navigation: props.navigation})
            )
            break;
        }
      }

      const logoutLocal = async () => {
        try {
          await AsyncStorage.setItem('email',JSON.stringify(""));
          await AsyncStorage.setItem('password',JSON.stringify(""));
        } catch (error) {
          
        }
    
      }

      const renderItem = ({item}) => {
        return (
          <TouchableOpacity onPress={() => settingListClick(item.id)}>
            <View style={accountStyle.flatListViewItem}>
                <Icon 
                  name={item.icon} 
                  size={25} 
                  color= "black"
                />
                <Text style={accountStyle.flatListText}>
                    {item.title}
                </Text>
                <Icon2 
                  name='arrow-right-bold-circle-outline' 
                  size={25} 
                  color= "black" 
                />
            </View>
          </TouchableOpacity>
        );
      }

    return(
        <View style={accountStyle.mainViewStyle}>
          
          <FlatList 
              ListHeaderComponent =
                {
                  <Image 
                    style={accountStyle.logoStyle} 
                    source={require('../../../images/narevimlogo.png')}
                  />
                } 
              data={data} 
              renderItem={renderItem} 
              listKey={(item,index) => `${item.id}${index}`}
              style={accountStyle.styleFlatList}
          />
            
        </View>
    );
}

const accountStyle=StyleSheet.create({
    logoStyle:{
        marginStart:50,
        marginBottom:20,
    },
    mainViewStyle:{
        flex:1,
        alignItems:"center",
        backgroundColor: 'white'
    },
    flatListViewItem:{
        flexDirection:"row",
        borderBottomColor:"gainsboro",
        borderBottomWidth:1,
        padding:10,
        width:width/1.2,
        marginEnd:20,
        marginStart:20,
        flex:1,

    },
    styleFlatList:{
        paddingTop:20,
        
    },
    flatListText:{
        fontSize:16,
        color:"black",
        marginStart:20,
        color:"black",
        flex:1,
    },
})

export default AccountSettings;