import React from "react";
import {
    View, 
    Text, 
    TouchableWithoutFeedback, 
    StyleSheet, 
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('screen').width;

const Header = (props) => {
    return(
        <View style = {headerStyle.container}>
            <TouchableWithoutFeedback 
                onPress={() => props.navigation.goBack()} 
                style = {headerStyle.button}
            >
            <Icon 
                name= 'arrow-left'
                size={30} 
                color="#ec1c4c" 
            />
            </TouchableWithoutFeedback>
            <Text style = {headerStyle.title}>{props.title}</Text>
        </View>
    );
}

const headerStyle = StyleSheet.create({
    container: {
        height: 50,
        width: width,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 10,
        elevation: 10,
        marginBottom: 5,
    },
    title: {
        flex: 1,
        marginStart: 20,
        paddingEnd: 10,
        maxWidth: width - 60,
        maxHeight: 30,
        fontSize: 20,
        color: '#ec1c4c',
        fontWeight: 'bold'
    },
})

export default Header;