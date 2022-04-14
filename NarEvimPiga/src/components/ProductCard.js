import React from "react";
import {
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    StyleSheet, 
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('screen').width;

const ProductCard = (props) =>{
    return(
        <TouchableWithoutFeedback 
            onPress={()=>props.navigation.navigate('ProductDetailScreen',
                {
                    p_id:props.item.id, navigation: props.navigation
                }
            )}
        >
            <View style={productStyle.productView}>

                <Image 
                    style = {productStyle.imageStyle} 
                    source = {{uri:`${props.image_path}/${props.item.img_url}`}}
                />

                <Text style = {productStyle.brandStyle}>
                    {props.item.brand}
                </Text>

                <Text style = {productStyle.titleStyle}>
                    {props.item.title}
                </Text>

                <View style={productStyle.iconView}>
                    <Icon 
                        name="star" 
                        size={15} 
                        color= {props.item.point > 0 ? "#FAA416" : "gray"} 
                    />
                    <Icon 
                        name="star" 
                        size={15} 
                        color= {props.item.point > 0 ? "#FAA416" : "gray"} 
                    />
                    <Icon 
                        name="star" 
                        size={15} 
                        color= {props.item.point > 0 ? "#FAA416" : "gray"} 
                    />
                    <Icon 
                        name="star" 
                        size={15} 
                        color= {props.item.point > 0 ? "#FAA416" : "gray"} 
                    />
                    <Icon 
                        name="star" 
                        size={15} 
                        color= {props.item.point > 0 ? "#FAA416" : "gray"} 
                    />
                    <Text>
                        {`(${props.item.review})`}
                    </Text>
                </View>

                <Text style={productStyle.priceStyle}>
                    {`${props.item.price} TL`}
                </Text>

                <TouchableOpacity
                    onPress={()=> props.navigation.navigate('ProductDetailScreen',
                    {
                        p_id:props.item.id, navigation: props.navigation
                    }
                )}
                    title="Ürün Detayı"
                    accessibilityLabel="Learn more about this purple button"
                    style={productStyle.buttonStyle}
                >
                    <Text style={productStyle.butonTextStyle}>
                        Ürün Detayı
                    </Text>

                </TouchableOpacity>
                
            </View>

        </TouchableWithoutFeedback>
    );
    
}

const productStyle = StyleSheet.create({
    
    productView:{
        width: width/2 - 10- 4,
        marginBottom:20,
        backgroundColor:"white",
        marginEnd: 2,
        marginStart: 2,
    },
    buttonStyle:{
        height:40,
        borderRadius:5,
        borderWidth:1,
        marginEnd:5,
        marginStart: 5,
        backgroundColor:"white",
        elevation:3,
        justifyContent:"center",
        alignItems:"center",
    },
    iconView:{
        alignItems:"center",
        flexDirection: "row",
        marginStart:10,    
    },
    brandStyle:{
        color: "blue",
        marginStart:10, 
        marginTop:5,
    },
    titleStyle:{
        color:"black",
        marginStart:10, 
        maxHeight:35,
    },
    priceStyle:{
        color:"#ec1c4c",
        marginTop:10,
        flex:1,
        textAlign:"center",
        marginBottom:10,
    },
    imageStyle:{
        height:150,
        width: width/2 - 10- 4,
        resizeMode: "stretch",
        marginEnd:10,
    },
    butonTextStyle:{
        color:"black",
    },
})

export default ProductCard;