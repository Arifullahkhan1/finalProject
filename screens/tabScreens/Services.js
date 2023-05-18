import { useNavigation } from "@react-navigation/core";
import { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import Heading from "../../components/Heading";
import { API_URL } from "../../global/baseUrl";
import { AppContext } from "../../global/AppContext";
import LoadingAnimation from "../../components/LoadingAnimation";


const Services = () => {
  
  const [newRegValue, setNewRegValue] = useState([]);
  const { token } = useContext(AppContext);
  const [serviceArray, setServiceArray] = useState([]);
  const [loadingServuce, setLoadingServuce] = useState(false);
   //const [screenName, setScreenName] = useState();
   
  

  const navigation = useNavigation();


  const handleItemPress = (item) => {
    navigation.navigate('ItemListScreen', { itemId:item.id,itemName:item.name  });};


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoadingServuce(true);
    fetch(`${API_URL}/api/categories`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
       //console.log("service data", data);
        setServiceArray(data);
        //setScreenName(data.name)
        //setItemScreenName(data.name)
        setLoadingServuce(false)
      })
      .catch((error) => {
        console.log(error);
        setLoadingServuce(false)
      });
  };
  function display() {
    return serviceArray.map((item) => {
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.listBody}
       onPress={()=>handleItemPress (item)} >
       
          <View style={styles.cardBody} key={item.id}>
            <Image
              style={styles.carImg}
              key={item.id}
              source={require("../../resources/images/carLogo.png")}
            />
            <Text style={styles.heading}>{item.name}</Text>
          </View>
          {/* <View style={styles.detailTextContiner}>
            {/*  <Text>{item.id}:{item.content}
  </Text> */}
          {/* </View> */} 
        </TouchableOpacity>
      );
    });
  }
  return (
    <View style={styles.mainContainer}>
      <Heading theTitile="Services" />
      
 
      {loadingServuce ? (
        <View>
          
          <LoadingAnimation
            source={require("../../animation/99680-3-dots-loading.json")}
          />
        </View>
      ) : ( 
        <>
      
      <ScrollView>{display()}</ScrollView>
      </>
     )} 
    </View>
  );
};
const styles = StyleSheet.create({
  registrationText: {
    fontSize: 20,
    fontWeight: "bold",
    borderColor: "gray",
    marginTop: -45,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 9.5,
    width: 180,
    borderLeftColor: "transparent",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  carlogo: {
    height: 45,
    marginLeft: -28,
    borderWidth: 0.005,
    marginTop: 41,
    borderWidth: 2,
    borderColor: "transparent",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  listText: {
    marginTop: 7,
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textDecorationColor: "#DFFF00",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  listBody: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: 380,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 0.5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginTop: 25,
  },

  mainContainer: {
    
    alignItems: "center",
    backgroundColor: "#141B41",
    width: "100%",
    height: "100%",
  },

  headingText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 45,
    color: "white",
  },

  carImg: {
    height: 50,
    width: 50,
    flexDirection: "row",
    marginBottom: 5,
  },
  heading: {
    fontSize: 22,
    marginLeft: 50,
    marginTop: 10,
  },
  cardBody: {
    flexDirection: "row",
  },
  detailTextContiner: {
    marginStart: 70,
    marginTop: -20,
  },
});

export default Services;
