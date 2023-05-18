
import "react-native-gesture-handler";
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import BottomTabNavigator from "./screens/BottomTabNavigator";
import ServaceDetail from "./screens/ServaceDetail";
import SpacificServices from "./screens/SpacificServices";
 import ItemDetailsScreen from "./screens/servicesScreen/ItemDetailsScreen";
import ItemListScreen from "./screens/servicesScreen/ItemListScreen";
import OTPScreen from "./screens/OTPScreen";
import { initDB } from "./database/localdb";
//import React, { useContext } from "react";
import { AppProvider } from "./global/AppContext";
//import  AppContext  from "./global/AppContext";



export default function App() {
  

  const Stack = createStackNavigator();

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator options={{ ScreenStackHeaderBackButtonImage: true }}>
          <Stack.Screen
            options={{
              headerShown: false,
              ScreenStackHeaderBackButtonImage: false,
            }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: true }}
            name="Registration"
            component={RegistrationScreen}
          />

          <Stack.Screen
            options={{ headerBackTitle: false }}
            name="ServaceDetail"
            component={ServaceDetail}
          />

          <Stack.Screen
            options={{ headerShown: true}}
            name="SpacificServices"
            component={SpacificServices}
          />

          <Stack.Screen
            options={{ headerShown: false,  }}
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
          <Stack.Screen
            options={{ headerShown: true, headerBackTitle:true,  }}
            
            name={"ItemDetailsScreen"}
            component={ItemDetailsScreen}
          />

          <Stack.Screen
          
            options={{ headerShown: true, headerBackTitle:true }}
            name={'ItemListScreen'}
            component={ItemListScreen}
          />
          <Stack.Screen
          
          options={{ headerShown: true, headerBackTitle:true }}
          name={'OTPScreen'}
          component={OTPScreen}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141B41",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontWeight: "bold",
    fontSize: 21,
    color: "red",
  },
});
