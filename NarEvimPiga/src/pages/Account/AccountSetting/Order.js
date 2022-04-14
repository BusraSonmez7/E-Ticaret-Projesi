import React from "react";
import {View} from 'react-native';

import Header from "../../../components/Header";

const Order = (props) => {
    return(
        <View>
<Header title = 'Siparişlerim' navigation = {props.navigation}/>
        </View>
    );
}

export default Order;