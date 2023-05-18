
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useContext } from "react";
//import Todo from "../moduels/Todo";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { API_URL } from "../global/baseUrl";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../global/AppContext";
//import { fetchData } from "./fetchData";
import { GetCars } from "../interseptors/getCars";


const RegInput = ({ setInputList, inputList }) => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [count, setCount] = useState(1);
  const { token, setToken, lastSavedRegNumber, setLastSavedRegNumber } =
    useContext(AppContext);
  //const [errorDuplicate, setErrorDuplicate] = useState(false);
  //const[todoCheck,setTodoCheck]=useState('');
  const { fetchingData, setFetchingData } = useContext(AppContext);
  const navigation = useNavigation();

  const changeText = (registrationNumber) => {
    setRegistrationNumber(registrationNumber);
  };
  //console.log('reginput screen reg number', registrationNumber)
  const handleAdd = async () => {
    setFetchingData(true);
    setLastSavedRegNumber(registrationNumber);

   /* fetch(`${API_URL}/api/vehicles`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
      body: JSON.stringify({
        registrationNumber: registrationNumber,
      }),
    }) */
    GetCars('/api/vehicles',token, { registrationNumber: registrationNumber })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add vehicle. Duplicate entry or Car not found");
      }
      setFetchingData(false);
      navHandle(registrationNumber);
      setRegistrationNumber("");
    })
    .catch((error) => {
 
      alert(error)
      setFetchingData(false)
      // do something with the error message, e.g. display it to the user
    });
   
  };
      
   
  const navHandle = (todo) => {
    navigation.navigate("BottomTabNavigator", {
      screen: "MyCar",
      params: { todo },
    });
  };
  return (
    <View style={styles.input}>
      <TextInput
        autoCapitalize="characters"
        style={styles.textinput}
        onChangeText={changeText}
        value={registrationNumber}
      />

      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Icon style={styles.addIcon} name="add-circle" type="Ionicons" />
      </TouchableOpacity>

      </View>
    
  );
};

const styles = StyleSheet.create({
  textinput: {
    backgroundColor: "white",
    width: "60%",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 25,
    marginLeft: 213,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    marginBottom: 22,
    marginTop: 22,
  },
  addBtn: {
    marginTop: 3,
    borderRadius: 5,
    width: 70,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 200,
    marginTop: -1,
  },
  addIcon: {
    fontSize: 43,
    color: "white",
    marginLeft: -50,
  },
});
export default RegInput;
