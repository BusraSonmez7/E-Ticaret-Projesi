import React, {useEffect, useState} from "react";
import {
    View, 
    FlatList
} from "react-native"

import CategoryCard from "../../components/CategoryCard";
import GetMethod from "../../webApi/GetMethod";

function Categories({navigation}){
    
    const [firstCategoryList,setFirstCategoryList] = useState([]);
    const [firstImagePath,setFirstImagePath] = useState("");

    useEffect(()=>{
        listMethod('firstCategories');
    },[])
    
    const listMethod = async (path)=>{

        GetMethod({
            path: path, 
            cookie: 'ci_session=f781cf62bd8c8a63af7f190c7726ab3fde4c68bf'
        })
        .then(function (response) {
            setFirstCategoryList(response.data.data);
            setFirstImagePath(response.data.image_path);
        })
        .catch(function (error) {
        console.log(error);
        }); 

    }

    const renderCategory = (data,path) => (
        <CategoryCard 
            id = {data.item.id} 
            title = {data.item.title} 
            image_url={data.item.img_url} 
            navigation = {navigation} 
            image_path={path}
            category_no = {0}
        />
    );

    return(
        <View>
            <FlatList 
                data={firstCategoryList} 
                renderItem={(data) => renderCategory(data,firstImagePath)}
            />
        </View>
        
    );
    
}
export default Categories;
