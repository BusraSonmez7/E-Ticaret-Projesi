import React, {useState, useEffect} from "react";
import {
    View,
    Text, 
    Image, 
    StyleSheet, 
    TouchableWithoutFeedback,FlatList
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PostMethod from '../webApi/PostMethod';

const CategoryCard = (props) =>{

    const [second,setSecond] = useState([]);
    const [secondImagePath,setSecondImagePath] = useState("");
    const [third,setThird] = useState([]);
    const [thirdImagePath,setThirdImagePath] = useState("");
    const [clickItem,setClickItem] = useState(false);

    const firstCategoryData = {'first_category_id': props.id}
    const secondCategoryData = {'second_category_id': props.id}

    const [categoryId, setCategoryId] = useState(props.id);

    useEffect(() => {        

        if(props.category_no === 2 && clickItem){
            props.navigation.navigate('ProductListScreen',
                {
                    category: 2, 
                    category_id: props.id, 
                    table: 3, 
                    path: 'productList'
                });
        }

        if(props.category_no === 1 && clickItem && !third){
            props.navigation.navigate('ProductListScreen',
                {
                    category: 1, 
                    category_id: props.id, 
                    table: 3, 
                    path: 'productList'
                });
        }

        if(props.category_no === 0 && clickItem && !second){
            props.navigation.navigate('ProductListScreen',
                {
                    category: 0, 
                    category_id: props.id, 
                    table: 3, 
                    path: 'productList'
                });
        }
 
    }, [second,third, clickItem]);

     const categoryItemSelect = ()=>{

         listMethod('secondCategories', firstCategoryData);
         listMethod('thirdCategories', secondCategoryData);

         setClickItem(!clickItem);

         setCategoryId(props.id);
        
     }

     const renderCategory = (data, path, categoryNo) => (

        <CategoryCard 
            id = {data.item.id} 
            title = {data.item.title} 
            image_url={data.item.img_url} 
            image_path={path} 
            navigation = {props.navigation}
            category_no = {categoryNo}
        />

    );

    const listMethod = async (path, data)=>{

        PostMethod({path: path, data: data})
        .then(function (response) {
            if(path === 'secondCategories'){
                setSecond(response.data.data);
                setSecondImagePath(response.data.image_path);
            }
            else if(path === 'thirdCategories'){
                setThird(response.data.data);
                setThirdImagePath(response.data.image_path);
            }
        })
        .catch(function (error) {
        console.log(error);
        }); 

    }

    return(
        <View>
        <TouchableWithoutFeedback 
            onPress={categoryItemSelect}
        >
        <View style={categoryStyle.viewStyle}>
            
            <Image 
                style = {categoryStyle.imageStyle} 
                source = {{uri:`${props.image_path}/${props.image_url}`}}
            />

            <Text style = {categoryStyle.textStyle}>
                {props.title} 
            </Text>
            
            <View style={categoryStyle.iconView}>
                 <Icon 
                    name="chevron-down" 
                    size={15} 
                    color= "gray" 
                    style={categoryStyle.iconStyle}
                />
            </View>

        </View>

        </TouchableWithoutFeedback>

        {clickItem && second ? 
            (second.length !== 0 && props.category_no === 0 ? 
                <View style={categoryStyle.secondView}>
                    <FlatList 
                        data={second} 
                        renderItem={(data)=> renderCategory(data,secondImagePath, 1)}
                    />
                </View> 
            : null
        ) : null
        }

        {clickItem && third ? 
            (third.length !== 0 && props.category_no === 1 ? 
            <View style = {categoryStyle.thirthView}>
                <FlatList 
                    data={third} 
                    renderItem={(data)=> renderCategory(data,thirdImagePath, 2)}
                />
            </View> 
            : null
        ) : null
        }
        
        </View>
        
    );
}

const categoryStyle = StyleSheet.create({
    secondView:{
        marginStart:10,
        padding:2,
    },
    thirthView:{
        marginStart:20,
        padding:2,
    },
    imageStyle:{
        height:50,
        width:50,
        marginEnd:5,
    },
    textStyle:{
        color:"black",
    },
    
    iconView:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"flex-end",
        marginEnd:20,
    },
    viewStyle:{
        flex:1,
        alignItems:"center",
        flexDirection:"row",
        margin:1,
        paddingStart:10,
        backgroundColor:"white",
    },
    
})

export default CategoryCard;