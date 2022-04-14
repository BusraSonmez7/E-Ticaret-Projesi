import React, {useState, useEffect} from "react";
import {
    View,
    TextInput,
    StyleSheet, 
    TouchableOpacity, 
    Text,
    Dimensions, 
    Modal, 
    ScrollView,
    AsyncStorage
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';

import GetMethod from '../../../webApi/GetMethod';
import PostMethod from "../../../webApi/PostMethod";
import ModalPicker from '../../../components/ModalPicker';
import Header from "../../../components/Header";

const width = Dimensions.get('screen').width;

const Address = (props) => {
    
    const [name, setName] = useState('');
    const [surname,setSurname] = useState('');
    const [telephone,setTelephone] = useState('');
    const [address, setAddress] = useState('');

    const [chooseCityData, setChooseCityData] = useState('ADANA');
    const [chooseTownData, setChooseTownData] = useState('ALADAĞ');
    const [townId, setTownId] = useState('1');
    const [cityId, setCityId] = useState('1');
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [cityData,setCityData] = useState([]);
    const [townData,setTownData] = useState([]);

    const [checked, setChecked] = useState(true);

    useEffect(() => {
        getCityMethod();
    }, [])

    useEffect(() => {

        const data = {
            'city_id': cityId
        };

        postMethod('town',data);

    }, [cityId])

    const getCityMethod = async ()=>{
        GetMethod({
            path: 'city', 
            cookie: 'ci_session=f15fc02b753b7f7e27fd6d4e8e958f3b6e9c1450'
        })
        .then(function (response) {
                setCityData(response.data.data);
            
        })
        .catch(function (error) {
        console.log(error);
        }); 
    }

    const postMethod = async (path,data)=>{
        
        PostMethod({path: path, data: data})
        .then(function (response) {
            if(path === 'town'){
                setChooseTownData(response.data.data[0].title)
                setTownData(response.data.data);
            }
            else{
            
            }
            
        })
        .catch(function (error) {
        console.log(error);
        }); 

    }

    const saveButton = async () => {
        let email = '';

        await AsyncStorage.getItem('email', (err, result) => {
            email = JSON.parse(result);
        });

        const data = {
            'name': name,
            'surname': surname,
            'email': email,
            'telephone': telephone,
            'city': cityId,
            'town': townId,
            'clear_address': address,
            'biling_name': name,
            'biling_surname': surname,
            'biling_email': "",
            'biling_telephone': telephone,
            'biling_city': 1,
            'biling_town': 1,
            'biling_clear_address': address,
        };

        postMethod('save_address',data);
        props.navigation.navigate("AddressScreen");

        
    }

    const contactView = () => {
        return (
            <View style={addressStyle.contactView}>
                    <Header title = 'Adres Ekle' navigation = {props.navigation}/>
                    <Text style={addressStyle.title}>
                        İletişim Bilgileri
                    </Text>

                    <View style={addressStyle.contactInputView}>

                        <Icon 
                            name="account-circle" 
                            size={30} 
                            color= "#ec1c4c"
                        />
                        <TextInput 
                            value={name} 
                            onChangeText={setName} 
                            style={addressStyle.input} 
                            placeholder="Ad"
                        />

                    </View>

                    <View style={addressStyle.surnameView}>

                        <TextInput 
                            value={surname} 
                            onChangeText={setSurname} 
                            style={addressStyle.input} 
                            placeholder="Soyad"
                        />

                    </View>
                    

                    <View style={addressStyle.contactInputView}>

                        <Icon 
                            name="phone" 
                            size={30} 
                            color= "#ec1c4c"
                        />
                        <TextInput 
                            value={telephone} 
                            onChangeText={setTelephone} 
                            style={addressStyle.input} 
                            placeholder="Telefon"
                        />

                    </View>

                </View>
        );
    }

    const changeModalVisibility = (bool, key) => {

        if(key === 1){
            setIsModalVisible1(bool);
        }
        else{
            setIsModalVisible2(bool);
        }
    }

    const setData = (option, id, key) => {
        
        if(key === 1){
            setCityId(id);
            setChooseCityData(option);
        }
        else{
            setTownId(id);
            setChooseTownData(option);
        }
        
    }

    const cityAndTown = (key, header) => {
        return(
            <View>
                <Text style = {[addressStyle.title, {borderBottomWidth: 0}]}> 
                    {header}
                </Text>

                <TouchableOpacity
                    onPress={() => changeModalVisibility(true,key)}
                    style = {addressStyle.pickerStyle}>
                        <Text style = {addressStyle.pickerText}>
                            {key === 1 ? chooseCityData : chooseTownData }
                        </Text>
                </TouchableOpacity>

                <Modal
                    transparent = {true}
                    animationType = 'fade'
                    visible = {key === 1 ? isModalVisible1 : isModalVisible2}
                    onRequestClose = {() => changeModalVisibility(false,key)}
                >
                    <ModalPicker
                        changeModalVisibility = {changeModalVisibility}
                        setData = {setData}
                        data = {key === 1 ? cityData : townData}
                        keyId = {key}
                    />

                </Modal>
            </View>
        );
    }

    const addressView = () => {
        return(
            <View style = {[addressStyle.container, {marginTop: 20}]}>

                <Text style = {[addressStyle.title]}>
                    Adres Bilgileri
                </Text>

                {cityAndTown(1, 'Şehir seçin')}
                {cityAndTown(2, 'İlçe seçin')}

                <View style={[addressStyle.contactInputView, {}]}>

                        <Icon2 
                            name="office-building" 
                            size={30} 
                            color= "#ec1c4c"
                        />
                        <TextInput 
                            value={address} 
                            onChangeText={setAddress} 
                            style={addressStyle.input} 
                            placeholder="Adres"
                        />

                    </View>
            </View>
        );
    }

    const invoiceView = () => {

        return(
            <View>
                <View style = {addressStyle.invoiceView}>
                    <Icon 
                        name="request-page" 
                        size={30} 
                        color= "#ec1c4c"
                    />
                    <Text style = {addressStyle.invoiceText}>
                        Fatura Bilgileri
                    </Text>
                </View>
                {contactView()}
                {addressView()}
            </View>
        );
    }

    return(
        <View style={addressStyle.container}>
            <ScrollView style={addressStyle.scrollView}>

                {contactView()}
                {addressView()}

            {checked ? null : invoiceView()}
                <View style = {addressStyle.checkBoxView}>

                    <Checkbox
                        status= {checked ? 'checked' : 'unchecked'}
                        color = "#ec1c4c"
                        onPress={() => {setChecked(!checked)}}
                    />
                    <Text style = {addressStyle.checkBoxText}>
                        Faturam aynı adrese gönderilsin
                    </Text>
                    
                </View>

                <TouchableOpacity 
                    style = {addressStyle.button}
                    onPress = {saveButton}
                >
                    <Text style = {addressStyle.buttonText}>
                        Kaydet
                    </Text>
                </TouchableOpacity>

            </ScrollView>
                
        </View>
    );
}

const addressStyle=StyleSheet.create({

    container:{
        backgroundColor: 'white',
        flex: 1,
       
    },
    scrollView: {
        marginTop: 15,
    },
    contactView: {
        backgroundColor:"white",
    },
    title: {
        padding:10,
        paddingStart:30,
        color:"black",
        borderColor:"gainsboro",
        borderBottomWidth:1,
    },
    contactInputView: {
        flexDirection:"row",
        alignItems:"center",
        marginStart:10,
    },
    surnameView: {
        flexDirection:"row",
        alignItems:"center",
        marginStart:40,
    },
    input: {
        height: 40,
        flex:1,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:5,
        borderColor:"gray",
    },
    pickerStyle: {
        alignSelf: 'stretch',
        marginStart: 30,
    },
    pickerText: {
        fontSize: 16,
        padding: 10,
        color: 'black'
    },
    invoiceView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    invoiceText: {
        fontSize: 18,
        color: 'black',
        borderBottomColor: '#ec1c4c',
        borderBottomWidth: 1,
    },
    checkBoxView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkBoxText: {
        color: 'black',
    },
    button: {
        backgroundColor: "#ec1c4c",
        width: width/1.1,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    }
})

export default Address;