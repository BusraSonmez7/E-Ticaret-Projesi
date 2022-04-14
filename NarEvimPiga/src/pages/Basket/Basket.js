import React, {useState, useEffect} from "react";
import {
    View,
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity
} from "react-native"

import BasketCard from "../../components/BasketCard";
import GetMethod from '../../webApi/GetMethod';

function Basket(props){

    const [product,setProduct] = useState([]);
    const [productPath,setProductPath] = useState([]);
    const [productTotal,setProductTotal] = useState([]);
    
    useEffect(() => {
        listMethod('getBasket');
    }, [product])

    const listMethod = async (path)=>{

        GetMethod({path: path})
        .then(function (response) {
            setProduct(response.data.data);
            setProductPath(response.data.image_path);
            setProductTotal(response.data.total);
        })
        .catch(function (error) {
        console.log(error);
        }); 
    }

    const renderProduct = ({item}) => (
        <BasketCard 
          item = {item} 
          image_path = {productPath} 
          navigation={props.navigation}
        />
    );

    return(
        <View style = {basketStyle.container}>
            <Text style = {basketStyle.productCount}> 
                Sepet: {product.length} ürün
            </Text>

            <View style = {basketStyle.basketListView}>
            {product ? 
                (product.length === 0 ? 
                    <View>
                        <Text >Ürün Bulunamadı!</Text>
                    </View> : 
                    <FlatList
                        data={product} 
                        keyExtractor={(item,index) => `${item.id}${index}`}
                        renderItem={renderProduct}
                        key={item => item.id.toString()}
                    /> 
                ) : null
            } 
            </View>
            
            <View style = {basketStyle.bottomContainer}>

                <View style = {basketStyle.totalPriceView}>
                    <Text style = {basketStyle.totalTitle}>
                        Sepet Toplam
                    </Text>
                    <Text style = {basketStyle.totalPriceText}>
                        {productTotal} TL
                    </Text>
                </View>

                <TouchableOpacity style = {basketStyle.basketButton}>

                    <Text style = {basketStyle.basketButtonText}> 
                        Alışverişi Tamamla
                    </Text>

                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Basket;

const basketStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    productCount: {
        textAlign: "center",
        height: 30,
        marginTop: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        fontSize: 16,
        color:  "#ec1c4c",
    },
    bottomContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: 'gray',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    totalPriceView: {
        flex: 1,
    },
    totalPriceText: {
        color: "#ec1c4c",
    },
    totalTitle: {
        fontWeight: "bold",
    },
    basketButton: {
        backgroundColor: "#ec1c4c",
        height: 40,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    },
    basketButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    basketListView: {
        flex: 1,
    }
})