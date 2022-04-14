import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable
} from 'react-native';

import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import PostMethod from '../webApi/PostMethod';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';


const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const ProductsList= (props)=>{  

    const [product,setProduct] = useState([]);
    const [productPath,setProductPath] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [sorting,setSorting] = useState('ASC');
    const [header,setHeader] = useState('Ürünler');

    useEffect(() => {
      
      if(props.route){
        switch(props.route.params.table){
          case 1:
            const data1 = {
              'url_string': props.route.params.url,
              'per_page':'200',
              'page':'0',
              'sorting':sorting
            };
            dataList(data1);
            setHeader('Kampanyalı Ürünler');
            break;
          case 2:
            const data2 = {
              'brand_id': props.route.params.brand_id,
              'per_page':'200',
              'page':'0',
              'sorting': sorting
            };
            dataList(data2);
            setHeader(props.route.params.header);
            break;
          case 3:
            const data3 = {
              'category': props.route.params.category,
              'category_id':props.route.params.category_id,
              'sorting': sorting,
              'per_page':'200',
              'page':'0'
            };
            dataList(data3);
            break;  
          default:
            break;
        }
      }
      else{

      }     
        
      }, [sorting]);

      useEffect(()=>{

        if(!props.route){

          const data3 = {
            'keywords': props.keywords,
            'page': '0',
            'per_page': '10',
            'sorting': 'ASC'
          };
  
          dataList(data3);
        }

      },[props.keywords])

      const dataList = (data) => {
        
        const path = props.route ? props.route.params.path : props.path;

        PostMethod({path: path, data: data})
        .then(function (response){

          setProduct(response.data.data);
          setProductPath(response.data.image_path);
          setLoading(false);
          
        })
        .catch(function (error){
            console.log(error);
        });

    }

    const noProduct = () => {
      return(
      <View style={productListStyle.noProductView}>
        <Text style={productListStyle.noProductText}>
          Ürün Bulunamadı!
        </Text>
      </View>
      );
    }

    const renderProduct = ({item}) => (
        <ProductCard 
          item = {item} 
          image_path = {productPath} 
          navigation={props.navigation}
        />
    );

    const sortingClick = (sorting) => {
      setModalVisible(!modalVisible);
      setSorting(sorting);
      console.log("tıklandı");
    }

    const filterView = () => {
      return(
        <View style={productListStyle.menuIconView}>
            <Pressable
              style={productListStyle.menuButton} 
              onPress={() => setModalVisible(true)}>
                <View style={productListStyle.iconTextView}>
                <Icon 
                  name= "menu"
                  size={30} 
                  color="#ec1c4c" 
                />
                <Text style={productListStyle.iconText}>Sırala</Text>
                </View>
            
            </Pressable>
          </View>
      );
    }

    const  modalView = () => {
      return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {setModalVisible(!modalVisible);}}
            >
              <View style={productListStyle.centeredView}>
                <View style={productListStyle.modalView}>
                  <View style={productListStyle.modalTitleView}>
                  <Text style={[productListStyle.modalTitleText,{flex:1}]}>Ürünleri Sırala</Text>
                  <Icon 
                    name= "close-box"
                    size={20} 
                    color="#ec1c4c" 
                  />
                  </View>
                  <Pressable
                    onPress={() => sortingClick('ASC')}
                  >
                    {modalItem('Fiyata göre artan','arrow-up-bold')}
                  </Pressable>
                  <Pressable
                    onPress={() => sortingClick('DESC')}
                  >
                    {modalItem('Fiyata göre azalan','arrow-down-bold')}
                  </Pressable>
                  
                  {console.log(sorting)}
                </View>
              </View>
          </Modal>
      );
    }

    const modalItem = (text, icon) => {
      return(
              
        <View style={productListStyle.modalTitleView}>
          <Icon 
            name= {icon}
            size={20} 
            color="#ec1c4c" 
          />
          <Text style={productListStyle.modalTitleText}>{text}</Text>
                    
        </View>
      );
    }

    return(
        
      <View style={[productListStyle.mainViewStyle,{flex: 1}]}>
        <Header title = {header} navigation = {props.navigation}/>

        {isLoading ? 
          <Loading/> :
          (product ? 
            ( product.length === 0 ? 
              noProduct() : 
              <View style = {productListStyle.bodyView}>

                {filterView()}
                {modalView()}

                <FlatList
                  data={product} 
                  keyExtractor={(item,index) => `${item.id}${index}`}
                  renderItem={renderProduct} 
                  numColumns={2}
                  key={item => item.id.toString()}
                  style = {productListStyle.flatList}
                />

                </View>
            )  
          : 
          noProduct()
          )
        }
             
      </View>
        
    );
}

const productListStyle = StyleSheet.create({
  mainViewStyle:{
    alignItems: 'center',
  },
  noProductText:{
    fontSize:20,
    color:'#ec1c4c',
    textAlign:"center",
  },
  noProductView:{
    height:height/1.5,
    justifyContent:"center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: width-20,
    backgroundColor: "white",
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTitleText: {
    marginBottom: 15,
    color: "#ec1c4c",
    fontSize: 16,
    marginStart: 10,
  },
  modalTitleView: {
    flexDirection: 'row',
  },
  menuButton: {
    width: 100,
    alignSelf: 'center',
  },
  menuIconView: {
    width: width,
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
    marginBottom: 5,
  },
  iconTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  iconText: {
    fontSize: 16,
    color: "#ec1c4c",
    marginStart: 10,
  },
  bodyView: {
    marginBottom: 50,
  },
  flatList: {
    marginStart: 10
  }
})

export default ProductsList;