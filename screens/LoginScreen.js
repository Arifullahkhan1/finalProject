import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect, useState, useRef } from "react";
import { API_URL } from "../global/baseUrl";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import loginStyle from "../styles/loginScreenStyle/loginStyle";
import { AppContext } from "../global/AppContext";
import LoadingAnimation from "../components/LoadingAnimation";



const LoginScreen = () => {
 // const animation = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  
  const { token, setToken, firebasetoken, setFirebasetoken } = useContext(AppContext);
  
 
  const navigation = useNavigation();
  //navigation
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && token !== null) {
        navigation.replace("HomeScreen");
      }
    });
    return unsubscribe;
  }, [token]);

  const handleLogin = async () => {
    setLoggingIn(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userToken = await userCredential.user.getIdToken();
      setFirebasetoken(userToken);
     // console.log("firebase token App contact", firebasetoken);

      fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Firebase-Auth": userToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setToken(data.idToken);
          setLoggingIn(false);

          })
        .catch((error) => {
          console.log(error);
          alert(error)
        });
    } catch (error) {
      console.log(error);
      alert(error);
      setLoggingIn(false);
    }
  };
  return (
    <KeyboardAvoidingView style={loginStyle.container} behavior="padding">
      <View style={loginStyle.CarLogoContainer}>
        <Image
          style={loginStyle.CarLogo}
          source={require("../resources/images/carLogo.png")}
        />
      </View>

     {loggingIn ? (
        <View>
          
          <LoadingAnimation
            source={require("../animation/99680-3-dots-loading.json")}
          />
        </View>
      ) : ( 
        <>
          <View style={loginStyle.inputContainer}>
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
          </View>

          <View style={loginStyle.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={loginStyle.button}>
              <Text style={loginStyle.buttonText}>LOGGA IN</Text>
            </TouchableOpacity>
          </View>

          <View style={loginStyle.footer}>
            <Text style={loginStyle.footerText}> Har du inget konto? </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Registration", { name: "Arif" })
              }
            >
              <Text style={loginStyle.signupBtn}>Bli Medlem</Text>
            </TouchableOpacity>
          </View>
        </>
     )} 
      
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;