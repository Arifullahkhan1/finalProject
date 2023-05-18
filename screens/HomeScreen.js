import { useContext, useEffect, useState, useRef } from "react";
import { StyleSheet, View,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegInput from "../components/RegInput";
import FlattList from "../components/FlattList";
import { SafeAreaView } from "react-native-safe-area-context";
import Heading from "../components/Heading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../global/AppContext";
import LoadingAnimation from "../components/LoadingAnimation";
import LottieView from "lottie-react-native";


export default function HomeScreen() {
 
  const [inputList, setInputList] = useState([]);
  const [lastSavedValue, setLastSavedValue] = useState(null);
  const { fetchingData, setFetchingData,lastSavedRegNumber, setLastSavedRegNumber } = useContext(AppContext);
  const navigation = useNavigation();

  const getCurrentValue = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@currentValue");
      return jsonValue != null
        ? setLastSavedValue(JSON.parse(jsonValue))
        : null;
    } catch (e) {
     
    }
  };
  
  
  
  useEffect(() => {
  
   if(lastSavedRegNumber!== null ){
    
       navHandle(lastSavedRegNumber)
      } 
     
    getCurrentValue();
    
  }, []);

  const navHandle = (todo) => {
    navigation.navigate("BottomTabNavigator", {
      screen: "MyCar",
      params: { todo },
    });
  };
 
  //console.log('what is inputList', inputList)

  return (
    <SafeAreaView style={styles.container}>
      <Heading theTitile="Lägg Till Bilen" />

      <RegInput setInputList={setInputList} inputList={inputList} />
      
      {fetchingData ? (
        <View>
           <LoadingAnimation
            source={require("../animation/99680-3-dots-loading.json")}
          />
        </View>
      ) : null}
      <FlattList inputList={inputList} setInputList={setInputList} />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#141B41",
  },
});
