
 
import React, { useState, useEffect,useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,

} from "react-native";
////import { COLORS } from "../../constants";
import { auth } from "../../firebase-config";
//import loginStyle from "../../styles/loginScreenStyle/loginStyle";
import Icon from "react-native-vector-icons/Ionicons";
import homeStyle from '../../styles/homeScreenStyles/homeStyle'
import { useNavigation } from "@react-navigation/core";
import { AppContext } from "../../global/AppContext";
import { API_URL } from '../../global/baseUrl';
import LoadingAnimation from "../../components/LoadingAnimation";
import CircularCardsHorizontal from "../../components/Circal";




const Profile = () => {
  const [userData, setUserData] = useState("");
   const { token  } = useContext(AppContext);
   const [loadingProfile, setLoadingProfile] = useState(false);


  
  const navigation = useNavigation();

 
 
  useEffect(() => {
    fetchData()
   }, []);

  const fetchData = () => { 
    setLoadingProfile(true);

    fetch(`${API_URL}/api/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
    // console.log('user data', data)
     setUserData(data)
     setLoadingProfile(false);
    })
    .catch((error) => {
      console.log(error);
      alert(error)
      setLoadingProfile(false);
    });
  };


 
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        alert('your are signOut')
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }



  return (
   
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#141B41',
      }}
    >
    {loadingProfile ? (
        <View>
          
          <LoadingAnimation
            source={require("../../animation/99680-3-dots-loading.json")}
          />
        </View>
      ) : ( 
        <>
      
      <View style={styles.continer}>
      
        <Text style={styles.textValues}>
          {" "}
          <Icon
            style={{ fontSize: 20 }}
            name="person-outline"
            type="Ionicons"
          />
          : <Text>{userData.firstName}</Text>
        </Text>
        <Text style={styles.textValues}> <Icon style={{ fontSize: 20 }}name="person-outline" type="Ionicons" />
          :{userData.lastName}
        </Text>
        <Text style={styles.textValues}>
          <Icon style={{ fontSize: 20 }} name="mail-outline" type="Ionicons" />:{" "}
          {auth.currentUser?.email}
        </Text>
        
        <Text style={styles.textValues}>
          <Icon style={{ fontSize: 20 }} name="call-outline" type="Ionicons" />:{" "}
          {userData.phoneNumber}
        </Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton} >
          <Text style={styles.btntext}>Sign out</Text>
        </TouchableOpacity>

       
{/*       <CircularCardsHorizontal/>
 */}       

        
      </View>
    
      </>
     )} 
    </View>
    

  );
};
const styles = StyleSheet.create({
  textValues: {
    marginBottom: 15,
    fontSize: 20,
    color:'white',
  },
  continer: {
    marginTop: -300,
  },
  signOutButton:{
    backgroundColor:'red',
  },
  userToken:{
    fontSize:9,
    color:'white',
  },signOutButton: {
    backgroundColor: Platform.OS == "android" ? "red" : "#AA336A",
    marginTop: 15,
    width: 100,
    borderRadius: 10,
    padding: 10,
  },
  btntext: {
    paddingLeft: 10,
  },
  clearButton: {
    marginTop: 15,
    width: 100,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Platform.OS == "ios" ? "#FFCCCB" : "#90EE90",
  },

});

export default Profile;