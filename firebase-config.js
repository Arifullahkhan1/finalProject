

/* import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app'; */
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
//import { getAuth } from "firebase/auth";
//import {initializeAuth,getReactNativePersistence} from 'firebase/auth/react-native';
//export const firebaseConfig = {
  /* apiKey: "AIzaSyDZ_RfdaC-yzhMbba3Dzi_tQj37DrdvweU",
  authDomain: "car-service-37d13.firebaseapp.com",
  projectId: "car-service-37d13",
  storageBucket: "car-service-37d13.appspot.com",
  messagingSenderId: "1029577823272",
  appId: "1:1029577823272:web:837831e0cbf09923a9d11d" */
 /*  apiKey: "AIzaSyDZ_RfdaC-yzhMbba3Dzi_tQj37DrdvweU",
  authDomain: "car-service-37d13.firebaseapp.com",
  databaseURL: "https://car-service-37d13-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "car-service-37d13",
  storageBucket: "car-service-37d13.appspot.com",
  messagingSenderId: "1029577823272",
  appId: "1:1029577823272:web:837831e0cbf09923a9d11d"

}; */
/* if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
} */
//initilize FireBase
//const app = initializeApp(firebaseConfig);
//export const  auth = getAuth(app);
//const app = initializeApp(firebaseConfig);
// initialize auth
 /*  const auth = initializeAuth(app, { 
  persistence: getReactNativePersistence(AsyncStorage)
}); */
//const auth = getAuth(app);

//export { auth };

import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {initializeAuth,getReactNativePersistence} from 'firebase/auth/react-native';

export const firebaseConfig = {
  apiKey: "AIzaSyDZ_RfdaC-yzhMbba3Dzi_tQj37DrdvweU",
  authDomain: "car-service-37d13.firebaseapp.com",
  databaseURL: "https://car-service-37d13-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "car-service-37d13",
  storageBucket: "car-service-37d13.appspot.com",
  messagingSenderId: "1029577823272",
  appId: "1:1029577823272:web:837831e0cbf09923a9d11d"
};

// initialize app
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, { 
  persistence: getReactNativePersistence(AsyncStorage)
});

// export auth
export { auth };



 