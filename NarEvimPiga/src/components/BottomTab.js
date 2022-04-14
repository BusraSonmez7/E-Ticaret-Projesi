import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from "../pages/Home/Home"
import Categories from "../pages/Category/Categories"
import Basket from "../pages/Basket/Basket"
import Account from "../pages/Account/Account"
import ProductsList from "../pages/ProductsList";
import ProductDetail from "../pages/ProductDetail";
import AccountRegister from "../pages/Account/AccountRegister";
import AccountSetting from "../pages/Account/AccountSetting/AccountSettings";
import MemberInfo from "../pages/Account/AccountSetting/MemberInfo";
import NarEvimProvider from "../context/provider";
import Favorite from "../pages/Account/AccountSetting/Favorite";
import ChangePassword from "../pages/Account/AccountSetting/ChangePassword";
import Address from "../pages/Account/AccountSetting/Address";
import AddressAdd from "../pages/Account/AccountSetting/AddressAdd";
import Order from "../pages/Account/AccountSetting/Order";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const headerRightComponent = (navigation) => {
  return(
    <TouchableOpacity 
      onPress={() => {
          navigation.navigate("AddressAddScreen"), 
          {
            navigation: navigation
          }
      }}>
      <Text style = {navigationStyle.headerButton}>
        Adres Ekle
      </Text>
    </TouchableOpacity>
  );
}

const CategoryStack = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen name="CategoryScreen" component={Categories} options={
        {
          title: "Kategoriler",
          headerTintColor:"#ec1c4c",
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="ProductListScreen" component={ProductsList} options={{headerShown: false}}/>
      <Stack.Screen name="ProductDetailScreen" component={ProductDetail} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};
const HomeStack = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen name="HomeScreen" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="ProductListScreen" component={ProductsList} options={{headerShown: false}}/>
      <Stack.Screen name="ProductDetailScreen" component={ProductDetail} options={{headerShown: false}}/>
      <Stack.Screen name="BasketScreen" component={BasketStack} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

const AccountStack = ({navigation}) => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="AccountScreen" component={Account} options={{headerShown: false}}/>
      <Stack.Screen name="AccountRegisterScreen" component={AccountRegister} options={{headerShown: false}}/>
      <Stack.Screen name="AccountSettingScreen" component={AccountSetting} options={{
      title: "Hesabım",
      headerTintColor:"#ec1c4c",}}/>
      <Stack.Screen name="OrderScreen" component={Order} options={{headerShown: false}}/>
      <Stack.Screen name="FavoriteScreen" component={Favorite} options={{headerShown: false}}/>
      <Stack.Screen name="ProductDetailScreen" component={ProductDetail} options={{headerShown: false}}/>
      <Stack.Screen name="MemberInfoScreen" component={MemberInfo} options={{headerShown: false}}/>
      <Stack.Screen name="ChangePasswordScreen" component={ChangePassword} options={{headerShown: false}}/>
      <Stack.Screen 
        name="AddressScreen" 
        component={Address} 
        options={{ 
          headerTitle: "Adreslerim",
          headerRight: () => headerRightComponent(navigation), 
          headerTintColor: "#ec1c4c"
        }}/>
        <Stack.Screen name="AddressAddScreen" component={AddressAdd} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

const BasketStack = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen name="BasketScreen" component={Basket} options={{headerShown: false}}/>
      <Stack.Screen name="ProductDetailScreen" component={ProductDetail} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

const bottomIcon = (focused,size,iconName, title) => {
  return(
  <View style={{alignItems:"center",width:size*4}}>
    <Icon name = {iconName} size={30} color= {focused ? "#ec1c4c" : "gray"}/>
    <Text style={{color: focused ? "#ec1c4c" : "gray", fontSize:10}}>
      {title}
    </Text>
  </View>
  );
}

function BottomTab(){
  return(
    <NarEvimProvider>
      
      <NavigationContainer>

        <Tab.Navigator tabBarOptions={
          {
            showLabel:false,
            style:{
              position:'absolute',
              flex:1,
              backgroundColor:"yellow",
          },
          
        }}>
          
          <Tab.Screen  
            name="Home" 
            component={HomeStack} 
            options={
              {
                tabBarIcon:({focused,size}) => (bottomIcon(focused,size,'home','Anasayfa')),
                headerShown: false
              }
            }
          />

          <Tab.Screen 
            name="Category" 
            component={CategoryStack} 
            options={
              {
                tabBarIcon:({focused,size}) => (bottomIcon(focused,size,'view-grid-outline','Kategoriler')),
                headerShown: false
              }
            }
          />

          <Tab.Screen 
            name="Basket" 
            component={BasketStack} 
            options={
              {
                tabBarIcon:({focused,size}) => (bottomIcon(focused,size,'cart','Sepetim')),
                headerShown: false
              }
            }
          />

          <Tab.Screen 
            name="Account" 
            component={AccountStack} 
            options={
              {
                tabBarIcon:({focused,size}) => (bottomIcon(focused,size,'account','Hesabım')),
                headerShown: false
              }
            }
          />
        </Tab.Navigator>

      </NavigationContainer>

    </NarEvimProvider>
  );
}

const navigationStyle = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ec1c4c",
  },
  headerButton: {
    color: "#ec1c4c",
  }
})

export default BottomTab;




