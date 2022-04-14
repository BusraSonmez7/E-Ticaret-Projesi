import React from "react";
import {View, Button, StyleSheet} from "react-native"
import BottomTab from "./components/BottomTab";

function App(){
  return(
    <View style={styles.viewStyle}>
     <BottomTab/>
    </View>

  );
}
export default App;

const styles = StyleSheet.create(
  {
    viewStyle:{
      flex:1,
    }
  }
)