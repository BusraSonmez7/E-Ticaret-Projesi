import React from "react";
import {
    View, 
    Text, 
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MemberInfoCard = (props) => {
    return(
        <View style = {memberInfoStyle.container}>
             
             <Icon 
                name= {props.icon} 
                size={25} 
                color= 'red'
            />

            <Text style = {memberInfoStyle.title}>
                {props.title}
            </Text>

            <Text style = {memberInfoStyle.info}>
                {props.info}
            </Text>

        </View>
    );
}

const memberInfoStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "lightgray",
        margin: 20,
        marginBottom: 0,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        marginStart: 10,
        color: "#ec1c4c",
        fontSize: 16,
        fontWeight: 'bold'
    },
    info: {
        color: "black",
        marginStart: 10,
        fontSize: 16,
    }
})

export default MemberInfoCard;