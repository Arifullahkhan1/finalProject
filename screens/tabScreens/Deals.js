import React, { useState, useContext, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../global/baseUrl";
import { AppContext } from "../../global/AppContext";
import LoadingAnimation from "../../components/LoadingAnimation";
//import Heading from "../../components/Heading";

function ItemListScreen({ route }) {
/*   const { itemId, itemName } = route.params;
 */  const { token } = useContext(AppContext);
  const [itemListLoading, setItemListLoading] = useState(false);
  const [itemArray, setItemArray] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: 'Products',
      headerTitleStyle: {
        fontSize: 25,
        color: "#0080FE",
      },
      headerStyle: {
        backgroundColor: "white",
      },
    });
  }, []);

  const handleItemPress = (item) => {
    navigation.navigate("ItemDetailsScreen", {
      itemId: item.id,
      itemName: item.organizationName,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setItemListLoading(true);
    fetch(`${API_URL}/api/products/services/1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItemArray(data.content);

       // console.log("itenList", data);
        setItemListLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setItemListLoading(false);
      });
    // console.log('screen name',itemScreenName)
  };

  
  function display() {
    return itemArray.map((item) => {
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.listBody}
          onPress={() => handleItemPress(item)}
        >
          <View style={styles.cardBody} key={item.id}>
            <Image
              style={styles.carImg}
              key={item.id}
              source={require("../../resources/images/carLogo.png")}
            />
            <Text style={styles.heading}>{item.name}</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
           <View style={styles.discription}>
    <Text>{item.description}{'\n'}<Text>{item.provider.organizationName}</Text>
    </Text>
    </View> 
        </TouchableOpacity>
      );
    });
  }

  return (
    <View style={styles.mainContainer}>
      {itemListLoading ? (
        <View>
          <LoadingAnimation
            source={require("../../animation/99680-3-dots-loading.json")}
          />
        </View>
      ) : (
        <>
          {itemArray.length > 0 ? (
            <ScrollView>{display()}</ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <LoadingAnimation
                source={require("../../animation/emptyStatejson.json")}
              />
              <Text style={styles.emptyText}>No items found</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
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
  /* regNocontainer:{
    
marginTop:14,
marginBottom:25,


  }, */
  mainContainer: {
    flex: 1,
    justifyContent: "center",
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
  },
  heading: {
    fontSize: 18,
    marginLeft: 20,
    
  },
  cardBody: {
    flexDirection: "row",
  },
  price:{
    marginStart: 70,
    marginTop: -20,
   
  },
  priceText:{
    fontSize:22,
    fontWeight:'bold',
    marginTop:-7

  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 20,
  },
  discription:{
    marginLeft:72,
  }
});
export default ItemListScreen;
