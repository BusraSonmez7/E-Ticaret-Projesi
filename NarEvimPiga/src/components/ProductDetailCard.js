import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SliderBox } from "react-native-image-slider-box";
import PostMethod from '../webApi/PostMethod';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ProductDetailCard = (props) => {

    const [iconColor, setIconColor] = useState('gray');
    const [iconFavorite,setIconFavorite] = useState(false);
    const [iconClick,setIconClick] = useState(false);
    
    useEffect(() => {

        props.favorite ? setIconColor('#ec1c4c') : setIconColor('gray');

    }, [props.favorite]);

    const postMethod = async (path, data)=>{

        const status = PostMethod({path: path, data: data})
        .then(function (response) {
            
            return response.data;
      
        })
        .catch(function (error) {
        console.log(error);
        }); 

        return status;
    }

    const favoriteIconClick = () => {

        const data = {
            'product_id': props.data.id
        };

        postMethod('toggleFavoritte',data)
        .then(function (response){
            
            if(response.status === 'error'){
                alert(response.message);
            }
            else{
                const iconColor = iconFavorite ? 'gray' : '#ec1c4c';
                setIconColor(iconColor);
                setIconClick(!iconClick);
                setIconFavorite(!iconFavorite);
            }
        })
        .catch(function (error){
            console.log(error);
        });

    }

    const basketButtonClick = () => {
        const data = {
            'product_id': props.data.id,
            'qty': 1
        };

        postMethod('addBasket',data)
        .then(function (response){
            console.log(response);
        })
        .catch(function (error){
            console.log(error);
        });

        props.navigation.navigate('BasketScreen',{navigation: props.navigation});

    }

    return(
        <View style={productDetailStyle.mainViewStyle}>

            <ScrollView 
                showsHorizontalScrollIndicator={false} 
                style={productDetailStyle.scrollviewStyle}
            >
                <SliderBox 
                    images={props.images}
                    sliderBoxHeight={400}
                    dotColor="#ec1c4c"
                    inactiveDotColor="#90A4AE"
                    onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                    resizeMethod={'resize'}
                    resizeMode={'cover'}
                />

                <Text style={productDetailStyle.titleStyle}>
                    {props.data.title}
                </Text>

                <Text style={productDetailStyle.headStyle}>
                    Ürün hakkında bilgiler:
                </Text>

                <Text style={productDetailStyle.titleStyle}>
                    {props.data.description}
                </Text>
                
            </ScrollView>

            <View style={productDetailStyle.priceViewStyle}>
                
                <Text style={productDetailStyle.priceTextStyle}>
                    {`${props.data.price} TL`}
                </Text>

                <TouchableOpacity onPress = {() => favoriteIconClick()}>
                    <Icon 
                        name='heart-circle-outline' 
                        size={30} 
                        color= {iconColor}
                        style={productDetailStyle.priceIconStyle}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress = {() => basketButtonClick()}>

                    <Text style={productDetailStyle.priceButtonStyle}>
                        Sepete Ekle
                    </Text>

                </TouchableOpacity>

            </View>
        </View>
    );
}

const productDetailStyle = StyleSheet.create({
    mainViewStyle:{
        backgroundColor:"white",
        flex:1,
    },
    titleStyle:{
        marginTop:20,
        marginBottom:20,
        marginEnd:20,
        marginStart:20,
        color:"black",
    },
    headStyle:{
        fontWeight:"bold",
        color:"black",
        marginEnd:20,
        marginStart:20,
        fontSize:16,

    },
    scrollviewStyle:{
        height:height/1.5-5,
    },
    priceViewStyle:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        height:40,
        padding:5,
    },
    priceTextStyle:{
        width:width/3.2,
        textAlign:"left",
        fontSize:18,
        color:"black",
        fontWeight:"bold"
    },
    priceButtonStyle:{
        width:90,
        textAlign:"center",
        backgroundColor:"#ec1c4c",
        padding:5,
        borderRadius:5,
        color:"white",
    },
    priceIconStyle:{
        width:width/4,
    },
})

export default ProductDetailCard;