import React, {useState,useEffect} from "react";
import {
    View,
    StyleSheet
} from 'react-native';

import ProductDetailCard from "../components/ProductDetailCard";
import PostMethod from "../webApi/PostMethod";
import Header from "../components/Header";

const ProductDetail = (props) =>{

    const [product,setProduct] = useState([]);
    const [images,setImages] = useState([]);
    const [productFavorite, setProductFavorite] = useState(false);

    useEffect(() => {

        postMethod(); 

    }, [productFavorite, product]);

    const postMethod = async ()=>{

        const data = {
            'product_id': props.route.params.p_id
        };

        PostMethod({path: 'productDetail', data: data})
        .then(function (response) {
            setProduct(response.data.data);
            setImages(response.data.images);
            response.data.isFavoritte === 0 ? setProductFavorite(false) : setProductFavorite(true);
        })
        .catch(function (error) {
        console.log(error);
        }); 
    }
      
    return(
        <View style = {detailStyle.container}>
            <Header title = {product.title} navigation = {props.route.params.navigation}/>
            <ProductDetailCard 
                data={product} 
                images={images}
                favorite = {productFavorite}
                navigation = {props.route.params.navigation}
            />
            
        </View>
    );
}

export default ProductDetail;

const detailStyle = StyleSheet.create({

    container: {
        flex: 1
    }

})