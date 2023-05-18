import React, { useState,useRef,useEffect,useContext  } from 'react';
import { StyleSheet, View, TextInput,  Text,TouchableOpacity,Alert } from 'react-native';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../firebase-config';
import firebase from 'firebase/compat/app';
import { useNavigation } from "@react-navigation/core";
import 'firebase/compat/auth';
import { AppContext } from "../global/AppContext";




const OTPScreen = () => {

  //const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifire=useRef(null);
  const navigation = useNavigation();
  const { phoneNumber} = useContext(AppContext);

 // const phoneNumber  = route.params.phoneNumber;
 //const numericPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');

  firebase.initializeApp(firebaseConfig);
  console.log('phone number',phoneNumber)
  useEffect(() => {
    handleSendCode();
  }, []);
  const handleSendCode = () => {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifire.current )
      .then(setVerificationId);
     // setPhoneNumber('');
    
  };

  
const handleVerifyCode = () => {
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );
  firebase
    .auth()
    .signInWithCredential(credential)
    .then(() => {
      setVerificationCode('');
     
     
      Alert.alert(
        "Congratulation",
        "You are Authenticated, please Login with yours credentials",

        [{ text: "OK", onPress: () =>  navigation.navigate('Login') }]
      );
     
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Authentication failed', 'Please try again.');
    });
};


  return (
    <View style={styles.container}>
    <FirebaseRecaptchaVerifierModal

      ref={recaptchaVerifire}
      firebaseConfig={firebaseConfig}
        />
       {/*  <Text style={styles.otpText}>Login Using OTP</Text>
        <TextInput  style={styles.textInput}
        placeholder='+46700000000'
        placeholderTextColor="#808080"
        onChangeText={setPhoneNumber}
        keyboardType='phone-pad'
        autoCompleteType='tel'
/> */}
{/* <TouchableOpacity
style={styles.sendVerification}
onPress={handleSendCode}>
<Text style={styles.buttonText}>Send verification </Text>
</TouchableOpacity> */}

        <TextInput  style={styles.textInput}
        placeholder='conform code'
        placeholderTextColor="#808080"

        onChangeText={setVerificationCode}
        keyboardType='number-pad'
       
/>
<TouchableOpacity  
style={styles.sendCode}
onPress={handleVerifyCode}>
<Text style={styles.buttonText}> verify code </Text>
</TouchableOpacity> 

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#141B41'
  },
  textInput: {
   
    borderBottomColor: 'white',
    borderBottomWidth:2,
  textAlign:'center',
    paddingTop:40,
    paddingBottom:20, 
    paddingHorizontal:20,
    fontSize:24,
    marginBottom:20,
    color:'#FFFFFF',
    opacity:.5
    
  },
  sendVerification:{
    padding:20,
    backgroundColor:'#3498db',
    borderRadius:10,
  },
  sendCode:{
    padding:20,
    backgroundColor:'#50C878',
    borderRadius:10
},
buttonText:{
  textAlign:'center',
  justifyContent:'center',
  color:'#FFFFFF',
  fontWeight:'bold',
  width:200,
  fontSize:17,
},
    otpText:{
      fontSize:24,
      fontWeight:'bold',
      color:'#fff',
      margin:20,

    }

});

export default OTPScreen;