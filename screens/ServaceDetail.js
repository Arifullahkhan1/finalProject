import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/core';



  

const ServaceDetail = () => {
    const navigation = useNavigation()
  return (
    <View style={{flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#141B41',}}>
      <Text style={{fontSize:32,fontWeight:'bolt'}}>ServaceDetail</Text>
      <TouchableOpacity onPress={()=>{ navigation.navigate("Services")}}>
      <Text style={{fontSize:32,fontWeight:'bolt', borderColor:'red', borderWidth: 2,borderRadius:25,padding:15,}}>Go to Services</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ServaceDetail;