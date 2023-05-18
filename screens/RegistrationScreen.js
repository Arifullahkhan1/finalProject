import { useNavigation } from "@react-navigation/core";
import React, { useState,useContext } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { ApiInterceptor } from "../interseptors/apiBodyPost";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase-config";
import loginStyle from "../styles/loginScreenStyle/loginStyle";
import { AppContext } from "../global/AppContext";




const phoneNumberRegex = /^\+46\d{9}$/;

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  //const [userToken, setUserToken] = useState("");
  const { phoneNumber, setPhoneNumber} = useContext(AppContext);


  const navigation = useNavigation();

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    setIsValidPhoneNumber(phoneNumberRegex.test(text));
   
  };
  /* const handleItemPress = () => {
    navigation.navigate('OTPScreen', { phoneNumber:phoneNumber });
  } */
    const handleMultiplePress = () => {
     /*  handleItemPress(); */
      signUp();
    };
const signUp = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      phoneNumber === "" ||
      !isValidPhoneNumber
    ) {
      alert("Filds can't be empty or invalid format ");

      return false;
    } else {
      

      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
      
        const token = await user.getIdToken();
       
       ApiInterceptor('/api/vehicle-owners/sign-up',token, { firstName: firstName, lastName:lastName, phoneNumber:phoneNumber })
          .then((response) => response.json())
          .then((data) => {
           // console.log("IdToken from API:::::", data.idToken);
           
          })
          
          .catch((error) => {
            console.log(error);
            alert(error)
          });

        //**************** */
        auth.signOut().then(() => {
          navigation.replace("OTPScreen");
         
        });
       /*  Alert.alert(
          "Grattis",
          "Du är registrerad, vänligen logga in med dina inloggningsuppgifter",

          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        ); */
    } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={loginStyle.container} behavior="padding">
      <View style={loginStyle.regInputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={loginStyle.input}
        />
        <TextInput
          placeholder="lösenord"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={loginStyle.input}
          secureTextEntry
        />

        <TextInput
          placeholder="förnamn"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={loginStyle.input}
        />
        <TextInput
          placeholder="efternamn"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={loginStyle.input}
        />
        <TextInput
          style={loginStyle.input}
          onChangeText={handlePhoneNumberChange}
          placeholder="+4670000000"
          keyboardType="phone-pad"
        />
        {isValidPhoneNumber ? (
          <Text style={{ color: "green" }}>Valid phone number</Text>
        ) : (
          <Text style={{ color: "red" }}>Invalid phone number</Text>
        )}
      </View>

      <View style={loginStyle.buttonContainer}>
        <TouchableOpacity
         onPress={handleMultiplePress}
         // onPress={() =>{saveUserDetailSignUp();saveUserDetail();}}
          style={[loginStyle.button, loginStyle.buttonOutline]}
        >
          {<Text style={loginStyle.buttonOutlineText}>SKAPA KONTO</Text>}
        </TouchableOpacity>
      </View>
    
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
