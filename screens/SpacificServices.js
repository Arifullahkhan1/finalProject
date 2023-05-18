import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/core';
//import CircularCardsHorizontal from '../components/Circal';
import Circal from '../components/Circal';


const SpacificServices = ({route}) => {
 // console.log(route.params)
  const navigation = useNavigation()
  return (
    <View style={{flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#141B41',}}>
    <TouchableOpacity onPress={()=>{ navigation.navigate("ServaceDetail")}}>
      <Text style={{fontSize:32,fontWeight:'bolt', borderColor:'red',  borderWidth: 2,borderRadius:25,padding:15,}}>SpacificService</Text>
      </TouchableOpacity>
      <Circal/>
    </View>
  )
}

export default SpacificServices;