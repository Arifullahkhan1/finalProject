
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import CarImg from "../../components/CarImg";
import Icon from "react-native-vector-icons/Ionicons";
import { API_URL } from "../../global/baseUrl";
import { AppContext } from "../../global/AppContext";
import LoadingAnimation from "../../components/LoadingAnimation";

export default function MyCar({ route }) {
  const navigation = useNavigation();

  const [currentValue, setCurrentValue] = useState(route.params.todo);
  const { token } = useContext(AppContext);
  const { carData, setCarData } = useContext(AppContext);
  const { lastSavedRegNumber } = useContext(AppContext);
  const [fetchingData, setFetchingData] = useState(false);
  const { registrationNumber } = route.params.todo;

  /* console.log("my registration no is =", currentValue);
  console.log("rout log :", route.params.todo);
 */
  useEffect(() => {
    // storeCurrentValue(currentValue);
    fetchData();
    //console.log('if i am lucky',carData)
   // console.log("LAST SAVED REG", lastSavedRegNumber);
  }, []);
  //const registrationNumber = "JHG49D";
  const fetchData = () => {
    //setCurrentValue(lastSavedRegNumber);
    setFetchingData(true);
    fetch(`${API_URL}/api/vehicles/registration-number/${currentValue}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarData(data);
        setFetchingData(false);
        /// console.log('carArray', carData)
      })
      .catch((error) => {
        console.log(error);
        alert(data.message);
      });
  };
  // console.log(' Hello currentValue',currentValue)

  return (
    <View style={styles.carScreenContiner}>
      <View style={styles.carImgaddbtn}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon style={styles.addIcon} name="add" type="Ionicons" />
          <Icon style={styles.carIcon} name="car-sport-sharp" type="Ionicons" />
        </TouchableOpacity>

        <CarImg />
      </View>
      {fetchingData ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {/* <Text>Loading...</Text> */}
            <LoadingAnimation
            source={require("../../animation/99680-3-dots-loading.json")}
            height={400}
          />
          </View>
        ) : (
      <View style={styles.cardContiner}>
        
          <View>
            <Text style={{marginBottom:17, fontSize: 18,fontWeight: "600",}}>
             <Text >Reg Number: {carData.registrationNumber}</Text>
            </Text>
           {carData.name ?<Text style={styles.carInfo}><Text style={styles.regNum}>Namn:</Text> {carData.name}</Text>:null}
           <View style={styles.line} />
           {carData.modelYear ?<Text style={styles.carInfo}><Text style={styles.regNum}>Modellår:</Text>     {carData.modelYear}</Text>:null}
           <View style={styles.line} />
           {carData.vinNumber ? <Text style={styles.carInfo}><Text style={styles.regNum}>Vin No:</Text>          {carData.vinNumber}</Text>:null}
           <View style={styles.line} />
           {carData.mileage ? <Text style={styles.carInfo}><Text style={styles.regNum}>Miltal:</Text>             {carData.mileage}</Text>:null}
           <View style={styles.line} />

           {carData.fuelType ? <Text style={styles.carInfo}><Text style={styles.regNum}>Bränsle:</Text>       {carData.fuelType}</Text>:null}
           <View style={styles.line} />

           {carData.gearBoxType ?  <Text style={styles.carInfo}><Text style={styles.regNum}>Växellåda:</Text>   {carData.gearBoxType}</Text>:null}
           <View style={styles.line} />
          </View>
       
      </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  cardContiner: {
    borderColor: "#D3D3D3",

    borderRadius: 15,
    padding: 10,
    width: 380,

    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  imgContiner: {
    justifyContent: "center",
    alignItems: "center",
  },

  regNum: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 15,
  },
  backBtn: {
    borderRadius: 18,
    alignItems: "center",
    marginTop: -190,

    marginRight: -307,
  },
  carInfo: {
    fontSize: 15,
    marginTop:7,
   
   },
   line: {
    borderBottomWidth: .7,
    borderBottomColor: 'gray',
    marginTop: 5,
  },
  addIcon: {
    fontSize: 25,
    marginLeft: -51,
    marginBottom: -21,
    color: "white",
  },
  carIcon: {
    fontSize: 30,
    color: "white",
  },
  carScreenContiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141B41",
  },
  carImgaddbtn: {},
});
