import React from "react";
import {
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions, 
    ScrollView, 
    StyleSheet
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ModalPicker = (props) => {

    const onPressItem = (option, id) => {

        props.changeModalVisibility(false,props.keyId);
        props.setData(option, id, props.keyId);
        console.log(props.keyId);

    }

    const option = props.data.map((item, index) => {
        return(
            
            <TouchableOpacity
                style = {pickerStyle.option}
                key = {item.id}
                onPress = {() => onPressItem(item.title, item.id)}
            >
                <Text style = {pickerStyle.text}>
                    {item.title}
                </Text>

            </TouchableOpacity>
        );
    })

    return(
        
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style = {pickerStyle.container}
        >
            <View style = 
                {
                    [
                        pickerStyle.modal, 
                        {width: WIDTH - 20, height: HEIGHT/2}
                    ]
                }
            >
                <ScrollView>
                    {option}
                </ScrollView>

            </View>

        </TouchableOpacity>
    );
}

const pickerStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        elevation: 3
    },
    option: {
        alignItems: 'flex-start'
    },
    text: {
        margin: 20,
        fontSize: 16,
        color: 'black',
    }
})

export default ModalPicker;