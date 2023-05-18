import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {StyleSheet,View,FlatList,Text,Image,TextInput,TouchableOpacity,} from "react-native";
import { API_URL } from "../global/baseUrl";
import { AppContext } from "../global/AppContext";
import { showshortWords } from "./carNameStringSlice";

const FlattList = ({ inputList, setInputList }) => {
  const [newTitle, setNewTitle] = useState("");
  const { token, setLastSavedRegNumber } = useContext(AppContext);

  const navigation = useNavigation();

  const navHandle = (todo) => {
    navigation.navigate("BottomTabNavigator", {
      screen: "MyCar",
      params: { todo },
    });
  };

 
  

  fetch(`${API_URL}/api/vehicles/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setInputList(data);
    })
    .catch((error) => {
      console.log(error);
    });
  const chnageNewTile = (newTitle) => {
    setNewTitle(newTitle);
  };
  const renderHandle = ({ item }) => {
    return (
      <View style={styles.pressAbleContiner}>
        <TouchableOpacity
          style={styles.pressAble}
          onPress={() => {
            navHandle(item.registrationNumber);
            setLastSavedRegNumber(item.registrationNumber);
          }}
        >
          <View style={styles.cardBody} key={item.id}>
            <Image
              style={styles.carImg}
              key={item.id}
              source={require("../resources/images/carLogo.png")}
            />
          </View>
          <View style={styles.listView}>
            <View style={styles.todoShow}>
              <Text style={styles.regNumber} onChangeText={chnageNewTile}>
              {item.registrationNumber}
              </Text>

              <TextInput style={styles.list} onChangeText={chnageNewTile}>
                {showshortWords(item.name)}
              </TextInput>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const keyHandler = (elm, index) => index;

  return (
    <FlatList
      style={styles.flatList}
      data={inputList}
      renderItem={renderHandle}
      keyExtractor={keyHandler}
    />
  );
};
const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: "80%",
  },
  list: {
    marginTop: 15,
    fontSize: 15,
    //color: "gray",
    marginLeft: -65,
  },
  listView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listText: {
    marginTop: 15,
    fontSize: 25,
    color: "gray",
    marginLeft: 15,
  },
  todoShow: {
    flexDirection: "row",
  },
  pressBtn: {
    flexDirection: "row",
    marginTop: 25,
  },

  deletBtnContiner: {
    backgroundColor: "#EE4B2B",
    height: 30,
    marginTop: 17,
    borderRadius: 5,
    marginLeft: 37,
  },

  btnDelet: {
    fontSize: 15,
    padding: 5,
    color: "#FFFFFF",
    fontWeight: "800",
  },
  regNumber: {
    marginLeft: 25,
    fontWeight: "800",
  },

  pressAble: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: 300,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 0.5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginTop: 25,
    flexDirection: "row",
  },
  carImg: {
    height: 50,
    width: 50,
  },
  cardBody: {
    flexDirection: "row",
  },
  pressAbleContiner: {
    width: "100%",
  },
});
export default FlattList;
