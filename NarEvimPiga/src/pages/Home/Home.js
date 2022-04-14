import React, {useState,useEffect} from "react";
import {
    View,
    Text, 
    Dimensions,
    FlatList,
    Image, 
    StyleSheet, 
    ScrollView,
    TextInput,
    TouchableWithoutFeedback
} from "react-native"

import ProductCard from "../../components/ProductCard";
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import GetMethod from "../../webApi/GetMethod";
import ProductsList from "../ProductsList";
import Loading from '../../components/Loading';

const width = Dimensions.get('screen').width;

function Home({navigation}){
    
    const [productImagePath,setProductImagePath] = useState("");
    const [productList,setProductList] = useState([]);
    const [brandImagePath,setBrandImagePath] = useState("");
    const [brandList,setBrandList] = useState([]);
    const [sliderImagePath,setSliderImagePath] = useState("");
    const [sliderList,setSliderList] = useState([]);
    const [searchButton,setSearchButton] = useState(false);
    const [search, setSearch] = useState("");
    const [isLoading,setLoading] = useState(true);

    useEffect(() => {
        if(search !== ""){

        }
        else{
            listMethod('mainProducts');
            listMethod('brands');
            listMethod('sliders');
        }
        
    }, [searchButton]); 

    const listMethod = async (path)=>{
        
        GetMethod({
            path: path, 
            cookie: 'ci_session=e92a3f3da8ca9c74bf11bbaa9bf93c9b948dd9e7'
        })
        .then(function (response) {
            if(path === 'mainProducts'){
                setProductList(response.data.data);
                setProductImagePath(response.data.image_path);
            }
            else if(path === 'brands'){
                setBrandList(response.data.data);
                setBrandImagePath(response.data.image_path);
            }
            else if(path === 'sliders'){
                setSliderList(response.data.data);
                setSliderImagePath(response.data.image_path);
            }
            setLoading(false);
        })
        .catch(function (error) {
        console.log(error);
        }); 
    }

    const productRenderItem = ({item}) => (

        <ProductCard 
            item = {item} 
            image_path = {productImagePath} 
            navigation={navigation}
        />

    );

    const sliderRenderItem = ({item}) => (
        <TouchableWithoutFeedback 
            onPress={()=>navigation.navigate('ProductListScreen',
            {
                url:item.button_url,
                path:'/getUrl',
                table:1, 
                navigation: navigation
            }
            )}
        >
            <Image 
                style={homeStyle.imageSliderStyle} 
                source={{uri:`${sliderImagePath}/${item.img_url}`}} 
            />
        </TouchableWithoutFeedback>
    )

    const brandRenderItem = ({item}) => (
        <TouchableWithoutFeedback 
            onPress={()=>navigation.navigate('ProductListScreen',
                {
                    brand_id:item.id,
                    path:'/brandProductList',
                    table:2,
                    navigation: navigation,
                    header: item.title
                }
                )}
        >
            <Image 
                style={homeStyle.imageBrandStyle} 
                source={{uri:`${brandImagePath}/${item.img_url}`}}
            /> 
        </TouchableWithoutFeedback>
    )

    const searchView = () => {
        return (
            <View style={homeStyle.searchStyle}>
                <TextInput 
                    value={search} 
                    onChangeText={setSearch}
                    style={homeStyle.textInputStyle} 
                    placeholder="ara.."
                />
                <View>
                    <TouchableWithoutFeedback onPress={() => searchClick()}>
                        <Icon2 
                            name= {search !== "" ? "close-circle-outline" : "magnify"}
                            size={20} 
                            color="#ec1c4c" 
                            style={homeStyle.searchIcon}
                        />
                    </TouchableWithoutFeedback>
                 </View>
            </View>
        );
    }

    const searchProductListView = () => {
        return (
            <View>
                <ProductsList 
                    keywords = {search} 
                    path = 'searchProduct' 
                    navigation = {navigation} 
                />
            </View>
        );
    }

    const sliderAndBrandListView = () => {
        return(
            <View>
                <FlatList 
                    data={sliderList} 
                    listKey={(item,index) => `A${item.id}${index}`} 
                    renderItem={sliderRenderItem}
                />

                <Text style={homeStyle.titleText}>
                    Markalar
                </Text>

                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                >
                    <FlatList 
                        data={brandList} 
                        listKey={(item,index) => `B${item.id}${index}`}  
                        renderItem={brandRenderItem}
                        style={homeStyle.flatListBrandStyle}
                    />
                </ScrollView>

                <Text style={homeStyle.titleText}>
                    En Beğenilen Ürünler
                </Text>
                    
            </View>
        );
    }

    const searchClick = () => {
        console.log(searchButton);
        if(search !== ""){
            setSearch("");
        }
        
    }
    return(
        <View style={homeStyle.container}>

            {isLoading ? <Loading/> : 
                <View>
                    <Image 
                        style={homeStyle.logoStyle} 
                        source={require('../../images/narevimlogo.png')}
                    />
                    
                    {searchView()}

                    {search !== "" ? searchProductListView() : 
                        <FlatList 
                            ListHeaderComponent={sliderAndBrandListView()} 
                            data={productList} 
                            listKey={(item,index) => `C${item.id}${index}`}
                            renderItem={productRenderItem} 
                            numColumns={2}
                        />
                    }    
                </View>
            }

        </View>
    );
}

const homeStyle = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:5,
        flex: 1,
        backgroundColor: 'white'
    },
    titleText:{
        fontSize:20,
        fontWeight:"bold",
        color:"#ec1c4c",
        textAlign:"center",
        textDecorationLine: 'underline',
        marginTop:20,
    },
    imageBrandStyle:{
        height:75,
        width:75,
        flex:1,
        resizeMode: "contain",
        marginStart:10,
        marginEnd:10,

    },
    flatListBrandStyle:{
        flexDirection:"row",
        
    },
    imageSliderStyle:{
        height:200,
        width:width,
        marginBottom:10,
        resizeMode:"cover",
    },
    searchStyle:{
        borderWidth:1,
        borderRadius:5,
        paddingStart:15,
        borderColor:"#ec1c4c",
        marginBottom:15,
        flexDirection:"row",
        alignItems:"center",
        marginStart: 10,
        marginEnd: 10,
        width: width-20,
        
    },
    textInputStyle:{
        flex:1,
    },
    searchIcon:{
        paddingEnd:20,
    },
    logoStyle:{
        width:150,
        height:75,
        resizeMode:"contain",
        alignSelf: 'center',
    },
})

export default Home;