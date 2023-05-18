import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



const  Heading= ({theTitile})=> {
  
    return (
        <View style={styles.container}>
       <Text style={styles.title}>{theTitile}</Text>
       </View>
   
  );
}
const styles = StyleSheet.create({
    title: {
        marginTop: 50,
        marginBottom: 10,
        fontSize: 30,
        color:'white'
        //fontFamily: "MacondoRegular",
      },
      container:{
          alignItems:'center'
      }
    
})
export default Heading;