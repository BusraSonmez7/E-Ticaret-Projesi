import React, {useEffect, useState} from "react";
import {
  View, 
  StyleSheet, 
  FlatList
} from 'react-native';

import MemberInfoCard from "../../../components/MemberInfoCard";
import GetMethod from "../../../webApi/GetMethod";
import Header from "../../../components/Header";

const MemberInfo = (props) => {

    const [user,setUser] = useState([]);

    const data = [
        {
          id: 0,
          icon:'account-circle-outline',
          title: 'İsim Soyisim: ',
          info: user.name + " " + user.surname
        },
        {
          id: 1,
          icon:'email',
          title: 'E-Posta Adresi: ',
          info: user.email
        },
        {
          id: 2,
          icon:'phone',
          title: 'Telefon Numarası: ',
          info: user.telephone
        },
      ];

    useEffect(() => {
        listMethod('memberInfo');
    }, [])

    const listMethod = async (path)=>{

        GetMethod({path: path})
        .then(function (response) {
            setUser(response.data.data);
        })
        .catch(function (error) {
        console.log(error);
        }); 
    }

      const renderItem = ({item}) => {
        return (
          <MemberInfoCard 
            icon = {item.icon} 
            title = {item.title} 
            info = {item.info}
          />
        );
      }

    return(
        <View style = {memberInfoStyle.container}>
<Header title = 'Kullanıcı Bilgileri' navigation = {props.navigation}/>
          <FlatList 
              data={data} 
              renderItem={renderItem} 
              listKey={(item,index) => `${item.id}${index}`}
          />
            
        </View>
    );
}

const memberInfoStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    }
})

export default MemberInfo;