import React from "react";
import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PostMethod from "../webApi/PostMethod";

const width = Dimensions.get('screen').width;

const AddressCard = ({item}) => {
    
    const deleteAddress = () => {
        const data = {
            'address_id': item.item.id
        };

        PostMethod({path: "removeAddress", data: data})
        .then(function (response) {
        })
        .catch(function (error) {
        console.log(error);
        }); 
    }

    return(
        <View style = {addressStyle.cardContainer}>

            <Icon 
                name='map-marker' 
                size={25} 
                color= 'red'
            />

            <View style = {addressStyle.textContainer}>
                <Text style = {addressStyle.city}>
                    {item.item.city}-{item.item.town}
                </Text>
                <Text>
                    {item.item.clear_address}
                </Text>
                <Text>
                    {item.item.telephone}
                </Text>
                <Text>
                    {item.item.name} {item.item.surname}
                </Text>
            </View>
            
            <TouchableOpacity onPress={deleteAddress}>
            <Icon 
                name='delete' 
                size={25} 
                color= 'red'
            />
            </TouchableOpacity>
        </View>
    );
}

const addressStyle = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        width: width/1.1,
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 5,
        padding: 7,
        marginTop: 20,
        borderColor: 'lightgray'
    },
    textContainer: {
        flex: 1,
        marginStart: 20,
        paddingBottom: 10,
    },
    city: {
        fontSize: 18,
        color: "black",
        paddingBottom: 10,
    }
})

export default AddressCard;