import React, {useEffect, useState} from "react";
import {
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  FlatList
} from 'react-native';

import ProductCard from "../../../../src/components/ProductCard";
import GetMethod from "../../../../src/webApi/GetMethod";
import Header from "../../../components/Header";

const height = Dimensions.get('screen').height;

const Favorite = (props) => {

    const [favoriteList, setFavoriteList] = useState([]);
    const [favoriteImagePath, setFavoriteImagePath] = useState([]);

    useEffect(() => {
        listMethod();
    }, [favoriteList]);

    const listMethod = async ()=>{

        GetMethod({
          path: 'favoritte', 
          cookie: 'ci_session=4e61a082950863e9b78c0a9e6fbd9b490e8e3941'
        })
        .then(function (response) {
            setFavoriteList(response.data.data);
            setFavoriteImagePath(response.data.image_path);
        })
        .catch(function (error) {
        console.log(error);
        }); 

    }

    const renderProduct = ({item}) => (
        <ProductCard 
          item = {item} 
          image_path = {favoriteImagePath} navigation={props.navigation}
        />
    );

    return(
        <View style={productListStyle.mainViewStyle}>
          <Header title = 'Favori Ürünlerim' navigation = {props.navigation}/>
            {favoriteList ? (favoriteList.length === 0 ? 
            <View style={productListStyle.waitViewStyle}>
              <Text style={productListStyle.waitStyle}>
                Ürün Bulunamadı!
              </Text>
            </View>
              : 
            <FlatList
              data={favoriteList} 
              keyExtractor={(item,index) => `${item.id}${index}`}
              renderItem={renderProduct} 
              numColumns={2}
              key={item => item.id.toString()}
              style = {productListStyle.flatList} 
              />) : null 
            }     
        </View>
    );

}

const productListStyle = StyleSheet.create({
  mainViewStyle:{
  },
  waitStyle:{
    fontSize:20,
    color:'#ec1c4c',
    textAlign:"center",
  },
  waitViewStyle:{
    justifyContent:"center",
  },
  flatList: {
    marginStart:10,
    marginEnd:10,
  }
})

export default Favorite;