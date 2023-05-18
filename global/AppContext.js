import React, { useEffect, useState } from "react";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [carData, setCarData] = useState({});
  const [lastSavedRegNumber, setLastSavedRegNumber] = useState(null);
  const [clearSavedRegNumber, setClearSavedRegNumber] = useState("");

  const [firebasetoken, setFirebasetoken] = useState("");
  const [fetchingData, setFetchingData] = useState(false);
  const [itemScreenName, setItemScreenName] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");



  const storeRegNumber = async (lastSavedRegNumber) => {
    try {
      await AsyncStorage.setItem("@lastRegNumber", lastSavedRegNumber);
    } catch (e) {
     // console.log(e);
    }
    //console.log(lastSavedRegNumber, "saved successfully");
  };

  const getRegNumber = async () => {
    try {
      const value = await AsyncStorage.getItem("@lastRegNumber");
      if (value !== null) {
        setLastSavedRegNumber(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRegNumber();
  }, []);

  useEffect(() => {
    storeRegNumber(lastSavedRegNumber);
  }, [lastSavedRegNumber]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        carData,
        setCarData,
        lastSavedRegNumber,
        setLastSavedRegNumber,
        firebasetoken,
        setFirebasetoken,
        fetchingData,
        setFetchingData,
        clearSavedRegNumber, 
        setClearSavedRegNumber,
        phoneNumber, 
        setPhoneNumber
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
