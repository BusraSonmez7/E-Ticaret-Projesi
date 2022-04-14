import React, {useState, useEffect} from "react";
import {
    View, 
    StyleSheet, 
    FlatList
} from 'react-native';

import AddressCard from "../../../components/AddressCard";
import GetMethod from "../../../webApi/GetMethod";

const Address = () => {

    const [address, setAddress] = useState([]);

    useEffect(() => {
        listMethod();
    },[address])

    const listMethod = async ()=>{

        GetMethod({path: 'address'})
        .then(function (response) {
            setAddress(response.data.data);
        })
        .catch(function (error) {
        console.log(error);
        }); 
    }

    const renterItem = (item) => {
        return (
            <AddressCard item = {item} />
        );
    }

    return(
        <View style = {addressStyle.container}>
            <FlatList
                data={address}
                renderItem = {(item) => renterItem(item)}    
            />
        </View>
    );
}

const addressStyle = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        flex: 1,
    }
})

export default Address;