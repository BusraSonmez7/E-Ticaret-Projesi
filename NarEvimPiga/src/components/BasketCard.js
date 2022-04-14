import React, {} from "react";
import {
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    StyleSheet, 
    TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PostMethod from "../webApi/PostMethod";

const BasketCard = (props) => {

    const postMethod = async (path, data)=>{

        PostMethod({path: path, data: data})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        }); 
    }


    const deleteIconClick = () => {
        const data = {
            'rowID': props.item.rowid
        };

        postMethod('removeFromCart', data);
    }

    const updateCountClick = (key) => {

        const qtyNumber = props.item.qty;
        const productNumber = key ? qtyNumber + 1 : qtyNumber - 1;

        const data = {
            'rowID': props.item.rowid,
            'qty': productNumber
        };

        console.log(productNumber);
        postMethod('updateCart',data);
    }

    return(
        <TouchableWithoutFeedback 
            onPress={()=>props.navigation.navigate('ProductDetailScreen',
                {
                    p_id:props.item.id, navigation: props.navigation
                }
            )}
        >
            <View style = {basketCardStyle.container}>
                <Image 
                    style = {basketCardStyle.image} 
                    source = {{uri:`${props.item.img_url}`}}
                />
                <View style = {basketCardStyle.productDetailContainer}>
                    <View style = {basketCardStyle.topView}>
                        <Text style = {basketCardStyle.brand}>
                            {props.item.brand}
                        </Text>
                        <TouchableOpacity onPress = {() => deleteIconClick()}>
                            <Icon 
                                name='delete' 
                                size={25} 
                                color= 'red'
                            />
                        </TouchableOpacity>
                    </View>

                    <View style = {basketCardStyle.titleContainer}>
                        <Text style = {basketCardStyle.title}>
                            {props.item.title}
                        </Text>
                    </View>

                    <View style = {basketCardStyle.bottomView}>
                        <TouchableOpacity 
                            style = {basketCardStyle.negativeButton} 
                            onPress = {() => updateCountClick(false)}
                        >
                            <Text style = {basketCardStyle.countColor}>
                                -
                            </Text>
                        </TouchableOpacity>

                        <Text style = {basketCardStyle.countText}>
                            {props.item.qty}
                        </Text>

                        <TouchableOpacity 
                            style = {basketCardStyle.positiveButton} 
                            onPress = {() => updateCountClick(true)}
                        >
                            <Text style = {basketCardStyle.countColor}>
                                +
                            </Text>
                        </TouchableOpacity>

                        <Text style = {basketCardStyle.price}>
                            {props.item.price}  TL
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const basketCardStyle = StyleSheet.create({
    container: {
        height: 120,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        borderTopColor: 'gray',
        borderTopWidth: 0.5,
        marginTop: 5,
        padding: 3,
        alignItems: 'center',
        flex: 1,
    },
    productDetailContainer: {
        flex: 1,
        alignSelf: 'center',
        padding: 5,
        marginStart: 7,
    },
    topView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    bottomView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    image: {
        height: 75,
        width: 90,
    },
    brand: {
        flex: 1,
        color: 'blue',
        fontSize: 16,
    },
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    title: {
        maxHeight: 35,
        color: 'black',
    },
    negativeButton: {
        width: 20,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        backgroundColor: "#ec1c4c",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3
    },
    positiveButton: {
        width: 20,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        backgroundColor: "#ec1c4c",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3
    },
    countText: {
        width: 30,
        backgroundColor: 'lightgray',
        textAlign: 'center',
        color: 'black',
        padding: 3
    },
    price: {
        flex: 1,
        textAlign: "right",
        color: "#ec1c4c",
    },
    countColor: {
        color: 'white'
    }
})

export default BasketCard;

